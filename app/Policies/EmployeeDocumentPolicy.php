<?php

namespace App\Policies;

use App\Models\EmployeeDocument;
use App\Models\User;

class EmployeeDocumentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return auth()->check();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, EmployeeDocument $document): bool
    {
        return $user->hasRole('admin') || $user->id === $document->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('create documents');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, EmployeeDocument $document): bool
    {
        return $user->can('update documents');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, EmployeeDocument $document): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can download the document.
     */
    public function download(User $user, EmployeeDocument $document): bool
    {
        // Permetti il download se l'utente è un admin o è il proprietario del documento
        return $user->hasRole('admin') || $user->id === $document->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, EmployeeDocument $document): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, EmployeeDocument $document): bool
    {
        return $user->hasRole('admin');
    }
}
