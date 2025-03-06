<?php

namespace App\Interfaces;

use Illuminate\Mail\Mailable;

interface NotificationInterface
{
    public function sendMail(string $to, Mailable $mail);
}
