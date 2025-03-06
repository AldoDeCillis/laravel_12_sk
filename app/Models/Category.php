<?php

namespace App\Models;

use App\Models\EmployeeDocument;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name'];

    public function employeeDocuments()
    {
        return $this->hasMany(EmployeeDocument::class);
    }

}
