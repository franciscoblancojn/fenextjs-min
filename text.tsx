
        import React, { useMemo, useEffect, useState, useRef, useCallback } from "react";
        import { useRouter } from "next/router";
        import { useLocalStorage, useLocalStorageProps } from "uselocalstoragenextjs";
        import { jwtDecode } from "jwt-decode";
        import {
            // countryProps as CountryProps,
            // stateProps as StateProps,
            // cityProps as CityProps,
            getDataStatesByCountry,
            getDataCitysByStateAndCountry,
            getDataCountrys,
            getRuteCountryImg,
        } from "country-state-city-nextjs";
        import firebase from "firebase/compat/app";
        import "firebase/compat/auth";
        import "firebase/storage";
        import {
            FirebaseStorage,
            StorageReference,
            getStorage,
            uploadString,
            ref as refStorage,
            getDownloadURL,
            deleteObject,
            getBytes,
        } from "firebase/storage";
        import {
            getDatabase,
            ref as refDatabase,
            child,
            get,
            set,
            Database,
            DatabaseReference,
        } from "firebase/database";
    
















export enum Card_Enum {
    VISA = "VISA",
    MASTERCARD = "MASTERCARD",
    AMEX = "AMEX",
    DISCOVER = "DISCOVER",
    DINERS = "DINERS",
    DINERS_CARTE_BLANCHE = "DINERS_CARTE_BLANCHE",
    JCB = "JCB",
    VISA_ELECTRON = "VISA_ELECTRON",
    OTHER = "OTHER",
}


export enum RequestResultTypeProps {
    OK = "OK",
    ERROR = "ERROR",
    NONE = "NONE",
    NORMAL = "NORMAL",
    WARNING = "WARNING",
}

export interface RequestResultDataProps<
    R = any,
    E = any,
    T = RequestResultTypeProps | keyof typeof RequestResultTypeProps,
> {
    type: T;
    result?: R;
    error?: ErrorProps<E>;
    message?: string;
}

export type RequestResultProps<R = any, E = any, T = RequestResultTypeProps> =
    | Promise<RequestResultDataProps<R, E, T>>
    | RequestResultDataProps<R, E, T>;

export type RequestProps<
    Q = any,
    R = any,
    E = any,
    T = RequestResultTypeProps,
> = (data: Q) => RequestResultProps<R, E, T>;


export interface PhoneCodeProps {
    img?: string;
    code: string;
    code_country?: string;
    country?: CountryProps;
}
export interface PhoneProps extends PhoneCodeProps {
    number: string;
    tel?: string;
}


export type TypeDate = "date" | "month" | "week" | "time";

export enum DaysEnum {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday",
}


export enum AlertType {
    OK = "OK",
    ERROR = "ERROR",
    NORMAL = "NORMAL",
    WARNING = "WARNING",
}

export interface AlertProps<T = any> {
    message: string;
    type: AlertType | keyof typeof AlertType;
    data?: T;
}


export enum ErrorCode {
    ERROR = "ERROR",
    USER_TOKEN_NOT_FOUND = "USER_TOKEN_NOT_FOUND",
    USER_TOKEN_INVALID = "USER_TOKEN_INVALID",
    PAGE_NOT_FOUND = "PAGE_NOT_FOUND",
    SERVER_ERROR = "SERVER_ERROR",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    BAD_REQUEST = "BAD_REQUEST",
    TIMEOUT = "TIMEOUT",
    NETWORK_ERROR = "NETWORK_ERROR",
    DATABASE_ERROR = "DATABASE_ERROR",
    FILE_NOT_FOUND = "FILE_NOT_FOUND",
    METHOD_NOT_ALLOWED = "METHOD_NOT_ALLOWED",
    NOT_ACCEPTABLE = "NOT_ACCEPTABLE",
    REQUEST_TIMEOUT = "REQUEST_TIMEOUT",
    TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
    INPUT_INVALID = "INPUT_INVALID",
    INPUT_LENGTH = "INPUT_LENGTH",
    INPUT_NOT_EQUAL = "INPUT_NOT_EQUAL",
    INPUT_REQUIRED = "INPUT_REQUIRED",
    INPUT_TOO_SHORT = "INPUT_TOO_SHORT",
    INPUT_TOO_LONG = "INPUT_TOO_LONG",
    INPUT_OUT_OF_RANGE = "INPUT_OUT_OF_RANGE",
    INPUT_PATTERN_MISMATCH = "INPUT_PATTERN_MISMATCH",
    INPUT_VALUE_TOO_LOW = "INPUT_VALUE_TOO_LOW",
    INPUT_VALUE_TOO_HIGH = "INPUT_VALUE_TOO_HIGH",
    GOOGLE_KEY_NOT_FOUND = "GOOGLE_KEY_NOT_FOUND",
    GOOGLE_KEY_INVALID = "GOOGLE_KEY_INVALID",
}

export interface ErrorProps<D = any> {
    code?: ErrorCode;
    message?: string;
    data?: D;
}


export type ThemeType = "light" | "dark" | "auto";

export const ThemeConst = ["light", "dark", "auto"];


export type _TFunciton = (d: string) => any;

export interface _TProps {
    useT?: boolean;
    _t?: _TFunciton;
}


export interface CountryProps {
    id: number;
    text: string;
    code: string;
    img?: string;
    code_phone?: string;
}
export interface StateProps {
    id: number;
    id_country: number;
    text: string;
}
export interface CityProps {
    id: number;
    id_state: number;
    text: string;
    id_country: number;
    nameAve?: string | undefined;
}
export interface CSCProps {
    country?: CountryProps;
    state?: StateProps;
    city?: CityProps;
}

export interface CSCStringProps {
    country?: string;
    state?: string;
    city?: string;
}


export enum UserTypeVerifyProps {
    email,
    phone,
    company,
}

export enum UserStatusProps {
    VERIFY = "VERIFY",
    NOVERIFY = "NOVERIFY",
    BAN = "BAN",
    PENDING = "PENDING",
}

export enum UserRoleProps {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    BACKOFFICE = "BACKOFFICE",
}

export interface UserProps {
    status: UserStatusProps;

    id: string;
    token: string;
    name: string;
    img: ImgDataProps;
    role: UserRoleProps;
    phone?: PhoneProps;
    email: string;
    stripe_id?: string;
    dateCreate: Date;

    verify?: {
        [id in UserTypeVerifyProps]: UserStatusProps;
    };
}


/**
 * Properties for the base Img component.
 */
export interface ImgDataProps {
    /**
     * The ID of de Img.
     */
    id?: string | number;
    /**
     * The Name of de Img.
     */
    name?: string;
    /**
     * The alt of de Img.
     */
    alt?: string;
    /**
     * Url of Img.
     */
    src: string;
    /**
     * Url of Img for Size 1920px or up.
     */
    srcMin1920?: string;
    /**
     * Url of Img for Size 1680px or up.
     */
    srcMin1680?: string;
    /**
     * Url of Img for Size 1440px or up.
     */
    srcMin1440?: string;
    /**
     * Url of Img for Size 1024px or up.
     */
    srcMin1024?: string;
    /**
     * Url of Img for Size 992px or up.
     */
    srcMin992?: string;
    /**
     * Url of Img for Size 768px or up.
     */
    srcMin768?: string;
    /**
     * Url of Img for Size 575px or up.
     */
    srcMin575?: string;
    /**
     * Url of Img for Size 200x200px or up.
     */
    srcThumbnail_200?: string;
    /**
     * Url of Img for Size 100x100px or up.
     */
    srcThumbnail_100?: string;
}


export interface TimeZoneProps {
    zone: string;
    time: string;
}


export enum FileStatus {
    "NONE" = "NONE",
    "APPROVED" = "APPROVED",
    "PENDING" = "PENDING",
    "REFUSED" = "REFUSED",
}

export interface FileProps {
    uuid?: string;
    id?: string;
    text?: string;
    extend?: string;
    fileData: any;
    base64?: string;
    url?: string;
    status?: FileStatus | keyof typeof FileStatus;
}


export interface GeocoderAddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}
export interface PlaceAspectRating {
    rating: number;
    type: string;
}
export enum BusinessStatus {
    CLOSED_PERMANENTLY = "CLOSED_PERMANENTLY",
    CLOSED_TEMPORARILY = "CLOSED_TEMPORARILY",
    OPERATIONAL = "OPERATIONAL",
}
export interface LatLngLiteral {
    lat: number;
    lng: number;
}
export interface LatLngBoundsLiteral {
    east: number;
    north: number;
    south: number;
    west: number;
}
export declare class LatLngBounds {
    constructor(
        swOrLatLngBounds?:
            | LatLng
            | null
            | LatLngLiteral
            | LatLngBounds
            | LatLngBoundsLiteral,
        ne?: LatLng | null | LatLngLiteral,
    );
    contains(latLng: LatLng | LatLngLiteral): boolean;
    equals(other: LatLngBounds | null | LatLngBoundsLiteral): boolean;

    extend(point: LatLng | LatLngLiteral): LatLngBounds;
    getCenter(): LatLng;
    getNorthEast(): LatLng;
    getSouthWest(): LatLng;
    intersects(other: LatLngBounds | LatLngBoundsLiteral): boolean;
    isEmpty(): boolean;
    toJSON(): LatLngBoundsLiteral;
    toSpan(): LatLng;
    toString(): string;
    toUrlValue(precision?: number): string;
    union(other: LatLngBounds | LatLngBoundsLiteral): LatLngBounds;
    static readonly MAX_BOUNDS: LatLngBounds;
}
export declare class LatLng {
    constructor(
        latOrLatLngOrLatLngLiteral: number | LatLngLiteral | LatLng,
        lngOrNoClampNoWrap?: number | boolean | null,
        noClampNoWrap?: boolean,
    );
    equals(other: LatLng | null): boolean;
    lat(): number;
    lng(): number;
    toJSON(): LatLngLiteral;
    toString(): string;
    toUrlValue(precision?: number): string;
}
export interface PlaceGeometry {
    location?: LatLng;
    viewport?: LatLngBounds;
}
export interface PlaceOpeningHoursTime {
    day: number;
    hours: number;
    minutes: number;
    nextDate?: number;
    time: string;
}
export interface PlaceOpeningHoursPeriod {
    close?: PlaceOpeningHoursTime;
    open: PlaceOpeningHoursTime;
}
export interface PlaceOpeningHours {
    isOpen(date?: Date): boolean | undefined;
    open_now?: boolean;
    periods?: PlaceOpeningHoursPeriod[];
    weekday_text?: string[];
}
export interface PhotoOptions {
    maxHeight?: number | null;
    maxWidth?: number | null;
}
export interface PlacePhoto {
    getUrl(opts?: PhotoOptions): string;
    height: number;
    html_attributions: string[];
    width: number;
}
export interface PlacePlusCode {
    compound_code?: string;
    global_code: string;
}
export interface PlaceAspectRating {
    rating: number;
    type: string;
}
export interface PlaceReview {
    aspects?: PlaceAspectRating[];
    author_name: string;
    author_url?: string;
    language: string;
    profile_photo_url: string;
    rating?: number;
    relative_time_description: string;
    text: string;
    time: number;
}
export interface AddressGoogle {
    address_components?: GeocoderAddressComponent[];
    adr_address?: string;
    aspects?: PlaceAspectRating[];
    business_status?: BusinessStatus;
    lat?: number;
    lng?: number;
    formatted_address?: string;
    formatted_phone_number?: string;
    geometry?: PlaceGeometry;
    html_attributions?: string[];
    icon?: string;
    icon_background_color?: string;
    icon_mask_base_uri?: string;
    international_phone_number?: string;
    name?: string;
    opening_hours?: PlaceOpeningHours;
    permanently_closed?: boolean;
    photos?: PlacePhoto[];
    place_id?: string;
    plus_code?: PlacePlusCode;
    price_level?: number;
    rating?: number;
    reviews?: PlaceReview[];
    types?: string[];
    url?: string;
    user_ratings_total?: number;
    utc_offset?: number;
    utc_offset_minutes?: number;
    vicinity?: string;
    website?: string;
}

export interface ComponentRestrictions {
    country: string | string[] | null;
}
export interface AutocompleteOptions {
    bounds?: LatLngBounds | LatLngBoundsLiteral;
    componentRestrictions?: ComponentRestrictions;
    fields?: string[];
    placeIdOnly?: boolean;
    strictBounds?: boolean;
    types?: string[];
}
export interface PlaceResult {
    address_components?: GeocoderAddressComponent[];
    adr_address?: string;
    aspects?: PlaceAspectRating[];
    business_status?: BusinessStatus;
    formatted_address?: string;
    formatted_phone_number?: string;
    geometry?: PlaceGeometry;
    html_attributions?: string[];
    icon?: string;
    icon_background_color?: string;
    icon_mask_base_uri?: string;
    international_phone_number?: string;
    name?: string;
    opening_hours?: PlaceOpeningHours;
    permanently_closed?: boolean;
    photos?: PlacePhoto[];
    place_id?: string;
    plus_code?: PlacePlusCode;
    price_level?: number;
    rating?: number;
    reviews?: PlaceReview[];
    types?: string[];
    url?: string;
    user_ratings_total?: number;
    utc_offset?: number;
    utc_offset_minutes?: number;
    vicinity?: string;
    website?: string;
}
export interface MapsEventListener {
    remove(): void;
}
export declare class MVCObject {
    addListener(eventName: string, handler: () => void): MapsEventListener;
    bindTo(
        key: string,
        target: MVCObject,
        targetKey?: string | null,
        noNotify?: boolean,
    ): void;
    get(key: string): any;
    notify(key: string): void;
    set(key: string, value: any): void;
    setValues(values?: object | null): void;
    unbind(key: string): void;
    unbindAll(): void;
}
export declare class Autocomplete extends MVCObject {
    constructor(
        inputField: HTMLInputElement,
        opts?: AutocompleteOptions | null,
    );
    getBounds(): LatLngBounds | undefined;
    getFields(): string[] | undefined;
    getPlace(): PlaceResult;
    setBounds(bounds: LatLngBounds | LatLngBoundsLiteral | undefined): void;
    setComponentRestrictions(restrictions: ComponentRestrictions | null): void;
    setFields(fields: string[] | undefined): void;
    setOptions(options: AutocompleteOptions | null): void;
    setTypes(types: string[] | null): void;
}
export interface AutocompleteGoogle extends Autocomplete {}


export enum Unit_Distance {
    MM = "MM",
    CM = "CM",
    M = "M",
    IN = "IN",
    FT = "FT",
}
export enum Unit_Weight {
    G = "G",
    KG = "KG",
    OZ = "OZ",
    LB = "LB",
}
export enum Unit_Volumen {
    ML = "ML",
    L = "L",
    CC = "CC",
    CM3 = "CM3",
    M3 = "M3",
    IN3 = "IN3",
    FT3 = "FT3",
    GAL = "GAL",
}


export interface ErrorFenextjsProps<D> extends ErrorProps<D> {
    input?: string;
}

export class ErrorFenextjs<D = any> extends Error {
    code: ErrorCode;
    message: string;
    msg?: string;
    input?: string;
    data?: D;

    constructor({ code, data, message, input }: ErrorFenextjsProps<D>) {
        super(message);
        this.code = code ?? ErrorCode.ERROR;
        this.name = code ?? ErrorCode.ERROR;
        this.message = (message ?? "") + (input ? ` [${input}]` : "");
        this.msg = message ?? "";
        this.data = data;
        this.input = input;
    }
}


export class ErrorNetworkError extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.NETWORK_ERROR,
            message: "Network Error",
        });
    }
}




export class ErrorUserTokenNotFound extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.USER_TOKEN_NOT_FOUND,
            message: "Token not Found",
        });
    }
}


export class ErrorUserTokenInvalid extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.USER_TOKEN_INVALID,
            message: "Invalid Token",
        });
    }
}


export class ErrorNotImplemented extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.NOT_IMPLEMENTED,
            message: "Not Implemented",
        });
    }
}


export class ErrorTooManyRequests extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.TOO_MANY_REQUESTS,
            message: "Too Many Requests",
        });
    }
}


export class ErrorUnauthorized extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.UNAUTHORIZED,
            message: "Unauthorized",
        });
    }
}


export class ErrorPageNotFound extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.PAGE_NOT_FOUND,
            message: "Page not Found",
        });
    }
}












export class ErrorInputValueTooHigh extends ErrorFenextjs {
    constructor(d?: { input?: string; max?: number | Date; message?: string }) {
        super({
            code: ErrorCode.INPUT_VALUE_TOO_HIGH,
            message:
                d?.message ??
                `Input Value Too High${d?.max ? `, max: ${d?.max}` : ""}`,
            input: d?.input,
        });
    }
}


export class ErrorInputOutOfRange extends ErrorFenextjs {
    constructor(d?: { input?: string; range?: number[]; message?: string }) {
        super({
            code: ErrorCode.INPUT_OUT_OF_RANGE,
            message:
                d?.message ??
                `Input Out of Range${
                    d?.range ? `, range: ${JSON.stringify(d?.range)}` : ""
                }`,
            input: d?.input,
        });
    }
}


export class ErrorInputTooLong extends ErrorFenextjs {
    constructor(d?: { input?: string; max?: number | Date; message?: string }) {
        super({
            code: ErrorCode.INPUT_TOO_LONG,
            message:
                d?.message ??
                `Input Too Long${d?.max ? `, max: ${d?.max}` : ""}`,
            input: d?.input,
        });
    }
}


export class ErrorInputValueTooLow extends ErrorFenextjs {
    constructor(d?: { input?: string; min?: number | Date; message?: string }) {
        super({
            code: ErrorCode.INPUT_VALUE_TOO_LOW,
            message:
                d?.message ??
                `Input Value Too Low${d?.min ? `, min: ${d?.min}` : ""}`,
            input: d?.input,
        });
    }
}


export class ErrorInputNotEqual extends ErrorFenextjs {
    constructor(d?: { input?: string; equal?: any; message?: string }) {
        super({
            code: ErrorCode.INPUT_NOT_EQUAL,
            message:
                d?.message ??
                `Not Equal Input${
                    d?.equal
                        ? `, equal: ${JSON.stringify([d?.equal].flat(2))}`
                        : ""
                }`,
            input: d?.input,
        });
    }
}


export class ErrorInputInvalid extends ErrorFenextjs {
    constructor(d?: { input?: string; message?: string }) {
        super({
            code: ErrorCode.INPUT_INVALID,
            message: d?.message ?? "Invalid Input",
            input: d?.input,
        });
    }
}


