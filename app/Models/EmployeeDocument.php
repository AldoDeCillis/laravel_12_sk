<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmployeeDocument extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'employee_documents';

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'file_path',
        'expiration_date',
        'created_at',
        'updated_at',
    ];

    protected $appends = ['created_at_formatted'];

    // Definisci un accessor per "created_at_formatted"
    public function getCreatedAtFormattedAttribute()
    {
        return $this->created_at->format('d/m/Y');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function accessLogs()
    {
        return $this->morphMany(AccessLog::class, 'loggable');
    }

    /**
     * Scope per limitare la query ai soli documenti di proprietà dell'utente se non è admin.
     */
    public function scopeOwnRecords($query, $user)
    {
        if (! $user->hasRole('admin')) {
            return $query->where('user_id', $user->id);
        }

        return $query;
    }
}
