document.addEventListener("alpine:init", () => {
    Alpine.data("chunkedUpload", () => ({
        uploading: false,
        uploadedChunks: 0,
        totalChunks: 0,
        uploadedFileName: "",
        progress: 0,
        dragOver: false,

        /**
         * Handle file drop.
         */
        handleDrop(event) {
            this.dragOver = false;
            if (event.dataTransfer.files.length > 0) {
                this.upload(event.dataTransfer.files[0]);
            }
        },

        /**
         * Upload the file in chunks.
         * @param {File|null} file
         */
        upload(file = null) {
            let selectedFile = file;
            const inputFile = this.$refs.fileInput;
            if (!selectedFile && inputFile && inputFile.files.length > 0) {
                selectedFile = inputFile.files[0];
            }
            if (!selectedFile) {
                console.error("chunkedUpload: No file selected.");
                return;
            }
            this.uploading = true;

            const closestWireEl = inputFile
                ? inputFile.closest("[wire\\:id]")
                : null;
            if (!closestWireEl) {
                console.error("chunkedUpload: Livewire component not found.");
                return;
            }
            const wireId = closestWireEl.getAttribute("wire:id");
            const livewireComponent = window.Livewire.find(wireId);

            if (!livewireComponent.get("documentTitle")) {
                const defaultName = selectedFile.name
                    .replace(/\.[^/.]+$/, "")
                    .replace(/ /g, "_");
                livewireComponent.set("documentTitle", defaultName);
            }

            const extension = selectedFile.name.split(".").pop();
            livewireComponent
                .call("setFileExtension", extension)
                .catch((error) => {
                    console.error(
                        "chunkedUpload: Error setting file extension.",
                        error
                    );
                });

            const chunkSize = 2 * 1024 * 1024; // 2MB per chunk
            this.totalChunks = Math.ceil(selectedFile.size / chunkSize);
            this.uploadedChunks = 0;
            this.progress = 0;

            for (
                let chunkIndex = 0;
                chunkIndex < this.totalChunks;
                chunkIndex++
            ) {
                const start = chunkIndex * chunkSize;
                const end = Math.min(start + chunkSize, selectedFile.size);
                const chunk = selectedFile.slice(start, end);

                livewireComponent.upload(
                    "chunk",
                    chunk,
                    // Success callback
                    () => {
                        this.uploadedChunks++;
                        this.progress = Math.floor(
                            (this.uploadedChunks / this.totalChunks) * 100
                        );
                        if (this.uploadedChunks === this.totalChunks) {
                            this.uploading = false;
                            this.uploadedFileName = selectedFile.name;
                            livewireComponent
                                .call("uploadComplete", selectedFile.name)
                                .catch((error) => {
                                    console.error(
                                        "chunkedUpload: Error in uploadComplete.",
                                        error
                                    );
                                });
                        }
                    },
                    // Error callback
                    () => {
                        console.error(
                            `chunkedUpload: Error uploading chunk ${
                                chunkIndex + 1
                            }.`
                        );
                    },
                    // Optional progress callback
                    (event) => {
                        // Optional: handle per-chunk progress updates.
                    }
                );
            }
        },

        init() {
            window.addEventListener("uploadComplete", () => {
                this.uploadedFileName = "";
                this.progress = 0;
                if (this.$refs.fileInput) {
                    this.$refs.fileInput.value = "";
                }
            });
        },
    }));
});
