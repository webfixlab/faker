<?php namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use stdClass;

class CustomersRedactJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct( private readonly ShopDomain $shopDomain, private readonly stdClass $data)
    {
        // $this->shopDomain = $shopDomain;
        // $this->data = $data;

        /**
         * shop/redact payload
        {
            "shop_id": 954889,
            "shop_domain": "{shop}.myshopify.com",
            "customer": {
                "id": 191167,
                "email": "john@example.com",
                "phone": "555-625-1199"
            },
            "orders_to_redact": [299938, 280263, 220458]
        }
         */
    }

    public function handle()
    {
        // Convert domain
        // $this->shopDomain = ShopDomain::fromNative($this->shopDomain);

        // Do what you wish with the data
        // Access domain name as $this->shopDomain->toNative()
    }
}
