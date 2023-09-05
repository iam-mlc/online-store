import { UseQueryResult } from "@tanstack/react-query";
import { Products } from "./Product";

export type QueryResponse = UseQueryResult<Response, unknown>

type Response = {
    products: Products
    limit: number
    skip: number
    total: number
}