export class ErrorInputLength extends ErrorFenextjs {
    constructor(d?: {
        input?: string;
        length?: number | Date;
        message?: string;
    }) {
        super({
            code: ErrorCode.INPUT_LENGTH,
            message:
                d?.message ??
                `Input not length${d?.length ? `, length: ${d?.length}` : ""}`,
            input: d?.input,
        });
    }
}


export class ErrorInputPatternMismatch extends ErrorFenextjs {
    constructor(d?: { input?: string; message?: string }) {
        super({
            code: ErrorCode.INPUT_PATTERN_MISMATCH,
            message: d?.message ?? "Input Pattern Mismatch",
            input: d?.input,
        });
    }
}


export class ErrorInputRequired extends ErrorFenextjs {
    constructor(d?: { input?: string; message?: string }) {
        super({
            code: ErrorCode.INPUT_REQUIRED,
            message: d?.message ?? "Input Required",
            input: d?.input,
        });
    }
}


export class ErrorInputTooShort extends ErrorFenextjs {
    constructor(d?: { input?: string; min?: number | Date; message?: string }) {
        super({
            code: ErrorCode.INPUT_TOO_SHORT,
            message:
                d?.message ??
                `Input Too Short${d?.min ? `, min: ${d?.min}` : ""}`,
            input: d?.input,
        });
    }
}


export class ErrorNotAcceptable extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.NOT_ACCEPTABLE,
            message: "Not Acceptable",
        });
    }
}


export class ErrorInternalServerError extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
        });
    }
}


export class ErrorBadRequest extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.BAD_REQUEST,
            message: "Bad Request",
        });
    }
}


export class ErrorFileNotFound extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.FILE_NOT_FOUND,
            message: "File not Found",
        });
    }
}




export class ErrorGoogleKeyNotFound extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.GOOGLE_KEY_NOT_FOUND,
            message: "Google Key not Found",
        });
    }
}


export class ErrorGoogleKeyInvalid extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.GOOGLE_KEY_INVALID,
            message: "Invalid Google Key",
        });
    }
}


export class ErrorServiceUnavailable extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.SERVICE_UNAVAILABLE,
            message: "Service Unavailable",
        });
    }
}


export class ErrorServerError extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.SERVER_ERROR,
            message: "Internal Server Error",
        });
    }
}


export class ErrorDatabaseError extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.DATABASE_ERROR,
            message: "Database Error",
        });
    }
}


export class ErrorRequestTimeout extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.REQUEST_TIMEOUT,
            message: "Request Timeout",
        });
    }
}


export class ErrorForbidden extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.FORBIDDEN,
            message: "Forbidden",
        });
    }
}


export class ErrorMethodNotAllowed extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.METHOD_NOT_ALLOWED,
            message: "Method Not Allowed",
        });
    }
}


export class ErrorTimeout extends ErrorFenextjs {
    constructor() {
        super({
            code: ErrorCode.TIMEOUT,
            message: "Request Timeout",
        });
    }
}


export interface FenextjsValidatorClassIsWhenProps {
    key: string;
    is: FenextjsValidatorClass;
    then: FenextjsValidatorClass;
    otherwise?: FenextjsValidatorClass;
    dataIsCurrent?: boolean;
}

/**
 * Interfaz que define las propiedades del constructor de la clase FenextjsValidatorClass.
 */
export interface FenextjsValidatorClassConstructorProps {
    /**
     * Nombre asociado a la instancia de FenextjsValidatorClass.
     * @type {string | undefined}
     */
    name?: string;
}
/**
 * Clase que proporciona validación de datos en TypeScript/JavaScript.
 * @template T - Tipo de los datos a validar.
 */
export class FenextjsValidatorClass<T = any> {
    /** Propiedad privada que almacena name del validador. */
    private name?: string;
    /** Propiedad privada que almacena la clase superior. */
    private parent?: FenextjsValidatorClass;
    /** Propiedad privada que almacena los datos a validar. */
    private data: T | undefined;

    // Propiedades privadas para definir diferentes reglas de validación.
    // Cada propiedad es un tipo de validación específico.

    /** Bandera que indica si se debe aplicar la validación "isEqual". */
    private equal = false;
    /** Valor con el que se compararán los datos en la validación "isEqual". */
    private equalValue: T[] | undefined = undefined;

    /** Bandera que indica si se debe aplicar la validación "isRequired". */
    private required = false;
    /** Bandera que indica si los datos deben ser un booleano en la validación "isBoolean". */
    private boolean = false;
    /** Bandera que indica si los datos deben ser un número en la validación "isNumber". */
    private number = false;
    /** Bandera que indica si los datos deben ser un email en la validación "onEmail". */
    private email = false;
    /** Bandera que indica si los datos deben ser una cadena en la validación "isString". */
    private string = false;
    /** Bandera que indica si los datos deben ser una cadena en la validación "isLength". */
    private length = false;
    /** Valor que contiene las reglas de validación para cada propiedad del objeto en la validación "isLength". */
    private lengthValue: number | undefined = undefined;
    /** Bandera que indica si los datos deben ser una cadena en la validación "isCompareRef". */
    private compareRef = false;
    /** Valor que contiene key para cada propiedad del objeto en la validación "isCompareRef". */
    private compareRefKey: any = undefined;
    /** Valor que contiene las reglas de validación para cada propiedad del objeto en la validación "isCompareRef". */
    private compareRefValue: any = undefined;

    /** Bandera que indica si los datos deben ser una fecha en la validación "isDate". */
    private date = false;
    /** Bandera que indica si los datos deben ser un objeto en la validación "isObject". */
    private object = false;
    /** Valor que contiene las reglas de validación para cada propiedad del objeto en la validación "isObject". */
    private objectValue:
        | { [id in keyof T]?: FenextjsValidatorClass }
        | undefined = undefined;

    /** Bandera que indica si los datos deben ser una cadena en la validación "isWhen". */
    private when = false;
    /** Value que contiene la validacion de "isWhen" */
    private whenValue: FenextjsValidatorClassIsWhenProps[] | undefined =
        undefined;

    /** Bandera que indica si los datos deben ser un array en la validación "isArray". */
    private array = false;
    /** Valor que contiene las reglas de validación para cada elemento del array en la validación "isArray". */
    private arrayValue: FenextjsValidatorClass | undefined = undefined;

    /** Bandera que indica si los datos deben ser mayor que un valor específico en la validación "isMin". */
    private min = false;
    /** Bandera que indica si los datos deben ser mayor o igual que un valor específico en la validación "isMinOrEqual". */
    private minOrEqual = false;
    /** Valor con el que se compararán los datos en las validaciones "isMin" y "isMinOrEqual". */
    private minValue: number | Date | undefined = undefined;

    /** Bandera que indica si los datos deben ser menor que un valor específico en la validación "isMax". */
    private max = false;
    /** Bandera que indica si los datos deben ser menor o igual que un valor específico en la validación "isMaxOrEqual". */
    private maxOrEqual = false;
    /** Valor con el que se compararán los datos en las validaciones "isMax" y "isMaxOrEqual". */
    private maxValue: number | Date | undefined = undefined;

    /** Bandera que indica si los datos deben ser una cadena que cumpla la regla regex. */
    private regex = false;
    /** Valor que contiene las reglas de validación para cada propiedad del objeto en la validación "isRegex". */
    private regexValue: RegExp | undefined = undefined;
    /** Bandera que indica si los datos deben ser una cadena que cumpla la regla regex. */
    private custom = false;
    /** Valor que contiene las reglas de validación para cada propiedad del objeto en la validación "isRegex". */
    private customValue: ((data: T) => true | ErrorFenextjs) | undefined =
        undefined;

    /** Bandera que indica si los datos deben ser una cadena en la validación "isWhen". */
    private or = false;
    /** Value que contiene la validacion de "isWhen" */
    private orValue: FenextjsValidatorClass[] | undefined = undefined;

    private enum = false;
    /** Valor que contiene las reglas de validación para cada propiedad del objeto en la validación "isEnum". */
    private enumValue: object | undefined = undefined;

    /** Mensaje personalizado para error */
    private messageError: {
        [id in
            | "isEqual"
            | "isRequered"
            | "isBoolean"
            | "isNumber"
            | "isString"
            | "isLength"
            | "isDate"
            | "isObject"
            | "isArray"
            | "isMin"
            | "isMinOrEqual"
            | "isMax"
            | "isMaxOrEqual"
            | "isCompareRef"
            | "isRegex"
            | "isEmail"
            | "isCustom"
            | "isOr"
            | "isEnum"]?: string | undefined;
    } = {};

    /**
     * Constructor de la clase FenextjsValidatorClass.
     * @param {FenextjsValidatorClassConstructorProps} props - Opcional. Propiedades que se pueden pasar al constructor.
     *                                                       Un objeto que contiene las propiedades del constructor.
     *                                                       Por ejemplo, puede contener la propiedad "name".
     * @returns {void}
     */
    constructor(props?: FenextjsValidatorClassConstructorProps) {
        /**
         * Nombre asociado a la instancia de FenextjsValidatorClass.
         * @type {string | undefined}
         */
        this.name = props?.name;
    }

    /**
     * Método para establecer el nombre asociado a la instancia de FenextjsValidatorClass.
     * @param {string} name - El nombre a establecer para la instancia actual de FenextjsValidatorClass.
     * @returns {FenextjsValidatorClass} - La instancia actual de la clase FenextjsValidatorClass, lo que permite el encadenamiento de métodos.
     */
    setName(name: string) {
        /**
         * Nombre asociado a la instancia de FenextjsValidatorClass.
         * @type {string}
         */
        this.name = name;
        return this;
    }

    /**
     * Método privado para obtener el nombre completo de la instancia actual de FenextjsValidatorClass.
     * Si esta instancia tiene un padre, obtiene el nombre completo que incluye el nombre de su padre.
     * Si no tiene un padre, devuelve solo el nombre asociado a esta instancia.
     *
     * @returns {string} - El nombre completo de la instancia actual de FenextjsValidatorClass.
     */
    getName() {
        if (this.parent) {
            return this.parent.getName() + "." + this.name;
        }
        return this.name;
    }

    /**
     * Método para establecer el padre de la instancia actual de FenextjsValidatorClass.
     * El padre es otra instancia de FenextjsValidatorClass que se utiliza como contexto superior.
     *
     * @param {FenextjsValidatorClass} parent - La instancia de FenextjsValidatorClass que se establecerá como padre.
     * @returns {FenextjsValidatorClass} - La instancia actual de la clase FenextjsValidatorClass, lo que permite el encadenamiento de métodos.
     */
    setParent(parent: FenextjsValidatorClass) {
        /**
         * El padre de la instancia actual de FenextjsValidatorClass.
         * @type {FenextjsValidatorClass}
         */
        this.parent = parent;
        return this;
    }

    /**
     * Método para definir la validación "isEqual".
     * Establece la regla de que los datos deben ser iguales al valor especificado.
     * @param d - Valor a comparar con los datos.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isEqual(d: T[] | T, msg?: string) {
        this.equal = true;
        this.equalValue = [d].flat(2) as T[];
        this.messageError.isEqual = msg ?? undefined;
        return this;
    }
    /**
     * Método privado que valida la regla "isEqual".
     * Verifica si los datos son iguales al valor especificado en la regla de validación "isEqual".
     * @throws {ErrorInputInvalid} Si los datos no son iguales al valor especificado.
     * @returns Instancia de FenextjsValidatorClass.
     * @private
     */
    onEqual() {
        // Si la validación "isEqual" no está habilitada, no se hace nada.
        if (!this.equal || !this.equalValue || this.equalValue.length == 0) {
            return;
        }

        // Compara el valor almacenado en equalValue con los datos a validar (data).
        // Si no son iguales, lanza un ErrorInputInvalid para indicar que la validación falló.
        if (!this.equalValue.includes(this.data as T)) {
            this.onError(ErrorCode.INPUT_NOT_EQUAL, this.messageError?.isEqual);
        }

        return this;
    }

    /**
     * Método para habilitar la validación "isRequired".
     * Establece la regla de que los datos deben estar presentes y no ser nulos o indefinidos.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isRequired(msg?: string) {
        this.required = true;
        this.messageError.isRequered = msg;
        return this;
    }
    /**
     * Método privado que valida la regla "isRequired".
     * Verifica si los datos cumplen con la regla de ser requeridos (estar presentes y no ser nulos o indefinidos).
     * @throws {ErrorInputRequired} Si los datos son nulos, indefinidos o una cadena vacía.
     * @private
     */
    onRequired() {
        // Si la validación "isRequired" no está habilitada, no se hace nada.
        if (!this.required) {
            return;
        }
        // Comprueba si los datos son nulos, indefinidos o una cadena vacía.
        // Si se cumple alguna de estas condiciones, lanza un ErrorInputRequired para indicar que la validación falló.
        if (this.data === null || this.data == undefined || this.data === "") {
            this.onError(
                ErrorCode.INPUT_REQUIRED,
                this.messageError?.isRequered,
            );
        }
    }
    /**
     * Método para habilitar la validación "isBoolean".
     * Establece la regla de que los datos deben ser de tipo booleano.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isBoolean(msg?: string) {
        this.boolean = true;
        this.messageError.isBoolean = msg;
        return this;
    }
    /**
     * Método privado que valida la regla "isBoolean".
     * Verifica si los datos cumplen con la regla de ser de tipo booleano.
     * @throws {ErrorInputInvalid} Si los datos no son de tipo booleano.
     * @private
     */
    onBoolean() {
        // Si la validación "isBoolean" no está habilitada, no se hace nada.
        if (!this.boolean) {
            return;
        }
        // Comprueba si los datos no son de tipo booleano.
        // Si no son de tipo booleano, lanza un ErrorInputInvalid para indicar que la validación falló.
        if (typeof this.data !== "boolean") {
            this.onError(ErrorCode.INPUT_INVALID, this.messageError?.isBoolean);
        }
    }
    /**
     * Método para habilitar la validación "isNumber".
     * Establece la regla de que los datos deben ser de tipo número.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isNumber(msg?: string) {
        this.number = true;
        this.messageError.isNumber = msg;
        return this;
    }
    /**
     * Método privado que valida la regla "isNumber".
     * Verifica si los datos cumplen con la regla de ser de tipo número.
     * @throws {ErrorInputInvalid} Si los datos no son de tipo número.
     * @private
     */
    onNumber() {
        // Si la validación "isNumber" no está habilitada, no se hace nada.
        if (!this.number) {
            return;
        }
        // Comprueba si los datos no son de tipo número.
        // Si no son de tipo número, lanza un ErrorInputInvalid para indicar que la validación falló.
        if (typeof this.data !== "number") {
            this.onError(ErrorCode.INPUT_INVALID, this.messageError?.isNumber);
        }
    }
    /**
     * Método para habilitar la validación "isString".
     * Establece la regla de que los datos deben ser de tipo cadena (string).
     * @returns Instancia de FenextjsValidatorClass.
     */
    isString(msg?: string) {
        this.string = true;
        this.messageError.isString = msg;
        return this;
    }
    /**
     * Método privado que valida la regla "isString".
     * Verifica si los datos cumplen con la regla de ser de tipo cadena (string).
     * @throws {ErrorInputInvalid} Si los datos no son de tipo cadena (string).
     * @private
     */
    onString() {
        // Si la validación "isString" no está habilitada, no se hace nada.
        if (!this.string) {
            return;
        }
        // Comprueba si los datos no son de tipo cadena (string).
        // Si no son de tipo cadena (string), lanza un ErrorInputInvalid para indicar que la validación falló.
        if (typeof this.data !== "string") {
            this.onError(ErrorCode.INPUT_INVALID, this.messageError?.isString);
        }
    }
    /**
     * Método para habilitar la validación de longitud.
     * Establece la regla de que los datos deben tener una longitud específica.
     *
     * @param {number} length - La longitud que deben tener los datos para que la validación sea válida.
     * @returns {FenextjsValidatorClass} - La instancia actual de la clase FenextjsValidatorClass, lo que permite el encadenamiento de métodos.
     */
    isLength(length: number, msg?: string) {
        this.length = true;
        this.lengthValue = length;
        this.messageError.isLength = msg;
        return this;
    }
    /**
     * Método privado para validar la longitud de los datos.
     * Si se habilitó la validación de longitud con "isLength()", verifica que los datos cumplan con la longitud requerida.
     * Si no se cumple, lanza una excepción "ErrorInputInvalid" con el código "ErrorCode.INPUT_INVALID".
     *
     * @returns {void}
     * @throws {ErrorInputInvalid} - Si los datos no cumplen con la longitud requerida.
     */
    onLength() {
        if (!this.length || !this.lengthValue) {
            return;
        }

        if (Array.isArray(this.data) || typeof this.data == "string") {
            if (this.data?.length !== this.lengthValue) {
                // Lanza una excepción "ErrorInputInvalid" con el código "ErrorCode.INPUT_INVALID".
                this.onError(
                    ErrorCode.INPUT_LENGTH,
                    this.messageError?.isLength,
                );
            }
        }
    }
    /**
     * Método para habilitar la validación "isDate".
     * Establece la regla de que los datos deben ser de tipo Date (fecha).
     * @returns Instancia de FenextjsValidatorClass.
     */
    isDate(msg?: string) {
        this.date = true;
        this.messageError.isDate = msg;
        return this;
    }
    /**
     * Método privado que valida la regla "isDate".
     * Verifica si los datos cumplen con la regla de ser de tipo Date (fecha).
     * @throws {ErrorInputInvalid} Si los datos no son de tipo Date (fecha).
     * @private
     */
    onDate() {
        // Si la validación "isDate" no está habilitada, no se hace nada.
        if (!this.date) {
            return;
        }
        // Comprueba si los datos no son de tipo Date (fecha).
        // Si no son de tipo Date (fecha), lanza un ErrorInputInvalid para indicar que la validación falló.
        if (!(this.data instanceof Date)) {
            this.onError(ErrorCode.INPUT_INVALID, this.messageError?.isDate);
        }
    }
    /**
     * Método para habilitar la validación "isObject".
     * Establece la regla de que los datos deben ser de tipo objeto.
     * @param obj - Objeto con las reglas de validación para cada propiedad del objeto.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isObject(
        obj: { [id in keyof T]?: FenextjsValidatorClass } | undefined,
        msg?: string,
    ) {
        this.object = true;
        this.objectValue = obj;
        this.messageError.isObject = msg;
        return this;
    }
    /**
     * Método para habilitar obtener la validación "isObject".
     * @returns objectValue
     */
    getObjectValidator():
        | { [id in keyof T]?: FenextjsValidatorClass }
        | undefined {
        return this.object ? this.objectValue : undefined;
    }
    /**
     * Método privado que valida la regla "isObject".
     * Verifica si los datos cumplen con la regla de ser de tipo objeto y aplica las reglas de validación para cada propiedad del objeto.
     * @throws {ErrorInputInvalid} Si los datos no son de tipo objeto o alguna propiedad no cumple con las reglas de validación.
     * @private
     */
    onObject() {
        // Si la validación "isObject" no está habilitada , no se hace nada.
        if (!this.object) {
            return;
        }
        // Comprueba si los datos no son de tipo objeto.
        // Si no son de tipo objeto, lanza un ErrorInputInvalid para indicar que la validación falló.
        if (typeof this.data !== "object") {
            this.onError(ErrorCode.INPUT_INVALID, this.messageError?.isObject);
        }
        // Si la validación "isObject"  no se proporcionaron reglas de validación (objectValue), no se hace nada.
        if (!this.objectValue) {
            return;
        }

        // Obtiene las claves (propiedades) del objeto con las reglas de validación (objectValue).
        const keys = Object.keys(this.objectValue);

        // Itera sobre cada propiedad del objeto y aplica las reglas de validación correspondientes.
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const validator = this.objectValue[key];
            if (!validator.name) {
                validator.setName(key);
            }
            if (validator.compareRef) {
                validator.setCompareRef(this.data?.[validator.compareRefKey]);
            }
            validator.setParent(this);
        }
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const validator = this.objectValue[key];
            const r = validator.onValidate(this.data?.[key]);

