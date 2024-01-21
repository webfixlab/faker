<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateFakeDataRequest;
use App\Jobs\CreateCustomers;
use App\Jobs\CreateProducts;
use App\Jobs\DeleteCustomers;
use App\Jobs\DeleteProducts;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;

class FakerController extends Controller
{
    public function __construct( private readonly ResponseFactory $responseFactory ){
        //
    }

    public function store( CreateFakeDataRequest $request ){
        $data = $request->validated();
        $user = $request->user();

        $productsCount  = $data[ 'productsCount' ]  ?? 0;
        $customersCount = $data[ 'customersCount' ] ?? 0;

        if( $productsCount > 0 ){
            CreateProducts::dispatch( $productsCount, $user );
        }

        if( $user->plan->price > 0 && $customersCount > 0 ){
            CreateCustomers::dispatch( $customersCount, $user );
        }

        // return $this->responseFactory->noContent();
        return $this->responseFactory->json( [
            'request' => $data
        ] );
    }

    public function destroy( Request $request ){
        $user = $request->user();

        DeleteProducts::dispatch( $user );
        DeleteCustomers::dispatch( $user );

        return $this->responseFactory->noContent();
    }
}
