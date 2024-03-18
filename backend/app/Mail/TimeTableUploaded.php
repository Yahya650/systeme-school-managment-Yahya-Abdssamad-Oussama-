<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TimeTableUploaded extends Mailable
{
    use Queueable, SerializesModels;


    public $student;
    public $timeTable;


    /**
     * Create a new message instance.
     */
    public function __construct($student, $timeTable)
    {
        $this->student = $student;
        $this->timeTable = $timeTable;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Emploi du temps Updated',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.timeTableUploaded',
            with: ['student' => $this->student, 'title' => "Emploi du temps Updated", 'timeTable' => $this->timeTable],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