            // Si alguna propiedad no cumple con las reglas de validación, se lanza el error devuelto por la validación.
            if (r !== true) {
                throw r;
            }
        }
    }
    /**
     * Método para habilitar la validación "isArray".
     * Establece la regla de que los datos deben ser un array.
     * @param item - Instancia de FenextjsValidatorClass que define las reglas de validación para cada elemento del array.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isArray(
        item: FenextjsValidatorClass | undefined = undefined,
        msg?: string,
    ) {
        this.array = true;
        this.arrayValue = item;
        this.messageError.isArray = msg;
        return this;
    }
    /**
     * Método privado que valida la regla "isArray".
     * Verifica si los datos cumplen con la regla de ser un array y aplica las reglas de validación para cada elemento del array.
     * @throws {ErrorInputInvalid} Si los datos no son un array o alguno de los elementos no cumple con las reglas de validación.
     * @private
     */
    onArray() {
        // Si la validación "isArray" no está habilitada, no se hace nada.
        if (!this.array) {
            return;
        }
        // Comprueba si los datos no son un array.
        // Si no son un array, lanza un ErrorInputInvalid para indicar que la validación falló.
        if (!Array.isArray(this.data)) {
            this.onError(ErrorCode.INPUT_INVALID, this.messageError?.isArray);
            return;
        }
        // Si la validación "isArray" no se proporcionó una regla de validación para los elementos del array (arrayValue), no se hace nada.
        if (!this.arrayValue) {
            return;
        }
        // Itera sobre cada elemento del array y aplica las reglas de validación definidas en arrayValue.
        const validator = this.arrayValue;
        validator.setParent(this);
        for (let i = 0; i < this.data.length; i++) {
            const item = this.data[i];
            validator.setName(`${i}`);
            const r = validator.onValidate(item);

            // Si algún elemento no cumple con las reglas de validación, se lanza el error devuelto por la validación.
            if (r !== true) {
                throw r;
            }
        }
    }

    /**
     * Método public para obtener el valor de validacion de array.
     * @returns {FenextjsValidatorClassIsWhenProps | undefined}
     * @public
     */
    getArrayValue() {
        return this.arrayValue;
    }
    /**
     * Método para habilitar la validación "isMin".
     * Establece la regla de que los datos deben ser mayores que un valor específico.
     * @param min - Valor mínimo que los datos deben superar.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isMin(min: number | Date, msg?: string) {
        this.min = true;
        this.minValue = min;
        this.messageError.isMin = msg;
        return this;
    }
    /**
     * Método para habilitar la validación "isMinOrEqual".
     * Establece la regla de que los datos deben ser mayores o iguales que un valor específico.
     * @param min - Valor mínimo que los datos deben superar o igualar.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isMinOrEqual(min: number | Date, msg?: string) {
        this.minOrEqual = true;
        this.minValue = min;
        this.messageError.isMinOrEqual = msg;
        return this;
    }
    /**
     * Método privado que valida las reglas "isMin" y "isMinOrEqual".
     * Verifica si los datos cumplen con las reglas de ser mayores que un valor mínimo o mayores/iguales al valor mínimo.
     * @throws {ErrorInputInvalid} Si los datos no cumplen con las reglas de validación.
     * @private
     */
    onMin() {
        // Variable para almacenar el valor numérico o longitud (si el objeto es un array o cadena) de los datos.
        let minValidate: number | undefined = undefined;

        // Determina el valor numérico o la longitud según el tipo de dato para realizar la comparación con el valor mínimo (minValue).
        if (Array.isArray(this.data)) {
            minValidate = this.data.length;
        } else if (typeof this.data === "number") {
            minValidate = this.data;
        } else if (typeof this.data === "string") {
            minValidate = this.data.length;
        } else if (this.data instanceof Date) {
            minValidate = this.data.getTime();
        }

        // Obtiene el valor mínimo (minValue) para realizar la comparación.
        let nMinValue = this.minValue;
        if (nMinValue instanceof Date) {
            nMinValue = nMinValue.getTime();
        }

        // Verifica si se habilitó la regla "isMin" y si los datos no superan el valor mínimo (minValue).
        // Si no se cumple, lanza un ErrorInputInvalid para indicar que la validación falló.
        if (
            this.min &&
            !(
                minValidate != undefined &&
                nMinValue != undefined &&
                minValidate > nMinValue
            )
        ) {
            this.onError(
                ErrorCode.INPUT_VALUE_TOO_LOW,
                this.messageError?.isMin,
            );
        }

        // Verifica si se habilitó la regla "isMinOrEqual" y si los datos no superan o igualan el valor mínimo (minValue).
        // Si no se cumple, lanza un ErrorInputInvalid para indicar que la validación falló.
        if (
            this.minOrEqual &&
            !(
                minValidate != undefined &&
                nMinValue != undefined &&
                minValidate >= nMinValue
            )
        ) {
            this.onError(
                ErrorCode.INPUT_VALUE_TOO_LOW,
                this.messageError?.isMinOrEqual,
            );
        }
    }
    /**
     * Método para habilitar la validación "isMax".
     * Establece la regla de que los datos deben ser menores que un valor específico.
     * @param max - Valor máximo que los datos deben ser menores que él.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isMax(max: number | Date, msg?: string) {
        this.max = true;
        this.maxValue = max;
        this.messageError.isMax = msg;
        return this;
    }
    /**
     * Método para habilitar la validación "isMaxOrEqual".
     * Establece la regla de que los datos deben ser menores o iguales que un valor específico.
     * @param max - Valor máximo que los datos deben ser menores o igual que él.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isMaxOrEqual(max: number | Date, msg?: string) {
        this.maxOrEqual = true;
        this.maxValue = max;
        this.messageError.isMaxOrEqual = msg;
        return this;
    }
    /**
     * Método privado que valida las reglas "isMax" y "isMaxOrEqual".
     * Verifica si los datos cumplen con las reglas de ser menores que un valor máximo o menores/iguales al valor máximo.
     * @throws {ErrorInputInvalid} Si los datos no cumplen con las reglas de validación.
     * @private
     */
    onMax() {
        // Variable para almacenar el valor numérico o longitud (si el objeto es un array o cadena) de los datos.
        let maxValidate: number | undefined = undefined;

        // Determina el valor numérico o la longitud según el tipo de dato para realizar la comparación con el valor máximo (maxValue).
        if (Array.isArray(this.data)) {
            maxValidate = this.data.length;
        } else if (typeof this.data === "number") {
            maxValidate = this.data;
        } else if (typeof this.data === "string") {
            maxValidate = this.data.length;
        } else if (this.data instanceof Date) {
            maxValidate = this.data.getTime();
        }

        // Obtiene el valor máximo (maxValue) para realizar la comparación.
        let nMaxValue = this.maxValue;
        if (nMaxValue instanceof Date) {
            nMaxValue = nMaxValue.getTime();
        }

        // Verifica si se habilitó la regla "isMax" y si los datos no son menores que el valor máximo (maxValue).
        // Si no se cumple, lanza un ErrorInputInvalid para indicar que la validación falló.
        if (
            this.max &&
            !(
                maxValidate != undefined &&
                nMaxValue != undefined &&
                maxValidate < nMaxValue
            )
        ) {
            this.onError(
                ErrorCode.INPUT_VALUE_TOO_HIGH,
                this.messageError?.isMax,
            );
        }

        // Verifica si se habilitó la regla "isMaxOrEqual" y si los datos no son menores o iguales al valor máximo (maxValue).
        // Si no se cumple, lanza un ErrorInputInvalid para indicar que la validación falló.
        if (
            this.maxOrEqual &&
            !(
                maxValidate != undefined &&
                nMaxValue != undefined &&
                maxValidate <= nMaxValue
            )
        ) {
            this.onError(
                ErrorCode.INPUT_VALUE_TOO_HIGH,
                this.messageError?.isMaxOrEqual,
            );
        }
    }
    /**
     * Método para habilitar la comparación de valores de referencia.
     * Establece la regla de que los datos deben ser iguales a otro valor de referencia almacenado en la instancia.
     *
     * @param {string} refKey - La clave que identifica el valor de referencia almacenado en la instancia para la comparación.
     * @returns {FenextjsValidatorClass} - La instancia actual de la clase FenextjsValidatorClass, lo que permite el encadenamiento de métodos.
     */
    isCompareRef(refKey: string, msg?: string) {
        this.compareRef = true;
        this.compareRefKey = refKey;
        this.messageError.isCompareRef = msg;
        return this;
    }
    /**
     * Método para obtener la comparación de valores de referencia.
     *
     * @returns {any} - compareRefKey.
     */
    getCompareRef() {
        return this.compareRef ? this.compareRefKey : undefined;
    }
    /**
     * Método privado para establecer el valor de referencia para la comparación.
     * Se utiliza junto con "isCompareRef()" para definir el valor de referencia que se utilizará en la comparación de datos.
     *
     * @param {any} refValue - El valor de referencia que se utilizará en la comparación de datos.
     * @returns {FenextjsValidatorClass} - La instancia actual de la clase FenextjsValidatorClass, lo que permite el encadenamiento de métodos.
     */
    setCompareRef(refValue: any) {
        this.compareRefValue = refValue;
        return this;
    }
    /**
     * Método privado para realizar la comparación de valores de referencia.
     * Si se habilitó la comparación de valores de referencia con "isCompareRef()",
     * verifica que los datos sean iguales al valor de referencia establecido con "setCompareRef()".
     * Si no se cumple, lanza una excepción "ErrorInputInvalid" con el código "ErrorCode.INPUT_INVALID".
     *
     * @returns {void}
     * @throws {ErrorInputInvalid} - Si los datos no son iguales al valor de referencia.
     */
    onCompareRef() {
        if (!this.compareRef) {
            return;
        }

        if (this.compareRefValue !== this.data) {
            // Lanza una excepción "ErrorInputInvalid" con el código "ErrorCode.INPUT_INVALID".
            this.onError(
                ErrorCode.INPUT_NOT_EQUAL,
                this.messageError?.isCompareRef,
            );
        }
    }
    /**
     * Método privado para manejar errores en la validación.
     *
     * @param {ErrorCode} code - Opcional. El código de error que indica el tipo de error ocurrido.
     * @returns {void}
     * @throws {ErrorFenextjs} - Una excepción específica basada en el código de error proporcionado o una excepción general "ErrorFenextjs".
     */
    onError(code?: ErrorCode, message?: string) {
        // Crear un objeto que mapea los códigos de error a las clases de error correspondientes.
        const props: ErrorFenextjsProps<any> = {
            input: this.getName(),
            message,
        };
        const sw: {
            [id in ErrorCode]?: ErrorFenextjs;
        } = {
            INPUT_REQUIRED: new ErrorInputRequired(props),
            INPUT_NOT_EQUAL: new ErrorInputNotEqual({
                ...props,
                equal: this.equalValue,
            }),
            INPUT_INVALID: new ErrorInputInvalid(props),
            INPUT_VALUE_TOO_HIGH: new ErrorInputValueTooHigh({
                ...props,
                max: this.maxValue,
            }),
            INPUT_VALUE_TOO_LOW: new ErrorInputValueTooLow({
                ...props,
                min: this.minValue,
            }),
            INPUT_LENGTH: new ErrorInputLength({
                ...props,
                length: this.lengthValue,
            }),
        };

        // Lanza una excepción específica basada en el código de error proporcionado o una excepción general "ErrorFenextjs".
        throw sw?.[code ?? ErrorCode.ERROR] ?? new ErrorFenextjs(props);
    }
    /**
     * Método para habilitar la validación "isWhen".
     * Establece la regla de que los comparacion cuando sea correcto la validacion.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isWhen(data: FenextjsValidatorClassIsWhenProps) {
        this.when = true;
        this.whenValue ??= [];
        this.whenValue.push(data);
        return this;
    }
    /**
     * Método privado que valida la regla "onWhen".
     * Verifica si los datos cumplen con whenIs y when Key para adicionar la la validacion whenThen.
     * @throws {ErrorInputInvalid} Si los datos no son de tipo Date (fecha).
     * @private
     */
    onWhen() {
        // Si la validación "isWhen" no está habilitada, no se hace nada.
        if (!this.when) {
            return;
        }
        // Si la validación de datos necesarios no existen, no se hace nada.
        if (!this.whenValue) {
            return;
        }
        for (let i = 0; i < this.whenValue.length; i++) {
            const validator = this.whenValue[i];
            let parent: FenextjsValidatorClass | undefined = this.parent;
            if (validator.dataIsCurrent === true) {
                parent = this;
            }
            if (!parent) {
                continue;
            }
            // Si whenIs es corrento ejecuta la validacion
            if (validator.is.onValidate(parent.data[validator.key]) === true) {
                validator.then.setParent(parent);
                validator.then.setName(this.name ?? "");
                const result = validator.then.onValidate(this.data);
                if (result !== true) {
                    throw result;
                }
            } else {
                if (validator.otherwise) {
                    validator.otherwise.setParent(parent);
                    validator.otherwise.setName(this.name ?? "");
                    const result = validator.otherwise.onValidate(this.data);
                    if (result !== true) {
                        throw result;
                    }
                }
            }
        }
    }

    /**
     * Método public para obtener el valor de validacion de when.
     * @returns {FenextjsValidatorClassIsWhenProps[] | undefined}
     * @public
     */
    getWhenValue() {
        return this.whenValue;
    }
    /**
     * Método para habilitar la validación "isRegex".
     * Establece la regla de que los comparacion cuando sea correcto la validacion.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isRegex(data: RegExp, msg?: string) {
        this.regex = true;
        this.regexValue = data;
        this.messageError.isRegex = msg;
        return this;
    }
    /**
     * Método privado que valida la regla "onRegex".
     * Verifica si los datos cumplen con la comparacion con regexValue.
     * @throws {ErrorInputInvalid} Si los datos no cumplen con la compracion.
     * @private
     */
    onRegex() {
        // Si la validación "isRegex" no está habilitada, no se hace nada.
        if (!this.regex) {
            return;
        }
        // Si la validación de datos necesarios no existen, no se hace nada.
        if (!this.regexValue) {
            return;
        }
        // Si la validación de datos sean string.
        if (!(typeof this.data == "string")) {
            this.onError(ErrorCode.INPUT_INVALID, this.messageError?.isRegex);
            return;
        }

        // Si la validación de datos sean cumplan con el regex.
        if (!this.regexValue.test(this.data)) {
            this.onError(ErrorCode.INPUT_INVALID, this.messageError?.isRegex);
            return;
        }
    }
    /**
     * Método para habilitar la validación "isEmail".
     * Establece la regla de que los comparacion cuando sea correcto la validacion.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isEmail(msg?: string) {
        this.email = true;
        this.messageError.isEmail = msg;
        return this;
    }
    /**
     * Método privado que valida la regla "onEmail".
     * Verifica si los datos cumplen con la comparacion con email.
     * @throws {ErrorInputInvalid} Si los datos no cumplen con la compracion.
     * @private
     */
    onEmail() {
        // Si la validación "isEmail" no está habilitada, no se hace nada.
        if (!this.email) {
            return;
        }
        // Si la validación de datos sean string.
        if (!(typeof this.data == "string")) {
            this.onError(ErrorCode.INPUT_INVALID, this.messageError?.isEmail);
            return;
        }
        /*eslint no-useless-escape: "off"*/
        const validateEmail = /^[\w-\.]+@([\w-]+\.)+\w{1,}/g;
        // Si la validación de datos sean cumplan con el email.
        if (!validateEmail.test(this.data)) {
            this.onError(ErrorCode.INPUT_INVALID, this.messageError?.isEmail);
            return;
        }
    }

    /**
     * Método para habilitar la validación "onCustom".
     * Establece la regla de que los comparacion cuando se cumpla una validacion custom.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isCustom(data: (data: T) => true | ErrorFenextjs, msg?: string) {
        this.custom = true;
        this.customValue = data;
        this.messageError.isCustom = msg;
        return this;
    }
    /**
     * Método privado que valida la regla "onCustom".
     * Verifica si los datos cumplen con la comparacion custom.
     * @throws {ErrorInputInvalid} Si los datos no cumplen con la compracion.
     * @private
     */
    onCustom() {
        // Si la validación "isCustom" no está habilitada, no se hace nada.
        if (!this.custom) {
            return;
        }
        if (typeof this.customValue !== "function") {
            return;
        }
        if (this.data == undefined) {
            return;
        }
        const v = this.customValue(this.data);
        if (v != true) {
            this.onError(v.code, this.messageError?.isCustom ?? v.message);
            return;
        }
    }

    /**
     * Método para definir la validación "isOr".
     * Establece la regla de que los datos deben cumplir al menos una validacion.
     * @param d - Comparador para los datos.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isOr(d: FenextjsValidatorClass[], msg?: string) {
        this.or = true;
        this.orValue = d;
        this.messageError.isOr = msg ?? undefined;
        return this;
    }
    /**
     * Método privado que valida la regla "isOr".
     * Verifica si los datos cumplen con almenos una validacion.
     * @throws {ErrorInputInvalid} Si los datos no son iguales al valor especificado.
     * @returns Instancia de FenextjsValidatorClass.
     * @private
     */
    onOr() {
        // Si la validación "isOr" no está habilitada, no se hace nada.
        if (!this.or || !this.orValue || this.orValue.length == 0) {
            return;
        }
        if (this.orValue.some((e) => e.onValidate(this.data) === true)) {
            return this;
        }
        this.onError(ErrorCode.INPUT_INVALID, this.messageError?.isOr);

        return this;
    }

    /**
     * Método para habilitar la validación "isEnum".
     * Establece la regla de que los comparacion cuando sea correcto la validacion.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isEnum(data: object, msg?: string) {
        this.enum = true;
        this.enumValue = data;
        this.messageError.isEnum = msg;
        return this;
    }
    /**
     * Método privado que valida la regla "onEnum".
     * Verifica si los datos cumplen con la comparacion con enumValue.
     * @throws {ErrorInputInvalid} Si los datos no cumplen con la compracion.
     * @private
     */
    onEnum() {
        // Si la validación "isEnum" no está habilitada, no se hace nada.
        if (!this.enum) {
            return;
        }
        // Si la validación de datos necesarios no existen, no se hace nada.
        if (!this.enumValue) {
            return;
        }

        // Si la validación de datos sean cumplan con el regex.
        if (!Object.values(this.enumValue).includes(this.data)) {
            this.onError(ErrorCode.INPUT_INVALID, this.messageError?.isEnum);
            return;
        }
    }

    /**
     * Método para validar los datos proporcionados según las reglas establecidas.
     * Ejecuta todas las reglas de validación habilitadas previamente para los datos.
     * @param d - Datos que se deben validar.
     * @returns True si los datos cumplen con todas las reglas de validación; de lo contrario, devuelve el error que indica la regla de validación que falló.
     */
    onValidate(d: T): ErrorFenextjs | true {
        try {
            // Asigna los datos proporcionados para su validación.
            this.data = d;

            // Ejecuta todas las reglas de validación habilitadas para los datos.
            this.onWhen();
            this.onEqual();
            this.onRequired();
            this.onBoolean();
            this.onNumber();
            this.onString();
            this.onRegex();
            this.onEmail();
            this.onLength();
            this.onDate();
            this.onObject();
            this.onArray();
            this.onMin();
            this.onMax();
            this.onCompareRef();
            this.onCustom();
            this.onOr();
            this.onEnum();

            // Si todas las reglas de validación se cumplen, retorna true para indicar que los datos son válidos.
            return true;
        } catch (error) {
            // Si alguna regla de validación falla, captura el error y lo devuelve para indicar qué regla falló.
            return error as ErrorFenextjs;
        }
    }
}
/**
 * Función para crear una instancia de la clase FenextjsValidatorClass y obtener un validador.
 *
 * @param {FenextjsValidatorClassConstructorProps} props - Opcional. Propiedades que se pueden pasar al constructor de FenextjsValidatorClass.
 *                                                       Un objeto que contiene las propiedades del constructor de la clase FenextjsValidatorClass.
 *                                                       Por ejemplo, puede contener la propiedad "name".
 *
 * @returns {FenextjsValidatorClass} - Una nueva instancia de la clase FenextjsValidatorClass que se utilizará para definir reglas de validación y validar datos.
 */
