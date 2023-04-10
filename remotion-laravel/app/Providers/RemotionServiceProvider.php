<?php

namespace App\Providers;

use App\Services\RemotionService;
use Illuminate\Support\ServiceProvider;

class RemotionServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(RemotionService::class, function ($app) {
            return new RemotionService();
        });
    }
}
