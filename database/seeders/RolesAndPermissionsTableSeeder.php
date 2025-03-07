<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'admin']);
        $employee = Role::create(['name' => 'employee']);
        // Permessi relativi agli utenti
        Permission::create(['name' => 'view users']);
        Permission::create(['name' => 'create users']);
        Permission::create(['name' => 'edit users']);
        Permission::create(['name' => 'delete users']);

        // Permessi relativi ai documenti
        Permission::create(['name' => 'view documents']);
        Permission::create(['name' => 'create documents']);
        Permission::create(['name' => 'edit documents']);
        Permission::create(['name' => 'delete documents']);

        // Permessi relativi alle comunicazioni
        Permission::create(['name' => 'view communications']);
        Permission::create(['name' => 'create communications']);
        Permission::create(['name' => 'edit communications']);
        Permission::create(['name' => 'delete communications']);

        $admin->givePermissionTo([
            'view documents',
            'create documents',
            'edit documents',
            'delete documents',
            'view users',
            'create users',
            'edit users',
            'delete users',
            'view communications',
            'create communications',
            'edit communications',
            'delete communications',
        ]);

        $employee->givePermissionTo(['view documents', 'view communications']);
    }
}