export const FenextjsValidator = <T = any>(
    props?: FenextjsValidatorClassConstructorProps,
) => new FenextjsValidatorClass<T>(props);


/**
 * Parses a string or number to a formatted number.
 *
 * @param {number|string} n - The number or string to be parsed.
 * @returns {number} A  number.
 */
export const parseNumber = (n: number | string) => {
    let number = 0;
    try {
        number = parseFloat(`${n}`.replace(/[^0-9.-]/g, ""));
        if (Number.isNaN(number)) {
            number = 0;
        }
    } catch (error) {
        number = 0;
    }
    return number;
};


export const parseCountry_to_String = (
    data: CountryProps | undefined | null,
): string | undefined => {
    if (data == undefined || data == null) {
        return undefined;
    }
    try {
        return JSON.stringify(data);
    } catch {
        return `${data}`;
    }
};

export const parseString_to_Country = (
    data: string | undefined | null,
): CountryProps | undefined => {
    if (data == undefined || data == null) {
        return undefined;
    }
    try {
        const country = JSON.parse(`${data ?? ""}`) as CountryProps;

        if (country && country?.id && country?.text && !country?.img) {
            country.img = getRuteCountryImg(country);
        }

        return country;
    } catch {
        return {
            id: -1,
            code: "",
            text: `${data ?? ""}`,
        };
    }
};


export const parseCity_to_String = (
    data: CityProps | undefined | null,
): string | undefined => {
    if (data == undefined || data == null) {
        return undefined;
    }
    try {
        return JSON.stringify(data);
    } catch {
        return `${data}`;
    }
};

export const parseString_to_City = (
    data: string | undefined | null,
): CityProps | undefined => {
    if (data == undefined || data == null) {
        return undefined;
    }
    try {
        return JSON.parse(`${data ?? ""}`);
    } catch {
        return {
            id: -1,
            id_country: -1,
            id_state: -1,
            text: `${data ?? ""}`,
        };
    }
};


const splitLineCsv = (line: string) => {
    line = line.split("\r").join("").split("\n").join("");
    // eslint-disable-next-line no-useless-escape
    const lineSepareString = line.match(/(\")+[\w\W][^\"]+(\")/g);
    const lineSplitString = line
        // eslint-disable-next-line no-useless-escape
        .split(/(\")+[\w\W][^\"]+(\")/g)
        .join("")
        .split(",")
        .map((e) => {
            if (e == '""') {
                let s = lineSepareString?.shift() ?? "";
                if (s[0] == '"') {
                    s = s.substring(1);
                }
                if (s[s.length - 1] == '"') {
                    s = s.slice(0, -1);
                }
                return s;
            }
            return e;
        });

    return lineSplitString;
};

export const parseCsvToJson = (csv: string) => {
    try {
        const array = csv.toString().split("\n");
        const headers = splitLineCsv(array[0]);
        const csvToJsonResult: any[] = [];

        for (let i = 1; i < array.length; i++) {
            const elementArray = splitLineCsv(array[i]);

            const item: any = {};
            for (let j = 0; j < headers.length; j++) {
                if (elementArray[j]?.indexOf("|") > -1) {
                    item[headers[j]] = elementArray[j].split("|");
                } else {
                    item[headers[j]] = elementArray[j];
                }
            }
            csvToJsonResult.push(item);
        }

        env_log(csvToJsonResult, {
            name: "csvToJsonResult",
        });
        return {
            headers,
            data: csvToJsonResult,
        };
    } catch (error) {
        env_log(error, {
            name: "error csvToJson",
        });
        return {};
    }
};


/**
 * Parses a string or number to a formatted number string with commas separating thousands and optional decimal points.
 *
 * @param {number|string} n - The number or string to be parsed.
 * @returns {string} A formatted string representation of the number.
 */
export const parseNumberCount = (
    n: number | string,
    options?: Intl.NumberFormatOptions,
) => {
    const number = parseNumber(n);
    return number.toLocaleString("en-US", options);
};


export const parseState_to_String = (
    data: StateProps | undefined | null,
): string | undefined => {
    if (data == undefined || data == null) {
        return undefined;
    }
    try {
        return JSON.stringify(data);
    } catch {
        return `${data}`;
    }
};

export const parseString_to_State = (
    data: string | undefined | null,
): StateProps | undefined => {
    if (data == undefined || data == null) {
        return undefined;
    }
    try {
        return JSON.parse(`${data ?? ""}`);
    } catch {
        return {
            id: -1,
            id_country: -1,
            text: `${data ?? ""}`,
        };
    }
};


export const parsePhone_to_String = (
    data: Partial<PhoneProps> | undefined | null,
): string => {
    try {
        return JSON.stringify(data);
    } catch {
        return `${data}`;
    }
};

export const parseString_to_Phone = (
    data: string | undefined | null,
): Partial<PhoneProps> => {
    try {
        return JSON.parse(`${data ?? ""}`);
    } catch {
        const num = `${data}`.replace(/[^1-9-+ ]/g, "");
        const n = num.split(/[ -]/g).filter((e) => e != "");
        const number = n?.pop() ?? "";
        const code = n?.join("-");
        return {
            number: number == "" ? undefined : number,
            code: code == "" ? undefined : code,
            tel: num,
        };
    }
};


/**
 * Converts a Date object into a string in the "YYYY-MM-DD" format.
 *
 * @param {Date} date - The Date object to convert.
 * @returns {string} A string representation of the Date object in the "YYYY-MM-DD" format.
 */
export const parseDateYYYYMMDD = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/**
 * The properties used to convert a text into a date.
 *
 * @interface
 * @property {string} text - The text to convert into a date.
 * @property {TypeDate} type - The type of date to create from the text.
 */
export interface parseTextToDateProps {
    text: string;
    type: TypeDate;
}

/**
 * Converts a text into a date according to the specified type.
 *
 * @param {parseTextToDateProps} props - The properties used to convert the text into date.
 * @returns {Date} A date created from the specified text.
 */
export const parseTextToDate = ({ text, type }: parseTextToDateProps) => {
    const date = new Date();

    if (type == "date") {
        const a = text.split("-");
        date.setFullYear(parseInt(a?.[0]));
        date.setMonth(parseInt(a?.[1]) - 1);
        date.setDate(parseInt(a?.[2]));
        return date;
    }
    if (type == "month") {
        const a = text.split("-");

        date.setFullYear(parseInt(a?.[0]));
        date.setMonth(parseInt(a?.[1]) - 1);
        date.setDate(1);
        return date;
    }
    if (type == "week") {
        const a = text.split("-W");
        date.setFullYear(parseInt(a?.[0]));
        date.setMonth(0);
        date.setDate(parseInt(a?.[1]) * 7);
        return date;
    }
    if (type == "time") {
        const a = text.split(":");
        date.setHours(parseInt(a?.[0]));
        date.setMinutes(parseInt(a?.[1]));
        return date;
    }
    return date;
};
/**
 * The properties used to convert a date into a string.
 *
 * @interface
 * @property {Date} [date] - The date to convert into a string. If not provided, the current date will be used.
 * @property {(TypeDate | "YYYY-MM-DD")} type - The type of string to create from the date.
 */
export interface parseDateToTextProps {
    date?: Date;
    type: TypeDate | "YYYY-MM-DD";
}

/**
 * Converts a date into a string based on the given type.
 *
 * @function
 * @param {parseDateToTextProps} - The properties used to convert a date into a string.
 * @returns {string} - The date converted into a string.
 */
export const parseDateToText = ({
    date = new Date(),
    type,
}: parseDateToTextProps) => {
    if (type == "YYYY-MM-DD") {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    if (type == "date") {
        return date.toDateString();
    }
    if (type == "month") {
        return getMonthValue(date);
    }
    if (type == "week") {
        const tf: any = new Date(date);
        const ti: any = new Date(tf.getFullYear(), 0, 0);
        const diff = tf - ti;
        const oneDay = 1000 * 60 * 60 * 24;
        const d = Math.floor(diff / oneDay);
        const w = d / 7;
        return `${date.getFullYear()}-W${w}`;
    }
    if (type == "time") {
        return getTimeValue(date);
    }
    return "";
};
/**
 * Gets the month value in "yyyy-mm" format from a given date.
 * @param {Date} date - The date from which to get the month value.
 * @returns {string} - The month value in "yyyy-mm" format.
 */
export const getMonthValue = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
};

/**
 * Gets the week value in "yyyy-Www" format from a given date.
 * @param {Date} date - The date from which to get the week value.
 * @returns {string} - The week value in "yyyy-Www" format.
 */
export const getWeekValue = (date: Date) => {
    const year = date.getFullYear();
    const week = getISOWeek(date);
    return `${year}-W${week}`;
};

/**
 * Gets the ISO week number for a given date.
 * @param {Date} date - The date for which to get the ISO week number.
 * @returns {number} - The ISO week number corresponding to the given date.
 */
export const getISOWeek = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
        (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

/**
 * Gets the time value in "hh:mm" format from a given date.
 * @param {Date} date - The date from which to get the time value.
 * @returns {string} - The time value in "hh:mm" format.
 */
export const getTimeValue = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
};

/**
 * Interface specifying optional properties for configuring the output of the getTimeToText function.
 */
export interface getTimeToTextProps {
    /**
     * Include the day component in the output. Defaults to true.
     */
    days?: boolean;

    /**
     * Include the hour component in the output. Defaults to true.
     */
    hours?: boolean;

    /**
     * Include the minute component in the output. Defaults to true.
     */
    minutes?: boolean;

    /**
     * Include the second component in the output. Defaults to true.
     */
    seconds?: boolean;
}
/**
 * Converts a given date into a string representation of time in "hh:mm:ss" format.
 * @param {Date} date - The date object to extract the time from.
 * @param {getTimeToTextProps} options - An optional object specifying which time components to include.
 * @returns {string} - The formatted time string in "hh:mm:ss" format.
 */
export const getTimeToText = (
    date: Date,
    options?: getTimeToTextProps,
): string => {
    /**
     * Helper function to pad a number with leading zeros if needed.
     * @param {number} n - The number to be padded.
     * @returns {string} - The padded number as a string.
     */
    const padNumber = (n: number): string => String(n).padStart(2, "0");

    // An array to store the individual components of the time string
    const timeComponents: string[] = [];

    // Include day component in the time string if 'days' option is not explicitly set to false
    if (options?.days !== false) {
        timeComponents.push(`${padNumber(date.getDate())}`);
    }

    // Include hour component in the time string if 'hours' option is not explicitly set to false
    if (options?.hours !== false) {
        timeComponents.push(`${padNumber(date.getHours())}`);
    }

    // Include minute component in the time string if 'minutes' option is not explicitly set to false
    if (options?.minutes !== false) {
        timeComponents.push(`${padNumber(date.getMinutes())}`);
    }

    // Include second component in the time string if 'seconds' option is not explicitly set to false
    if (options?.seconds !== false) {
        timeComponents.push(`${padNumber(date.getSeconds())}`);
    }

    // Join the time components using ":" as a separator and return the formatted time string
    return timeComponents.join(":");
};

export interface parseDateTimeFormatOptions {
    localeMatcher?: "best fit" | "lookup" | undefined;
    weekday?: "long" | "short" | "narrow" | undefined;
    era?: "long" | "short" | "narrow" | undefined;
    year?: "numeric" | "2-digit" | undefined;
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;
    day?: "numeric" | "2-digit" | undefined;
    hour?: "numeric" | "2-digit" | undefined;
    minute?: "numeric" | "2-digit" | undefined;
    second?: "numeric" | "2-digit" | undefined;
    timeZoneName?:
        | "short"
        | "long"
        | "shortOffset"
        | "longOffset"
        | "shortGeneric"
        | "longGeneric"
        | undefined;
    formatMatcher?: "best fit" | "basic" | undefined;
    hour12?: boolean | undefined;
    timeZone?: string | undefined;

    locales?: string | string[] | undefined;
}

/**
 * Gets the time value in custom formated
 * @param {Date} date - The date from which to get the time value.
 * @param {parseDateTimeFormatOptions} options - The Options for formated
 * @returns {string} - The time value in "hh:mm" format.
 */
export const parseDateTimeFormat = (
    date: Date,
    options: parseDateTimeFormatOptions,
): string => {
    const formatter = new Intl.DateTimeFormat(options?.locales, options);
    return formatter.format(date);
};


/**
 * Converts a number or string to a money format (e.g. "$1,000.00").
 *
 * @param {number | string} n - The number or string to format as money.
 * @returns {string} The money formatted string.
 */
export const parseMoney = (
    n: number | string,
    options?: Intl.NumberFormatOptions,
) => {
    return `$${parseNumberCount(n, options)}`;
};


export const parseAddress_to_String = (
    data: AddressGoogle | undefined | null,
): string => {
    try {
        return JSON.stringify(data);
    } catch {
        return `${data}`;
    }
};

export const parseString_to_Address = (
    data: string | undefined | null,
): AddressGoogle => {
    try {
        return JSON.parse(`${data ?? ""}`);
    } catch {
        return {
            formatted_address: `${data ?? ""}`,
        };
    }
};


export const parseBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};


export type parseEnum_to_V_SW<T extends string, V = string> = {
    [id in T]: V;
};

export interface parseEnum_to_V_Options<V = string> {
    valueNull?: V;
}

export const parseEnum_to_V =
    <T extends string, V = string>(
        sw: parseEnum_to_V_SW<T, V>,
        options?: parseEnum_to_V_Options<V>,
    ) =>
    (type?: T | null | undefined): V | "" => {
        return type ? sw[type] : options?.valueNull ?? "";
    };

export type parseEnum_to_String_SW<T extends string> = parseEnum_to_V_SW<
    T,
    string
>;

export type parseEnum_to_String_Options = parseEnum_to_V_SW<string>;

export const parseEnum_to_String =
    <T extends string>(
        sw: parseEnum_to_String_SW<T>,
        options?: parseEnum_to_String_Options,
    ) =>
    (type?: T | null | undefined): string => {
        return type ? sw[type] : options?.valueNull ?? "";
    };


export const parseCSC_to_CSCString = (
    data: CSCProps | undefined | null,
): CSCStringProps | undefined => {
    if (data == undefined || data == null) {
        return undefined;
    }
    try {
        return {
            country: parseCountry_to_String(data?.country),
            state: parseState_to_String(data?.state),
            city: parseCity_to_String(data?.city),
        };
    } catch {
        return {};
    }
};

export const parseCSCString_to_CSC = (
    data: CSCStringProps | undefined | null,
): CSCProps | undefined => {
    if (data == undefined || data == null) {
        return undefined;
    }
    try {
        return {
            country: parseString_to_Country(data?.country),
            state: parseString_to_State(data?.state),
            city: parseString_to_City(data?.city),
        };
    } catch {
        return {};
    }
};




export interface parseBase64ToImgDataProps {
    name?: string;
    base64: string;
    quality?: number;
}

export const parseBase64ToImgData = async ({
    base64,
    name,
    quality,
}: parseBase64ToImgDataProps) => {
    const srcImg = await Promise.all([
        parseImgBase64Scale({ base64, width: 1920, quality }),
        parseImgBase64Scale({ base64, width: 1680, quality }),
        parseImgBase64Scale({ base64, width: 1440, quality }),
        parseImgBase64Scale({ base64, width: 1024, quality }),
        parseImgBase64Scale({ base64, width: 992, quality }),
        parseImgBase64Scale({ base64, width: 768, quality }),
        parseImgBase64Scale({ base64, width: 575, quality }),
        parseImgBase64Scale({ base64, width: 200, height: 200, quality }),
        parseImgBase64Scale({ base64, width: 100, height: 100, quality }),
    ]);

    const Img: ImgDataProps = {
        src: base64,
        name,
        srcMin1920: srcImg[0],
        srcMin1680: srcImg[1],
        srcMin1440: srcImg[2],
        srcMin1024: srcImg[3],
        srcMin992: srcImg[4],
        srcMin768: srcImg[5],
        srcMin575: srcImg[6],
        srcThumbnail_200: srcImg[7],
        srcThumbnail_100: srcImg[8],
    };
    return Img;
};


export interface parseImgBase64ScaleProps {
    base64: string;
    width: number;
    height?: number | "auto";
    quality?: number;
}

export const parseImgBase64Scale = async ({
    base64,
    width,
    height = "auto",
    quality = 1,
}: parseImgBase64ScaleProps) => {
    try {
        const image = await createImageBitmap(
            await fetch(base64).then((response) => response.blob()),
        );
        const scaleFactor = width / image.width;
        const newHeight =
            height == "auto" ? image.height * scaleFactor : height;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = newHeight;

        const context = canvas.getContext("2d");

        if (context) {
            context.drawImage(image, 0, 0, width, newHeight);

            const compressedBase64 = canvas.toDataURL("image/jpeg", quality);

            return compressedBase64;
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
};


/**
 * This function takes in a file and options and returns a promise that resolves with the file contents
 * @param {any} file - The file to be parsed
 * @param {Object} options - The options for parsing the file
 * @param {boolean} options.fileText - Whether or not to read the file as text (defaults to false)
 * @param {function} options.updateProgress - A callback function for updating the progress of reading the file
 * @returns {Promise} - A promise that resolves with the file contents
 */
export const parseFile = (
    file: any,
    {
        updateProgress,
        fileText = false,
    }: {
        fileText?: boolean;
        updateProgress: (progress: number) => void;
    },
) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("progress", (e: ProgressEvent<FileReader>) => {
            updateProgress((100 * e.loaded) / e.total);
        });
        reader.addEventListener(
            "load",
            () => {
                env_log(reader.result, {
                    name: "reader.result",
                });
                resolve(reader.result);
            },
            false,
        );
        reader.onerror = (error) => {
            env_log(error, {
                name: "error upload file",
            });
            reject(error);
        };
        env_log(file, {
            name: "file",
        });
        if (fileText) {
            reader.readAsText(file);
        } else {
            reader.readAsDataURL(file);
        }
    });


export type Unit_All = Unit_Distance | Unit_Volumen | Unit_Weight;

export const parseUnitToText = (unit: Unit_All): string => {
    const sw: {
        [id in Unit_All]: string;
    } = {
        CC: "cc",
        CM: "cm",
        CM3: "cm³",
        FT: "pie",
        FT3: "pie³",
        G: "g",
        GAL: "galon",
        IN: "pul",
        IN3: "pul³",
        KG: "kg",
        L: "l",
        LB: "lib",
        M: "m",
        M3: "m³",
        ML: "ml",
        MM: "mm",
        OZ: "onz",
    };
    return sw[unit];
};


export const generateRandomID = () => {
    return new Date().getTime() + "" + Math.random();
};


export const GetCardType = (n: number | string): Card_Enum => {
    const number = `${n}`;

    // visa
    let re = new RegExp("^4");
    if (number.match(re) != null) return Card_Enum.VISA;

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (
        /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
            number,
        )
    )
        return Card_Enum.MASTERCARD;

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null) return Card_Enum.AMEX;

    // Discover
    re = new RegExp(
        "^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)",
    );
    if (number.match(re) != null) return Card_Enum.DISCOVER;

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null) return Card_Enum.DINERS;

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null) return Card_Enum.DINERS_CARTE_BLANCHE;

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null) return Card_Enum.JCB;

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null) return Card_Enum.VISA_ELECTRON;

    return Card_Enum.OTHER;
};


