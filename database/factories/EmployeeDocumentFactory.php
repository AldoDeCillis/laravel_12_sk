<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeDocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 10),
            'category_id' => $this->faker->numberBetween(1, 2),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'file_path' => $this->faker->imageUrl(),
            'expiration_date' => $this->faker->dateTimeBetween('-2 years', 'now'),
        ];
    }
}
