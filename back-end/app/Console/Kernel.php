<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        \App\Console\Commands\FetcherXing::class,
        \App\Console\Commands\FetcherRevistaClass::class,
        \App\Console\Commands\FetcherInTv::class,
        \App\Console\Commands\FetcherImport::class,
        \App\Console\Commands\SendTestMail::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('fetcher:xing')->everyFiveMinutes();
        $schedule->command('fetcher:class')->everyFifteenMinutes();
        $schedule->command('fetcher:intv')->everyFifteenMinutes();
        $schedule->command('fetcher:import')->everyFiveMinutes();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