export const CONFIG = {
    EMPY: process.env["NEXT_PUBLIC_EMPY"] == "TRUE",
    MODATA: process.env["NEXT_PUBLIC_MODATA"] == "TRUE",
    LOG: process.env["NEXT_PUBLIC_LOG"] == "TRUE",
};



export interface getBase64ForImageDonwloadProps {
    url: string;
}

export const getBase64ForImageDonwload = async ({
    url,
}: getBase64ForImageDonwloadProps) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const result = new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function () {
            resolve(`${this.result ?? ""}`);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(blob);
    });
    return await result;
};


/**
 * Prints a log message to the console if the environment variable
 * `NEXT_PUBLIC_LOG` is equal to "TRUE".
 *
 * @param {any} data - The log message to print.
 * @param {Object} options - The logging options.
 * @param {string} [options.name] - The name of the log message.
 * @param {string} [options.color="white"] - The color of the log message.
 */

export const env_log = (
    data: any,
    options?: {
        name?: string;
        color?: string;
    },
) => {
    if (CONFIG.LOG) {
        console.log(
            `%c [${options?.name?.toLocaleUpperCase()}]`,
            `color:${options?.color ?? "white"};`,
            data,
        );
    }
};



export const GetSpaceParent = (element: HTMLElement) => {
    const selectRect = element.getBoundingClientRect();
    let parentHidden = element.parentElement;

    while (
        parentHidden &&
        getComputedStyle(parentHidden).overflow != "hidden" &&
        getComputedStyle(parentHidden).overflow != "scroll" &&
        getComputedStyle(parentHidden).overflow != "auto" &&
        parentHidden.tagName != "BODY"
    ) {
        parentHidden = parentHidden.parentElement;
    }
    if (!parentHidden) {
        return {
            spaceTop: 0,
            spaceLeft: 0,
            spaceRight: 0,
            spaceBottom: 0,
        };
    }

    const containerRect = parentHidden.getBoundingClientRect();
    const spaceTop = selectRect.top - containerRect.top;
    const spaceLeft = selectRect.left - containerRect.left;
    const spaceRight = containerRect.right - selectRect.right;
    const spaceBottom = containerRect.bottom - selectRect.bottom;
    return {
        spaceTop,
        spaceLeft,
        spaceRight,
        spaceBottom,
    };
};


export const stringifyCircular = (obj: object) => {
    let cache: any = [];
    const str = JSON.stringify(obj, function (key, value) {
        key;
        if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return;
            }
            cache.push(value);
        }
        return value;
    });
    cache = null;
    return str;
};


export const sleep = async (time = 1000) => {
    await new Promise((r) => setTimeout(r, time));
};


export const _tValidate = (d: any, _t?: _TFunciton) => {
    if (typeof d == "string" && _t) {
        return _t?.(d);
    }
    return d;
};


export interface FenextFirebaseConstructorProps {
    config: FenextFirebaseConfigProps;
}
export class FenextFirebase {
    private config: FenextFirebaseConfigProps;
    private app: firebase.app.App;

    public database: FenextFirebaseDataBase;

    public storega: FenextFirebaseStorage;

    constructor({ config }: FenextFirebaseConstructorProps) {
        this.config = config;
        this.app = this.getApp();

        this.database = new FenextFirebaseDataBase({ app: this.app, config });

        this.storega = new FenextFirebaseStorage({ app: this.app, config });
    }

    private getConfig() {
        return this.config;
    }

    private getApp() {
        return !firebase?.apps?.length
            ? firebase.initializeApp(this.getConfig())
            : firebase.app();
    }
}


export interface onGetBase64Props {
    dataType?: string;
}

export interface FenextFirebaseConfigProps {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    storageUrl: string;
    databaseUrl: string;
}


export interface FenextFirebaseStorageConstructorProps {
    app: firebase.app.App;
    config: FenextFirebaseConfigProps;
}
export class FenextFirebaseStorage {
    private config: FenextFirebaseConfigProps;
    private app: firebase.app.App;

    private storega: FirebaseStorage;
    private ref?: StorageReference;

    constructor({ config, app }: FenextFirebaseStorageConstructorProps) {
        this.config = config;
        this.app = app;
        this.storega = this.getStorage();
    }

    private getStorage() {
        return getStorage(this.app, this.config.storageUrl);
    }

    public Ref(path: string) {
        this.ref = refStorage(this.storega, path);
        return this;
    }

    public async onUploadBase64(base64: string) {
        try {
            if (!this.ref) {
                throw new Error("Not Load Ref");
            }
            const snapshot = await uploadString(this.ref, base64, "data_url");

            const url = await getDownloadURL(snapshot.ref);

            return url;
        } catch (error) {
            return error;
        }
    }
    public async onDelete() {
        try {
            if (!this.ref) {
                throw new Error("Not Load Ref");
            }
            const snapshot = await deleteObject(this.ref);

            return snapshot;
        } catch (error) {
            return error;
        }
    }
    public async onGetBase64(props?: onGetBase64Props) {
        const options: onGetBase64Props = {
            dataType: `data:image/png;base64,`,
            ...props,
        };
        try {
            if (!this.ref) {
                throw new Error("Not Load Ref");
            }
            const result = await getBytes(this.ref);

            const base64 = options.dataType + parseBufferToBase64(result);

            return base64;
        } catch (error) {
            return error;
        }
    }
    public async onGetUrl() {
        try {
            if (!this.ref) {
                throw new Error("Not Load Ref");
            }

            const url = await getDownloadURL(this.ref);

            return url;
        } catch (error) {
            return error;
        }
    }
}


export interface FenextFirebaseDataBaseConstructorProps {
    app: firebase.app.App;
    config: FenextFirebaseConfigProps;
}
export class FenextFirebaseDataBase {
    private config: FenextFirebaseConfigProps;
    private app: firebase.app.App;

    private database: Database;
    private ref?: DatabaseReference;

    constructor({ app, config }: FenextFirebaseDataBaseConstructorProps) {
        this.config = config;
        this.app = app;
        this.database = this.getDatabase();
    }
    private getDatabase() {
        return getDatabase(this.app, this.config.databaseUrl);
    }

    public Ref(path: string) {
        this.ref = refDatabase(this.database, path);
        return this;
    }
    public async onGet(query?: string) {
        try {
            if (!this.ref) {
                throw new Error("Not Load Ref");
            }

            const data = await get(child(this.ref, query ?? "/"));

            return await data.val();
        } catch (error) {
            return error;
        }
    }
    public async onSet(value: any) {
        try {
            if (!this.ref) {
                throw new Error("Not Load Ref");
            }

            const data = await set(this.ref, value);

            return data;
        } catch (error) {
            return error;
        }
    }
}


export interface FenextjsDateFormatOptions extends Intl.DateTimeFormatOptions {
    locales?: string | string[] | undefined;
}
export type FenextjsDateFormats = {
    [id: string]: FenextjsDateFormatOptions;
};
export interface FenextjsDateProps {
    defaultDate?: Date;
    formats?: FenextjsDateFormats;
    onCallback?: (date: Date) => void;
}

export type FenextjsDateValue = Date | number | string;

export type FenextjsDateConstructor = FenextjsDateValue | FenextjsDateProps;

export const FenextjsDateCompare = [
    "Date",
    "FullYear",
    "Hours",
    "Milliseconds",
    "Minutes",
    "Month",
    "Seconds",
] as const;

export type FenextjsDateCompareType = (typeof FenextjsDateCompare)[number];

export const FenextjsDateCompareSymbol = [
    "==",
    "!=",
    ">",
    ">=",
    "<",
    "<=",
] as const;
export type FenextjsDateCompareSymbolType =
    (typeof FenextjsDateCompareSymbol)[number];

export class FenextjsDate {
    public date: Date;
    private formats: FenextjsDateFormats = {};
    private onCallback: undefined | ((date: Date) => void) = undefined;
    private DateByMonth: Date[] = [];
    private DateByCalendar: Date[] = [];

    constructor(options?: FenextjsDateConstructor) {
        const isDate =
            options instanceof Date ||
            typeof options == "number" ||
            typeof options == "string";
        let date: Date | undefined = undefined;
        if (isDate) {
            date = new Date(options ?? new Date());
        } else {
            date = options?.defaultDate ?? new Date();
        }
        this.date = date;
        if (!isDate) {
            this.formats = options?.formats ?? {};
            this.onCallback = options?.onCallback;
        }
    }

    setOnCallback(callback: (date: Date) => void) {
        this.onCallback = callback;
    }

    addTime(time: number) {
        this.date.setTime(this.date.getTime() + time);
        this.onCallback?.(this.date);
    }
    addMilliseconds(milliseconds: number) {
        this.date.setMilliseconds(this.date.getMilliseconds() + milliseconds);
        this.onCallback?.(this.date);
    }
    addSeconds(seconds: number) {
        this.date.setSeconds(this.date.getSeconds() + seconds);
        this.onCallback?.(this.date);
    }
    addMinutes(minutes: number) {
        this.date.setMinutes(this.date.getMinutes() + minutes);
        this.onCallback?.(this.date);
    }
    addHours(hours: number) {
        this.date.setHours(this.date.getHours() + hours);
        this.onCallback?.(this.date);
    }
    addDate(date: number) {
        this.date.setDate(this.date.getDate() + date);
        this.onCallback?.(this.date);
    }
    addMonth(month: number) {
        this.date.setMonth(this.date.getMonth() + month);
        this.onCallback?.(this.date);
    }
    addYear(year: number) {
        this.date.setFullYear(this.date.getFullYear() + year);
        this.onCallback?.(this.date);
    }

    onFormat(options: FenextjsDateFormatOptions, date?: FenextjsDateValue) {
        const formatter = new Intl.DateTimeFormat(options?.locales, options);
        return formatter.format(new Date(date ?? this.date));
    }
    onFormatId(id: string, date?: FenextjsDateValue) {
        return this.onFormat(this.formats?.[id] ?? {}, date ?? this.date);
    }

    getDateByMonth() {
        return this.DateByMonth;
    }
    setDateByMonth(DateByMonth: Date[]) {
        this.DateByMonth = DateByMonth;
    }
    onGenerateDateByMonth(date?: FenextjsDateValue) {
        const DATE = new Date(date ?? this.date.getTime());
        DATE.setDate(1);
        const MONTH = DATE.getMonth();
        const DateByMonth: Date[] = [];
        while (DATE.getMonth() == MONTH) {
            DateByMonth.push(new Date(DATE.getTime()));
            DATE.setDate(DATE.getDate() + 1);
        }
        this.DateByMonth = DateByMonth;
        return DateByMonth;
    }
    getDateByCalendar() {
        return this.DateByCalendar;
    }
    setDateByCalendar(DateByCalendar: Date[]) {
        this.DateByCalendar = DateByCalendar;
    }
    onGenerateDateByCalendar(date?: FenextjsDateValue) {
        const D = new Date(date ?? this.date);

        const DATE = new Date(D.getTime());
        DATE.setDate(1);
        while (DATE.getDay() != 0) {
            DATE.setDate(DATE.getDate() - 1);
        }

        const DATEMAX = new Date(D.getTime());
        DATEMAX.setMonth(DATEMAX.getMonth() + 1);
        DATEMAX.setDate(1);
        while (DATEMAX.getDay() != 6) {
            DATEMAX.setDate(DATEMAX.getDate() + 1);
        }

        const DateByCalendar: Date[] = [];
        while (DATE.getTime() != DATEMAX.getTime()) {
            DateByCalendar.push(new Date(DATE.getTime()));
            DATE.setDate(DATE.getDate() + 1);
        }
        const n = 7 - (DateByCalendar.length % 7);
        for (let i = 0; i < n; i++) {
            DateByCalendar.push(new Date(DATE.getTime()));
            DATE.setDate(DATE.getDate() + 1);
        }
        this.DateByCalendar = DateByCalendar;
        return DateByCalendar;
    }
    onValidateMinMax({
        date,
        max,
        min,
    }: {
        min?: Date;
        max?: Date;
        date?: Date;
    }) {
        const d = date ?? this.date;
        let sw = true;
        if (min) {
            sw &&= min <= d;
        }
        if (max) {
            sw &&= max >= d;
        }
        return sw;
    }
    onCompareDate({
        date,
        dateCompare: dateCompareProps,
        compare,
    }: {
        date?: Date;
        dateCompare: Date;
        compare: {
            [id in FenextjsDateCompareType]?: boolean;
        };
    }) {
        const d = new Date(date ?? this.date);
        const dateCompare = new Date(dateCompareProps);

        const compareValue: {
            [id in FenextjsDateCompareSymbolType]: boolean;
        } = {
            "!=": true,
            "<": true,
            "<=": true,
            "==": true,
            ">": true,
            ">=": true,
        };

        FenextjsDateCompare.forEach((e) => {
            const compareKey = e as FenextjsDateCompareType;
            if (compare[compareKey] !== true) {
                const f = `set${compareKey}`;

                d[f](0);
                dateCompare[f](0);
            }
        });

        FenextjsDateCompareSymbol.forEach((b) => {
            const compareKeySymbol = b as FenextjsDateCompareSymbolType;
            compareValue[compareKeySymbol] = eval(
                `${d.getTime()} ${compareKeySymbol} ${dateCompare.getTime()}`,
            );
        });
        return compareValue;
    }
}


export interface useJsonStringProps<T = any, P = string> {
    /**
     * Default Value =
     */
    defaultValue?: T;
    /**
     * Value
     */
    value?: T;
    /**
     * onChange
     */
    onChange?: (data: T) => void;

    /**
     * Default Value
     */
    defaultValueJsonString?: P;
    /**
     * Value
     */
    valueJsonString?: P;
    /**
     * onChange
     */
    onChangeJsonString?: (data: P | undefined) => void;
    /**
     * parse
     */
    parseString_to_Json?: (data: P) => T | undefined;
    /**
     * parse
     */
    parseJson_to_String?: (data: T) => P | undefined;
}

