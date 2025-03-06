<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmployeeDocumentCreated extends Mailable
{
    use Queueable, SerializesModels;

    public $title;

    public $name;

    public $url;

    public $logoPath;

    /**
     * Create a new message instance.
     */
    public function __construct($title, $name)
    {
        $this->title = $title;
        $this->name = $name;
        $this->url = route('Documenti Dipendenti');
        $this->logoPath = asset('images/logo.png');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Un nuovo documento è stato caricato',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.employee-document-created',
            with: [
                'title' => $this->title,
                'name' => $this->name,
                'url' => $this->url,
                'logoPath' => $this->logoPath,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
