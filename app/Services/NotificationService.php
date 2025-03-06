<?php

namespace App\Services;

use App\Interfaces\NotificationInterface;
use Exception;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Mail;
use Log;

class NotificationService implements NotificationInterface
{
    public function sendMail(string $to, Mailable $mail): bool
    {
        try {
            Mail::to($to)->queue($mail);

            return true;
        } catch (Exception $e) {

            Log::error('Errore durante l\'invio dell\'email: '.$e->getMessage());

            return false;
        }
    }
}