export const useJsonString = <T = any, P = string>({
    defaultValueJsonString,
    onChangeJsonString,
    parseJson_to_String,
    parseString_to_Json,
    valueJsonString,
    defaultValue,
    onChange,
    value,
}: useJsonStringProps<T, P>) => {
    return useMemo(() => {
        return {
            value:
                (valueJsonString && parseString_to_Json
                    ? parseString_to_Json(valueJsonString)
                    : value) ?? value,
            defaultValue:
                (defaultValueJsonString && parseString_to_Json
                    ? parseString_to_Json(defaultValueJsonString)
                    : defaultValue) ?? defaultValue,
            onChange: (e: T) => {
                onChange?.(e);
                if (parseJson_to_String) {
                    onChangeJsonString?.(parseJson_to_String(e));
                }
            },
        };
    }, [
        defaultValueJsonString,
        onChangeJsonString,
        parseJson_to_String,
        parseString_to_Json,
        valueJsonString,
        defaultValue,
        onChange,
        value,
    ]);
};


export interface useDataValidatorProps<T> {
    data: T;
    validator?: FenextjsValidatorClass<T>;
    autoOnValidate?: boolean;
}

export const useDataValidator = <T,>({
    data,
    validator,
    autoOnValidate = true,
}: useDataValidatorProps<T>) => {
    const [isValidData, setIsValidData] = useState<
        true | ErrorFenextjs | undefined
    >(undefined);
    const onValidateData = () => {
        const v = validator?.onValidate?.(data) ?? true;
        setIsValidData(v);
    };
    useEffect(() => {
        if (autoOnValidate) {
            onValidateData();
        }
    }, [data, validator]);

    return {
        isValidData,
        onValidateData,
    };
};


export interface useActionProps<T = any> {
    name: string;
    onActionExecute?: (d?: T) => void;
    env_log?: {
        onActionExecute?: boolean;
        onAction?: boolean;
    };
}

export const useAction = <T = any,>({
    name,
    onActionExecute,
    env_log: env_log_boolean,
}: useActionProps<T>) => {
    const NAME_ACTION = `fenext-action-element-${name}`;
    // const actionRef = useRef(onActionExecute);

    const ACTION = (e: any) => {
        const data = (e as any)?.detail;
        if (env_log_boolean?.onActionExecute === true) {
            env_log(data, {
                name: `${NAME_ACTION}-onActionExecute`,
            });
        }
        onActionExecute?.(data);
    };

    const onUnload = () => {
        if (!(window && typeof window != "undefined")) {
            return;
        }
        window.removeEventListener(NAME_ACTION, ACTION);
    };

    const onLoad = () => {
        if (!(window && typeof window != "undefined")) {
            setTimeout(onLoad, 500);
            return;
        }
        if (onActionExecute) {
            window.addEventListener(NAME_ACTION, ACTION);
        }
        return onUnload;
    };

    useEffect(onLoad, [onActionExecute]);

    const onAction = (detail?: T) => {
        if (env_log_boolean?.onAction === true) {
            env_log(detail, {
                name: `${NAME_ACTION}-onAction`,
            });
        }
        window.dispatchEvent(
            new CustomEvent(NAME_ACTION, {
                bubbles: true,
                detail,
            }),
        );
    };

    return {
        onAction,
    };
};


/**
 * Interface to describe the properties of the useValidator hook.
 * @template T - The type of the data to manage.
 */
export interface useValidatorProps<T> {
    data: T; // The data to validate.
    validator?: FenextjsValidatorClass<T>; // The validator instance to use for validation.
}

/**
 * A custom hook to manage data state and changes.
 *
 * @template T - The type of the data to manage.
 * @param {useValidatorProps<T>} options - The options for the hook.
 * @param {T} options.data - The data to validate.
 * @param {FenextjsValidatorClass<T>} options.validator - The validator instance to use for validation.
 * @returns {Object} - An object with the validation results and original data.
 * @returns {Object.error} -  ErrorFenextjs | true
 * @returns {Object.isValid} - boolean
 * @returns {Object.data} -  T
 * @returns {Object.validator} -  FenextjsValidatorClass<T>
 */
export const useValidator = <T,>({ data, validator }: useValidatorProps<T>) => {
    /**
     * The result of the validation.
     * @type {undefined | ErrorFenextjs}
     */
    const result: ErrorFenextjs | true | undefined = useMemo<
        ErrorFenextjs | true | undefined
    >(
        () => (validator ? validator.onValidate(data) : undefined),
        [data, validator],
    );

    /**
     * The error message if validation fails.
     * @type {undefined | ErrorFenextjs}
     */
    const error: undefined | ErrorFenextjs =
        result !== true ? result : undefined;

    /**
     * A boolean indicating if the validation is successful.
     * @type {boolean}
     */
    const isValid: boolean = result === true;

    // Return the validation results and the original data
    return {
        error,
        isValid,
        data,
        validator,
    };
};


export interface useFormProps<T, M = any> extends useDataOptions<T, M> {
    onSubmit?: RequestProps<T, RequestResultProps>;
    defaultValue?: T;
    setData?: (data: T) => void;
    onChangeError?: (error: ErrorFenextjs | undefined) => void;
    onChangeDisabled?: (disabled: boolean) => void;
    onChangeLoader?: (loader: boolean) => void;
    validator?: FenextjsValidatorClass<T>;
}

export const useForm = <T, M = any>({
    defaultValue,
    onChangeDisabled,
    onChangeLoader,
    onSubmit,
    validator,
    onChangeError,

    ...Options
}: useFormProps<T, M>) => {
    const DATA = useData<T, M>(defaultValue as T, Options);

    const { data: loader, setData: setLoader } = useData<boolean>(false, {
        onChangeDataAfter: onChangeLoader,
    });
    const { data: disabled, setData: setDisabled } = useData<boolean>(true, {
        onChangeDataAfter: onChangeDisabled,
    });

    const { data: error, setData: setError } = useData<
        ErrorFenextjs | undefined
    >(undefined, {
        onChangeDataAfter: onChangeError,
    });

    const onSubmitData = useCallback(async () => {
        setLoader(true);
        try {
            return await onSubmit?.(DATA.data);
        } finally {
            setLoader(false);
        }
    }, [DATA.data, onSubmit]);

    const onValidate = useCallback(() => {
        if (validator) {
            const r = validator?.onValidate?.(DATA.data);
            setDisabled(r !== true);
            setError(r !== true ? r : undefined);
        }
    }, [DATA.data, validator]);

    useEffect(() => {
        onValidate();
    }, [DATA.data, validator]);

    return {
        ...DATA,
        error,
        disabled,
        loader,
        setDisabled,
        setLoader,
        setError,
        onSubmit: onSubmitData,
    };
};


export interface usePrintDataProps
    extends Pick<useLocalStorageProps, "parse"> {}

export const usePrintData = <T,>({ parse }: usePrintDataProps) => {
    const { value, load } = useLocalStorage<T>({
        name: "fenext-print",
        parse,
    });
    return {
        data: value,
        load,
    };
};

export interface usePrintIframeProps<T> {
    urlBase?: string;
    url: string;
    data?: T;
    delayForPrint?: number;
}

export const usePrintIframe = <T,>({
    urlBase = "/print",
    url,
    data,
    delayForPrint = 1500,
}: usePrintIframeProps<T>) => {
    const [loader, setLoader] = useState(false);
    const { setLocalStorage } = useLocalStorage<T>({
        name: "fenext-print",
    });
    const onPrint = () => {
        setLoader(true);
        setLocalStorage(data);
        let iframe: HTMLIFrameElement | undefined = document.getElementById(
            "fenext-print",
        ) as HTMLIFrameElement;
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.id = "fenext-print";
            document.body.appendChild(iframe);
            iframe.style.display = "none";
        }

        iframe.src = `${urlBase}${url}`;

        if (iframe.contentWindow) {
            iframe.contentWindow.onafterprint = () => {
                setLoader(false);
            };
        }
        iframe.onload = function () {
            setTimeout(function () {
                iframe?.focus();
                iframe?.contentWindow?.print();
            }, delayForPrint);
            if (iframe?.contentWindow) {
                iframe.contentWindow.onafterprint = () => {
                    setLoader(false);
                };
            }
        };
    };
    return {
        loader,
        onPrint,
    };
};


/**
 * Custom hook that extends useLocalStorageProps and adds caching functionality.
 * @template T - Type of the data to be stored in local storage.
 * @template O - Type of the options for local storage.
 */
export interface useLocalStorageCache<T = any, O = any>
    extends useLocalStorageProps<T, O> {
    data: T;

    autoSaveData?: boolean;
    parseDataPreSaveCache?: (data: { old?: T; news: T }) => T;
}

/**
 * Custom hook that provides caching functionality on top of useLocalStorage.
 * @template T - Type of the data to be stored in local storage.
 * @template O - Type of the options for local storage.
 * @param {useLocalStorageCache<T, O>} props - Configuration properties for the hook.
 * @returns {Object} - An object containing functions and values for managing cached data.
 */
export const useLocalStorageCache = <T = any, O = any>({
    data,
    autoSaveData = true,
    parseDataPreSaveCache = ({ news }) => news,
    ...props
}: useLocalStorageCache<T, O>) => {
    const { load, setLocalStorage, value, onClearLocalStorage } =
        useLocalStorage<T, O>(props);

    /**
     * Function to save the data to local storage with caching.
     * @param {T} news - New data to be cached.
     */
    const onSaveCache = useCallback(
        (news: T) => {
            const d = parseDataPreSaveCache({ news, old: value });
            setLocalStorage(d);
        },
        [value, parseDataPreSaveCache],
    );

    const onClearCache = () => {
        onClearLocalStorage();
    };

    // Automatically save data to local storage when it changes
    useEffect(() => {
        if (autoSaveData) {
            onSaveCache(data);
        }
    }, [data]);

    return {
        load,
        value,
        onSaveCache,
        onClearCache,
        setLocalStorage,
    };
};


export interface useAlertProps {
    name?: string;
}

export const useAlert = <T = any,>({
    name = "fenextjs-alert",
}: useAlertProps) => {
    const [alert, setAlert] = useState<AlertProps<T> | undefined>(undefined);
    const { onAction } = useAction<AlertProps<T>>({
        name,
        onActionExecute: setAlert,
    });

    return {
        alert,
        setAlert: onAction,
        onClearAlert: () => {
            onAction(undefined);
        },
    };
};


/**
 * Properties to configure the useUser hook.
 */
export interface useUserProps<
    Q = UserProps,
    R = any,
    E = any,
    T = RequestResultTypeProps,
> {
    /**
     * Function to validate the user's token. By default, it will check that the user
     * object has a "token" property and decode it using JSON web tokens.
     * You can replace it with your own custom validation function.
     */
    validateTokenUser?: RequestProps<Q, R, E, T>;
    /**
     * Name Var of save user in localStorage.
     */
    varName?: string;

    onValidateUser?: (user: Q | null | undefined) => boolean;

    urlRedirectInLogut?: string;

    onLogOut?: () => void;
}

/**
 * Hook to manage user data and authentication.
 * @param validateTokenUser Function to validate the user's token. By default, it will check that the user
 * object has a "token" property and decode it using JSON web tokens.
 * You can replace it with your own custom validation function.
 * @returns An object with the user data and authentication methods.
 */
export const useUser = <U = UserProps,>({
    validateTokenUser: validateTokenUserProps,
    varName = "fenextjs-user",
    onValidateUser,
    urlRedirectInLogut,
    onLogOut: onLogOutProps,
}: useUserProps<U>) => {
    const validateTokenUserDefault = async (user: U) => {
        const { token } = user as any;
        if (!token) {
            throw {
                type: RequestResultTypeProps.ERROR,
                message: "User not Token",
                error: {
                    code: ErrorCode.USER_TOKEN_NOT_FOUND,
                    message: "User not Token",
                },
            } as RequestResultDataProps;
        }
        try {
            const user_token = jwtDecode(token as string);
            const { id } = user_token as any;
            if (id) {
                return {
                    type: RequestResultTypeProps.OK,
                    message: "User Validate Ok",
                };
            }
            throw {
                type: RequestResultTypeProps.ERROR,
                message: "Token Invalid",
                error: {
                    code: ErrorCode.USER_TOKEN_INVALID,
                    message: "Token Invalid",
                },
            } as RequestResultDataProps;
        } catch (error) {
            throw {
                type: RequestResultTypeProps.ERROR,
                message: "Token Invalid",
                error: {
                    code: ErrorCode.USER_TOKEN_INVALID,
                    message: "Token Invalid",
                },
            } as RequestResultDataProps;
        }
    };
    const validateTokenUser = useCallback(
        validateTokenUserProps ?? validateTokenUserDefault,
        [validateTokenUserProps, validateTokenUserDefault],
    );

    const {
        value: user,
        load,
        setLocalStorage: setUser,
    } = useLocalStorage<U | null>({
        name: varName,
        defaultValue: null,
        parse: (v: any) => {
            try {
                return JSON.parse(v);
            } catch (error) {
                return null;
            }
        },
    });

    /**
     * Function to log in a user. It will validate the user's token using the `validateTokenUser`
     * function, and if the token is valid, it will store the user data in local storage and return
     * a successful response. If the token is invalid, it will return an error response.
     * @param data The user data to log in.
     * @returns A `RequestResultDataProps` object with the response data. If the login is successful,
     * the object will have a `type` of "ok" and a `message` of "User Validate Ok". If the login fails,
     * the object will have a `type` of "error", a `message` of "Token Invalid", and an `error` property
     * with a `code` of `ErrorCode.USER_TOKEN_INVALID` and a `message` of "Token Invalid".
     */
    const onLogin = async (data: U) => {
        try {
            const result = await validateTokenUser(data);
            if (result.type == RequestResultTypeProps.OK) {
                setUser(data);
            }
            return result;
        } catch (error) {
            return error;
        }
    };
    /**
     * Sets the user to null, effectively logging them out of the application.
     */
    const onLogOut = () => {
        setUser(null);
        onLogOutProps?.();
        if (urlRedirectInLogut && typeof window != "undefined") {
            window.location.href = urlRedirectInLogut;
        }
    };

    const isValidUser = useMemo(
        () => (load ? onValidateUser?.(user) : true) ?? true,
        [load, user],
    );

    return {
        load,
        user,
        setUser,
        onLogin,
        onLogOut,
        isValidUser,
    };
};


export interface useModalProps {
    name?: string;
    nameLocalStorage?: string;
    activeByNameLocalStorage?: boolean;
    activeByNameContentLocalStorage?: boolean;
    active?: boolean;
    defaultActive?: boolean;
    onActive?: () => void;
    onClose?: () => void;
    onChange?: (d: boolean) => void;
    disabled?: boolean;
}

export const useModal = ({
    name,
    nameLocalStorage,
    active: activeProps,
    defaultActive: defaultActiveProps,
    onActive: onActiveProps,
    onChange: onChangeProps,
    onClose: onCloseProps,
    disabled = false,
    activeByNameLocalStorage = false,
    activeByNameContentLocalStorage = false,
}: useModalProps) => {
    const [ifReload, setIfReload] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(defaultActiveProps ?? false);

    const { value, setLocalStorage } = useLocalStorage<string[]>({
        name: nameLocalStorage ?? "fenext-modal-active-name",
        parse: (e) => {
            try {
                return JSON.parse(e ?? "[]");
            } catch {
                return [];
            }
        },
        defaultValue: [],
    });
    const onLoadWindows = () => {
        if (!(window && typeof window != "undefined")) {
            return;
        }
        window.addEventListener("beforeunload", () => {
            setLocalStorage([]);
            setActive(false);
            setIfReload(true);
        });
    };
    useEffect(onLoadWindows, []);

    const listNamesLocalStorage = useMemo(
        () => (value ? [value].flat(2) : []),
        [value],
    );

    const onPush = (name?: string) => {
        if (
            name &&
            (activeByNameLocalStorage || activeByNameContentLocalStorage)
        ) {
            const n = [...(listNamesLocalStorage ?? []), name];
            setLocalStorage(n);
        }
    };
    const onPop = (name?: string) => {
        if (
            name &&
            (activeByNameLocalStorage || activeByNameContentLocalStorage)
        ) {
            const n = [...(listNamesLocalStorage ?? [])];
            if (n.at(-1) === name) {
                n.pop();
            }
            setLocalStorage(n);
        }
    };
    const { onAction } = useAction<boolean>({
        name: name ?? "fenext-modal",
        onActionExecute: name
            ? (e) => {
                  setActive(e ?? false);
              }
            : undefined,
    });
    const onChange = (d: boolean) => {
        if (disabled) {
            return;
        }
        if (d) {
            onPush(name);
        } else {
            onPop(name);
        }
        onChangeProps?.(d);
        setActive(d);
        onAction(d);
    };
    const onActive = () => {
        if (disabled) {
            return;
        }
        onChange(true);
        onActiveProps?.();
    };
    const onClose = () => {
        if (disabled) {
            return;
        }
        onChange(false);
        onCloseProps?.();
    };

    const { activeFinal, activeNameLast, activeName } = useMemo(() => {
        let ACTIVE: boolean | undefined = undefined;
        const ACTIVENAME = listNamesLocalStorage.includes(name ?? "");
        const ACTIVENAMELAST = listNamesLocalStorage.at(-1) == name;

        if (activeByNameContentLocalStorage && name) {
            ACTIVE = ACTIVENAME;
        }
        if (activeByNameLocalStorage && name && listNamesLocalStorage.at(-1)) {
            ACTIVE = ACTIVENAMELAST;
        }
        return {
            activeFinal: ACTIVE ?? activeProps ?? active,
            activeName: ACTIVENAME,
            activeNameLast: ACTIVENAMELAST,
        };
    }, [
        activeByNameContentLocalStorage,
        activeByNameLocalStorage,
        listNamesLocalStorage,
        name,
        activeProps,
        active,
    ]);

    return {
        active: !ifReload && activeFinal,
        activeNameLast,
        activeName,
        listNamesLocalStorage,
        onChange,
        onActive,
        onClose,
    };
};


/**
 * Represents the properties of a notification
 */
export interface NotificationDataProps {
    /**
     * The type of the notification
     */
    type?: RequestResultTypeProps | keyof typeof RequestResultTypeProps;
    /**
     * The message of the notification
     */
    message: string;
}

/**
 * Represents the properties of the useNotification hook
 */
export interface useNotificationProps {
    /**
     * The time to display the notification in milliseconds
     */
    time?: number;
}

