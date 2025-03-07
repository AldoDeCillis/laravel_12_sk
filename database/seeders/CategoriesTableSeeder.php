<?php

namespace Database\Seeders;

use App\Enums\CategoryEnum;
use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (CategoryEnum::cases() as $category) {
            Category::create([
                'name' => $category->label(),
            ]);
        }
    }
}
