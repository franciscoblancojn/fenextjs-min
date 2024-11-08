
















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