/**
 * Hook to manage notification messages
 * @param time - Optional duration in milliseconds for the notification to be displayed
 * @returns An object with methods to manage notifications
 */
export const useNotification = ({ time = 2000 }: useNotificationProps) => {
    const [notification, setNotification] = useState<
        NotificationDataProps | undefined
    >(undefined);
    const { onAction } = useAction<NotificationDataProps>({
        name: "fenextjs-notification",
        onActionExecute: setNotification,
    });

    /**
     * Resets the notification to its default state
     */
    const reset = () => {
        onAction(undefined);
    };

    /**
     * Sets a notification to be displayed
     * @param props - Notification properties
     */
    const pop = (
        props: NotificationDataProps,
        options?: NotificationOptions,
    ) => {
        onAction(props);
        Notification.requestPermission().then((permission) => {
            if (permission == "granted") {
                new Notification(props.message, options);
            }
        });
        setTimeout(() => {
            reset();
        }, time);
    };

    return {
        /**
         * The current notification object
         */
        notification,
        /**
         * Sets a new notification to be displayed
         */
        pop,
        /**
         * Resets the current notification
         */
        reset,
    };
};


/**
 * Represents the properties for the useCSC hook.
 */
export interface useCSCProps
    extends useJsonStringProps<CSCProps, CSCStringProps> {}
/**
 * Hook that provides a CSC (Country, State, City) selector functionality.
 *
 * @param {Object} useCSCProps - Object containing optional `defaultValue` prop.
 * @param {Object} useCSCProps.defaultValue - Optional object containing default CSC values.
 * @param {Object} CSCProps - Object containing optional `country`, `state`, and `city` props.
 * @param {Object} CSCProps.country - Optional object containing country data.
 * @param {Object} CSCProps.state - Optional object containing state data.
 * @param {Object} CSCProps.city - Optional object containing city data.
 *
 * @returns {Object} An object with the following properties:
 * @returns {Boolean} load - Indicates whether the CSC data has been loaded.
 * @returns {Array} countrys - Array containing all loaded country objects.
 * @returns {Array} states - Array containing all loaded state objects.
 * @returns {Array} citys - Array containing all loaded city objects.
 * @returns {Function} onChangeCSC - Function to update the CSC data.
 * @returns {Object} value - Object containing the currently selected CSC data.
 * @returns {Array} statesForCountrySelected - Array containing all loaded state objects that belong to the currently selected country.
 * @returns {Array} citysForStateSelected - Array containing all loaded city objects that belong to the currently selected state.
 */
export const useCSC = ({
    defaultValue: defaultValueProps,
    value: valueProps,
    onChange: onChangeProps,
    defaultValueJsonString,
    valueJsonString,
    onChangeJsonString,
    parseJson_to_String,
    parseString_to_Json,
}: useCSCProps) => {
    const {
        defaultValue,
        onChange,
        value: valueJson,
    } = useJsonString<CSCProps, CSCStringProps>({
        defaultValue: defaultValueProps,
        value: valueProps,
        onChange: onChangeProps,
        defaultValueJsonString,
        valueJsonString,
        onChangeJsonString,
        parseJson_to_String: parseJson_to_String ?? parseCSC_to_CSCString,
        parseString_to_Json: parseString_to_Json ?? parseCSCString_to_CSC,
    });

    /**
     * An array of countries loaded by the hook.
     */
    const [countrys, setCountrys] = useState<CountryProps[]>([]);
    const [loadCountrys, setLoadCountrys] = useState(true);
    /**
     * An array of states loaded by the hook.
     */
    const [states, setStates] = useState<StateProps[]>([]);
    const [loadStates, setLoadStates] = useState(true);
    /**
     * An array of cities loaded by the hook.
     */
    const [citys, setCitys] = useState<CityProps[]>([]);
    const [loadCitys, setLoadCitys] = useState(true);

    const onLoadCountrys = async () => {
        setLoadCountrys(false);
        const countrys: CountryProps[] = await getDataCountrys();

        setCountrys(
            countrys.map((e) => {
                return {
                    ...e,
                    img: `${getRuteCountryImg(e)}`,
                };
            }),
        );
        setLoadCountrys(true);
        if (defaultValue?.country) {
            await onLoadStates(defaultValue?.country);
            if (defaultValue?.state) {
                await onLoadCitys(defaultValue?.country, defaultValue?.state);
            }
        }
    };
    const onLoadStates = async (country?: { text: string; id: number }) => {
        setStates([]);
        setCitys([]);
        if (country) {
            setLoadStates(false);
            const states: StateProps[] = await getDataStatesByCountry(country);
            setStates(states);
        }
        setLoadStates(true);
    };
    const onLoadCitys = async (
        country?: { text: string; id: number },
        state?: {
            text: string;
            id: number;
        },
    ) => {
        setCitys([]);
        if (country && state) {
            setLoadCitys(false);
            const citys: CityProps[] = await getDataCitysByStateAndCountry(
                country,
                state,
            );
            setCitys(citys);
        }
        setLoadCitys(true);
    };

    /**
     * A memoized version of the `value` property returned by the `useData` hook.
     * The `onChangeData` function returned by the `useData` hook is used to
     * convert the input CSC data to the correct format.
     */
    const {
        data: valueData,
        onConcatData,
        setDataFunction,
    } = useData<CSCProps, CSCProps>(
        {
            country: defaultValue?.country,
            state: defaultValue?.state,
            city: defaultValue?.city,
            ...(defaultValue?.country
                ? {
                      country: {
                          ...defaultValue?.country,
                          img:
                              defaultValue?.country?.text != ""
                                  ? `${getRuteCountryImg(defaultValue?.country)}`
                                  : undefined,
                      },
                  }
                : {}),
        },
        {
            onChangeDataAfter: onChange,
        },
    );
    const onChangeCSC =
        (id: keyof CSCProps) =>
        (v: CountryProps | StateProps | CityProps | undefined) => {
            if (id == "country") {
                onConcatData({
                    country: v as CountryProps,
                    state: undefined,
                    city: undefined,
                });
                onLoadStates(v);
            }
            if (id == "state") {
                setDataFunction((old) => {
                    if (old?.country) {
                        onLoadCitys(old?.country, v);
                        return {
                            ...old,
                            state: v as StateProps,
                            city: undefined,
                        };
                    }
                    return old;
                });
            }
            if (id == "city") {
                setDataFunction((old) => {
                    if (old?.country && old?.state) {
                        return {
                            ...old,
                            city: v as CityProps,
                        };
                    }
                    return old;
                });
            }
        };
    /**
     * Loads the countries, states and cities asynchronously.
     */
    useEffect(() => {
        onLoadCountrys();
    }, []);

    return {
        countrys,
        states,
        citys,
        onChangeCSC,
        value: (valueProps ? valueJson : valueData) ?? valueData,
        loadCountrys,
        loadStates,
        loadCitys,
    };
};
export const useCountryStateCity = useCSC;


/**
 * Properties for the `useRequest` hook.
 */
export interface useRequestProps<
    Q = any,
    R = any,
    E = any,
    T = RequestResultTypeProps,
> {
    query: Q;
    request: RequestProps<Q, R, E, T>;
    autoRequest?: boolean;

    defaultResult?: RequestResultDataProps<R, E, T>;
    defaultResultValue?: R;
    defaultError?: E;
}

/**
 * A hook that sends an HTTP request.
 * @template Q Query parameter type.
 * @template R Response type.
 * @template E Error type.
 * @template T Request result type.
 * @param query Query parameter.
 * @param request HTTP request function.
 * @param autoRequest Whether to send the request automatically on mount.
 * @returns An object containing the request result, loading status, error, and request function.
 */
export const useRequest = <
    Q = any,
    R = any,
    E = any,
    T = RequestResultTypeProps,
>({
    query,
    request,
    autoRequest = false,
    defaultError = undefined,
    defaultResult = undefined,
    defaultResultValue = undefined,
}: useRequestProps<Q, R, E, T>) => {
    const [error, setError] = useState<E | undefined>(defaultError);
    const [result, setResult] = useState<
        RequestResultDataProps<R, E, T> | undefined
    >(defaultResult);
    const [resultValue, setResultValue] = useState<R | undefined>(
        defaultResultValue,
    );
    const [loader, setLoader] = useState(false);

    const onRequest = useCallback(async () => {
        setLoader(true);
        try {
            setError(undefined);
            const respond = await request(query);
            setResultValue(respond.result);
            setResult(respond);
        } catch (error: any) {
            setError(error);
        }
        setLoader(false);
    }, [query]);

    useEffect(() => {
        if (autoRequest) {
            onRequest();
        }
    }, [query]);

    return {
        result,
        resultValue,
        loader,
        error,
        onRequest,
    };
};

export interface useRequestFunctionProps<FP, FR, PE = any> {
    f: RequestProps<FP, FR>;
    parseError?: (errors: any) => PE;

    defaultResult?: FR;
    defaultError?: PE;
}

export const useRequestFunction = <FP = any, FR = any, PE = any>({
    f,
    parseError = (e) => e,
    defaultError = undefined,
    defaultResult = undefined,
}: useRequestFunctionProps<FP, FR, PE>) => {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState<PE | undefined>(defaultError);
    const [result, setResult] = useState<FR | undefined>(defaultResult);

    interface onRequestActivionOptionsProps {
        onError?: (error: any) => void;
    }
    const onRequestAction = async (
        props: FP,
        options?: onRequestActivionOptionsProps,
    ) => {
        setLoader(true);
        setError(undefined);
        setResult(undefined);
        try {
            const r = await f(props);
            if (r.error) {
                throw r.error;
            }
            setResult(r.result);
            return r;
        } catch (err: any) {
            const error = parseError?.(err) ?? err;
            setError(error);
            options?.onError?.(error);
            return error as PE;
        } finally {
            setLoader(false);
        }
    };
    const onRequest = async (props: FP) => {
        return await onRequestAction(props);
    };
    const onRequestWithThrow = async (props: FP) => {
        return await onRequestAction(props, {
            onError: (error) => {
                throw error;
            },
        });
    };
    const onClear = () => {
        setLoader(false);
        setError(undefined);
        setResult(undefined);
    };
    return {
        loader,
        error,
        result,
        onRequest,
        onRequestWithThrow,
        onClear,
    };
};

export interface useRequestLiteProps<FP, FR, FE = ErrorFenextjs> {
    f: (data: FP) => Promise<FR>;
    onResult?: (data: FR) => void;
    onError?: (data: FE) => void;
    parseError?: (errors: any) => FE;

    defaultResult?: FR;
    defaultError?: FE;
}

export const useRequestLite = <FP, FR, FE = ErrorFenextjs>({
    f,
    onError,
    onResult,
    parseError,

    defaultError = undefined,
    defaultResult = undefined,
}: useRequestLiteProps<FP, FR, FE>) => {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState<FE | undefined>(defaultError);
    const [result, setResult] = useState<FR | undefined>(defaultResult);

    const onRequest = async (props: FP) => {
        setLoader(true);
        setError(undefined);
        setResult(undefined);
        try {
            const r = await f(props);
            setResult(r as FR);
            onResult?.(r as FR);
            return r;
        } catch (error: any) {
            let err = error;
            if (parseError) {
                err = parseError(error);
            }
            setError(err as FE);
            onError?.(err as FE);
            return err as FE;
        } finally {
            setLoader(false);
        }
    };
    const onClear = () => {
        setLoader(false);
        setError(undefined);
        setResult(undefined);
    };
    return {
        loader,
        error,
        result,
        onRequest,
        onClear,
    };
};


/**
 * Query parameters for useQuery hook
 */

export interface useQuery_QueryProps {
    id?: string;
    search?: string;
    searchAddress?: string;
    tab?: string;
    page?: number;
    npage?: number;
    totalpage?: number;
    allitems?: number;
    start?: number;
    end?: number;
    order?: "asc" | "desc";
    orderBy?: string;
    exportBy?: string[];
}
/**
 * Keys of useQuery_QueryProps
 */
export type useQuery_QueryKeysProps = keyof useQuery_QueryProps;

export interface useQueryProps {
    ignoreQuerys?: [id: useQuery_QueryKeysProps];
}

/**
 * A hook that provides access to the query parameters in the URL.
 */
export const useQuery = (props?: useQueryProps) => {
    const tomorrow = useMemo(() => {
        const tomorrow = new Date();
        tomorrow.setHours(tomorrow.getHours() + 24);
        return tomorrow;
    }, []);

    /**
     * Whether the query has been changed.
     */
    const [isChange, setIsChange] = useState(false);
    /**
     * The router instance from Next.js.
     */
    const router = useRouter();
    /**
     * The query parameters in the URL.
     */
    const query: useQuery_QueryProps = useMemo(() => {
        if (!(router?.isReady ?? false)) {
            return {};
        }
        const q: any = router?.query ?? {};
        const {
            id = undefined,
            search = "",
            searchAddress = "",
            tab = "all",
            page = "0",
            npage = "10",
            totalpage = "100",
            allitems = "1000",
            start = undefined,
            end = undefined,
            order = undefined,
            orderBy = undefined,
        } = q;

        const r: useQuery_QueryProps = {
            ...q,
            id,
            search,
            searchAddress,
            tab,
            page: parseInt(page),
            npage: parseInt(npage),
            totalpage: parseInt(totalpage),
            allitems: parseInt(allitems),
            start: start ? parseInt(start) : 0,
            end: end ? parseInt(end) : tomorrow?.getTime(),
            order,
            orderBy,
            exportBy: [q?.export ?? []].flat(2),
        };
        (props?.ignoreQuerys ?? []).map((e: useQuery_QueryKeysProps) => {
            delete r[e];
        });
        return r;
    }, [router?.query, router?.isReady, props]);

    /**
     * Sets the query parameters in the URL.
     *
     * @param query - The query parameters to set.
     */
    const setQuery = useCallback(
        (query: useQuery_QueryProps) => {
            if (!(router?.isReady ?? false)) {
                return false;
            }
            const queryParse: {
                [id: string]: string;
            } = {};
            Object.keys(query).forEach((key) => {
                const v = `${query[key] ?? ""}`;
                if (v != "") {
                    queryParse[key] = v;
                }
            });
            router?.push?.(
                {
                    pathname: router.pathname,
                    query: queryParse,
                },
                undefined,
                { scroll: false },
            );
            setIsChange(true);
            return true;
        },
        [router?.isReady, router?.query, router?.pathname],
    );
    /**
     * Sets the query parameters in the URL.
     *
     * @param query - The query parameters to set.
     */
    const onConcatQuery = useCallback(
        (newQuery: useQuery_QueryProps) => {
            const nQuery = {
                ...query,
                ...newQuery,
            };
            return setQuery(nQuery);
        },
        [query],
    );
    /**
     * A function that returns an event handler that sets a query parameter.
     *
     * @param id - The key of the query parameter to set.
     */
    const onChangeQuery = useCallback(
        (id: keyof useQuery_QueryProps) =>
            (value: (typeof query)[useQuery_QueryKeysProps]) => {
                if (!(router?.isReady ?? false)) {
                    return false;
                }
                router?.push?.(
                    {
                        pathname: router.pathname,
                        query: {
                            ...(router?.query ?? {}),
                            [id]: value,
                        },
                    },
                    undefined,
                    { scroll: false },
                );
                setIsChange(true);
                return true;
            },
        [router?.isReady, router?.query, router?.pathname],
    );

    const onDeleteQuery = useCallback(
        (id: keyof useQuery_QueryProps) => {
            if (!(router?.isReady ?? false)) {
                return false;
            }
            const q = { ...(router?.query ?? {}) };
            delete q[id];
            router?.push?.(
                {
                    pathname: router.pathname,
                    query: { ...q },
                },
                undefined,
                { scroll: false },
            );
            setIsChange(true);
            return true;
        },
        [router?.isReady, router?.query, router?.pathname],
    );

    return {
        load: router?.isReady ?? false,
        query,
        setQuery,
        onConcatQuery,
        onChangeQuery,
        onDeleteQuery,
        isChange,
    };
};


export interface use_TProps extends _TProps {}

export const use_T = ({ _t: _tProps, useT = true }: use_TProps) => {
    const _t = useCallback(
        (message: any) =>
            _tValidate(message, useT !== false ? _tProps : undefined),
        [_tProps, useT],
    );

    return {
        _t,
    };
};


export interface useDataLayerProps {}
export interface useDataLayerPushProps {
    event: string;
    value?: any;
    [id: string]: any;
}
export const useDataLayer = ({}: useDataLayerProps) => {
    const push = ({ event, ...props }: useDataLayerPushProps) => {
        const w: any = window;
        if (w?.dataLayer?.push) {
            w.dataLayer?.push?.({
                event,
                ...props,
            });
            return true;
        }
        return false;
    };

    return {
        push,
    };
};


export interface useDataOptionsRefreshDataIfChangeDefaultDataOptions {
    active?: boolean;
    useReloadKeyData?: boolean;
}

export interface setDataOptions {
    useOptionsOnChangeDataAfter?: boolean;
    useSetIsChange?: boolean;
}
/**
 * A custom hook options.
 *
 * @template T - The type of the data to manage.
 * @template M - The type of the memoized data.
 * @param {Object} options - The options for the hook.
 * @param {Function} options.onChangeDataAfter - A function to execute after the data changes.
 * @param {T} options.data - The data use not data.
 * @param {Boolean} options.refreshDataIfChangeDefaultData - A swich for change data if change defaultData.
 * @param {Function} options.onChangeDataMemoAfter - A function to execute after the dataMemo changes.
 * @param {Function} options.onMemo - A function to memoize the data.
 * @param {FenextjsValidatorClass} options.validator - A FenextjsValidatorClass for validate data.
 * @param {FenextjsValidatorClass} options.validatorMemo - A FenextjsValidatorClass for validate dataMemo.
 * @param {Function} options.onSubmitData - A function if is valid data for to send.
 * @param {Function} options.onSubmitDataMemo - A function if is valid dataMemo for to send.
 * @returns {Object} - An object with the data state and methods to manage it.
 */

export interface useDataOptions<
    T,
    M = any,
    RT = void,
    RM = void,
    ET = any,
    EM = any,
