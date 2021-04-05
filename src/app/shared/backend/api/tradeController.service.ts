/**
 * Hyperledger API
 * Hyperledger API reference for developers
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: info@oferto.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { Trade } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class TradeControllerService {

    protected basePath = 'http://localhost:8081';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Delete trade
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public delete(id: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<string>;
    public delete(id: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<string>>;
    public delete(id: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<string>>;
    public delete(id: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling delete.');
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.delete<string>(`${this.configuration.basePath}/trades/${encodeURIComponent(String(id))}`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create trade
     * @param trade trade
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public create(trade: Trade, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<Trade>;
    public create(trade: Trade, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<Trade>>;
    public create(trade: Trade, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<Trade>>;
    public create(trade: Trade, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
        if (trade === null || trade === undefined) {
            throw new Error('Required parameter trade was null or undefined when calling create.');
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<Trade>(`${this.configuration.basePath}/trades`,
            trade,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Execute trade
     * @param idBuy idBuy
     * @param idSell idSell
     * @param price price
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public execute(idBuy: string, idSell: string, price: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<Trade>;
    public execute(idBuy: string, idSell: string, price: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<Trade>>;
    public execute(idBuy: string, idSell: string, price: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<Trade>>;
    public execute(idBuy: string, idSell: string, price: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
        if (idBuy === null || idBuy === undefined) {
            throw new Error('Required parameter idBuy was null or undefined when calling execute.');
        }
        if (idSell === null || idSell === undefined) {
            throw new Error('Required parameter idSell was null or undefined when calling execute.');
        }
        if (price === null || price === undefined) {
            throw new Error('Required parameter price was null or undefined when calling execute.');
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<Trade>(`${this.configuration.basePath}/trades/${encodeURIComponent(String(idSell))}/${encodeURIComponent(String(idBuy))}/${encodeURIComponent(String(price))}`,
            null,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get all trades
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAll(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<Array<Trade>>;
    public getAll(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<Array<Trade>>>;
    public getAll(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<Array<Trade>>>;
    public getAll(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Array<Trade>>(`${this.configuration.basePath}/trades`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get trade by id
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getById(id: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<Trade>;
    public getById(id: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<Trade>>;
    public getById(id: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<Trade>>;
    public getById(id: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getById.');
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Trade>(`${this.configuration.basePath}/trades/${encodeURIComponent(String(id))}`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Initialize with some trades
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public initialize(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<Array<Trade>>;
    public initialize(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<Array<Trade>>>;
    public initialize(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<Array<Trade>>>;
    public initialize(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<Array<Trade>>(`${this.configuration.basePath}/trades/initialize`,
            null,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update trade
     * @param id id
     * @param trade trade
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public update(id: string, trade: Trade, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<Trade>;
    public update(id: string, trade: Trade, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<Trade>>;
    public update(id: string, trade: Trade, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<Trade>>;
    public update(id: string, trade: Trade, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling update.');
        }
        if (trade === null || trade === undefined) {
            throw new Error('Required parameter trade was null or undefined when calling update.');
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.put<Trade>(`${this.configuration.basePath}/trades/${encodeURIComponent(String(id))}`,
            trade,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
