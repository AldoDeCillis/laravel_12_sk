<?php

namespace App\Repositories;

use App\Models\User;

class FilterRepository
{
    public function filterCategory($query, $categoryId)
    {
        if (! empty($categoryId)) {
            $query->where('category_id', $categoryId);
        }

        return $query;
    }

    public function searchEmployee($searchQuery)
    {
        return User::role('employee')
            ->where(function ($query) use ($searchQuery) {
                $query->where('name', 'like', '%'.$searchQuery.'%')
                    ->orWhere('email', 'like', '%'.$searchQuery.'%');
            });
    }

    public function searchEmployeeDocuments($query, $searchQuery)
    {
        if (! empty($searchQuery)) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('title', 'like', '%'.$searchQuery.'%')
                    ->orWhereHas('user', function ($q) use ($searchQuery) {
                        $q->where('name', 'like', '%'.$searchQuery.'%')
                            ->orWhere('email', 'like', '%'.$searchQuery.'%');
                    });
            });
        }

        return $query;
    }

    public function searchCommunication($query, $searchQuery)
    {
        if (! empty($searchQuery)) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('title', 'like', '%'.$searchQuery.'%')
                    ->orWhere('content', 'like', '%'.$searchQuery.'%');
            });
        }

        return $query;
    }

    public function searchAccessLogs($query, $searchQuery)
    {
        if (! empty($searchQuery)) {
            $query->whereHas('loggable', function ($q) use ($searchQuery) {
                $q->where(function ($query) use ($searchQuery) {
                    if ($query->getModel() instanceof \App\Models\EmployeeDocument) {
                        $query->where('title', 'like', '%'.$searchQuery.'%')
                            ->orWhere('description', 'like', '%'.$searchQuery.'%')
                            ->orWhereHas('category', function ($query) use ($searchQuery) {
                                $query->where('name', 'like', '%'.$searchQuery.'%');
                            });
                    } elseif ($query->getModel() instanceof \App\Models\Communication) {
                        $query->where('title', 'like', '%'.$searchQuery.'%')
                            ->orWhere('content', 'like', '%'.$searchQuery.'%')
                            ->orWhere('type', 'like', '%'.$searchQuery.'%');
                    }
                });
                // Filtra per l'utente associato
                $q->orWhereHas('user', function ($query) use ($searchQuery) {
                    $query->where('name', 'like', '%'.$searchQuery.'%')
                        ->orWhere('email', 'like', '%'.$searchQuery.'%');
                });
            });
        }

        return $query;
    }
}