> {
    data?: T;
    refreshDataIfChangeDefaultData?: useDataOptionsRefreshDataIfChangeDefaultDataOptions;
    onChangeDataAfter?: (data: T) => void;
    onDeleteDataAfter?: (data: T) => void;
    onChangeDataMemoAfter?: (data: M) => void;
    onMemo?: (data: T) => M;
    validator?: FenextjsValidatorClass<T>;
    validatorMemo?: FenextjsValidatorClass<M>;
    onSubmitData?: (data: T) => RT | Promise<RT>;
    onAfterSubmitDataOk?: (d: { data: T; result: RT }) => void;
    onAfterSubmitParseError?: (error: any) => ET;
    onAfterSubmitDataError?: (d: { data: T; error: ET }) => void;
    afterSubmitDataSetIsChangeFalse?: boolean;

    onSubmitDataMemo?: (data: M) => RM | Promise<RM>;
    onAfterSubmitDataMemoOk?: (d: { dataMemo: M; result: RM }) => void;
    onAfterSubmitParseErrorMemo?: (error: any) => EM;
    onAfterSubmitDataMemoError?: (d: { dataMemo: M; error: EM }) => void;
    afterSubmitDataMemoSetIsChangeFalse?: boolean;
    autoOnValidate?: boolean;

    env_log?: {
        [id in useDataOptionsEnvLog]?: boolean;
    };
}

export type useDataOptionsEnvLog =
    | "data"
    | "dataMemo"
    | "isValidData"
    | "isValidDataMemo"
    | "dataError"
    | "dataErrorMemo"
    | "loaderSubmit"
    | "loaderSubmitMemo"
    | "keyData"
    | "isChange";
export interface onChangeDataOptionsProps<T> {
    onCallback?: (data: T) => void;
    parseDataBeforeOnChangeData?: (id: keyof T, data: T) => T;
}

/**
 * A custom hook to manage data state and changes.
 *
 * @template T - The type of the data to manage.
 * @template M - The type of the memoized data.
 * @param {T} defaultData - The default value for the data.
 * @param {useDataOptions} options - The options for the hook.
 */
export const useData = <T, M = any, RT = void, RM = void, ET = any, EM = any>(
    defaultData: T,
    options?: useDataOptions<T, M, RT, RM, ET, EM>,
) => {
    type keys = keyof T;
    const [loaderSubmit, setLoaderSubmit] = useState(false);
    const [loaderSubmitMemo, setLoaderSubmitMemo] = useState(false);
    const [keyData, setKeyData] = useState<number>(0);
    const [isChange, setIsChange] = useState(false);
    const [data_, setDataD] = useState<T>(defaultData);
    const [dataError, setDataError] = useState<ET | undefined>(undefined);
    const [dataErrorMemo, setDataErrorMemo] = useState<EM | undefined>(
        undefined,
    );
    const [resultSubmitData, setResultSubmitData] = useState<RT | undefined>(
        undefined,
    );
    const [resultSubmitDataMemo, setResultSubmitDataMemo] = useState<
        RM | undefined
    >(undefined);
    const data = useMemo<T>(
        () => options?.data ?? data_,
        [data_, options?.data],
    );

    /**
     * Update a keyData
     *
     * @returns {Function} - A function to update the keyData.
     */
    const onReloadKeyData = () => {
        setKeyData(new Date().getTime());
    };

    /**
     * Update a single property of the data.
     *
     * @param {keys} id - The id of the property to update.
     * @returns {Function} - A function to update the property.
     */
    const onChangeData =
        (id: keyof T) =>
        (
            value: (typeof data)[keys],
            _options?: onChangeDataOptionsProps<T>,
        ) => {
            if (value === data[id]) {
                return;
            }
            setDataD((pre: T) => {
                if (Array.isArray(pre)) {
                    const nData = [...pre] as T;
                    nData[id] = value;
                    options?.onChangeDataAfter?.(nData);
                    _options?.onCallback?.(nData);
                    if (_options?.parseDataBeforeOnChangeData) {
                        return _options?.parseDataBeforeOnChangeData(id, nData);
                    }
                    return nData;
                }
                const nData = { ...pre, [id]: value };
                options?.onChangeDataAfter?.(nData);
                _options?.onCallback?.(nData);
                if (_options?.parseDataBeforeOnChangeData) {
                    return _options?.parseDataBeforeOnChangeData(id, nData);
                }
                return nData;
            });
            setIsChange(true);
        };

    /**
     * Delete a single property of the data.
     *
     * @param {keys} id - The id of the property to delete.
     * @returns {Function} - A function to delete the property.
     */
    const onDeleteData = (id: keyof T) => {
        setDataD((pre: T) => {
            if (Array.isArray(pre)) {
                const nData = [...pre].filter(
                    (v, i) => i !== (id as number) && (v || !v),
                ) as T;
                options?.onChangeDataAfter?.(nData);
                options?.onDeleteDataAfter?.(nData);
                return nData;
            }
            const nData = { ...pre };
            delete nData[id];
            options?.onChangeDataAfter?.(nData);
            options?.onDeleteDataAfter?.(nData);
            return nData;
        });
        setIsChange(true);
    };

    /**
     * et the entire function.
     *
     * @param {Function} f  - The function for setData
     * @param {setDataOptions} optionsData - The new data.
     */
    const setDataFunction = (f: (p: T) => T, optionsData?: setDataOptions) => {
        setDataD((p) => {
            const n = f(p);
            if (!(optionsData?.useOptionsOnChangeDataAfter === false)) {
                options?.onChangeDataAfter?.(n);
            }
            return n;
        });
        if (!(optionsData?.useSetIsChange === false)) {
            setIsChange(true);
        }
    };

    /**
     * Set the entire data object.
     *
     * @param {T} nData - The new data.
     * @param {setDataOptions} optionsData - The new data.
     */
    const setData = (nData: T, optionsData?: setDataOptions) => {
        if (!(optionsData?.useOptionsOnChangeDataAfter === false)) {
            options?.onChangeDataAfter?.(nData);
        }
        setDataD(nData);
        if (!(optionsData?.useSetIsChange === false)) {
            setIsChange(true);
        }
    };
    /**
     * Concat add data.
     *
     * @param {T} v - The concat data.
     */
    const onConcatData = (v: Partial<T> | Array<T>) => {
        setDataD((pre: T) => {
            if (Array.isArray(pre)) {
                const nData = [...pre, ...(v as Array<T>)] as T;
                options?.onChangeDataAfter?.(nData);
                return nData;
            }
            if (typeof pre === "object") {
                const nData = {
                    ...pre,
                    ...v,
                };
                options?.onChangeDataAfter?.(nData);
                return nData;
            }
            if (typeof pre === "string" || typeof pre === "number") {
                const nData = `${pre}${v}` as T;
                options?.onChangeDataAfter?.(nData);
                return nData;
            }
            return pre;
        });
        setIsChange(true);
    };

    /**
     * Reset the data to the default value.
     */
    const onRestart = () => {
        setDataD(defaultData);
        setIsChange(false);
    };

    /**
     * Memoize the data.
     */
    const dataMemo: M = useMemo(() => {
        if (options?.onMemo) {
            return options?.onMemo?.(data);
        }
        return data as any;
    }, [data]);

    useEffect(() => {
        options?.onChangeDataMemoAfter?.(dataMemo);
    }, [dataMemo]);

    const { isValidData, onValidateData } = useDataValidator<T>({
        data,
        validator: options?.validator,
        autoOnValidate: options?.autoOnValidate ?? true,
    });

    const { isValidData: isValidDataMemo, onValidateData: onValidateDataMemo } =
        useDataValidator<M>({
            data: dataMemo,
            validator: options?.validatorMemo,
            autoOnValidate: options?.autoOnValidate ?? true,
        });

    const onSubmitData = useCallback(
        async (optionsSubmitData?: {
            data?: T;
            onSaveData?: (p: { data: T; result: RT }) => T;
            useValidator?: boolean;
        }) => {
            const dataUse = optionsSubmitData?.data ?? data;
            const isValidDataUse =
                optionsSubmitData?.useValidator === false ||
                (optionsSubmitData?.data
                    ? options?.validator?.onValidate?.(
                          optionsSubmitData?.data,
                      ) ?? true
                    : isValidData);
            if (options?.onSubmitData && isValidDataUse === true) {
                try {
                    setDataError(undefined);
                    setResultSubmitData(undefined);
                    setLoaderSubmit(true);
                    const result = await options?.onSubmitData?.(dataUse);
                    setResultSubmitData(result);
                    options?.onAfterSubmitDataOk?.({ data: dataUse, result });
                    if (options?.afterSubmitDataSetIsChangeFalse) {
                        setIsChange(false);
                    }
                    if (optionsSubmitData?.onSaveData) {
                        const newData = optionsSubmitData?.onSaveData?.({
                            data: dataUse,
                            result,
                        });
                        setData(newData);
                    }
                    return result;
                } catch (err) {
                    const error = (options?.onAfterSubmitParseError?.(err) ??
                        (err as any)) as ET;
                    setDataError(error);
                    options?.onAfterSubmitDataError?.({ data: dataUse, error });
                } finally {
                    setLoaderSubmit(false);
                }
            }
            return undefined;
        },
        [data, isValidData, options?.onSubmitData],
    );
    const onSubmitDataMemo = useCallback(
        async (optionsSubmitDataMemo?: {
            dataMemo?: M;
            useValidatorMemo?: boolean;
        }) => {
            const dataUse = optionsSubmitDataMemo?.dataMemo ?? dataMemo;
            const isValidDataUse =
                optionsSubmitDataMemo?.useValidatorMemo === false ||
                (optionsSubmitDataMemo?.dataMemo
                    ? options?.validatorMemo?.onValidate?.(
                          optionsSubmitDataMemo?.dataMemo,
                      ) ?? true
                    : isValidDataMemo);
            if (options?.onSubmitDataMemo && isValidDataUse === true) {
                try {
                    setDataErrorMemo(undefined);
                    setResultSubmitDataMemo(undefined);
                    setLoaderSubmitMemo(true);
                    const result = await options?.onSubmitDataMemo?.(dataUse);
                    setResultSubmitDataMemo(result);
                    options?.onAfterSubmitDataMemoOk?.({
                        dataMemo: dataUse,
                        result,
                    });
                    if (options?.afterSubmitDataMemoSetIsChangeFalse) {
                        setIsChange(false);
                    }
                    return result;
                } catch (err) {
                    const error = (options?.onAfterSubmitParseErrorMemo?.(
                        err,
                    ) ?? (err as any)) as EM;
                    setDataErrorMemo(error);
                    options?.onAfterSubmitDataMemoError?.({
                        dataMemo: dataUse,
                        error,
                    });
                } finally {
                    setLoaderSubmitMemo(false);
                }
            }
            return undefined;
        },
        [dataMemo, isValidDataMemo, options?.onSubmitDataMemo],
    );

    useEffect(() => {
        if (options?.refreshDataIfChangeDefaultData?.active === true) {
            setData(defaultData, {
                useOptionsOnChangeDataAfter: false,
                useSetIsChange: false,
            });
            if (
                options?.refreshDataIfChangeDefaultData?.useReloadKeyData ===
                true
            ) {
                onReloadKeyData();
            }
        }
    }, [defaultData, options]);

    const validatorData = useMemo(
        () => options?.validator?.getObjectValidator?.(),
        [options?.validator],
    );

    const validatorMemoData = useMemo(
        () => options?.validatorMemo?.getObjectValidator?.(),
        [options?.validatorMemo],
    );

    if (options?.env_log) {
        if (options?.env_log?.data == true) {
            env_log(data, {
                name: "useData - data",
                color: "#22cc8c",
            });
        }
        if (options?.env_log?.dataMemo == true) {
            env_log(dataMemo, {
                name: "useData - dataMemo",
                color: "#22cc8c",
            });
        }
        if (options?.env_log?.isValidData == true) {
            env_log(isValidData, {
                name: "useData - isValidData",
                color: "#f96161",
            });
        }
        if (options?.env_log?.isValidDataMemo == true) {
            env_log(isValidDataMemo, {
                name: "useData - isValidDataMemo",
                color: "#f96161",
            });
        }
        if (options?.env_log?.dataError == true) {
            env_log(dataError, {
                name: "useData - dataError",
                color: "#e84275",
            });
        }
        if (options?.env_log?.dataErrorMemo == true) {
            env_log(dataErrorMemo, {
                name: "useData - dataErrorMemo",
                color: "#e84275",
            });
        }
        if (options?.env_log?.loaderSubmit == true) {
            env_log(loaderSubmit, {
                name: "useData - loaderSubmit",
                color: "#f96161",
            });
        }
        if (options?.env_log?.loaderSubmitMemo == true) {
            env_log(loaderSubmitMemo, {
                name: "useData - loaderSubmitMemo",
                color: "#f96161",
            });
        }
        if (options?.env_log?.keyData == true) {
            env_log(keyData, {
                name: "useData - keyData",
                color: "#8d63e9",
            });
        }
        if (options?.env_log?.isChange == true) {
            env_log(isChange, {
                name: "useData - isChange",
                color: "#8d63e9",
            });
        }
    }

    return {
        data,
        onChangeData,
        onDeleteData,
        isChange,
        setData,
        setDataFunction,
        dataMemo,
        setIsChange,
        onRestart,
        onConcatData,

        keyData,
        setKeyData,
        onReloadKeyData,

        validator: options?.validator,
        validatorData,
        validatorMemo: options?.validatorMemo,
        validatorMemoData,

        isValidData,
        isValidDataMemo,

        onValidateData,
        onValidateDataMemo,

        onSubmitData,
        onSubmitDataMemo,

        loaderSubmit,
        loaderSubmitMemo,

        resultSubmitData,
        resultSubmitDataMemo,

        dataError,
        dataErrorMemo,

        setResultSubmitData,
        setResultSubmitDataMemo,

        setDataError,
        setDataErrorMemo,
    };
};


export interface useDateProps extends FenextjsDateProps {}
export const useDate = ({ ...props }: useDateProps) => {
    const [dateValue, setDateValue] = useState<Date | undefined>(
        props.defaultDate,
    );
    const [date, setDate] = useState(
        new FenextjsDate({
            ...props,
            onCallback: (a) => {
                setDateValue(() => new Date(a));
                props?.onCallback?.(a);
            },
        }),
    );

    useEffect(() => {
        if (dateValue) {
            setDate(
                new FenextjsDate({
                    ...props,
                    defaultDate: dateValue,
                    onCallback: (a) => {
                        setDateValue(() => new Date(a));
                        props?.onCallback?.(a);
                    },
                }),
            );
        }
    }, [dateValue]);

    return date;
};


export type TypeListenerKeyFunctions = keyof DocumentEventMap;

export type TypeListenerFunctions<K extends TypeListenerKeyFunctions> = (
    ev: DocumentEventMap[K],
) => any;

export type useDocumentEventProps<K extends TypeListenerKeyFunctions> = {
    [id in TypeListenerKeyFunctions]?: TypeListenerFunctions<K>;
};

export const useDocumentEvent = <
    K extends TypeListenerKeyFunctions = TypeListenerKeyFunctions,
>({
    ...props
}: useDocumentEventProps<K>) => {
    const onLoad = () => {
        Object.keys(props).forEach((key) => {
            const listener = key;
            const fun = props[key];
            if (listener && fun) {
                document.addEventListener(listener, fun);
            }
        });
    };
    const onUnload = () => {
        Object.keys(props).forEach((key) => {
            const listener = key;
            const fun = props[key];
            if (listener && fun) {
                document.removeEventListener(listener, fun);
            }
        });
    };

    const onReload = () => {
        onUnload();
        onLoad();
    };

    useEffect(() => {
        onLoad();
        return () => {
            onUnload();
        };
    }, [props]);
    return {
        onReload,
    };
};


export interface useThemeProps {}

export const useTheme = ({}: useThemeProps) => {
    const { setLocalStorage: setTheme, value: theme } =
        useLocalStorage<ThemeType>({
            name: "fenext-theme",
            defaultValue: "auto",
        });
    const onLoadThemeWindow = () => {
        if (!theme) {
            return;
        }
        if (typeof window == "undefined" || typeof document == "undefined") {
            setTimeout(onLoadThemeWindow, 500);
        } else {
            document.documentElement.setAttribute("fenext-theme", theme);
        }
    };
    useEffect(() => {
        onLoadThemeWindow();
    }, [theme]);

    return {
        theme,
        setTheme,
    };
};


/**
 * Props for configuring modal content.
 */
export interface useModalLocalStorageConfigContentProps {
    /**
     * A unique key to identify the content.
     */
    key: string;
    /**
     * Data to be passed to the modal content.
     */
    data: any;
}

/**
 * Options for configuring a modal dialog component.
 */
export interface useModalLocalStorageConfigProps {
    /**
     * Whether the modal dialog should be displayed.
     * Default is `false`.
     */
    active?: boolean;
    /**
     * Whether to use the modal dialog or not.
     * Default is `true`.
     */
    use?: boolean;
    /**
     * Whether to show a loader while the modal content is being loaded.
     * Default is `true`.
     */
    loader?: boolean;
    /**
     * The content to be displayed in the modal dialog.
     * Each item in the array should have a unique `key` and `data`.
     */
    content?: useModalLocalStorageConfigContentProps[];
}
/**
 * Represents a single content item to be displayed in a modal dialog.
 */
export interface useModalLocalStorageConfigContentProps {
    /**
     * Unique key for the content item.
     */
    key: string;
    /**
     * Data to be displayed in the content item.
     */
    data: any;
}

/**
 * Hook for managing modal state and configuration
 * @returns an object with modal state and functions to update it
 */
export const useModalLocalStorage = () => {
    /**
     * Custom hook for managing localStorage state
     */
    const {
        load: loadModal,
        setLocalStorage: setShowModal,
        value: valueModal,
    } = useLocalStorage<useModalLocalStorageConfigProps>({
        name: "fenextjs-modal",
        defaultValue: {
            active: false,
            use: false,
            loader: false,
            content: [],
        },
        parse: JSON.parse,
    });

    /**
     * Function to update a modal property
     * @param id - the name of the property to update
     * @param value - the new value for the property
     */
    const updateModal = (
        id: keyof useModalLocalStorageConfigProps,
        value: any,
    ) => {
        setShowModal({
            ...valueModal,
            [id]: value,
        });
    };

    /**
     * Function to set the entire modal configuration
     * @param value - the new modal configuration
     */
    const setModal = (value: useModalLocalStorageConfigProps) => {
        setShowModal({
            ...valueModal,
            ...value,
        });
    };

    return {
        valueModal,
        loadModal,
        updateModal,
        setModal,
    };
};
