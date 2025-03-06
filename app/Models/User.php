<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function employeeDocuments()
    {
        return $this->hasMany(EmployeeDocument::class);
    }

    public function communications()
    {
        return $this->hasMany(Communication::class);
    }

    public function getNewEmployeeDocumentsCount($categoryId = null)
    {
        $query = $this->employeeDocuments();

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        return $query->doesntHave('accessLogs')->count();
    }

    public function getNewCommunicationsCount($type = null)
    {
        $query = $this->communications();

        if ($type) {
            $query->where('type', $type);
        }

        return $query->whereDoesntHave('accessLogs')->count();
    }
}
