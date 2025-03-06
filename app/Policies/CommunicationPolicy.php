<?php

namespace App\Policies;

use App\Models\Communication;
use App\Models\User;

class CommunicationPolicy
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
    public function view(User $user, Communication $communication): bool
    {
        return $user->hasRole('admin') || $user->id === $communication->user_id || $communication->type == 'Public';
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('create communications');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Communication $communication): bool
    {
        return $user->can('update communications');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Communication $communication): bool
    {
        return $user->hasRole('admin') || $user->can('delete communications');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Communication $document): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Communication $document): bool
    {
        return $user->hasRole('admin');
    }
}
