<?php

namespace App\Enums;

enum CategoryEnum: string
{
    case PAY_SLIP = 'pay_slip';
    case UNIQUE_CERTIFICATION = 'unique_certification';

    /**
     * Get the human-readable label of the enum case.
     */
    public function label(): string
    {
        return match ($this) {
            self::PAY_SLIP => 'Pay Slip',
            self::UNIQUE_CERTIFICATION => 'Unique Certification',
        };
    }
}
