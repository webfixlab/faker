<?php

namespace App\Jobs;

use App\Models\User;
use Faker\Factory;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class CreateCustomers implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct( private readonly int $count, private readonly User $shop )
    {
        // Log::info( 'Aikya::construce::CreateCustomers job constructor called.', [
        //     'count' => $count,
        //     'shop_id' => $shop->id
        // ] );
    }

    public function uniqueId() : string
    {
        return $this->shop->id;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $customers = [];
        $faker     = Factory::create();
        
        for( $i = 0; $i < $this->count; $i++ ){

            $customerResource = [
                'first_name' => $faker->firstName,
                'last_name'  => $faker->lastName
            ];

            $response = $this->shop->api()->rest( 'POST', '/admin/api/customers.json', [ 'customer' => $customerResource ] );

            if( ! empty( $response['errors'] ) ){
                throw $response['exception'];
            }

            $customers[] = [
                'shopify_id' => $response['body']['customer']['id']
            ];

        }

        $this->shop->fakeCustomers()->createMany( $customers );

    }
}
