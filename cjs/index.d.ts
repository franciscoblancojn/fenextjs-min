import React, { ReactNode, PropsWithChildren, CSSProperties, SyntheticEvent, AnchorHTMLAttributes } from "react";
import { LinkProps as LinkNextProps } from "next/link";
import { useLocalStorageProps } from "uselocalstoragenextjs";
import { AutocompleteProps as GoogleAutocompleteProps, LoadScriptProps, GoogleMapProps, MarkerProps } from "@react-google-maps/api";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/storage";
export declare enum Card_Enum {
    VISA = "VISA",
    MASTERCARD = "MASTERCARD",
    AMEX = "AMEX",
    DISCOVER = "DISCOVER",
    DINERS = "DINERS",
    DINERS_CARTE_BLANCHE = "DINERS_CARTE_BLANCHE",
    JCB = "JCB",
    VISA_ELECTRON = "VISA_ELECTRON",
    OTHER = "OTHER"
}
export declare enum RequestResultTypeProps {
    OK = "OK",
    ERROR = "ERROR",
    NONE = "NONE",
    NORMAL = "NORMAL",
    WARNING = "WARNING"
}
export interface RequestResultDataProps<R = any, E = any, T = RequestResultTypeProps | keyof typeof RequestResultTypeProps> {
    type: T;
    result?: R;
    error?: ErrorProps<E>;
    message?: string;
}
export type RequestResultProps<R = any, E = any, T = RequestResultTypeProps> = Promise<RequestResultDataProps<R, E, T>> | RequestResultDataProps<R, E, T>;
export type RequestProps<Q = any, R = any, E = any, T = RequestResultTypeProps> = (data: Q) => RequestResultProps<R, E, T>;
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
export declare enum DaysEnum {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday"
}
export declare enum AlertType {
    OK = "OK",
    ERROR = "ERROR",
    NORMAL = "NORMAL",
    WARNING = "WARNING"
}
export interface AlertProps<T = any> {
    message: string;
    type: AlertType | keyof typeof AlertType;
    data?: T;
}
export declare enum ErrorCode {
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
    GOOGLE_KEY_INVALID = "GOOGLE_KEY_INVALID"
}
export interface ErrorProps<D = any> {
    code?: ErrorCode;
    message?: string;
    data?: D;
}
export type ThemeType = "light" | "dark" | "auto";
export declare const ThemeConst: string[];
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
export declare enum UserTypeVerifyProps {
    email = 0,
    phone = 1,
    company = 2
}
export declare enum UserStatusProps {
    VERIFY = "VERIFY",
    NOVERIFY = "NOVERIFY",
    BAN = "BAN",
    PENDING = "PENDING"
}
export declare enum UserRoleProps {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    BACKOFFICE = "BACKOFFICE"
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
export declare enum FileStatus {
    "NONE" = "NONE",
    "APPROVED" = "APPROVED",
    "PENDING" = "PENDING",
    "REFUSED" = "REFUSED"
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
export declare enum BusinessStatus {
    CLOSED_PERMANENTLY = "CLOSED_PERMANENTLY",
    CLOSED_TEMPORARILY = "CLOSED_TEMPORARILY",
    OPERATIONAL = "OPERATIONAL"
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
    constructor(swOrLatLngBounds?: LatLng | null | LatLngLiteral | LatLngBounds | LatLngBoundsLiteral, ne?: LatLng | null | LatLngLiteral);
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
    constructor(latOrLatLngOrLatLngLiteral: number | LatLngLiteral | LatLng, lngOrNoClampNoWrap?: number | boolean | null, noClampNoWrap?: boolean);
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
    bindTo(key: string, target: MVCObject, targetKey?: string | null, noNotify?: boolean): void;
    get(key: string): any;
    notify(key: string): void;
    set(key: string, value: any): void;
    setValues(values?: object | null): void;
    unbind(key: string): void;
    unbindAll(): void;
}
export declare class Autocomplete extends MVCObject {
    constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions | null);
    getBounds(): LatLngBounds | undefined;
    getFields(): string[] | undefined;
    getPlace(): PlaceResult;
    setBounds(bounds: LatLngBounds | LatLngBoundsLiteral | undefined): void;
    setComponentRestrictions(restrictions: ComponentRestrictions | null): void;
    setFields(fields: string[] | undefined): void;
    setOptions(options: AutocompleteOptions | null): void;
    setTypes(types: string[] | null): void;
}
export interface AutocompleteGoogle extends Autocomplete {
}
export declare enum Unit_Distance {
    MM = "MM",
    CM = "CM",
    M = "M",
    IN = "IN",
    FT = "FT"
}
export declare enum Unit_Weight {
    G = "G",
    KG = "KG",
    OZ = "OZ",
    LB = "LB"
}
export declare enum Unit_Volumen {
    ML = "ML",
    L = "L",
    CC = "CC",
    CM3 = "CM3",
    M3 = "M3",
    IN3 = "IN3",
    FT3 = "FT3",
    GAL = "GAL"
}
export interface ErrorFenextjsProps<D> extends ErrorProps<D> {
    input?: string;
}
export declare class ErrorFenextjs<D = any> extends Error {
    code: ErrorCode;
    message: string;
    msg?: string;
    input?: string;
    data?: D;
    constructor({ code, data, message, input }: ErrorFenextjsProps<D>);
}
export declare class ErrorNetworkError extends ErrorFenextjs {
    constructor();
}
export declare class ErrorUserTokenNotFound extends ErrorFenextjs {
    constructor();
}
export declare class ErrorUserTokenInvalid extends ErrorFenextjs {
    constructor();
}
export declare class ErrorNotImplemented extends ErrorFenextjs {
    constructor();
}
export declare class ErrorTooManyRequests extends ErrorFenextjs {
    constructor();
}
export declare class ErrorUnauthorized extends ErrorFenextjs {
    constructor();
}
export declare class ErrorPageNotFound extends ErrorFenextjs {
    constructor();
}
export declare class ErrorInputValueTooHigh extends ErrorFenextjs {
    constructor(d?: {
        input?: string;
        max?: number | Date;
        message?: string;
    });
}
export declare class ErrorInputOutOfRange extends ErrorFenextjs {
    constructor(d?: {
        input?: string;
        range?: number[];
        message?: string;
    });
}
export declare class ErrorInputTooLong extends ErrorFenextjs {
    constructor(d?: {
        input?: string;
        max?: number | Date;
        message?: string;
    });
}
export declare class ErrorInputValueTooLow extends ErrorFenextjs {
    constructor(d?: {
        input?: string;
        min?: number | Date;
        message?: string;
    });
}
export declare class ErrorInputNotEqual extends ErrorFenextjs {
    constructor(d?: {
        input?: string;
        equal?: any;
        message?: string;
    });
}
export declare class ErrorInputInvalid extends ErrorFenextjs {
    constructor(d?: {
        input?: string;
        message?: string;
    });
}
export declare class ErrorInputLength extends ErrorFenextjs {
    constructor(d?: {
        input?: string;
        length?: number | Date;
        message?: string;
    });
}
export declare class ErrorInputPatternMismatch extends ErrorFenextjs {
    constructor(d?: {
        input?: string;
        message?: string;
    });
}
export declare class ErrorInputRequired extends ErrorFenextjs {
    constructor(d?: {
        input?: string;
        message?: string;
    });
}
export declare class ErrorInputTooShort extends ErrorFenextjs {
    constructor(d?: {
        input?: string;
        min?: number | Date;
        message?: string;
    });
}
export declare class ErrorNotAcceptable extends ErrorFenextjs {
    constructor();
}
export declare class ErrorInternalServerError extends ErrorFenextjs {
    constructor();
}
export declare class ErrorBadRequest extends ErrorFenextjs {
    constructor();
}
export declare class ErrorFileNotFound extends ErrorFenextjs {
    constructor();
}
export declare class ErrorGoogleKeyNotFound extends ErrorFenextjs {
    constructor();
}
export declare class ErrorGoogleKeyInvalid extends ErrorFenextjs {
    constructor();
}
export declare class ErrorServiceUnavailable extends ErrorFenextjs {
    constructor();
}
export declare class ErrorServerError extends ErrorFenextjs {
    constructor();
}
export declare class ErrorDatabaseError extends ErrorFenextjs {
    constructor();
}
export declare class ErrorRequestTimeout extends ErrorFenextjs {
    constructor();
}
export declare class ErrorForbidden extends ErrorFenextjs {
    constructor();
}
export declare class ErrorMethodNotAllowed extends ErrorFenextjs {
    constructor();
}
export declare class ErrorTimeout extends ErrorFenextjs {
    constructor();
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
export declare class FenextjsValidatorClass<T = any> {
    /** Propiedad privada que almacena name del validador. */
    private name?;
    /** Propiedad privada que almacena la clase superior. */
    private parent?;
    /** Propiedad privada que almacena los datos a validar. */
    private data;
    /** Bandera que indica si se debe aplicar la validación "isEqual". */
    private equal;
    /** Valor con el que se compararán los datos en la validación "isEqual". */
    private equalValue;
    /** Bandera que indica si se debe aplicar la validación "isRequired". */
    private required;
    /** Bandera que indica si los datos deben ser un booleano en la validación "isBoolean". */
    private boolean;
    /** Bandera que indica si los datos deben ser un número en la validación "isNumber". */
    private number;
    /** Bandera que indica si los datos deben ser un email en la validación "onEmail". */
    private email;
    /** Bandera que indica si los datos deben ser una cadena en la validación "isString". */
    private string;
    /** Bandera que indica si los datos deben ser una cadena en la validación "isLength". */
    private length;
    /** Valor que contiene las reglas de validación para cada propiedad del objeto en la validación "isLength". */
    private lengthValue;
    /** Bandera que indica si los datos deben ser una cadena en la validación "isCompareRef". */
    private compareRef;
    /** Valor que contiene key para cada propiedad del objeto en la validación "isCompareRef". */
    private compareRefKey;
    /** Valor que contiene las reglas de validación para cada propiedad del objeto en la validación "isCompareRef". */
    private compareRefValue;
    /** Bandera que indica si los datos deben ser una fecha en la validación "isDate". */
    private date;
    /** Bandera que indica si los datos deben ser un objeto en la validación "isObject". */
    private object;
    /** Valor que contiene las reglas de validación para cada propiedad del objeto en la validación "isObject". */
    private objectValue;
    /** Bandera que indica si los datos deben ser una cadena en la validación "isWhen". */
    private when;
    /** Value que contiene la validacion de "isWhen" */
    private whenValue;
    /** Bandera que indica si los datos deben ser un array en la validación "isArray". */
    private array;
    /** Valor que contiene las reglas de validación para cada elemento del array en la validación "isArray". */
    private arrayValue;
    /** Bandera que indica si los datos deben ser mayor que un valor específico en la validación "isMin". */
    private min;
    /** Bandera que indica si los datos deben ser mayor o igual que un valor específico en la validación "isMinOrEqual". */
    private minOrEqual;
    /** Valor con el que se compararán los datos en las validaciones "isMin" y "isMinOrEqual". */
    private minValue;
    /** Bandera que indica si los datos deben ser menor que un valor específico en la validación "isMax". */
    private max;
    /** Bandera que indica si los datos deben ser menor o igual que un valor específico en la validación "isMaxOrEqual". */
    private maxOrEqual;
    /** Valor con el que se compararán los datos en las validaciones "isMax" y "isMaxOrEqual". */
    private maxValue;
    /** Bandera que indica si los datos deben ser una cadena que cumpla la regla regex. */
    private regex;
    /** Valor que contiene las reglas de validación para cada propiedad del objeto en la validación "isRegex". */
    private regexValue;
    /** Bandera que indica si los datos deben ser una cadena que cumpla la regla regex. */
    private custom;
    /** Valor que contiene las reglas de validación para cada propiedad del objeto en la validación "isRegex". */
    private customValue;
    /** Bandera que indica si los datos deben ser una cadena en la validación "isWhen". */
    private or;
    /** Value que contiene la validacion de "isWhen" */
    private orValue;
    private enum;
    /** Valor que contiene las reglas de validación para cada propiedad del objeto en la validación "isEnum". */
    private enumValue;
    /** Mensaje personalizado para error */
    private messageError;
    /**
     * Constructor de la clase FenextjsValidatorClass.
     * @param {FenextjsValidatorClassConstructorProps} props - Opcional. Propiedades que se pueden pasar al constructor.
     *                                                       Un objeto que contiene las propiedades del constructor.
     *                                                       Por ejemplo, puede contener la propiedad "name".
     * @returns {void}
     */
    constructor(props?: FenextjsValidatorClassConstructorProps);
    /**
     * Método para establecer el nombre asociado a la instancia de FenextjsValidatorClass.
     * @param {string} name - El nombre a establecer para la instancia actual de FenextjsValidatorClass.
     * @returns {FenextjsValidatorClass} - La instancia actual de la clase FenextjsValidatorClass, lo que permite el encadenamiento de métodos.
     */
    setName(name: string): this;
    /**
     * Método privado para obtener el nombre completo de la instancia actual de FenextjsValidatorClass.
     * Si esta instancia tiene un padre, obtiene el nombre completo que incluye el nombre de su padre.
     * Si no tiene un padre, devuelve solo el nombre asociado a esta instancia.
     *
     * @returns {string} - El nombre completo de la instancia actual de FenextjsValidatorClass.
     */
    getName(): any;
    /**
     * Método para establecer el padre de la instancia actual de FenextjsValidatorClass.
     * El padre es otra instancia de FenextjsValidatorClass que se utiliza como contexto superior.
     *
     * @param {FenextjsValidatorClass} parent - La instancia de FenextjsValidatorClass que se establecerá como padre.
     * @returns {FenextjsValidatorClass} - La instancia actual de la clase FenextjsValidatorClass, lo que permite el encadenamiento de métodos.
     */
    setParent(parent: FenextjsValidatorClass): this;
    /**
     * Método para definir la validación "isEqual".
     * Establece la regla de que los datos deben ser iguales al valor especificado.
     * @param d - Valor a comparar con los datos.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isEqual(d: T[] | T, msg?: string): this;
    /**
     * Método privado que valida la regla "isEqual".
     * Verifica si los datos son iguales al valor especificado en la regla de validación "isEqual".
     * @throws {ErrorInputInvalid} Si los datos no son iguales al valor especificado.
     * @returns Instancia de FenextjsValidatorClass.
     * @private
     */
    onEqual(): this | undefined;
    /**
     * Método para habilitar la validación "isRequired".
     * Establece la regla de que los datos deben estar presentes y no ser nulos o indefinidos.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isRequired(msg?: string): this;
    /**
     * Método privado que valida la regla "isRequired".
     * Verifica si los datos cumplen con la regla de ser requeridos (estar presentes y no ser nulos o indefinidos).
     * @throws {ErrorInputRequired} Si los datos son nulos, indefinidos o una cadena vacía.
     * @private
     */
    onRequired(): void;
    /**
     * Método para habilitar la validación "isBoolean".
     * Establece la regla de que los datos deben ser de tipo booleano.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isBoolean(msg?: string): this;
    /**
     * Método privado que valida la regla "isBoolean".
     * Verifica si los datos cumplen con la regla de ser de tipo booleano.
     * @throws {ErrorInputInvalid} Si los datos no son de tipo booleano.
     * @private
     */
    onBoolean(): void;
    /**
     * Método para habilitar la validación "isNumber".
     * Establece la regla de que los datos deben ser de tipo número.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isNumber(msg?: string): this;
    /**
     * Método privado que valida la regla "isNumber".
     * Verifica si los datos cumplen con la regla de ser de tipo número.
     * @throws {ErrorInputInvalid} Si los datos no son de tipo número.
     * @private
     */
    onNumber(): void;
    /**
     * Método para habilitar la validación "isString".
     * Establece la regla de que los datos deben ser de tipo cadena (string).
     * @returns Instancia de FenextjsValidatorClass.
     */
    isString(msg?: string): this;
    /**
     * Método privado que valida la regla "isString".
     * Verifica si los datos cumplen con la regla de ser de tipo cadena (string).
     * @throws {ErrorInputInvalid} Si los datos no son de tipo cadena (string).
     * @private
     */
    onString(): void;
    /**
     * Método para habilitar la validación de longitud.
     * Establece la regla de que los datos deben tener una longitud específica.
     *
     * @param {number} length - La longitud que deben tener los datos para que la validación sea válida.
     * @returns {FenextjsValidatorClass} - La instancia actual de la clase FenextjsValidatorClass, lo que permite el encadenamiento de métodos.
     */
    isLength(length: number, msg?: string): this;
    /**
     * Método privado para validar la longitud de los datos.
     * Si se habilitó la validación de longitud con "isLength()", verifica que los datos cumplan con la longitud requerida.
     * Si no se cumple, lanza una excepción "ErrorInputInvalid" con el código "ErrorCode.INPUT_INVALID".
     *
     * @returns {void}
     * @throws {ErrorInputInvalid} - Si los datos no cumplen con la longitud requerida.
     */
    onLength(): void;
    /**
     * Método para habilitar la validación "isDate".
     * Establece la regla de que los datos deben ser de tipo Date (fecha).
     * @returns Instancia de FenextjsValidatorClass.
     */
    isDate(msg?: string): this;
    /**
     * Método privado que valida la regla "isDate".
     * Verifica si los datos cumplen con la regla de ser de tipo Date (fecha).
     * @throws {ErrorInputInvalid} Si los datos no son de tipo Date (fecha).
     * @private
     */
    onDate(): void;
    /**
     * Método para habilitar la validación "isObject".
     * Establece la regla de que los datos deben ser de tipo objeto.
     * @param obj - Objeto con las reglas de validación para cada propiedad del objeto.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isObject(obj: {
        [id in keyof T]?: FenextjsValidatorClass;
    } | undefined, msg?: string): this;
    /**
     * Método para habilitar obtener la validación "isObject".
     * @returns objectValue
     */
    getObjectValidator(): {
        [id in keyof T]?: FenextjsValidatorClass;
    } | undefined;
    /**
     * Método privado que valida la regla "isObject".
     * Verifica si los datos cumplen con la regla de ser de tipo objeto y aplica las reglas de validación para cada propiedad del objeto.
     * @throws {ErrorInputInvalid} Si los datos no son de tipo objeto o alguna propiedad no cumple con las reglas de validación.
     * @private
     */
    onObject(): void;
    /**
     * Método para habilitar la validación "isArray".
     * Establece la regla de que los datos deben ser un array.
     * @param item - Instancia de FenextjsValidatorClass que define las reglas de validación para cada elemento del array.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isArray(item?: FenextjsValidatorClass | undefined, msg?: string): this;
    /**
     * Método privado que valida la regla "isArray".
     * Verifica si los datos cumplen con la regla de ser un array y aplica las reglas de validación para cada elemento del array.
     * @throws {ErrorInputInvalid} Si los datos no son un array o alguno de los elementos no cumple con las reglas de validación.
     * @private
     */
    onArray(): void;
    /**
     * Método public para obtener el valor de validacion de array.
     * @returns {FenextjsValidatorClassIsWhenProps | undefined}
     * @public
     */
    getArrayValue(): FenextjsValidatorClass<any> | undefined;
    /**
     * Método para habilitar la validación "isMin".
     * Establece la regla de que los datos deben ser mayores que un valor específico.
     * @param min - Valor mínimo que los datos deben superar.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isMin(min: number | Date, msg?: string): this;
    /**
     * Método para habilitar la validación "isMinOrEqual".
     * Establece la regla de que los datos deben ser mayores o iguales que un valor específico.
     * @param min - Valor mínimo que los datos deben superar o igualar.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isMinOrEqual(min: number | Date, msg?: string): this;
    /**
     * Método privado que valida las reglas "isMin" y "isMinOrEqual".
     * Verifica si los datos cumplen con las reglas de ser mayores que un valor mínimo o mayores/iguales al valor mínimo.
     * @throws {ErrorInputInvalid} Si los datos no cumplen con las reglas de validación.
     * @private
     */
    onMin(): void;
    /**
     * Método para habilitar la validación "isMax".
     * Establece la regla de que los datos deben ser menores que un valor específico.
     * @param max - Valor máximo que los datos deben ser menores que él.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isMax(max: number | Date, msg?: string): this;
    /**
     * Método para habilitar la validación "isMaxOrEqual".
     * Establece la regla de que los datos deben ser menores o iguales que un valor específico.
     * @param max - Valor máximo que los datos deben ser menores o igual que él.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isMaxOrEqual(max: number | Date, msg?: string): this;
    /**
     * Método privado que valida las reglas "isMax" y "isMaxOrEqual".
     * Verifica si los datos cumplen con las reglas de ser menores que un valor máximo o menores/iguales al valor máximo.
     * @throws {ErrorInputInvalid} Si los datos no cumplen con las reglas de validación.
     * @private
     */
    onMax(): void;
    /**
     * Método para habilitar la comparación de valores de referencia.
     * Establece la regla de que los datos deben ser iguales a otro valor de referencia almacenado en la instancia.
     *
     * @param {string} refKey - La clave que identifica el valor de referencia almacenado en la instancia para la comparación.
     * @returns {FenextjsValidatorClass} - La instancia actual de la clase FenextjsValidatorClass, lo que permite el encadenamiento de métodos.
     */
    isCompareRef(refKey: string, msg?: string): this;
    /**
     * Método para obtener la comparación de valores de referencia.
     *
     * @returns {any} - compareRefKey.
     */
    getCompareRef(): any;
    /**
     * Método privado para establecer el valor de referencia para la comparación.
     * Se utiliza junto con "isCompareRef()" para definir el valor de referencia que se utilizará en la comparación de datos.
     *
     * @param {any} refValue - El valor de referencia que se utilizará en la comparación de datos.
     * @returns {FenextjsValidatorClass} - La instancia actual de la clase FenextjsValidatorClass, lo que permite el encadenamiento de métodos.
     */
    setCompareRef(refValue: any): this;
    /**
     * Método privado para realizar la comparación de valores de referencia.
     * Si se habilitó la comparación de valores de referencia con "isCompareRef()",
     * verifica que los datos sean iguales al valor de referencia establecido con "setCompareRef()".
     * Si no se cumple, lanza una excepción "ErrorInputInvalid" con el código "ErrorCode.INPUT_INVALID".
     *
     * @returns {void}
     * @throws {ErrorInputInvalid} - Si los datos no son iguales al valor de referencia.
     */
    onCompareRef(): void;
    /**
     * Método privado para manejar errores en la validación.
     *
     * @param {ErrorCode} code - Opcional. El código de error que indica el tipo de error ocurrido.
     * @returns {void}
     * @throws {ErrorFenextjs} - Una excepción específica basada en el código de error proporcionado o una excepción general "ErrorFenextjs".
     */
    onError(code?: ErrorCode, message?: string): void;
    /**
     * Método para habilitar la validación "isWhen".
     * Establece la regla de que los comparacion cuando sea correcto la validacion.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isWhen(data: FenextjsValidatorClassIsWhenProps): this;
    /**
     * Método privado que valida la regla "onWhen".
     * Verifica si los datos cumplen con whenIs y when Key para adicionar la la validacion whenThen.
     * @throws {ErrorInputInvalid} Si los datos no son de tipo Date (fecha).
     * @private
     */
    onWhen(): void;
    /**
     * Método public para obtener el valor de validacion de when.
     * @returns {FenextjsValidatorClassIsWhenProps[] | undefined}
     * @public
     */
    getWhenValue(): FenextjsValidatorClassIsWhenProps[] | undefined;
    /**
     * Método para habilitar la validación "isRegex".
     * Establece la regla de que los comparacion cuando sea correcto la validacion.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isRegex(data: RegExp, msg?: string): this;
    /**
     * Método privado que valida la regla "onRegex".
     * Verifica si los datos cumplen con la comparacion con regexValue.
     * @throws {ErrorInputInvalid} Si los datos no cumplen con la compracion.
     * @private
     */
    onRegex(): void;
    /**
     * Método para habilitar la validación "isEmail".
     * Establece la regla de que los comparacion cuando sea correcto la validacion.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isEmail(msg?: string): this;
    /**
     * Método privado que valida la regla "onEmail".
     * Verifica si los datos cumplen con la comparacion con email.
     * @throws {ErrorInputInvalid} Si los datos no cumplen con la compracion.
     * @private
     */
    onEmail(): void;
    /**
     * Método para habilitar la validación "onCustom".
     * Establece la regla de que los comparacion cuando se cumpla una validacion custom.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isCustom(data: (data: T) => true | ErrorFenextjs, msg?: string): this;
    /**
     * Método privado que valida la regla "onCustom".
     * Verifica si los datos cumplen con la comparacion custom.
     * @throws {ErrorInputInvalid} Si los datos no cumplen con la compracion.
     * @private
     */
    onCustom(): void;
    /**
     * Método para definir la validación "isOr".
     * Establece la regla de que los datos deben cumplir al menos una validacion.
     * @param d - Comparador para los datos.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isOr(d: FenextjsValidatorClass[], msg?: string): this;
    /**
     * Método privado que valida la regla "isOr".
     * Verifica si los datos cumplen con almenos una validacion.
     * @throws {ErrorInputInvalid} Si los datos no son iguales al valor especificado.
     * @returns Instancia de FenextjsValidatorClass.
     * @private
     */
    onOr(): this | undefined;
    /**
     * Método para habilitar la validación "isEnum".
     * Establece la regla de que los comparacion cuando sea correcto la validacion.
     * @returns Instancia de FenextjsValidatorClass.
     */
    isEnum(data: object, msg?: string): this;
    /**
     * Método privado que valida la regla "onEnum".
     * Verifica si los datos cumplen con la comparacion con enumValue.
     * @throws {ErrorInputInvalid} Si los datos no cumplen con la compracion.
     * @private
     */
    onEnum(): void;
    /**
     * Método para validar los datos proporcionados según las reglas establecidas.
     * Ejecuta todas las reglas de validación habilitadas previamente para los datos.
     * @param d - Datos que se deben validar.
     * @returns True si los datos cumplen con todas las reglas de validación; de lo contrario, devuelve el error que indica la regla de validación que falló.
     */
    onValidate(d: T): ErrorFenextjs | true;
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
export declare const FenextjsValidator: <T = any>(props?: FenextjsValidatorClassConstructorProps) => FenextjsValidatorClass<T>;
/**
 * Parses a string or number to a formatted number.
 *
 * @param {number|string} n - The number or string to be parsed.
 * @returns {number} A  number.
 */
export declare const parseNumber: (n: number | string) => number;
export declare const parseCountry_to_String: (data: CountryProps | undefined | null) => string | undefined;
export declare const parseString_to_Country: (data: string | undefined | null) => CountryProps | undefined;
export declare const parseCity_to_String: (data: CityProps | undefined | null) => string | undefined;
export declare const parseString_to_City: (data: string | undefined | null) => CityProps | undefined;
export declare const parseCsvToJson: (csv: string) => {
    headers: string[];
    data: any[];
} | {
    headers?: undefined;
    data?: undefined;
};
/**
 * Parses a string or number to a formatted number string with commas separating thousands and optional decimal points.
 *
 * @param {number|string} n - The number or string to be parsed.
 * @returns {string} A formatted string representation of the number.
 */
export declare const parseNumberCount: (n: number | string, options?: Intl.NumberFormatOptions) => string;
export declare const parseState_to_String: (data: StateProps | undefined | null) => string | undefined;
export declare const parseString_to_State: (data: string | undefined | null) => StateProps | undefined;
export declare const parsePhone_to_String: (data: Partial<PhoneProps> | undefined | null) => string;
export declare const parseString_to_Phone: (data: string | undefined | null) => Partial<PhoneProps>;
/**
 * Converts a Date object into a string in the "YYYY-MM-DD" format.
 *
 * @param {Date} date - The Date object to convert.
 * @returns {string} A string representation of the Date object in the "YYYY-MM-DD" format.
 */
export declare const parseDateYYYYMMDD: (date: Date) => string;
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
export declare const parseTextToDate: ({ text, type }: parseTextToDateProps) => Date;
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
export declare const parseDateToText: ({ date, type, }: parseDateToTextProps) => string;
/**
 * Gets the month value in "yyyy-mm" format from a given date.
 * @param {Date} date - The date from which to get the month value.
 * @returns {string} - The month value in "yyyy-mm" format.
 */
export declare const getMonthValue: (date: Date) => string;
/**
 * Gets the week value in "yyyy-Www" format from a given date.
 * @param {Date} date - The date from which to get the week value.
 * @returns {string} - The week value in "yyyy-Www" format.
 */
export declare const getWeekValue: (date: Date) => string;
/**
 * Gets the ISO week number for a given date.
 * @param {Date} date - The date for which to get the ISO week number.
 * @returns {number} - The ISO week number corresponding to the given date.
 */
export declare const getISOWeek: (date: Date) => number;
/**
 * Gets the time value in "hh:mm" format from a given date.
 * @param {Date} date - The date from which to get the time value.
 * @returns {string} - The time value in "hh:mm" format.
 */
export declare const getTimeValue: (date: Date) => string;
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
export declare const getTimeToText: (date: Date, options?: getTimeToTextProps) => string;
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
    timeZoneName?: "short" | "long" | "shortOffset" | "longOffset" | "shortGeneric" | "longGeneric" | undefined;
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
export declare const parseDateTimeFormat: (date: Date, options: parseDateTimeFormatOptions) => string;
/**
 * Converts a number or string to a money format (e.g. "$1,000.00").
 *
 * @param {number | string} n - The number or string to format as money.
 * @returns {string} The money formatted string.
 */
export declare const parseMoney: (n: number | string, options?: Intl.NumberFormatOptions) => string;
export declare const parseAddress_to_String: (data: AddressGoogle | undefined | null) => string;
export declare const parseString_to_Address: (data: string | undefined | null) => AddressGoogle;
export declare const parseBufferToBase64: (buffer: ArrayBuffer) => string;
export type parseEnum_to_V_SW<T extends string, V = string> = {
    [id in T]: V;
};
export interface parseEnum_to_V_Options<V = string> {
    valueNull?: V;
}
export declare const parseEnum_to_V: <T extends string, V = string>(sw: parseEnum_to_V_SW<T, V>, options?: parseEnum_to_V_Options<V> | undefined) => (type?: T | null | undefined) => "" | V;
export type parseEnum_to_String_SW<T extends string> = parseEnum_to_V_SW<T, string>;
export type parseEnum_to_String_Options = parseEnum_to_V_SW<string>;
export declare const parseEnum_to_String: <T extends string>(sw: parseEnum_to_String_SW<T>, options?: parseEnum_to_String_Options) => (type?: T | null | undefined) => string;
export declare const parseCSC_to_CSCString: (data: CSCProps | undefined | null) => CSCStringProps | undefined;
export declare const parseCSCString_to_CSC: (data: CSCStringProps | undefined | null) => CSCProps | undefined;
export interface parseBase64ToImgDataProps {
    name?: string;
    base64: string;
    quality?: number;
}
export declare const parseBase64ToImgData: ({ base64, name, quality, }: parseBase64ToImgDataProps) => Promise<ImgDataProps>;
export interface parseImgBase64ScaleProps {
    base64: string;
    width: number;
    height?: number | "auto";
    quality?: number;
}
export declare const parseImgBase64Scale: ({ base64, width, height, quality, }: parseImgBase64ScaleProps) => Promise<string | undefined>;
/**
 * This function takes in a file and options and returns a promise that resolves with the file contents
 * @param {any} file - The file to be parsed
 * @param {Object} options - The options for parsing the file
 * @param {boolean} options.fileText - Whether or not to read the file as text (defaults to false)
 * @param {function} options.updateProgress - A callback function for updating the progress of reading the file
 * @returns {Promise} - A promise that resolves with the file contents
 */
export declare const parseFile: (file: any, { updateProgress, fileText, }: {
    fileText?: boolean | undefined;
    updateProgress: (progress: number) => void;
}) => Promise<unknown>;
export type Unit_All = Unit_Distance | Unit_Volumen | Unit_Weight;
export declare const parseUnitToText: (unit: Unit_All) => string;
export declare const generateRandomID: () => string;
export declare const GetCardType: (n: number | string) => Card_Enum;
export declare const CONFIG: {
    EMPY: boolean;
    MODATA: boolean;
    LOG: boolean;
};
export interface getBase64ForImageDonwloadProps {
    url: string;
}
export declare const getBase64ForImageDonwload: ({ url, }: getBase64ForImageDonwloadProps) => Promise<string>;
/**
 * Prints a log message to the console if the environment variable
 * `NEXT_PUBLIC_LOG` is equal to "TRUE".
 *
 * @param {any} data - The log message to print.
 * @param {Object} options - The logging options.
 * @param {string} [options.name] - The name of the log message.
 * @param {string} [options.color="white"] - The color of the log message.
 */
export declare const env_log: (data: any, options?: {
    name?: string;
    color?: string;
}) => void;
export declare const GetSpaceParent: (element: HTMLElement) => {
    spaceTop: number;
    spaceLeft: number;
    spaceRight: number;
    spaceBottom: number;
};
export declare const stringifyCircular: (obj: object) => string;
export declare const sleep: (time?: number) => Promise<void>;
export declare const _tValidate: (d: any, _t?: _TFunciton) => any;
export interface FenextFirebaseConstructorProps {
    config: FenextFirebaseConfigProps;
}
export declare class FenextFirebase {
    private config;
    private app;
    database: FenextFirebaseDataBase;
    storega: FenextFirebaseStorage;
    constructor({ config }: FenextFirebaseConstructorProps);
    private getConfig;
    private getApp;
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
export declare class FenextFirebaseStorage {
    private config;
    private app;
    private storega;
    private ref?;
    constructor({ config, app }: FenextFirebaseStorageConstructorProps);
    private getStorage;
    Ref(path: string): this;
    onUploadBase64(base64: string): Promise<unknown>;
    onDelete(): Promise<unknown>;
    onGetBase64(props?: onGetBase64Props): Promise<unknown>;
    onGetUrl(): Promise<unknown>;
}
export interface FenextFirebaseDataBaseConstructorProps {
    app: firebase.app.App;
    config: FenextFirebaseConfigProps;
}
export declare class FenextFirebaseDataBase {
    private config;
    private app;
    private database;
    private ref?;
    constructor({ app, config }: FenextFirebaseDataBaseConstructorProps);
    private getDatabase;
    Ref(path: string): this;
    onGet(query?: string): Promise<any>;
    onSet(value: any): Promise<unknown>;
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
export declare const FenextjsDateCompare: readonly ["Date", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds"];
export type FenextjsDateCompareType = (typeof FenextjsDateCompare)[number];
export declare const FenextjsDateCompareSymbol: readonly ["==", "!=", ">", ">=", "<", "<="];
export type FenextjsDateCompareSymbolType = (typeof FenextjsDateCompareSymbol)[number];
export declare class FenextjsDate {
    date: Date;
    private formats;
    private onCallback;
    private DateByMonth;
    private DateByCalendar;
    constructor(options?: FenextjsDateConstructor);
    setOnCallback(callback: (date: Date) => void): void;
    addTime(time: number): void;
    addMilliseconds(milliseconds: number): void;
    addSeconds(seconds: number): void;
    addMinutes(minutes: number): void;
    addHours(hours: number): void;
    addDate(date: number): void;
    addMonth(month: number): void;
    addYear(year: number): void;
    onFormat(options: FenextjsDateFormatOptions, date?: FenextjsDateValue): string;
    onFormatId(id: string, date?: FenextjsDateValue): string;
    getDateByMonth(): Date[];
    setDateByMonth(DateByMonth: Date[]): void;
    onGenerateDateByMonth(date?: FenextjsDateValue): Date[];
    getDateByCalendar(): Date[];
    setDateByCalendar(DateByCalendar: Date[]): void;
    onGenerateDateByCalendar(date?: FenextjsDateValue): Date[];
    onValidateMinMax({ date, max, min, }: {
        min?: Date;
        max?: Date;
        date?: Date;
    }): boolean;
    onCompareDate({ date, dateCompare: dateCompareProps, compare, }: {
        date?: Date;
        dateCompare: Date;
        compare: {
            [id in FenextjsDateCompareType]?: boolean;
        };
    }): {
        "==": boolean;
        "!=": boolean;
        ">": boolean;
        ">=": boolean;
        "<": boolean;
        "<=": boolean;
    };
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
export declare const useJsonString: <T = any, P = string>({ defaultValueJsonString, onChangeJsonString, parseJson_to_String, parseString_to_Json, valueJsonString, defaultValue, onChange, value, }: useJsonStringProps<T, P>) => {
    value: T | undefined;
    defaultValue: T | undefined;
    onChange: (e: T) => void;
};
export interface useDataValidatorProps<T> {
    data: T;
    validator?: FenextjsValidatorClass<T>;
    autoOnValidate?: boolean;
}
export declare const useDataValidator: <T>({ data, validator, autoOnValidate, }: useDataValidatorProps<T>) => {
    isValidData: true | ErrorFenextjs<any> | undefined;
    onValidateData: () => void;
};
export interface useActionProps<T = any> {
    name: string;
    onActionExecute?: (d?: T) => void;
    env_log?: {
        onActionExecute?: boolean;
        onAction?: boolean;
    };
}
export declare const useAction: <T = any>({ name, onActionExecute, env_log: env_log_boolean, }: useActionProps<T>) => {
    onAction: (detail?: T | undefined) => void;
};
/**
 * Interface to describe the properties of the useValidator hook.
 * @template T - The type of the data to manage.
 */
export interface useValidatorProps<T> {
    data: T;
    validator?: FenextjsValidatorClass<T>;
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
export declare const useValidator: <T>({ data, validator }: useValidatorProps<T>) => {
    error: ErrorFenextjs<any> | undefined;
    isValid: boolean;
    data: T;
    validator: FenextjsValidatorClass<T> | undefined;
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
export declare const useForm: <T, M = any>({ defaultValue, onChangeDisabled, onChangeLoader, onSubmit, validator, onChangeError, ...Options }: useFormProps<T, M>) => {
    error: ErrorFenextjs<any> | undefined;
    disabled: boolean;
    loader: boolean;
    setDisabled: (nData: boolean, optionsData?: setDataOptions) => void;
    setLoader: (nData: boolean, optionsData?: setDataOptions) => void;
    setError: (nData: ErrorFenextjs<any> | undefined, optionsData?: setDataOptions) => void;
    onSubmit: () => Promise<RequestResultDataProps<RequestResultProps<any, any, RequestResultTypeProps>, any, RequestResultTypeProps> | undefined>;
    data: T;
    onChangeData: (id: keyof T) => (value: T[keyof T], _options?: onChangeDataOptionsProps<T> | undefined) => void;
    onDeleteData: (id: keyof T) => void;
    isChange: boolean;
    setData: (nData: T, optionsData?: setDataOptions) => void;
    setDataFunction: (f: (p: T) => T, optionsData?: setDataOptions) => void;
    dataMemo: M;
    setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
    onRestart: () => void;
    onConcatData: (v: T[] | Partial<T>) => void;
    keyData: number;
    setKeyData: React.Dispatch<React.SetStateAction<number>>;
    onReloadKeyData: () => void;
    validator: FenextjsValidatorClass<T> | undefined;
    validatorData: { [id in keyof T]?: FenextjsValidatorClass<any> | undefined; } | undefined;
    validatorMemo: FenextjsValidatorClass<M> | undefined;
    validatorMemoData: { [id_1 in keyof M]?: FenextjsValidatorClass<any> | undefined; } | undefined;
    isValidData: true | ErrorFenextjs<any> | undefined;
    isValidDataMemo: true | ErrorFenextjs<any> | undefined;
    onValidateData: () => void;
    onValidateDataMemo: () => void;
    onSubmitData: (optionsSubmitData?: {
        data?: T | undefined;
        onSaveData?: ((p: {
            data: T;
            result: void;
        }) => T) | undefined;
        useValidator?: boolean | undefined;
    } | undefined) => Promise<void | undefined>;
    onSubmitDataMemo: (optionsSubmitDataMemo?: {
        dataMemo?: M | undefined;
        useValidatorMemo?: boolean | undefined;
    } | undefined) => Promise<void | undefined>;
    loaderSubmit: boolean;
    loaderSubmitMemo: boolean;
    resultSubmitData: void | undefined;
    resultSubmitDataMemo: void | undefined;
    dataError: any;
    dataErrorMemo: any;
    setResultSubmitData: React.Dispatch<React.SetStateAction<void | undefined>>;
    setResultSubmitDataMemo: React.Dispatch<React.SetStateAction<void | undefined>>;
    setDataError: React.Dispatch<any>;
    setDataErrorMemo: React.Dispatch<any>;
};
export interface usePrintDataProps extends Pick<useLocalStorageProps, "parse"> {
}
export declare const usePrintData: <T>({ parse }: usePrintDataProps) => {
    data: T | undefined;
    load: boolean;
};
export interface usePrintIframeProps<T> {
    urlBase?: string;
    url: string;
    data?: T;
    delayForPrint?: number;
}
export declare const usePrintIframe: <T>({ urlBase, url, data, delayForPrint, }: usePrintIframeProps<T>) => {
    loader: boolean;
    onPrint: () => void;
};
/**
 * Custom hook that extends useLocalStorageProps and adds caching functionality.
 * @template T - Type of the data to be stored in local storage.
 * @template O - Type of the options for local storage.
 */
export interface useLocalStorageCache<T = any, O = any> extends useLocalStorageProps<T, O> {
    data: T;
    autoSaveData?: boolean;
    parseDataPreSaveCache?: (data: {
        old?: T;
        news: T;
    }) => T;
}
/**
 * Custom hook that provides caching functionality on top of useLocalStorage.
 * @template T - Type of the data to be stored in local storage.
 * @template O - Type of the options for local storage.
 * @param {useLocalStorageCache<T, O>} props - Configuration properties for the hook.
 * @returns {Object} - An object containing functions and values for managing cached data.
 */
export declare const useLocalStorageCache: <T = any, O = any>({ data, autoSaveData, parseDataPreSaveCache, ...props }: useLocalStorageCache<T, O>) => {
    load: boolean;
    value: T | undefined;
    onSaveCache: (news: T) => void;
    onClearCache: () => void;
    setLocalStorage: (newValue: any) => void;
};
export interface useAlertProps {
    name?: string;
}
export declare const useAlert: <T = any>({ name, }: useAlertProps) => {
    alert: AlertProps<T> | undefined;
    setAlert: (detail?: AlertProps<T> | undefined) => void;
    onClearAlert: () => void;
};
/**
 * Properties to configure the useUser hook.
 */
export interface useUserProps<Q = UserProps, R = any, E = any, T = RequestResultTypeProps> {
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
export declare const useUser: <U = UserProps>({ validateTokenUser: validateTokenUserProps, varName, onValidateUser, urlRedirectInLogut, onLogOut: onLogOutProps, }: useUserProps<U, any, any, RequestResultTypeProps>) => {
    load: boolean;
    user: U | null | undefined;
    setUser: (newValue: any) => void;
    onLogin: (data: U) => Promise<unknown>;
    onLogOut: () => void;
    isValidUser: boolean;
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
export declare const useModal: ({ name, nameLocalStorage, active: activeProps, defaultActive: defaultActiveProps, onActive: onActiveProps, onChange: onChangeProps, onClose: onCloseProps, disabled, activeByNameLocalStorage, activeByNameContentLocalStorage, }: useModalProps) => {
    active: boolean;
    activeNameLast: boolean;
    activeName: boolean;
    listNamesLocalStorage: string[];
    onChange: (d: boolean) => void;
    onActive: () => void;
    onClose: () => void;
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
export declare const useNotification: ({ time }: useNotificationProps) => {
    /**
     * The current notification object
     */
    notification: NotificationDataProps | undefined;
    /**
     * Sets a new notification to be displayed
     */
    pop: (props: NotificationDataProps, options?: NotificationOptions) => void;
    /**
     * Resets the current notification
     */
    reset: () => void;
};
/**
 * Represents the properties for the useCSC hook.
 */
export interface useCSCProps extends useJsonStringProps<CSCProps, CSCStringProps> {
}
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
export declare const useCSC: ({ defaultValue: defaultValueProps, value: valueProps, onChange: onChangeProps, defaultValueJsonString, valueJsonString, onChangeJsonString, parseJson_to_String, parseString_to_Json, }: useCSCProps) => {
    countrys: CountryProps[];
    states: StateProps[];
    citys: CityProps[];
    onChangeCSC: (id: keyof CSCProps) => (v: CountryProps | StateProps | CityProps | undefined) => void;
    value: CSCProps;
    loadCountrys: boolean;
    loadStates: boolean;
    loadCitys: boolean;
};
export declare const useCountryStateCity: ({ defaultValue: defaultValueProps, value: valueProps, onChange: onChangeProps, defaultValueJsonString, valueJsonString, onChangeJsonString, parseJson_to_String, parseString_to_Json, }: useCSCProps) => {
    countrys: CountryProps[];
    states: StateProps[];
    citys: CityProps[];
    onChangeCSC: (id: keyof CSCProps) => (v: CountryProps | StateProps | CityProps | undefined) => void;
    value: CSCProps;
    loadCountrys: boolean;
    loadStates: boolean;
    loadCitys: boolean;
};
/**
 * Properties for the `useRequest` hook.
 */
export interface useRequestProps<Q = any, R = any, E = any, T = RequestResultTypeProps> {
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
export declare const useRequest: <Q = any, R = any, E = any, T = RequestResultTypeProps>({ query, request, autoRequest, defaultError, defaultResult, defaultResultValue, }: useRequestProps<Q, R, E, T>) => {
    result: RequestResultDataProps<R, E, T> | undefined;
    resultValue: R | undefined;
    loader: boolean;
    error: E | undefined;
    onRequest: () => Promise<void>;
};
export interface useRequestFunctionProps<FP, FR, PE = any> {
    f: RequestProps<FP, FR>;
    parseError?: (errors: any) => PE;
    defaultResult?: FR;
    defaultError?: PE;
}
export declare const useRequestFunction: <FP = any, FR = any, PE = any>({ f, parseError, defaultError, defaultResult, }: useRequestFunctionProps<FP, FR, PE>) => {
    loader: boolean;
    error: PE | undefined;
    result: FR | undefined;
    onRequest: (props: FP) => Promise<PE | RequestResultDataProps<FR, any, RequestResultTypeProps>>;
    onRequestWithThrow: (props: FP) => Promise<PE | RequestResultDataProps<FR, any, RequestResultTypeProps>>;
    onClear: () => void;
};
export interface useRequestLiteProps<FP, FR, FE = ErrorFenextjs> {
    f: (data: FP) => Promise<FR>;
    onResult?: (data: FR) => void;
    onError?: (data: FE) => void;
    parseError?: (errors: any) => FE;
    defaultResult?: FR;
    defaultError?: FE;
}
export declare const useRequestLite: <FP, FR, FE = ErrorFenextjs<any>>({ f, onError, onResult, parseError, defaultError, defaultResult, }: useRequestLiteProps<FP, FR, FE>) => {
    loader: boolean;
    error: FE | undefined;
    result: FR | undefined;
    onRequest: (props: FP) => Promise<FR | FE>;
    onClear: () => void;
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
export declare const useQuery: (props?: useQueryProps) => {
    load: boolean;
    query: useQuery_QueryProps;
    setQuery: (query: useQuery_QueryProps) => boolean;
    onConcatQuery: (newQuery: useQuery_QueryProps) => boolean;
    onChangeQuery: (id: keyof useQuery_QueryProps) => (value: string | number | string[] | undefined) => boolean;
    onDeleteQuery: (id: keyof useQuery_QueryProps) => boolean;
    isChange: boolean;
};
export interface use_TProps extends _TProps {
}
export declare const use_T: ({ _t: _tProps, useT }: use_TProps) => {
    _t: (message: any) => any;
};
export interface useDataLayerProps {
}
export interface useDataLayerPushProps {
    event: string;
    value?: any;
    [id: string]: any;
}
export declare const useDataLayer: ({}: useDataLayerProps) => {
    push: ({ event, ...props }: useDataLayerPushProps) => boolean;
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
export interface useDataOptions<T, M = any, RT = void, RM = void, ET = any, EM = any> {
    data?: T;
    refreshDataIfChangeDefaultData?: useDataOptionsRefreshDataIfChangeDefaultDataOptions;
    onChangeDataAfter?: (data: T) => void;
    onDeleteDataAfter?: (data: T) => void;
    onChangeDataMemoAfter?: (data: M) => void;
    onMemo?: (data: T) => M;
    validator?: FenextjsValidatorClass<T>;
    validatorMemo?: FenextjsValidatorClass<M>;
    onSubmitData?: (data: T) => RT | Promise<RT>;
    onAfterSubmitDataOk?: (d: {
        data: T;
        result: RT;
    }) => void;
    onAfterSubmitParseError?: (error: any) => ET;
    onAfterSubmitDataError?: (d: {
        data: T;
        error: ET;
    }) => void;
    afterSubmitDataSetIsChangeFalse?: boolean;
    onSubmitDataMemo?: (data: M) => RM | Promise<RM>;
    onAfterSubmitDataMemoOk?: (d: {
        dataMemo: M;
        result: RM;
    }) => void;
    onAfterSubmitParseErrorMemo?: (error: any) => EM;
    onAfterSubmitDataMemoError?: (d: {
        dataMemo: M;
        error: EM;
    }) => void;
    afterSubmitDataMemoSetIsChangeFalse?: boolean;
    autoOnValidate?: boolean;
    env_log?: {
        [id in useDataOptionsEnvLog]?: boolean;
    };
}
export type useDataOptionsEnvLog = "data" | "dataMemo" | "isValidData" | "isValidDataMemo" | "dataError" | "dataErrorMemo" | "loaderSubmit" | "loaderSubmitMemo" | "keyData" | "isChange";
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
export declare const useData: <T, M = any, RT = void, RM = void, ET = any, EM = any>(defaultData: T, options?: useDataOptions<T, M, RT, RM, ET, EM> | undefined) => {
    data: T;
    onChangeData: (id: keyof T) => (value: T[keyof T], _options?: onChangeDataOptionsProps<T> | undefined) => void;
    onDeleteData: (id: keyof T) => void;
    isChange: boolean;
    setData: (nData: T, optionsData?: setDataOptions) => void;
    setDataFunction: (f: (p: T) => T, optionsData?: setDataOptions) => void;
    dataMemo: M;
    setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
    onRestart: () => void;
    onConcatData: (v: Partial<T> | T[]) => void;
    keyData: number;
    setKeyData: React.Dispatch<React.SetStateAction<number>>;
    onReloadKeyData: () => void;
    validator: FenextjsValidatorClass<T> | undefined;
    validatorData: { [id in keyof T]?: FenextjsValidatorClass<any> | undefined; } | undefined;
    validatorMemo: FenextjsValidatorClass<M> | undefined;
    validatorMemoData: { [id_1 in keyof M]?: FenextjsValidatorClass<any> | undefined; } | undefined;
    isValidData: true | ErrorFenextjs<any> | undefined;
    isValidDataMemo: true | ErrorFenextjs<any> | undefined;
    onValidateData: () => void;
    onValidateDataMemo: () => void;
    onSubmitData: (optionsSubmitData?: {
        data?: T | undefined;
        onSaveData?: ((p: {
            data: T;
            result: RT;
        }) => T) | undefined;
        useValidator?: boolean | undefined;
    } | undefined) => Promise<RT | undefined>;
    onSubmitDataMemo: (optionsSubmitDataMemo?: {
        dataMemo?: M | undefined;
        useValidatorMemo?: boolean | undefined;
    } | undefined) => Promise<RM | undefined>;
    loaderSubmit: boolean;
    loaderSubmitMemo: boolean;
    resultSubmitData: RT | undefined;
    resultSubmitDataMemo: RM | undefined;
    dataError: ET | undefined;
    dataErrorMemo: EM | undefined;
    setResultSubmitData: React.Dispatch<React.SetStateAction<RT | undefined>>;
    setResultSubmitDataMemo: React.Dispatch<React.SetStateAction<RM | undefined>>;
    setDataError: React.Dispatch<React.SetStateAction<ET | undefined>>;
    setDataErrorMemo: React.Dispatch<React.SetStateAction<EM | undefined>>;
};
export interface useDateProps extends FenextjsDateProps {
}
export declare const useDate: ({ ...props }: useDateProps) => FenextjsDate;
export type TypeListenerKeyFunctions = keyof DocumentEventMap;
export type TypeListenerFunctions<K extends TypeListenerKeyFunctions> = (ev: DocumentEventMap[K]) => any;
export type useDocumentEventProps<K extends TypeListenerKeyFunctions> = {
    [id in TypeListenerKeyFunctions]?: TypeListenerFunctions<K>;
};
export declare const useDocumentEvent: <K extends keyof DocumentEventMap = keyof DocumentEventMap>({ ...props }: useDocumentEventProps<K>) => {
    onReload: () => void;
};
export interface useThemeProps {
}
export declare const useTheme: ({}: useThemeProps) => {
    theme: ThemeType | undefined;
    setTheme: (newValue: any) => void;
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
export declare const useModalLocalStorage: () => {
    valueModal: useModalLocalStorageConfigProps | undefined;
    loadModal: boolean;
    updateModal: (id: keyof useModalLocalStorageConfigProps, value: any) => void;
    setModal: (value: useModalLocalStorageConfigProps) => void;
};
export declare const SvgMove: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgClose: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgShareArrow: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgOnlyFans: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgNumberIncrease: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgNumberDecrease: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgBehance: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgSettings: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgFrontIdentification: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCreditCard: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgExclamation: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgPayment: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgLaterIdentification: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgDinersClub: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgSpotify: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgPaypal: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgInstagram: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCancel: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgFacebookF: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgVisa: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgJcb: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCamera: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCamera2: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCameraChange: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgEdit: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgReddit: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgBusiness: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgFacebook: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgFacebookBox: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgManyvids: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgTiktok: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgVerified: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgStar: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgLocation: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgUpload: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgUpload2: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgArrow: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgArrowSelect: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgPinterest: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgClone: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgUnicornWithMoney: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgReload: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgAdd: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgListCheck: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCardVisaElectron: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCardDinersClub: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCardJCB: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCardVisa: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCardAmericanExpress: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCardMasterCard: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCardDiscover: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCryingUnicorn: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgPix: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgTwitch: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgColor: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgBancolombia: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgSave: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgZelle: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgEtsty: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgImgAvatar: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgAmazon: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCams: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgStremate: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgDesktop: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgDesktopLayer: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgPadlock: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgEye: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgEyeBar: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCopy: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCopyBox: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCamsoda: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgDribbble: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgStripe: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgDownload: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCheckSearch: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgDate: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgBars: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgArrowCollapse: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgClicks: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgPaginationUp: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgPaginationPre: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgPaginationNext: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgPaginationDown: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgNequi: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgStripachat: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgSnapchat: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgPlane: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgSoundCloud: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgStack: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgQr: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgMasterCard: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgBorder: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgBongacams: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgFantime: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgX: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgXBox: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgMercadoLibre: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgEarringWatch: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgTrash: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgGoogle: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgSteam: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgVideo: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgSize: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgFont: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgTheme: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCheck2: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgPatreon: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgLinkedin: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgLinkedinBox: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgLink: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgShare: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgNoConfirm: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgEmail: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgEmailBox: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgYoutube: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgDaviplata: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgImg: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgArrowGoBack: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgChaturbate: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgDiscover: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgUnicorn: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgMovil: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgMovilLayer: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgEbay: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgEstadisticas: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgWechat: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgArrowNext: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCrown: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgTwitter: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgTwitterBox: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgSaveCheck: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCheck: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgTelegram: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgUserAccount: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgUserAccount2: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgUserAccount3: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgManageAddresses: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgExit: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgArrowPre: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgWhatsapp: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgWhatsappBox: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgBolt: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgBrush: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgTableBox: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgTableList: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgSelectList: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgSelectNormal: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgSelectBox: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgSearch: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgLoader: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgCashapp: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const FenextImgUserPlaceholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAS10lEQVR4Xu2d/XNU1R3GQYgSCbCBRBIETTAI1KCM71VRW606WttatVYt+G4d+/LntLVqR52qVX6oHdux7Yxoq3W09QUVhZIgoaEESTSRBIOCpZ+H7MoaNpvNZrO7557nzHznJrt3773nc85zv+f9TJvmYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAImYAIVIDC9AveM+pYHDhw4bmBgYO7+/ftnDw0N1WMNBw8enIfVYbXAUZp8MXPmzE+xT2bNmtXHcW9dXd1AKpUa4jhYU1PzRdQQyxh5C6QMsPv7++f29fXNRxgnI4jzueUKbDHWgM3GjsNmYsekBXJIIsEOYPuxfdhubDu2GZG8iVh2NTQ0fFxfXz9UhihEewsLZIqSHk8xY+fOnU3Y6XiGi7jNaqwVW4DVYRlvUegTSDDDabF8xLETexMP82JTU9NWbHdtba2E5VBCAhZICWHqUsPDw8d2dXWdtHv37kv493LsDOwEbC5WU8Lbybt8gn0ooWB/QSR/b2lp2WmhlI6yBVIilvIYEgYe4you+W2sHVMR6vgS3SLfZT7lyz3YP7FnEMrfVq5cuasM9038LSyQEiRxd3f3CYhjDUWpm7jcuVgTpnpFuYPqKhLGBopej+JN3m9ubpaXcSiSgAVSJDj9jOJUzZYtW1ZQ+V7Hv9dgJ2GqdFc6DPAAW7H1VOTXr1q1akelHyjU+1sgRaacWqY2bdr0DbzG3VziPKyxyEtN1c9UqZc3eQFv8sv29vZ358yZIw/jMAECFsgEYGVOpUi1oLOz8wb+lzhWVonXGCsme/niXezhtra2Z5csWdJXRJSj/YkFMsGk3759u+obt/Oz27BlWClbpib4NAWf/jlndmCqlzzW2tqqli+HAghYIAVAypyCOBYijrv4/w5sKaaOvVCC+kg+wB5DJA8ikp5QHrySz2mBFEg/7TnuzRJHgb+sutPU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";
export declare const FenextImgPlaceholder = "data:image/png;base64,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";
export interface ChatProps {
    loader?: boolean;
    useAccountOwner?: boolean;
    onScrollIfNewMessage?: boolean;
    onActionAfterNewMessage?: () => void;
    empty?: ReactNode;
    chatUser: ChatUserProps | ChatUserProps[];
    loaderChatUser?: boolean;
    chatMessage: ChatMessageProps[];
    loaderChatMessage?: boolean;
    chatFormSendMessage: ChatFormSendMessageProps;
    loaderChatFormSendMessage?: boolean;
    useBtnLoadMoreMssages?: boolean;
    btnLoadMoreMessages?: ButtonProps;
    fullPage?: boolean;
}
export declare const Chat: ({ loader, empty, chatUser, loaderChatUser, chatMessage, loaderChatMessage, chatFormSendMessage, loaderChatFormSendMessage, useBtnLoadMoreMssages, btnLoadMoreMessages, fullPage, onScrollIfNewMessage, ...props }: ChatProps) => React.JSX.Element;
export interface ChatMessageProps {
    id: string | number;
    loader?: boolean;
    right?: boolean;
    account?: Partial<UserProps>;
    message?: ReactNode;
    createdAt?: Date;
    view?: boolean;
    imgProps?: Partial<ImgProps>;
}
export declare const ChatMessage: ({ message, createdAt, account, right, view, loader, imgProps, }: ChatMessageProps) => React.JSX.Element;
export interface ChatFormSendMessageDataProps {
    message: string;
}
export interface ChatFormSendMessageProps extends _TProps {
    onSubmit?: RequestProps<ChatFormSendMessageDataProps, RequestResultProps>;
    loader?: boolean;
    useSubmitInEnter?: boolean;
    btnChildren?: ReactNode;
    placeholderMessage?: string;
}
export declare const ChatFormSendMessage: ({ useSubmitInEnter, btnChildren, placeholderMessage, ...props }: ChatFormSendMessageProps) => React.JSX.Element;
export interface ChatUserProps extends Partial<UserProps> {
    loader?: boolean;
    imgProps?: Partial<ImgProps>;
    extraData?: ReactNode;
}
export declare const ChatUser: ({ name, img, role, imgProps, loader, extraData, }: ChatUserProps) => React.JSX.Element;
/**
 * Properties for the base Text component.
 */
export interface TextBaseProps extends PropsWithChildren, _TProps {
    /**
     * The class name for the component.
     */
    tag?: "p" | "strong" | "small" | "em" | "b" | "del" | "i" | "mark" | "ins" | "sub" | "sup";
    /**
     * The loader for the component.
     */
    loader?: boolean;
    /**
     * The nLineLoader for the component.
     */
    nLineLoader?: number;
}
/**
 * Properties for the class of the Text component.
 */
export interface TextClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the Text component.
 */
export interface TextProps extends TextBaseProps, TextClassProps {
}
export declare const Text: ({ className, tag, loader, children, nLineLoader, ...props }: TextProps) => React.JSX.Element;
/**
 * Properties for the base ContentShow component.
 */
export interface ContentShowBaseProps extends _TProps {
    /**
     * The children for the component.
     */
    children?: ReactNode;
    /**
     * The show for the component.
     */
    show?: boolean;
}
/**
 * Properties for the class of the ContentShow component.
 */
export interface ContentShowClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the ContentShow component.
 */
export interface ContentShowProps extends ContentShowBaseProps, ContentShowClassProps {
}
export declare const ContentShow: ({ className, children, show, ...props }: ContentShowProps) => React.JSX.Element;
/**
 * Properties for the Title component.
 */
export interface TitleProps extends PropsWithChildren, _TProps {
    /**
     * The class name for the component.
     */
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    /**
     * The loader for the component.
     */
    loader?: boolean;
    /**
     * The class name for the component.
     */
    className?: string;
}
export declare const Title: ({ className, tag, loader, children, ...props }: TitleProps) => React.JSX.Element;
/**
 * Properties for the base Breadcrumb Link component.
 */
export interface BreadcrumbLinkProps extends _TProps {
    /**
     * Url of the redirect.
     */
    href: string;
    /**
     * Content of the Link.
     */
    children: ReactNode;
    /**
     * onClick of the Link.
     */
    onClick?: () => void;
}
/**
 * Properties for the base Breadcrumb component.
 */
export interface BreadcrumbBaseProps extends _TProps {
    /**
     * List of the Links for Breadcrymb.
     */
    links: BreadcrumbLinkProps[];
}
/**
 * Properties for the class of the Breadcrumb component.
 */
export interface BreadcrumbClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the Items.
     */
    classNameItem?: string;
    /**
     * The class name for the Link.
     */
    classNameLink?: string;
}
/**
 * Properties for the Breadcrumb component.
 */
export interface BreadcrumbProps extends BreadcrumbBaseProps, BreadcrumbClassProps {
}
export declare const Breadcrumb: ({ className, classNameItem, classNameLink, links, ...props }: BreadcrumbProps) => React.JSX.Element;
/**
 * Properties for the base SwichViewList component.
 */
export interface SwichViewListBaseItemProps<T> {
    id: T;
    icon: ReactNode;
}
/**
 * Properties for the base SwichViewList component.
 */
export interface SwichViewListBaseProps<T> extends _TProps {
    name?: string;
    /**
     * The class name for the component.
     */
    list?: SwichViewListBaseItemProps<T>[];
    /**
     * The class name for the component.
     */
    defaultValue?: T;
    /**
     * The class name for the component.
     */
    onChange?: (e?: T) => void;
}
/**
 * Properties for the class of the SwichViewList component.
 */
export interface SwichViewListClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the SwichViewList component.
 */
export interface SwichViewListProps<T> extends SwichViewListBaseProps<T>, SwichViewListClassProps {
}
export declare const SwichViewList: <T>({ className, defaultValue, onChange, list, name, }: SwichViewListProps<T>) => React.JSX.Element;
export type SwichViewTableType = "fenext-swich-view-table-box" | "fenext-swich-view-table-list";
/**
 * Properties for the base SwichViewTable component.
 */
export interface SwichViewTableBaseProps extends Omit<SwichViewListBaseProps<SwichViewTableType>, "list" | "name"> {
}
/**
 * Properties for the class of the SwichViewTable component.
 */
export interface SwichViewTableClassProps extends SwichViewListClassProps {
}
/**
 * Properties for the SwichViewTable component.
 */
export interface SwichViewTableProps extends SwichViewTableBaseProps, SwichViewTableClassProps {
}
export declare const SwichViewTable: ({ className, defaultValue, ...props }: SwichViewTableProps) => React.JSX.Element;
export type SwichViewSelectType = "fenext-swich-view-select-box" | "fenext-swich-view-select-list" | "fenext-swich-view-select-normal";
/**
 * Properties for the base SwichViewSelect component.
 */
export interface SwichViewSelectBaseProps extends Omit<SwichViewListBaseProps<SwichViewSelectType>, "list" | "name"> {
}
/**
 * Properties for the class of the SwichViewSelect component.
 */
export interface SwichViewSelectClassProps extends SwichViewListClassProps {
}
/**
 * Properties for the SwichViewSelect component.
 */
export interface SwichViewSelectProps extends SwichViewSelectBaseProps, SwichViewSelectClassProps {
}
export declare const SwichViewSelect: ({ className, defaultValue, ...props }: SwichViewSelectProps) => React.JSX.Element;
/**
 * Properties for the base TableActionCheckbox component.
 */
export interface TableActionCheckboxBaseProps<T> extends _TProps {
    /**
     * The actionAllCheckbox for the component.
     */
    actionAllCheckbox?: InputCheckboxProps;
    /**
     * The actions for the component.
     */
    actions?: ((data: T[]) => ReactNode)[];
    /**
     * The data for the component.
     */
    data?: T[];
}
/**
 * Properties for the class of the TableActionCheckbox component.
 */
export interface TableActionCheckboxClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the TableActionCheckbox component.
 */
export interface TableActionCheckboxProps<T> extends TableActionCheckboxBaseProps<T>, TableActionCheckboxClassProps {
}
export declare const TableActionCheckbox: <T = any>({ className, actionAllCheckbox, actions, data, }: TableActionCheckboxProps<T>) => React.JSX.Element;
/**
 * Properties for the base MediaInput component.
 */
export interface MediaInputBaseProps extends _TProps {
    /**
     * The titleView for the component.
     */
    titleView?: string;
    /**
     * The titleView for the component.
     */
    textView?: string;
    /**
     * The iconView for the component.
     */
    iconView?: ReactNode;
    /**
     * The defaultValue for the component.
     */
    defaultValue?: ImgDataProps[] | ImgDataProps;
    /**
     * The multiple for the component.
     */
    multiple?: boolean;
    /**
     * The onChange for the component.
     */
    onChange?: (data: ImgDataProps[] | ImgDataProps | undefined) => void;
    /**
     * The ButtonUploadProps for the component.
     */
    ButtonUploadProps?: Omit<ButtonProps, "onClick">;
    /**
     * The MediaPageProps for the component.
     */
    MediaPageProps?: Omit<MediaPageProps, "onChange" | "multiple" | "defaultValue">;
    /**
     * The ModalProps for the component.
     */
    ModalProps?: Pick<ModalBaseBaseProps, "type">;
}
/**
 * Properties for the class of the MediaInput component.
 */
export interface MediaInputClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the MediaInput component.
 */
export interface MediaInputProps extends MediaInputBaseProps, MediaInputClassProps {
}
export declare const MediaInput: ({ className, titleView, textView, iconView, defaultValue, multiple, onChange, ButtonUploadProps, MediaPageProps, ModalProps, ...props }: MediaInputProps) => React.JSX.Element;
/**
 * Properties for the base MediaPage component.
 */
export interface MediaPageBaseProps extends _TProps {
    /**
     * The defaultValue for the component.
     */
    defaultValue?: ImgDataProps[] | ImgDataProps;
    /**
     * The disabledSelectImg for the component.
     */
    disabledSelectImg?: boolean;
    /**
     * The images for the component.
     */
    images?: ImgDataProps[];
    /**
     * The loaderImages for the component.
     */
    loaderImages?: boolean;
    /**
     * The multiple for the component.
     */
    multiple?: boolean;
    /**
     * The isPage for the component.
     */
    isPage?: boolean;
    /**
     * The onChange for the component.
     */
    onRenderImg?: (data: ImgDataProps) => ReactNode;
    /**
     * The onChange for the component.
     */
    onChange?: (data: ImgDataProps[] | ImgDataProps | undefined) => void;
    /**
     * The onUploadImg for the component.
     */
    onUploadImg?: (data: ImgDataProps) => void;
    /**
     * The onDeleteImg for the component.
     */
    onDeleteImg?: (data: ImgDataProps) => void;
    /**
     * The onAcepte for the component.
     */
    onAcepte?: (data: ImgDataProps[] | ImgDataProps) => void;
    /**
     * The HeaderPage for the component.
     */
    HeaderPage?: ReactNode;
    /**
     * The ButtonAcceptProps for the component.
     */
    ButtonAcceptProps?: Omit<ButtonProps, "onClick">;
    /**
     * The ButtonCancelProps for the component.
     */
    ButtonCancelProps?: Omit<ButtonProps, "onClick">;
    /**
     * The HeaderPage for the component.
     */
    InputUploadProps?: Omit<InputUploadProps, "onChange" | "defaultValue" | "onChangeProgress" | "onUploadFile" | "clearAfterUpload">;
    /**
     * The extraContentImgs for the component.
     */
    extraContentImgs?: ReactNode;
}
/**
 * Properties for the class of the MediaPage component.
 */
export interface MediaPageClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the MediaPage component.
 */
export interface MediaPageProps extends MediaPageBaseProps, MediaPageClassProps {
}
export declare const MediaPage: ({ className, multiple, onChange, onUploadImg, onDeleteImg, onAcepte, HeaderPage, defaultValue, images, loaderImages, disabledSelectImg, InputUploadProps, ButtonAcceptProps, ButtonCancelProps, isPage, extraContentImgs, onRenderImg, ...props }: MediaPageProps) => React.JSX.Element;
/**
 * Properties for the Cols component.
 */
export interface ColsProps extends _TProps {
    /**
     * The nCols for the component.
     */
    nCols?: number | string;
    /**
     * The breakInside for the component.
     */
    breakInside?: boolean;
    /**
     * The children for the component.
     */
    children?: ReactNode;
    /**
     * The class name for the component.
     */
    className?: string;
}
export declare const Cols: ({ className, children, nCols, breakInside, ...props }: ColsProps) => React.JSX.Element;
export type ButtonBaseSize = "extra-small" | "small" | "normal" | "strong" | "extra-strong";
export type ButtonOnClick = React.MouseEventHandler<HTMLButtonElement> & React.MouseEventHandler<HTMLDivElement>;
/**
 * Properties for the base button component.
 */
export interface ButtonBaseProps extends PropsWithChildren, _TProps {
    /**
     * Indicates whether the button is currently in the loading state.
     */
    loader?: boolean;
    /**
     * Indicates whether the button is disabled or not.
     */
    disabled?: boolean;
    /**
     * The callback function that is called when the button is clicked.
     */
    onClick?: ButtonOnClick;
    /**
     * The callback function that is called when the button is clicked as disabled.
     */
    onClickDisabled?: ButtonOnClick;
    /**
     * The icon to display in the button.
     */
    icon?: ReactNode;
    /**
     * Indicates whether the component should render as a button element.
     */
    isBtn?: boolean;
    /**
     * The Size of Button.
     */
    size?: ButtonBaseSize;
    /**
     * The Size  Full of Button.
     */
    full?: boolean;
}
/**
 * Properties for the class of the button component.
 */
export interface ButtonClassProps extends LoaderClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the button component.
 */
export interface ButtonProps extends ButtonBaseProps, ButtonClassProps {
}
export declare const Button: ({ className, classNameLoader, children, loader, disabled, onClick, onClickDisabled, icon, isBtn, full, size, ...props }: ButtonProps) => React.JSX.Element;
/**
 * Properties for the base button component.
 */
export interface LayoutGridMenuLeftBaseProps extends PropsWithChildren {
    /**
     * Indicates if render componenet alert hook.
     */
    useAlertHook?: boolean;
    /**
     * props for alert hook.
     */
    alertHookProps?: AlertHookProps;
    /**
     * Indicates whether the page is currently in the loading state.
     */
    loader?: boolean;
    /**
     * Menu Left of Layout.
     */
    menuLeft?: ReactNode;
    /**
     * Menu Top of Layout.
     */
    menuLeftActive?: boolean;
    /**
     * Menu Top of Layout.
     */
    menuLeftMovilActive?: boolean;
    /**
     * useHeaderButtonMenu for show menu.
     */
    useHeaderButtonMenu?: boolean;
    /**
     * Use page progress bar.
     */
    usePageProgress?: boolean;
    /**
     * target for btn.
     */
    target?: string;
}
/**
 * Properties for the class of the button component.
 */
export interface LayoutGridMenuLeftClassProps extends LoaderClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the Menu Left element.
     */
    classNameMenuLeft?: string;
    /**
     * The class name for the Menu Left element.
     */
    classNameMenuLeftContent?: string;
    /**
     * The class name for the Content Children element.
     */
    classNameChildren?: string;
}
/**
 * Properties for the button component.
 */
export interface LayoutGridMenuLeftProps extends LayoutGridMenuLeftBaseProps, LayoutGridMenuLeftClassProps {
}
export declare const LayoutGridMenuLeft: ({ className, classNameLoader, classNameChildren, classNameMenuLeft, classNameMenuLeftContent, children, menuLeft, loader, menuLeftActive, menuLeftMovilActive, useHeaderButtonMenu, usePageProgress, useAlertHook, alertHookProps, target, ...props }: LayoutGridMenuLeftProps) => React.JSX.Element;
/**
 * Properties for the base button component.
 */
export interface LayoutGridMenuTopLeftBaseProps extends LayoutGridMenuTopBaseProps, LayoutGridMenuLeftBaseProps {
}
/**
 * Properties for the class of the button component.
 */
export interface LayoutGridMenuTopLeftClassProps extends LayoutGridMenuTopClassProps, LayoutGridMenuLeftClassProps, LoaderClassProps {
}
/**
 * Properties for the button component.
 */
export interface LayoutGridMenuTopLeftProps extends LayoutGridMenuTopLeftBaseProps, LayoutGridMenuTopLeftClassProps {
}
export declare const LayoutGridMenuTopLeft: ({ className, classNameLoader, classNameChildren, classNameMenuTop, classNameMenuLeft, classNameMenuLeftContent, children, menuLeft, menuTop, loader, menuLeftActive, menuLeftMovilActive, useHeaderButtonMenu, usePageProgress, alertHookProps, useAlertHook, target, }: LayoutGridMenuTopLeftProps) => React.JSX.Element;
/**
 * Properties for the base button component.
 */
export interface LayoutGridMenuTopBaseProps extends PropsWithChildren {
    /**
     * Indicates if render componenet alert hook.
     */
    useAlertHook?: boolean;
    /**
     * props for alert hook.
     */
    alertHookProps?: AlertHookProps;
    /**
     * Indicates whether the page is currently in the loading state.
     */
    loader?: boolean;
    /**
     * Menu Top of Layout.
     */
    menuTop?: ReactNode;
    /**
     * Use page progress bar.
     */
    usePageProgress?: boolean;
}
/**
 * Properties for the class of the button component.
 */
export interface LayoutGridMenuTopClassProps extends LoaderClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the Menu Top element.
     */
    classNameMenuTop?: string;
    /**
     * The class name for the Content Children element.
     */
    classNameChildren?: string;
}
/**
 * Properties for the button component.
 */
export interface LayoutGridMenuTopProps extends LayoutGridMenuTopBaseProps, LayoutGridMenuTopClassProps {
}
export declare const LayoutGridMenuTop: ({ className, classNameLoader, classNameChildren, classNameMenuTop, children, menuTop, loader, usePageProgress, useAlertHook, alertHookProps, ...props }: LayoutGridMenuTopProps) => React.JSX.Element;
/**
 * Properties for the Container component.
 */
export interface ContainerProps extends PropsWithChildren, _TProps {
    /**
     * The Custom Size of Container / 16 * rem.
     */
    customSize?: number;
    /**
     * Use Padding Inline in Container.
     */
    usePaddingInline?: boolean;
    /**
     * The class name for the component.
     */
    className?: string;
}
export declare const Container: ({ className, customSize, usePaddingInline, children, ...props }: ContainerProps) => React.JSX.Element;
/**
 * Properties for the StepsCircleItemProps component.
 */
export interface StepsCircleItemProps {
    children?: ReactNode;
    onClick?: () => void;
}
/**
 * Properties for the class of the StepsCircle component.
 */
export interface StepsCircleProps {
    /**
     * The class name for the component.
     */
    className?: string;
    items?: StepsCircleItemProps[];
    defaultStep?: number;
    valueStep?: number;
    disabled?: boolean;
}
export declare const StepsCircle: ({ className, defaultStep, valueStep, disabled, items, }: StepsCircleProps) => React.JSX.Element;
/**
 * Properties for the base ButtonMenu component.
 */
export interface ButtonMenuBaseProps extends PropsWithChildren, _TProps {
    /**
     * Indicates whether the Collapse is currently in the loading state.
     */
    loader?: boolean;
    /**
     * Indicates whether the Collapse is disabled or not.
     */
    disabled?: boolean;
    /**
     * Indicates whether the Collapse is defaultActive for show.
     */
    defaultActive?: boolean;
    /**
     * target for btn.
     */
    target?: string;
}
/**
 * Properties for the class of the ButtonMenu component.
 */
export interface ButtonMenuClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name Icon for the component.
     */
    classNameIcon?: string;
    /**
     * The class name Icon for the component.
     */
    classNameIconBarClose?: string;
    /**
     * The class name for content children.
     */
    classNameContent?: string;
}
/**
 * Properties for the ButtonMenu component.
 */
export interface ButtonMenuProps extends ButtonMenuBaseProps, ButtonMenuClassProps {
}
export declare const ButtonMenu: ({ className, classNameIcon, classNameIconBarClose, classNameContent, loader, disabled, defaultActive: defaultActiveProps, children, target, ...props }: ButtonMenuProps) => React.JSX.Element;
/**
 * Properties for the base Menu component.
 */
export interface MenuBaseProps extends _TProps {
    /**
     * The class name for the component.
     */
    items?: ItemMenuProps[];
    /**
     * iconArrow of Collapse.
     * @default ArrowCollapse
     */
    iconArrow?: ReactNode;
    /**
     * type of collapse.
     */
    typeCollapse?: "radio" | "checkbox";
}
/**
 * Properties for the class of the Menu component.
 */
export interface MenuClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * defaultShowSubMenu for the component.
     * @default false
     */
    defaultShowSubMenu?: boolean;
}
/**
 * Properties for the Menu component.
 */
export interface MenuProps extends MenuBaseProps, MenuClassProps {
}
export declare const Menu: ({ className, items, defaultShowSubMenu, iconArrow, typeCollapse, ...props }: MenuProps) => React.JSX.Element;
/**
 * Properties for the base ItemMenu component.
 */
export interface ItemMenuBaseProps extends _TProps {
    /**
     * Url of page in Menu Item.
     */
    url: string;
    /**
     * Text of page in Menu Item.
     */
    text: ReactNode;
    /**
     * Icon of page in Menu Item.
     */
    icon?: ReactNode;
    /**
     * Sub page in Menu Item.
     */
    subItems?: Omit<ItemMenuProps, "_t">[];
    /**
     * Indicates whether the Collapse is defaultActive for show.
     */
    defaultActive?: boolean;
    /**
     * iconArrow of Collapse.
     * @default ArrowCollapse
     */
    iconArrow?: ReactNode;
    /**
     * nameNumber of Collapse.
     * @default 1
     */
    nameNumber?: number;
    /**
     * type of collapse.
     */
    typeCollapse?: "radio" | "checkbox";
    /**
     * isLink.
     */
    isLink?: boolean;
    /**
     * isLink.
     */
    onClick?: () => void;
}
/**
 * Properties for the class of the ItemMenu component.
 */
export interface ItemMenuClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name <a> for the component.
     */
    classNameA?: string;
    /**
     * The class name text for the component.
     */
    classNameText?: string;
    /**
     * The class name icon for the component.
     */
    classNameIcon?: string;
}
/**
 * Properties for the ItemMenu component.
 */
export interface ItemMenuProps extends ItemMenuBaseProps, ItemMenuClassProps {
}
export declare const ItemMenu: ({ className, classNameA, classNameIcon, classNameText, text, url, icon, subItems, defaultActive, iconArrow, nameNumber, typeCollapse, isLink, onClick, ...props }: ItemMenuProps) => React.JSX.Element;
/**
 * Properties for the base Box component.
 */
export interface BoxBaseProps extends PropsWithChildren, _TProps {
}
/**
 * Properties for the class of the Box component.
 */
export interface BoxClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the Box component.
 */
export interface BoxProps extends BoxBaseProps, BoxClassProps {
}
export declare const Box: ({ className, children }: BoxProps) => React.JSX.Element;
/**
 * Props for InputNumber component.
 */
export interface InputNumberProps extends Omit<InputTextProps, "defaultValue" | "onChange" | "onChangeValidate" | "value"> {
    /**
     * The default value of the input.
     * @default ""
     */
    value?: number | "";
    /**
     * The default value of the input.
     * @default ""
     */
    defaultValue?: number | "";
    /**
     * The callback function that is triggered when the value of the input changes.
     */
    onChange?: (v: number | "") => void;
    /**
     * The callback function that is triggered when the input loses focus, after the value has been validated.
     */
    onChangeValidate?: (v: number | "") => void;
    /**
     * The minimum value allowed for the input.
     */
    min?: number;
    /**
     * The maximum value allowed for the input.
     */
    max?: number;
    /**
     * The useBtnIncreaseDecrease show btn.
     */
    useBtnIncreaseDecrease?: boolean;
    /**
     * The disabledScroll.
     */
    disabledScroll?: boolean;
}
export declare const InputNumber: ({ defaultValue, onChange, useBtnIncreaseDecrease, validator, value, disabledScroll, ...props }: InputNumberProps) => React.JSX.Element;
export type InputTextChangeEvent = React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>;
/**
 * Interface that defines CSS class properties for a text input component.
 */
export interface InputTextClassProps {
    /**
     * CSS class name for the input label.
     */
    classNameLabel?: string;
    /**
     * CSS class name for the input error label.
     */
    classNameLabelError?: string;
    /**
     * CSS class name for the input validation label.
     */
    classNameLabelOk?: string;
    /**
     * CSS class name for the input container.
     */
    classNameContentInput?: string;
    /**
     * CSS class name for the input.
     */
    classNameInput?: string;
    /**
     * CSS class name for the enabled input.
     */
    classNameInputEnabled?: string;
    /**
     * CSS class name for the disabled input.
     */
    classNameInputDisabled?: string;
    /**
     * CSS class name for the input icon.
     */
    classNameIcon?: string;
    /**
     * CSS class name for the input error message.
     */
    classNameError?: string;
    /**
     * CSS class name for the input options container.
     */
    classNameOptions?: string;
    /**
     * CSS class name for each input option.
     */
    classNameOption?: string;
    /**
     * CSS class name for a disabled input option.
     */
    classNameOptionDisabled?: string;
    /**
     * CSS class name for the input validation loader.
     */
    classNameLoaderValidate?: string;
    /**
     * Icon to display while validating the input.
     */
    iconLoader?: any;
}
/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputTextBaseProps extends _TProps {
    /**
     * ID of Input.
     */
    id?: string;
    /**
     * Name of Input.
     */
    name?: string;
    /**
     * Datalist name of Input.
     */
    datalist?: any;
    /**
     * FenextjsValidatorClass used for input validation.
     */
    validator?: FenextjsValidatorClass;
    /**
     * Label text to display for the input.
     */
    label?: ReactNode;
    /**
     * Placeholder text to display in the input field.
     */
    placeholder?: string;
    /**
     * Placeholder text to display in the input field.
     */
    placeholderFocus?: string;
    /**
     * Default value to set for the input field.
     */
    defaultValue?: string | undefined | null;
    /**
     * Value to set for the input field.
     */
    value?: string | undefined | null;
    /**
     * Type of input to display (e.g. text, number, password, etc.).
     */
    type?: "text" | "search" | "tel" | "url" | "password" | "number" | "textarea";
    /**
     * Function to call when the input value changes.
     */
    onChange?: (v: string) => void;
    /**
     * Function to call when the input loses focus.
     */
    onBlur?: (v: string) => void;
    /**
     * Function to call when the Enter key is pressed.
     */
    onEnter?: () => void;
    /**
     * Function to call for custom input validation.
     */
    onChangeValidate?: (e: string) => Promise<string> | string;
    /**
     * Additional properties to pass to the input component.
     */
    props?: any;
    /**
     * Icon to display inside the input field.
     */
    icon?: ReactNode;
    /**
     * Position of Icon to display inside the input field.
     */
    iconPos?: "left" | "right";
    /**
     * Extra content to display inside the input container.
     */
    extraInContentInput?: ReactNode;
    /**
     * Extra content to display inside the input label.
     */
    extraInLabel?: ReactNode;
    /**
     * Boolean value indicating whether the input field is disabled.
     */
    disabled?: boolean;
    /**
     * Boolean value indicating whether to display the input icon.
     */
    showIcon?: boolean;
    /**
     * CSS class name for the input component.
     */
    className?: string;
    /**
     * Text of Error of Input.
     */
    error?: ErrorFenextjs;
    /**
     * Show error if IsChange.
     */
    errorWithIsChange?: boolean;
    /**
     * Optional of Input.
     */
    optional?: boolean;
    /**
     * Optional text of Input.
     */
    optionalText?: string;
    /**
     * Optional of Input.
     */
    required?: boolean;
    /**
     * Optional text of Input.
     */
    requiredText?: string;
    /**
     * Loader of Input.
     */
    loader?: boolean;
    /**
     * Loader of Input.
     */
    isChange?: boolean;
    /**
     * useLoader of Input.
     */
    useLoader?: boolean;
    /**
     * inputMode of Input.
     */
    inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
    /**
     * AutoComplete of Input.
     */
    autoComplete?: boolean;
    /**
     * onKeyDown of Input.
     */
    onKeyDown?: (React.KeyboardEventHandler<HTMLTextAreaElement> & React.KeyboardEventHandler<HTMLInputElement>) | undefined;
    onWheel?: (React.WheelEventHandler<HTMLTextAreaElement> & React.WheelEventHandler<HTMLInputElement>) | undefined;
    /**
     * maxLength of Input.
     */
    maxLength?: number;
    /**
     * regExp of Input.
     */
    regExp?: RegExp;
    /**
     * regExpReplace of Input.
     */
    regExpReplace?: string;
    /**
     * parseText of Input.
     */
    parseText?: (data: string) => string;
    /**
     * onChangeEvent of Input.
     */
    onChangeEvent?: (e: InputTextChangeEvent) => void;
    /**
     * showFocusInTarget of Input.
     */
    showFocusInTarget?: boolean;
}
/**
 * Props interface for the InputText component. Extends both InputTextBaseProps and InputTextClassProps interfaces.
 */
export interface InputTextProps extends InputTextBaseProps, InputTextClassProps {
}
export declare const InputText: ({ id, datalist, name, label, placeholder, placeholderFocus, defaultValue, value, type, className, classNameLabel, classNameContentInput, classNameInput, classNameIcon, classNameLoaderValidate, iconLoader, onChange, onBlur, onEnter, onChangeValidate, parseText, props, icon, extraInContentInput, extraInLabel, disabled, showIcon, error, errorWithIsChange, optional, optionalText, required, requiredText, loader, autoComplete, useLoader, isChange: isChangeProps, onKeyDown, onWheel, iconPos, inputMode, validator, maxLength, regExp, regExpReplace, onChangeEvent, showFocusInTarget, ...p }: InputTextProps) => React.JSX.Element;
/**
 * All props for the InputCalendar component.
 */
export interface InputCalendarProps extends Pick<InputTextProps, "label" | "placeholder" | "optional" | "optionalText" | "required" | "requiredText" | "icon" | "iconPos" | "validator" | "errorWithIsChange">, Pick<InputCalendarMonthProps, "_t" | "type" | "min" | "max"> {
    defaultValue?: Date;
    value?: Date;
    defaultValueRange?: Date[];
    valueRange?: Date[];
    onChange?: (d: Date | undefined) => void;
    onChangeRange?: (d: Date[]) => void;
    nMonthShow?: number;
}
export declare const InputCalendar: ({ nMonthShow, icon, type, defaultValue, value, defaultValueRange, valueRange, onChange, onChangeRange, validator, errorWithIsChange, ...props }: InputCalendarProps) => React.JSX.Element;
export interface InputCalendarMonthProps extends _TProps {
    type?: "normal" | "range";
    date?: FenextjsDate;
    onPreMonth?: () => void;
    onNextMonth?: () => void;
    selectDate: Date | undefined;
    selectDateRange: Date[];
    setSelectDate: (d: Date) => void;
    setSelectDateRange: (d: (d: Date[]) => Date[]) => void;
    dataNSelect: boolean;
    setDataNSelect: (d: (d: boolean) => boolean) => void;
    min?: Date;
    max?: Date;
}
export declare const InputCalendarMonth: ({ type, onPreMonth, onNextMonth, date, selectDate, selectDateRange, setSelectDate, setSelectDateRange, dataNSelect, setDataNSelect, min, max, ...props }: InputCalendarMonthProps) => React.JSX.Element;
export interface InputSelectNumberProps extends Omit<InputSelectProps, "options" | "onChange" | "defaultValue" | "parseText"> {
    onChange?: (n?: number) => void;
    defaultValue?: number;
    min?: number;
    max?: number;
    parseText?: (e: number) => string;
}
export declare const InputSelectNumber: ({ onChange, defaultValue, min, max, parseText, useTOption, ...props }: InputSelectNumberProps) => React.JSX.Element;
/**
 * Properties for the base InputGallery component.
 */
export interface InputGalleryBaseProps extends Omit<InputImgBaseProps, "defaultValue" | "onRemove" | "onChange">, _TProps {
    /**
     * Default value for the input element
     */
    defaultValue?: FileProps[];
    /**
     * Default value for the input element
     */
    value?: FileProps[];
    /**
     * The class name for the component.
     */
    textBtn?: string;
    /**
     * on Remove Img for the component.
     */
    onChange?: (items: FileProps[]) => void;
}
/**
 * Properties for the class of the InputGallery component.
 */
export interface InputGalleryClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the component.
     */
    classNameContentButton?: string;
    /**
     * The class name for the component.
     */
    classNameButton?: ButtonClassProps;
}
/**
 * Properties for the InputGallery component.
 */
export interface InputGalleryProps extends InputGalleryBaseProps, InputGalleryClassProps {
}
export declare const InputGallery: ({ className, classNameContentButton, classNameButton, textBtn, defaultValue, value, onChange, ...props }: InputGalleryProps) => React.JSX.Element;
/**
 * Properties for the base InputUpload component.
 */
export interface InputUploadBaseProps extends InputFileBaseProps {
    /**
     * The Title for the component.
     */
    title?: ReactNode;
    /**
     * The Text for the component.
     */
    text?: ReactNode;
    /**
     * The Title for the component.
     */
    titleFile?: ReactNode;
    /**
     * The Text for the component.
     */
    textFile?: ReactNode;
    /**
     * The Text for the component.
     */
    textPreview?: ReactNode;
    /**
     * The Icon for the component.
     */
    icon?: ReactNode;
    /**
     * The Icon for the component.
     */
    iconFile?: ReactNode;
    /**
     * The Buton for the component.
     */
    btn?: ReactNode;
    /**
     * The tagPreview for the component.
     */
    tagPreview?: "embed" | "img";
    /**
     * The tagPreview for the component.
     */
    customPreview?: (data: FileProps) => ReactNode;
    /**
     * The loader for the component.
     */
    loader?: boolean;
    /**
     * The Icon for the component.
     */
    iconLoader?: ReactNode;
}
/**
 * Properties for the class of the InputUpload component.
 */
export interface InputUploadClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the component.
     */
    classNameUp?: string;
    /**
     * The class name for the component.
     */
    classNameTitle?: Omit<TitleProps, "children">;
    /**
     * The class name for the component.
     */
    classNameContentIcon?: string;
    /**
     * The class name for the component.
     */
    classNameBtn?: Omit<ButtonProps, "children">;
    /**
     * The class name for the component.
     */
    classNameText?: Omit<TextProps, "children">;
    /**
     * The class name for the component.
     */
    classNameProgress?: string;
    /**
     * The class name for the component.
     */
    classNamePreview?: string;
    /**
     * The class name for the component.
     */
    classNameRemove?: string;
}
/**
 * Properties for the InputUpload component.
 */
export interface InputUploadProps extends InputUploadBaseProps, InputUploadClassProps {
}
export declare const InputUpload: ({ className, classNameBtn, classNameContentIcon, classNameText, classNamePreview, classNameTitle, classNameUp, classNameProgress, classNameRemove, btn, icon, text, title, titleFile, textFile, iconFile, textPreview, defaultValue, parseProgress, onChange, tagPreview, loader, iconLoader, customPreview, ...props }: InputUploadProps) => React.JSX.Element;
/**
 * Props for InputScannerQr component.
 */
export interface InputScannerQrProps {
    className?: string;
    onChange?: (v: string) => void;
    buttonScannerContent?: ReactNode;
    buttonChangeCameraContent?: ReactNode;
    buttonToggleFlashContent?: ReactNode;
}
export declare const InputScannerQr: ({ className, onChange, buttonScannerContent, buttonChangeCameraContent, buttonToggleFlashContent, }: InputScannerQrProps) => React.JSX.Element;
/**
 * Props for InputScannerTextQr component.
 */
export interface InputScannerTextQrProps extends InputTextProps, InputScannerQrProps {
}
export declare const InputScannerTextQr: ({ className, defaultValue, onChange, ...props }: InputScannerTextQrProps) => React.JSX.Element;
/**
 * Interface that defines CSS class properties for a select input component.
 */
export interface InputSelectOptionClassProps {
    /**
     * CSS class name for the option select.
     */
    classNameOption?: string;
    /**
     * CSS class name for the option img select.
     */
    classNameOptionImg?: string;
    /**
     * CSS class name for the delete option select.
     */
    classNameOptionDelete?: string;
}
/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectOptionBaseProps<T = any> extends PropsWithChildren, _TProps {
    /**
     * ID of option.
     */
    id: string | number;
    /**
     * Text of option.
     */
    text: string;
    /**
     * Img of option.
     */
    img?: string;
    /**
     * Img of option.
     */
    imgComponent?: ImgProps;
    /**
     * Img of option.
     */
    icon?: ReactNode;
    /**
     * Type of option.
     */
    type?: "div" | "option" | "multiple";
    /**
     * Disabled of option.
     */
    disabled?: boolean;
    /**
     * Selected of option.
     */
    selected?: boolean;
    /**
     * Selected of option.
     */
    hidden?: boolean;
    /**
     * onClick of option.
     */
    onClick?: (item: InputSelectOptionBaseProps) => void;
    /**
     * onDelete of option.
     */
    onDelete?: (item: InputSelectOptionBaseProps) => void;
    /**
     * isBtn of option.
     */
    isBtn?: boolean;
    /**
     * Data custom of option.
     */
    data?: T;
    /**
     * iconDelete custom of option.
     * @default <Trash />
     */
    iconDelete?: ReactNode;
}
/**
 * Props interface for the InputSelectOption component. Extends both InputSelectOptionBaseProps and InputSelectOptionClassProps interfaces.
 */
export interface InputSelectOptionProps<T = any> extends InputSelectOptionBaseProps<T>, InputSelectOptionClassProps {
}
export declare const InputSelectOption: <T = any>({ classNameOption, classNameOptionImg, classNameOptionDelete, id, text, img, imgComponent, icon, children, type, onClick, onDelete, disabled, selected, hidden, isBtn, data, iconDelete, ...props }: InputSelectOptionProps<T>) => React.JSX.Element;
export declare const InputCardNumberIcons: {
    [id in Card_Enum]: ReactNode;
};
/**
 * Props for InputCardNumber component.
 */
export interface InputCardNumberProps extends Omit<InputTextProps, "onChangeValidate" | "icon" | "type"> {
    /**
     * The max length number card.
     * @default 19
     * @min 15
     */
    maxNumberLength?: number;
}
export declare const InputCardNumber: ({ value: valueProps, defaultValue, onChange, validator, maxNumberLength, ...props }: InputCardNumberProps) => React.JSX.Element;
export interface InputCardExpDateDataProps {
    month?: number;
    year?: number;
}
/**
 * Props for InputCardExpDate component.
 */
export interface InputCardExpDateProps extends Omit<InputTextProps, "onChangeValidate" | "icon" | "type" | "defaultValue" | "value" | "onChange" | "inputMode"> {
    /**
     * The max length number card.
     * @default 19
     * @min 15
     */
    maxExpDateLength?: number;
    defaultValue?: InputCardExpDateDataProps;
    value?: InputCardExpDateDataProps;
    onChange?: (data: InputCardExpDateDataProps) => void;
}
export declare const InputCardExpDate: ({ value: valueProps, defaultValue, placeholder, onChange, validator, maxExpDateLength, ...props }: InputCardExpDateProps) => React.JSX.Element;
/**
 * Props for InputCardCCV component.
 */
export interface InputCardCCVProps extends Omit<InputTextProps, "onChangeValidate" | "icon" | "type" | "maxLength" | "regExpReplace" | "regExp" | "inputMode" | "type"> {
}
export declare const InputCardCCV: ({ placeholder, ...props }: InputCardCCVProps) => React.JSX.Element;
/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectCityProps extends Omit<InputSelectTProps<CityProps>, "options" | "onParse" | "useLoader" | "loader"> {
    country?: CountryProps;
    state?: StateProps;
}
export declare const InputSelectCity: ({ country, state, ...props }: InputSelectCityProps) => React.JSX.Element;
export type InputSelectTypeStyle = "normal" | "normal-out" | "box" | "list" | "checkbox";
/**
 * Interface that defines CSS class properties for a select input component.
 */
export interface InputSelectClassProps extends InputTextClassProps, InputSelectOptionClassProps {
    /**
     * CSS class name for the input select.
     */
    classNameSelect?: string;
    /**
     * CSS class name for the list options.
     */
    classNameList?: string;
}
export interface InputSelectItemOptionBaseProps<T = any> extends Omit<InputSelectOptionProps<T>, "type" | "onDelete"> {
}
/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectBaseProps<T = any> extends Omit<InputTextBaseProps, "value" | "type" | "defaultValue" | "value" | "onChange" | "onBlur" | "onEnter" | "onChangeValidate"> {
    /**
     * Options of select.
     */
    options: InputSelectItemOptionBaseProps<T>[];
    /**
     * Options of select.
     */
    filterOptions?: (data: InputSelectItemOptionBaseProps<T>[]) => InputSelectItemOptionBaseProps<T>[];
    /**
     * showOptions type of show option select.
     */
    showOptions?: "hover" | "focus" | "focus-hover";
    /**
     * hiddenOptions type of hidden option select.
     */
    hiddenOptions?: "not-hover" | "not-focus" | "not-focus-hover";
    /**
     * Default Options of select.
     */
    defaultValue?: InputSelectItemOptionBaseProps<T>;
    /**
     * Type Select of option.
     */
    typeSelect?: "div" | "select" | "datalist";
    /**
     * Type Select of styles.
     */
    typeSelectStyle?: InputSelectTypeStyle;
    /**
     * Type Select of styles.
     */
    useSwichtypeSelectStyle?: boolean;
    /**
     * useTOption.
     */
    useTOption?: boolean;
    /**
     * Value Options of select.
     */
    value?: InputSelectItemOptionBaseProps<T>;
    /**
     * Value of Not Result of select.
     */
    noResult?: InputSelectItemOptionBaseProps<T>;
    /**
     * Value of Not Result of select.
     */
    loaderOption?: InputSelectItemOptionBaseProps<T>;
    /**
     * Value of Selected of select.
     */
    selected?: InputSelectItemOptionBaseProps<T>;
    /**
     * Value of Create of select.
     */
    create?: InputSelectItemOptionBaseProps<T>;
    /**
     * Value of Create of select.
     */
    itemMaxLengthShowOptions?: InputSelectItemOptionBaseProps<T>;
    /**
     * onCreate of select.
     */
    onCreate?: () => void;
    /**
     * Value of Not Result of select.
     */
    isSelectClearText?: boolean;
    /**
     * is permit change text in input.
     */
    isSelectChangeText?: boolean;
    /**
     * Function to call when the input value changes.
     */
    onChange?: (v?: InputSelectItemOptionBaseProps<T>) => void;
    /**
     * Function to call when the input value changes.
     */
    onChangeData?: (v?: T) => void;
    /**
     * Function to call when the input value changes text.
     */
    onChangeText?: (v?: string) => void;
    /**
     * Function to call for custom input validation.
     */
    onChangeValidate?: (e?: InputSelectItemOptionBaseProps<T>) => Promise<any> | any;
    /**
     * Icon for close options in Movil.
     */
    iconCloseMovil?: any;
    /**
     * ReactNode for clear option in Movil.
     */
    clearContent?: ReactNode;
    /**
     * searchById .
     */
    searchById?: boolean;
    /**
     * Icon search in select.
     */
    iconSearch?: ReactNode;
    /**
     * changeByFirstOptionInOnBlur in select.
     */
    changeByFirstOptionInOnBlur?: boolean;
    /**
     * maxLengthShowOptions in select.
     */
    maxLengthShowOptions?: number;
    /**
     * useItemMaxLengthShowOptions in select.
     */
    useItemMaxLengthShowOptions?: boolean;
    /**
     * nItems in select.
     */
    nItems?: number;
    /**
     * converterInSearchWithMaxLenght in select.
     */
    converterInSearchWithMaxLenght?: boolean;
    /**
     * showOptionIconImg in select.
     */
    showOptionIconImg?: boolean;
    /**
     * FenextjsValidatorClass used for input validation.
     */
    validatorData?: FenextjsValidatorClass<T | undefined>;
    /**
     * forceShowOptionOnLoad
     */
    forceShowOptionOnLoad?: boolean;
    /**
     * iconDelete custom of option.
     * @default <Trash />
     */
    iconDelete?: ReactNode;
}
/**
 * Props interface for the InputSelect component. Extends both InputSelectBaseProps and InputSelectClassProps interfaces.
 */
export interface InputSelectProps<T = any> extends InputSelectBaseProps<T>, InputSelectClassProps {
}
export interface InputSelectValue<T = any> {
    option?: InputSelectItemOptionBaseProps<T>;
    text?: string;
    textSearch?: string;
}
export declare const InputSelect: <T = any>({ classNameSelect, classNameList, error, options: optionsProps, showOptions, hiddenOptions, defaultValue, typeSelect, typeSelectStyle, value, onChange, onChangeData, onChangeText, onChangeValidate, icon, iconSearch, noResult, loaderOption, selected, create, onCreate, isSelectClearText, iconCloseMovil, filterOptions, clearContent, isSelectChangeText, errorWithIsChange, validator, searchById, useSwichtypeSelectStyle, changeByFirstOptionInOnBlur, converterInSearchWithMaxLenght, nItems, useItemMaxLengthShowOptions, maxLengthShowOptions, itemMaxLengthShowOptions, showOptionIconImg, validatorData, useTOption, forceShowOptionOnLoad, iconDelete, ...props }: InputSelectProps<T>) => React.JSX.Element;
export interface useSelectOptionsPosProps {
    children?: ReactNode;
    target?: HTMLElement | null | undefined;
}
export declare const useSelectOptionsPos: ({ children, target, }: useSelectOptionsPosProps) => {
    ref: HTMLElement | undefined;
    onLoadPos: () => void;
    onLoadChildren: () => void;
};
/**
 * Interface that defines base properties for a swich input swich.
 */
export interface InputColorProps {
    className?: string;
    defaultValue?: string;
    value?: string;
    onChange?: (data: string) => void;
    disabled?: boolean;
}
/**
 * Component that renders a swich input.
 * Takes an InputColorProps object as props.
 */
export declare const InputColor: ({ className, defaultValue, value, onChange, disabled, }: InputColorProps) => React.JSX.Element;
/**
 * Interface that defines CSS class properties for a SelectTimeZone input component.
 */
export interface InputSelectTimeZoneClassProps extends InputSelectClassProps {
}
/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectTimeZoneBaseProps extends Omit<InputSelectTProps<TimeZoneProps>, "options" | "onParse"> {
}
/**
 * Props interface for the InputSelectTimeZone component. Extends both InputSelectTimeZoneBaseProps and InputSelectTimeZoneClassProps interfaces.
 */
export interface InputSelectTimeZoneProps extends InputSelectTimeZoneBaseProps, InputSelectTimeZoneClassProps {
}
export declare const InputSelectTimeZone: ({ useTOption, ...props }: InputSelectTimeZoneProps) => React.JSX.Element;
export declare const TimeZoneList: TimeZoneProps[];
/**
 * Interface that defines CSS class properties for a text input component.
 */
export interface InputNumberCountClassProps extends InputTextClassProps {
}
/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputNumberCountBaseProps extends Omit<InputTextBaseProps, "type" | "defaultValue" | "onChange" | "onChangeValidate" | "value" | "validator"> {
    /**
     * symbol of money in de Init, default $.
     */
    symbolInit?: string;
    /**
     * symbol of money in the final.
     */
    symbolFinal?: string;
    /**
     * The default value of the input.
     * @default ""
     */
    defaultValue?: number | "";
    /**
     * The value of the input.
     * @default undefined
     */
    value?: number | "";
    /**
     * The callback function that is triggered when the value of the input changes.
     */
    onChange?: (v: number | "") => void;
    /**
     * The minimum value allowed for the input.
     */
    min?: number;
    /**
     * The maximum value allowed for the input.
     */
    max?: number;
    /**
     * The minimum value allowed for the input.
     */
    aplyMin?: boolean;
    /**
     * The maximum value allowed for the input.
     */
    aplyMax?: boolean;
    /**
     * The minimum value allowed for the input.
     */
    minError?: string;
    /**
     * The maximum value allowed for the input.
     */
    maxError?: string;
    /**
     * FenextjsValidatorClass used for input validation.
     */
    validator?: FenextjsValidatorClass<number>;
    /**
     * optionsParseNumber used for input validation.
     */
    optionsParseNumber?: Intl.NumberFormatOptions;
}
/**
 * Props interface for the InputNumberCount component. Extends both InputNumberCountBaseProps and InputNumberCountClassProps interfaces.
 */
export interface InputNumberCountProps extends InputNumberCountBaseProps, InputNumberCountClassProps {
}
export declare const InputNumberCount: ({ onChange, value: valueProps, defaultValue, symbolInit, symbolFinal, validator: validatorProps, min, max, minError, maxError, optionsParseNumber, aplyMax, aplyMin, ...props }: InputNumberCountProps) => React.JSX.Element;
/**
 * Properties for the base InputRate component.
 */
export interface InputRateBaseProps {
    /**
     * Value of component.
     * @default undefined.
     * @min 0
     * @max 5
     */
    value?: number;
    /**
     * Default Value of component.
     * @default 0.
     * @min 0
     * @max 5
     */
    defaultValue?: number;
}
/**
 * Properties for the class of the InputRate component.
 */
export interface InputRateClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the content Star.
     */
    classNameContentStar?: string;
    /**
     * The class name for the Star.
     */
    classNameStar?: string;
    /**
     * The class name for the Star active.
     */
    classNameStarActive?: string;
    /**
     * The class name for the Star number.
     */
    classNameNumber?: string;
    /**
     * onChange value.
     */
    onChange?: (star: number) => void;
}
/**
 * Properties for the InputRate component.
 */
export interface InputRateProps extends InputRateBaseProps, InputRateClassProps {
}
export declare const InputRate: ({ className, classNameContentStar, classNameStar, classNameStarActive, classNameNumber, defaultValue, value, onChange, }: InputRateProps) => React.JSX.Element;
/**
 * Interface that defines CSS class properties for a checkbox input component.
 */
export interface InputPhoneClassProps {
    /**
     * Obj of class name Select Code.
     */
    classNameSelectCode?: InputSelectClassProps;
    /**
     * Obj of class name Input Number.
     */
    classNameInputNumber?: InputTextClassProps;
    /**
     * Class Name Phone.
     */
    classNamePhone?: string;
    /**
     * Class Name Phone Label.
     */
    classNamePhoneLabel?: string;
    /**
     * Class Name Phone Code.
     */
    classNamePhoneCode?: string;
    /**
     * Class Name Phone Number.
     */
    classNamePhoneNumber?: string;
    /**
     * Class Name Error.
     */
    classNameError?: string;
}
/**
 * Interface that defines base properties for a checkbox input component.
 */
export interface InputPhoneBaseProps extends Omit<InputTextBaseProps, "type" | "value" | "onChange" | "defaultValue" | "datalist" | "validator">, useJsonStringProps<Partial<PhoneProps>> {
    /**
     * defaultCode select code.
     */
    defaultCode?: string;
    /**
     * disabled select code.
     */
    disabledSelectCode?: boolean;
    /**
     * Placeholder select code.
     */
    placeholderCode?: string;
    /**
     * FenextjsValidatorClass used for input validation.
     */
    validator?: FenextjsValidatorClass<PhoneProps>;
}
/**
 * Interface that defines all properties for a checkbox input component.
 * Extends InputPhoneBaseProps and InputPhoneClassProps.
 */
export interface InputPhoneProps extends InputPhoneBaseProps, InputPhoneClassProps {
}
/**
 * Component that renders a checkbox input.
 * Takes an InputPhoneProps object as props.
 */
export declare const InputPhone: ({ classNameInputNumber, classNameSelectCode, classNamePhone, classNamePhoneCode, classNamePhoneLabel, classNamePhoneNumber, classNameError, disabledSelectCode, disabled, label, loader, placeholderCode, placeholder, validator, optional, optionalText, required, requiredText, defaultCode, defaultValue: defaultValueProps, value: valueProps, onChange: onChangeProps, defaultValueJsonString, valueJsonString, onChangeJsonString, parseJson_to_String, parseString_to_Json, ...props }: InputPhoneProps) => React.JSX.Element;
/**
 * Props for the InputDateValueType
 */
export type InputDateValueType = Date | undefined;
/**
 * Props for the base InputDate component
 */
export interface InputDateBaseProps extends Omit<InputTextBaseProps, "type" | "value" | "onChange" | "defaultValue"> {
    /**
     * The type of the input field. Should be 'date'.
     */
    type?: TypeDate;
    /**
     * The default value of the input field.
     */
    defaultValue?: InputDateValueType;
    /**
     * The current value of the input field.
     */
    value?: InputDateValueType;
    /**
     * The min Date valid.
     */
    min?: InputDateValueType;
    /**
     * The max Date valid.
     */
    max?: InputDateValueType;
    /**
     * A callback function to handle changes to the input field.
     */
    onChange?: (v: InputDateValueType) => void;
}
/**
 * Props for the InputDate component to customize CSS class names.
 */
export interface InputDateClassProps extends InputTextClassProps {
    /**
     * The CSS class for the input date field.
     */
    classNameInputDate?: string;
}
/**
 * All props for the InputDate component.
 */
export interface InputDateProps extends InputDateBaseProps, InputDateClassProps {
}
export declare const InputDate: ({ classNameInputDate, type, defaultValue, value, min, max, onChange, icon, iconPos, validator, ...props }: InputDateProps) => React.JSX.Element;
/**
 * Interface that defines CSS class properties for a select input component.
 */
export interface InputSelectCSCClassProps extends InputSelectClassProps {
    /**
     * CSS class name for the input select.
     */
    classNameSelectCSC?: string;
}
type InputCSCProps = Pick<InputSelectProps, "id" | "label" | "placeholder" | "placeholderFocus" | "disabled" | "classNameSelect" | "validator" | "validatorData" | "filterOptions" | "optional" | "optionalText" | "required" | "requiredText" | "forceShowOptionOnLoad" | "maxLengthShowOptions">;
/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectCSCBaseProps extends useCSCProps, Omit<InputSelectBaseProps, "options" | "defaultValue" | "value" | "isSelectClearText" | "onChange" | "onChangeValidate" | "validator" | "validatorData" | "filterOptions"> {
    /**
     * useContainer for group select in div.
     */
    useContainer?: boolean;
    /**
     * onChange CSC selected.
     */
    onChange?: (data: CSCProps) => void;
    /**
     * country Input Label and Placeholder.
     */
    country?: InputCSCProps;
    /**
     * state Input Label and Placeholder.
     */
    state?: InputCSCProps;
    /**
     * city Input Label and Placeholder.
     */
    city?: InputCSCProps;
}
/**
 * Props interface for the InputSelectCSC component. Extends both InputSelectCSCBaseProps and InputSelectCSCClassProps interfaces.
 */
export interface InputSelectCSCProps extends InputSelectCSCBaseProps, InputSelectCSCClassProps {
}
export declare const InputSelectCSC: ({ classNameSelectCSC, useContainer, country, state, city, defaultValue: defaultValueProps, value: valueProps, onChange: onChangeProps, defaultValueJsonString, valueJsonString, onChangeJsonString, parseJson_to_String, parseString_to_Json, ...props }: InputSelectCSCProps) => React.JSX.Element;
export interface InputSelectCountryMultipleProps extends Omit<InputSelectMultipleTProps<CountryProps>, "options" | "useLoader" | "loader" | "onParse"> {
}
export declare const InputSelectCountryMultiple: ({ ...props }: InputSelectCountryMultipleProps) => React.JSX.Element;
export type InputFileStatusContentByStatus = {
    [id in FileStatus]?: {
        /**
         * The Title for the component.
         */
        title?: ReactNode;
        /**
         * The Icon for the component.
         */
        icon?: ReactNode;
        /**
         * The Tag for the component.
         */
        tag?: ReactNode;
    };
};
/**
 * Properties for the InputFileStatus component.
 */
export interface InputFileStatusProps extends Omit<InputFileBaseProps, "onUploadFile"> {
    /**
     * The Title for the component.
     */
    title?: ReactNode;
    /**
     * The Text for the component.
     */
    text?: ReactNode;
    /**
     * The Icon for the component.
     */
    icon?: ReactNode;
    /**
     * The Buton for the component.
     */
    btn?: ReactNode;
    /**
     * The Icon for the component.
     */
    iconLoader?: ReactNode;
    /**
     * className for the component.
     */
    className?: string;
    onUploadFile: (data: FileProps) => Promise<FileProps>;
    contentByStatus?: InputFileStatusContentByStatus;
}
export declare const InputFileStatus: ({ className, btn, icon, text, title, defaultValue, onChange, iconLoader, onUploadFile, contentByStatus: contentByStatusProps, ...props }: InputFileStatusProps) => React.JSX.Element;
/**
 * Properties for the config InputRange component.
 */
export interface InputRangeConfigProps {
    min: number;
    max: number;
    value: number;
    center: number;
}
/**
 * Properties for the base InputRange component.
 */
export interface InputRangeBaseProps {
    /**
     * The value of the input.
     * @default 0
     */
    value?: number;
    /**
     * The valueMin of the input.
     * @default -100
     */
    valueMin?: number;
    /**
     * The valueMax of the input.
     * @default 100
     */
    valueMax?: number;
    /**
     * The default value of the input.
     * @default 0
     */
    defaultValue?: number;
    /**
     * The default value of the input.
     * @default -100
     */
    defaultValueMin?: number;
    /**
     * The default value of the input.
     * @default 100
     */
    defaultValueMax?: number;
    /**
     * The callback function that is triggered when the value of the input changes.
     */
    onChange?: (v: number) => void;
    /**
     * use range min value and max.
     * @default false
     */
    useRange?: boolean;
    /**
     * The callback function that is triggered when the value range of the input changes.
     */
    onChangeRange?: (v: [number, number]) => void;
    /**
     * The minimum value allowed for the input.
     * @default -100
     */
    min?: number;
    /**
     * The maximum value allowed for the input.
     * @default 100
     */
    max?: number;
    /**
     * The step value allowed for the input.
     * @default 1
     */
    step?: number;
    /**
     * The position show Number.
     * @default "top"
     */
    showNumber?: "top" | "bottom" | "none";
}
/**
 * Properties for the class of the InputRange component.
 */
export interface InputRangeClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the component content range.
     */
    classNameContentRange?: string;
    /**
     * The class name for the component min.
     */
    classNameMin?: string;
    /**
     * The class name for the component max.
     */
    classNameMax?: string;
    /**
     * The class name for the component current.
     */
    classNameCurrent?: string;
    /**
     * The class name for the component content value.
     */
    classNameContentValue?: string;
    /**
     * The class name for the component value.
     */
    classNameValue?: string;
    /**
     * The class name for the component value min.
     */
    classNameValueMin?: string;
    /**
     * The class name for the component value max.
     */
    classNameValueMax?: string;
    /**
     * The class name for the component content Circle.
     */
    classNameContentCircle?: string;
    /**
     * The class name for the component Circle.
     */
    classNameCircle?: string;
    /**
     * The class name for the component Line.
     */
    classNameLine?: string;
}
/**
 * Properties for the InputRange component.
 */
export interface InputRangeProps extends InputRangeBaseProps, InputRangeClassProps {
}
export declare const InputRange: ({ className, classNameContentValue, classNameValue, classNameValueMax, classNameValueMin, classNameContentRange, classNameCurrent, classNameMax, classNameMin, classNameContentCircle, classNameCircle, classNameLine, min, max, defaultValue, defaultValueMin, defaultValueMax, value, valueMin, valueMax, onChange, onChangeRange, useRange, step, showNumber, }: InputRangeProps) => React.JSX.Element;
/**
 * Properties for the base InputGoogleLoadScript component.
 */
export interface InputGoogleLoadScriptBaseProps extends Omit<LoadScriptProps, "googleMapsApiKey" | "id">, _TProps {
    /**
     * GOOGLE_KEY of Google maps.
     * @default process.env["NEXT_PUBLIC_GOOGLE_KEY"]
     */
    googleMapsApiKey?: string;
    children?: ReactNode;
}
/**
 * Properties for the class of the InputGoogleLoadScript component.
 */
export interface InputGoogleLoadScriptClassProps {
    /**
     * CSS class name for the component.
     */
    className?: string;
}
/**
 * Properties for the InputGoogleLoadScript component.
 */
export interface InputGoogleLoadScriptProps extends InputGoogleLoadScriptBaseProps, InputGoogleLoadScriptClassProps {
}
export declare const InputGoogleLoadScript: ({ googleMapsApiKey, children, className, _t, useT, ...props }: InputGoogleLoadScriptProps) => React.JSX.Element;
/**
 * Properties for the base InputGoogleMaps component.
 */
export interface InputGoogleMapsBaseProps extends Omit<GoogleMapProps, "onBoundsChanged"> {
    markers?: MarkerProps[];
    useLoadCenterWithMarker?: boolean;
    useLoadFitBoundsWithMarker?: boolean;
    useLoadDirectionsWithMarker?: boolean;
    showDirectionsWaypoints?: boolean;
    onBoundsChanged?: (data: LatLngBounds | undefined) => void;
}
/**
 * Properties for the class of the InputGoogleMaps component.
 */
export interface InputGoogleMapsClassProps {
}
/**
 * Properties for the InputGoogleMaps component.
 */
export interface InputGoogleMapsProps extends InputGoogleMapsBaseProps, InputGoogleMapsClassProps {
}
export declare const InputGoogleMaps: ({ mapContainerStyle, markers, useLoadCenterWithMarker, useLoadFitBoundsWithMarker, useLoadDirectionsWithMarker, showDirectionsWaypoints, center, ...props }: InputGoogleMapsProps) => React.JSX.Element;
/**
 * Properties for the base InputGoogleAutocomplete component.
 */
export interface InputGoogleAutocompleteBaseProps extends Omit<GoogleAutocompleteProps, "children">, Omit<InputTextBaseProps, "defaultValue" | "onChange" | "onChangeValidate" | "value" | "validator">, useJsonStringProps<AddressGoogle | undefined> {
    /**
     * FenextjsValidatorClass used for input validation.
     */
    validator?: FenextjsValidatorClass<AddressGoogle | undefined>;
}
/**
 * Properties for the class of the InputGoogleAutocomplete component.
 */
export interface InputGoogleAutocompleteClassProps extends InputTextClassProps {
}
/**
 * Properties for the InputGoogleAutocomplete component.
 */
export interface InputGoogleAutocompleteProps extends InputGoogleAutocompleteBaseProps, InputGoogleAutocompleteClassProps {
}
export declare const InputGoogleAutocomplete: ({ defaultValueJsonString, valueJsonString, onChangeJsonString, defaultValue: defaultValueProps, value: valueProps, onChange: onChangeProps, parseJson_to_String, parseString_to_Json, className, validator, ...props }: InputGoogleAutocompleteProps) => React.JSX.Element;
export interface InputSelectTProps<T> extends Omit<InputSelectProps<T>, "defaultValue" | "value" | "options" | "onChange" | "onChangeData"> {
    /**
     * Default Options of select.
     */
    defaultValue?: T;
    /**
     * Value Options of select.
     */
    value?: T;
    /**
     * Options of select.
     */
    options: T[];
    /**
     * Function to call when the input value changes.
     */
    onChange?: (v?: T) => void;
    /**
     * Function for converter T to InputSelectItemOptionBaseProps<T>
     */
    onParse: (v?: T) => InputSelectItemOptionBaseProps<T>;
}
export declare const InputSelectT: <T>({ defaultValue, value, options, onChange, onParse, ...props }: InputSelectTProps<T>) => React.JSX.Element;
/**
 * Interface that defines CSS class properties for a select-multiple input component.
 */
export interface InputSelectMultipleClassProps extends InputSelectClassProps {
    /**
     * CSS class name for the input select-multiple.
     */
    classNameSelectMultiple?: string;
    /**
     * CSS class name for the list options.
     */
    classNameSelectMultipleList?: string;
}
/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectMultipleBaseProps<T = any> extends Omit<InputSelectBaseProps<T>, "defaultValue" | "value" | "onChange" | "onChangeData" | "onChangeValidate" | "validatorData"> {
    /**
     * Default Options of select.
     */
    defaultValue?: InputSelectItemOptionBaseProps<T>[];
    /**
     * Default Options of select.
     */
    value?: InputSelectItemOptionBaseProps<T>[];
    /**
     * Function to call when the input value changes.
     */
    onChange?: (v?: InputSelectItemOptionBaseProps<T>[]) => void;
    /**
     * Function to call when the input value changes.
     */
    onChangeData?: (v?: T[]) => void;
    /**
     * Function to call for custom input validation.
     */
    onChangeValidate?: (e: InputSelectItemOptionBaseProps<T>[]) => Promise<any> | any;
    /**
     * iconDelete custom of option.
     * @default <Trash />
     */
    iconDelete?: ReactNode;
    typeSelectMultipleStyle?: "normal" | "checkbox";
    CustomOptionsSelected?: typeof InputSelectOption<T>;
    /**
     * FenextjsValidatorClass used for input validation.
     */
    validatorData?: FenextjsValidatorClass<(T | undefined)[]>;
}
/**
 * Props interface for the InputSelectMultiple component. Extends both InputSelectMultipleBaseProps and InputSelectMultipleClassProps interfaces.
 */
export interface InputSelectMultipleProps<T = any> extends InputSelectMultipleBaseProps<T>, InputSelectMultipleClassProps {
}
export declare const InputSelectMultiple: <T = any>({ classNameSelectMultiple, classNameSelectMultipleList, onChange, onChangeData, value, defaultValue, onChangeValidate, options, iconDelete, typeSelectMultipleStyle, CustomOptionsSelected, validatorData, useTOption, ...props }: InputSelectMultipleProps<T>) => React.JSX.Element;
/**
 * Interface that defines CSS class properties for a radio input component.
 */
export interface InputRadioClassProps {
    /**
     * CSS class name for content the radio.
     */
    classNameContent?: string;
    /**
     * CSS class name for the radio label.
     */
    classNameLabel?: string;
    /**
     * CSS class name for the active radio label.
     */
    classNameLabelActive?: string;
    /**
     * CSS class name for the inactive radio label.
     */
    classNameLabelInactive?: string;
    /**
     * CSS class name for the text next to the radio.
     */
    classNameText?: string;
    /**
     * CSS class name for the container that holds the radio and its label.
     */
    classNameContentRadio?: string;
    /**
     * CSS class name for the container that holds the radio and its label when the radio is active.
     */
    classNameContentRadioActive?: string;
    /**
     * CSS class name for the container that holds the radio and its label when the radio is inactive.
     */
    classNameContentRadioInactive?: string;
    /**
     * CSS class name for the radio input element.
     */
    classNameRadio?: string;
    /**
     * CSS class name for the radio input element when the radio is active.
     */
    classNameRadioActive?: string;
    /**
     * CSS class name for the radio input element when the radio is inactive.
     */
    classNameRadioInactive?: string;
    /**
     * Icon to display next to the radio.
     */
    icon?: ReactNode;
}
/**
 * Interface that defines base properties for a radio Item.
 */
export interface InputRadioItemProps<T> {
    /**
     * The id to display next to the item radio.
     */
    id: string;
    /**
     * The label to display next to the item radio.
     */
    label?: ReactNode;
    /**
     * The data of the item radio.
     */
    data?: T;
}
/**
 * Interface that defines base properties for a radio input component.
 */
export interface InputRadioBaseProps<T = any> extends _TProps {
    /**
     * Items of Input Radio.
     */
    items?: InputRadioItemProps<T>[];
    /**
     * The position of the label relative to the radio.
     */
    labelPosition?: "right" | "left";
    /**
     * The name attribute of the radio input element.
     */
    name?: string;
    /**
     * A callback function to execute when the radio is toggled.
     * Receives a boolean value indicating whether the radio is checked or not.
     */
    onChange?: (e: InputRadioItemProps<T>) => void;
    /**
     * The default value of the radio when it is first rendered.
     */
    defaultValue?: InputRadioItemProps<T>;
    /**
     * The value of the radio input element.
     */
    value?: InputRadioItemProps<T>;
    /**
     * A boolean value indicating whether the radio is disabled or not.
     */
    disabled?: boolean;
}
/**
 * Interface that defines all properties for a radio input component.
 * Extends InputRadioBaseProps and InputRadioClassProps.
 */
export interface InputRadioProps<T> extends InputRadioBaseProps<T>, InputRadioClassProps {
}
/**
 * Component that renders a radio input.
 * Takes an InputRadioProps object as props.
 */
export declare const InputRadio: <T = any>({ classNameContent, classNameLabel, classNameLabelActive, classNameLabelInactive, classNameText, classNameContentRadio, classNameContentRadioActive, classNameContentRadioInactive, classNameRadio, classNameRadioActive, classNameRadioInactive, labelPosition, name, onChange, defaultValue, value, disabled, icon, items, ...props }: InputRadioProps<T>) => React.JSX.Element;
/**
 * Properties for the base InputImg component.
 */
export interface InputImgBaseProps extends Omit<InputFileBaseProps, "accept"> {
    /**
     * The Title for the component.
     */
    title?: ReactNode;
    /**
     * The Text for the component.
     */
    text?: ReactNode;
    /**
     * The Icon for the component.
     */
    icon?: ReactNode;
    /**
     * on Remove Img for the component.
     */
    onRemove?: () => void;
}
/**
 * Properties for the class of the InputImg component.
 */
export interface InputImgClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the component.
     */
    classNameUp?: string;
    /**
     * The class name for the component.
     */
    classNameTitle?: Omit<TitleProps, "children">;
    /**
     * The class name for the component.
     */
    classNameContentIcon?: string;
    /**
     * The class name for the component.
     */
    classNameText?: Omit<TextProps, "children">;
    /**
     * The class name for the component.
     */
    classNameProgress?: string;
    /**
     * The class name for the component.
     */
    classNameRemove?: string;
    /**
     * The class name for the component.
     */
    classNameImg?: string;
}
/**
 * Properties for the InputImg component.
 */
export interface InputImgProps extends InputImgBaseProps, InputImgClassProps {
}
export declare const InputImg: ({ className, classNameContentIcon, classNameText, classNameTitle, classNameUp, classNameProgress, classNameRemove, classNameImg, icon, text, title, defaultValue, parseProgress, onChange, onRemove, ...props }: InputImgProps) => React.JSX.Element;
/**
 * Interface that defines CSS class properties for a text input component.
 */
export interface InputCodeClassProps extends InputTextClassProps {
}
/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputCodeBaseProps extends Omit<InputTextBaseProps, "type" | "maxLength"> {
    /**
     * maxLength of Input.
     */
    maxLength: number;
}
/**
 * Props interface for the InputCode component. Extends both InputCodeBaseProps and InputCodeClassProps interfaces.
 */
export interface InputCodeProps extends InputCodeBaseProps, InputCodeClassProps {
}
export declare const InputCode: ({ ...props }: InputCodeProps) => React.JSX.Element;
export interface TextSelectProps {
    text?: string;
    select?: InputSelectItemOptionBaseProps;
}
/**
 * Interface that defines CSS class properties for a checkbox input component.
 */
export interface InputTextSelectClassProps extends InputTextClassProps, InputSelectClassProps {
}
/**
 * Interface that defines base properties for a checkbox input component.
 */
export interface InputTextSelectBaseProps extends Omit<InputTextBaseProps, "type" | "value" | "onChange" | "defaultValue" | "datalist" | "onChangeValidate" | "label" | "placeholder" | "icon">, Omit<InputSelectBaseProps, "value" | "onChange" | "defaultValue" | "onChangeValidate" | "label" | "placeholder" | "icon"> {
    /**
     * Label text to display for the input.
     */
    label?: any;
    /**
     * Placeholder text to display in the input field.
     */
    placeholderSelect?: string;
    /**
     * Placeholder text to display in the input field.
     */
    placeholderText?: string;
    /**
     * Default Value of TextSelect.
     */
    defaultValue?: Partial<TextSelectProps>;
    /**
     * Value of TextSelect.
     */
    value?: Partial<TextSelectProps>;
    /**
     * onChange of TextSelect.
     */
    onChange?: (data: Partial<TextSelectProps>) => void;
    /**
     * posSelect of TextSelect.
     */
    posSelect?: "left" | "right";
}
/**
 * Interface that defines all properties for a checkbox input component.
 * Extends InputTextSelectBaseProps and InputTextSelectClassProps.
 */
export interface InputTextSelectProps extends InputTextSelectBaseProps, InputTextSelectClassProps {
}
/**
 * Component that renders a checkbox input.
 * Takes an InputTextSelectProps object as props.
 */
export declare const InputTextSelect: ({ label, placeholderSelect, placeholderText, defaultValue, value: valueProps, onChange, validator, posSelect, errorWithIsChange, error, ...props }: InputTextSelectProps) => React.JSX.Element;
/**
 * Interface for the base props of an input password component.
 */
export interface InputPasswordBaseProps extends Omit<InputTextBaseProps, "type"> {
}
/**
 * Interface for the class props of an input password component.
 */
export interface InputPasswordClassProps extends InputTextClassProps {
    classNameContentEye?: string;
}
/**
 * Interface for the props of an input password component.
 */
export interface InputPasswordProps extends InputPasswordBaseProps, InputPasswordClassProps {
}
export declare const InputPassword: ({ classNameContentEye, ...props }: InputPasswordProps) => React.JSX.Element;
export interface InputSelectMultipleTProps<T> extends Omit<InputSelectMultipleProps<T>, "defaultValue" | "value" | "options" | "onChange"> {
    /**
     * Default Options of select.
     */
    defaultValue?: T[];
    /**
     * Value Options of select.
     */
    value?: T[];
    /**
     * Options of select.
     */
    options: T[];
    /**
     * Function to call when the input value changes.
     */
    onChange?: (v?: T[]) => void;
    /**
     * Function for converter T to InputSelectItemOptionBaseProps<T>
     */
    onParse: (v?: T) => InputSelectItemOptionBaseProps<T>;
}
export declare const InputSelectMultipleT: <T>({ defaultValue, value, options, onChange, onParse, ...props }: InputSelectMultipleTProps<T>) => React.JSX.Element;
/**
 * Interface that defines CSS class properties for a SelectCountry input component.
 */
export interface InputSelectCountryClassProps extends InputSelectClassProps {
}
/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectCountryBaseProps extends Omit<InputSelectTProps<CountryProps>, "options" | "onParse" | "useLoader" | "loader"> {
}
/**
 * Props interface for the InputSelectCountry component. Extends both InputSelectCountryBaseProps and InputSelectCountryClassProps interfaces.
 */
export interface InputSelectCountryProps extends InputSelectCountryBaseProps, InputSelectCountryClassProps {
}
export declare const InputSelectCountry: ({ ...props }: InputSelectCountryProps) => React.JSX.Element;
/**
 * Properties for styling the various elements of the input file component
 */
export interface InputFileClassProps {
    /**
     * Class name for the component
     */
    className?: string;
    /**
     * Class name for the label element
     */
    classNameLabel?: string;
    /**
     * Class name for the content element
     */
    classNameContent?: string;
    /**
     * Class name for the input element
     */
    classNameInput?: string;
    /**
     * Class name for the error element
     */
    classNameError?: string;
}
/**
 * Properties needed for uploading a file
 */
export interface InputFileUploadDataProps {
    /**
     * The file to be uploaded
     */
    file: any;
    /**
     * The name of the file to be uploaded
     */
    nameFile: string;
    /**
     * The name of the file to be uploaded
     */
    extend: string;
    /**
     * Function to set the progress of the upload
     */
    setProgress: (progress: number) => void;
    /**
     * Function to set the data of the uploaded file
     */
    setFileData: (data: FileProps) => void;
}
/**
 * Base properties for the input file component
 */
export interface InputFileBaseProps extends _TProps {
    /**
     * Allowed file types for the input element
     */
    accept?: string[];
    /**
     * Default value for the input element
     */
    defaultValue?: FileProps;
    /**
     * Function to call when the value of the input element changes
     */
    onChange?: (v: FileProps) => void;
    /**
     * Function to call when the value of the input element changes progress
     */
    onChangeProgress?: (v: number) => void;
    /**
     * Function to call when the value of the input element changes error
     */
    onChangeError?: (v: ErrorProps | undefined) => void;
    /**
     * Function to call when a file is being uploaded
     */
    onUploadFile?: (data: InputFileUploadDataProps) => Promise<FileProps>;
    /**
     * Whether to clear the input element after a file has been uploaded
     */
    clearAfterUpload?: boolean;
    /**
     * Maximum size of file that can be uploaded
     */
    MAX_SIZE_FILE?: number;
    /**
     * Function to parse progress during file upload
     */
    parseProgress?: (progres: number) => any;
    /**
     * disabled upload.
     */
    disabled?: boolean;
    /**
     * textMaxSizeFile.
     */
    textMaxSizeFile?: string;
}
/**
 * Properties for the input file component, combining the base properties and styling properties
 */
export interface InputFileProps extends InputFileBaseProps, InputFileClassProps, PropsWithChildren {
}
export declare const InputFile: ({ defaultValue, className, classNameLabel, classNameContent, classNameInput, classNameError, onChange, accept, children, clearAfterUpload, MAX_SIZE_FILE, parseProgress, onChangeProgress, onChangeError, disabled, textMaxSizeFile, ...props }: InputFileProps) => React.JSX.Element;
/**
 * Props for the InputDateValueType
 */
export type InputDateRangeValueType = [InputDateValueType, InputDateValueType] | undefined;
/**
 * Props for the base InputDateRangeData component
 */
export interface InputDateRangeDataProps {
    /**
     * value of Date valueMin
     */
    valueMin?: Date;
    /**
     * value of Date valueMax
     */
    valueMax?: Date;
}
/**
 * Props for the base InputDateRange component
 */
export interface InputDateRangeElementBaseProps extends Omit<InputDateBaseProps, "value" | "onChange" | "defaultValue"> {
}
/**
 * Props for the base InputDateRange component
 */
export interface InputDateRangeBaseProps extends InputDateRangeElementBaseProps {
    /**
     * The default value of the input field.
     */
    defaultValue?: InputDateRangeValueType;
    /**
     * The current value of the input field.
     */
    value?: InputDateRangeValueType;
    /**
     * A callback function to handle changes to the input field.
     */
    onChange?: (v: InputDateRangeValueType) => void;
    /**
     * Props of input date start.
     */
    propsStart?: InputDateRangeElementBaseProps;
    /**
     * Props of input date end.
     */
    propsEnd?: InputDateRangeElementBaseProps;
}
/**
 * Props for the InputDateRange component to customize CSS class names.
 */
export interface InputDateRangeClassProps extends InputDateClassProps {
    /**
     * The CSS class for the input date field.
     */
    classNameInputDateRange?: string;
    /**
     * The CSS class for the input date field.
     */
    classNameInputDateRangeContentInputDate?: string;
}
/**
 * All props for the InputDateRange component.
 */
export interface InputDateRangeProps extends InputDateRangeBaseProps, InputDateRangeClassProps {
}
export declare const InputDateRange: ({ classNameInputDateRange, classNameInputDateRangeContentInputDate, classNameLabel, label, min, max, defaultValue, value, onChange, optional, optionalText, required, requiredText, propsStart, propsEnd, ...props }: InputDateRangeProps) => React.JSX.Element;
/**
 * Interface that defines CSS class properties for a checkbox input component.
 */
export interface InputCheckboxClassProps {
    /**
     * CSS class name for the checkbox label.
     */
    classNameLabel?: string;
    /**
     * CSS class name for the active checkbox label.
     */
    classNameLabelActive?: string;
    /**
     * CSS class name for the inactive checkbox label.
     */
    classNameLabelInactive?: string;
    /**
     * CSS class name for the text next to the checkbox.
     */
    classNameText?: string;
    /**
     * CSS class name for the container that holds the checkbox and its label.
     */
    classNameContentCheckbox?: string;
    /**
     * CSS class name for the container that holds the checkbox and its label when the checkbox is active.
     */
    classNameContentCheckboxActive?: string;
    /**
     * CSS class name for the container that holds the checkbox and its label when the checkbox is inactive.
     */
    classNameContentCheckboxInactive?: string;
    /**
     * CSS class name for the checkbox input element.
     */
    classNameCheckbox?: string;
    /**
     * CSS class name for the checkbox input element when the checkbox is active.
     */
    classNameCheckboxActive?: string;
    /**
     * CSS class name for the checkbox input element when the checkbox is inactive.
     */
    classNameCheckboxInactive?: string;
    /**
     * Icon to display next to the checkbox.
     */
    icon?: any;
}
/**
 * Interface that defines base properties for a checkbox input component.
 */
export interface InputCheckboxBaseProps<VT = any, VF = any> extends _TProps {
    /**
     * The label to display next to the checkbox.
     */
    label?: ReactNode;
    /**
     * The position of the label relative to the checkbox.
     */
    labelPosition?: "right" | "left";
    /**
     * The name attribute of the checkbox input element.
     */
    name?: string;
    /**
     * A callback function to execute when the checkbox is toggled.
     * Receives a boolean value indicating whether the checkbox is checked or not.
     */
    onChange?: (e: boolean) => void;
    onActive?: () => void;
    onInactive?: () => void;
    onActiveValue?: (data?: VT) => void;
    onInactiveValue?: (data?: VF) => void;
    valueActive?: VT;
    valueInactive?: VF;
    /**
     * The default value of the checkbox when it is first rendered.
     */
    defaultValue?: boolean;
    /**
     * The value of the checkbox input element.
     */
    value?: boolean;
    /**
     * A boolean value indicating whether the checkbox is disabled or not.
     */
    disabled?: boolean;
    /**
     * A callback function to execute when the checkbox is validated.
     * Should return a promise or void.
     */
    onValidateCheck?: () => Promise<void> | void;
    /**
     * Optional of Input.
     */
    optional?: boolean;
    /**
     * Optional text of Input.
     */
    optionalText?: string;
    /**
     * Optional of Input.
     */
    required?: boolean;
    /**
     * Optional text of Input.
     */
    requiredText?: string;
}
/**
 * Interface that defines all properties for a checkbox input component.
 * Extends InputCheckboxBaseProps and InputCheckboxClassProps.
 */
export interface InputCheckboxProps<VT = any, VF = any> extends InputCheckboxBaseProps<VT, VF>, InputCheckboxClassProps {
}
/**
 * Component that renders a checkbox input.
 * Takes an InputCheckboxProps object as props.
 */
export declare const InputCheckbox: <VT = any, VF = any>({ classNameLabel, classNameLabelActive, classNameLabelInactive, classNameText, classNameContentCheckbox, classNameContentCheckboxActive, classNameContentCheckboxInactive, classNameCheckbox, classNameCheckboxActive, classNameCheckboxInactive, label, labelPosition, name, onChange, defaultValue, value, disabled, icon, onValidateCheck, optional, optionalText, required, requiredText, onActive, onActiveValue, onInactive, onInactiveValue, valueActive, valueInactive, ...props }: InputCheckboxProps<VT, VF>) => React.JSX.Element;
/**
 * Interface that defines CSS class properties for a swich input component.
 */
export interface InputSwichClassProps {
    /**
     * CSS class name for the swich.
     */
    className?: string;
    /**
     * CSS class name for the circle swich.
     */
    classNameCicle?: string;
    /**
     * CSS class name for the inactive swich.
     */
    classNameInactive?: string;
    /**
     * CSS class name for the active swich.
     */
    classNameActive?: string;
}
/**
 * Interface that defines base properties for a swich input swich.
 */
export interface InputSwichBaseProps {
    /**
     * The name attribute of the swich input element.
     */
    name?: string;
    /**
     * A callback function to execute when the swich is toggled.
     * Receives a boolean value indicating whether the swich is checked or not.
     */
    onChange?: (e: boolean) => void;
    /**
     * The default value of the swich when it is first rendered.
     */
    defaultValue?: boolean;
    /**
     * The value of the swich input element.
     */
    value?: boolean;
    /**
     * A boolean value indicating whether the swich is disabled or not.
     */
    disabled?: boolean;
    /**
     * A callback function to execute when the swich is validated.
     * Should return a promise or void.
     */
    onValidateCheck?: (data: boolean) => Promise<void | boolean> | void | boolean;
}
/**
 * Interface that defines all properties for a swich input component.
 * Extends InputSwichBaseProps and InputSwichClassProps.
 */
export interface InputSwichProps extends InputSwichBaseProps, InputSwichClassProps {
}
/**
 * Component that renders a swich input.
 * Takes an InputSwichProps object as props.
 */
export declare const InputSwich: ({ className, classNameActive, classNameInactive, classNameCicle, name, onChange, defaultValue, value, disabled, onValidateCheck, }: InputSwichProps) => React.JSX.Element;
/**
 * Properties for the base InputSearch component.
 */
export interface InputSearchTabFilterProps extends Omit<InputSelectOptionProps, "type" | "disabled" | "selected" | "onClick" | "onDelete" | "_t" | "isBtn" | "data" | "iconDelete"> {
}
/**
 * Properties for the base InputSearch component.
 */
export interface InputSearchResultProps {
    /**
     * id of Result Search.
     */
    id: string;
    /**
     * text of Result Search.
     */
    text: string;
    /**
     * content of Result Search.
     */
    content?: ReactNode;
    /**
     * data of item Search.
     */
    data?: any;
}
/**
 * Properties for the base InputSearch component.
 */
export interface InputSearchBaseProps extends Omit<InputTextBaseProps, "type"> {
    /**
     * onSearch by string.
     */
    onSearch?: (v: string, tabFilter?: InputSearchTabFilterProps[]) => Promise<InputSearchResultProps[]>;
    /**
     * onEnterSearch by InputSearchResultProps.
     */
    onEnterSearch?: (v: string) => void;
    /**
     * onClearSearch by InputSearchResultProps.
     */
    onClearSearch?: () => void;
    /**
     * onClickSearch by InputSearchResultProps.
     */
    onClickSearch?: (v: InputSearchResultProps) => void;
    /**
     * useResult  show list resut of onSearch.
     * @default false
     */
    useResult?: boolean;
    /**
     * useLoadMore  load more items for list resut of onSearch.
     * @default false
     */
    useLoadMore?: boolean;
    /**
     * ButtonLoadMoreProps  props for btn loadmore.
     *
     */
    ButtonLoadMoreProps?: Omit<ButtonProps, "onClick">;
    /**
     * onLoadMore on click of ButtonLoadMoreProps.
     */
    onLoadMore?: () => void;
    /**
     * resultList  show list resut of onSearch.
     * @default undefined
     */
    resultList?: InputSearchResultProps[];
    /**
     * resultEmpty  show empty if list resut is empty.
     */
    resultEmpty?: ReactNode;
    /**
     * resultPreSearch show empty if list resut is empty.
     */
    resultPreSearch?: ReactNode;
    /**
     * useSearchFixed Search fixed focus.
     * @default false
     */
    useSearchFixed?: boolean;
    /**
     * useTabFilter  show list tab filter of onSearch.
     * @default false
     */
    useTabFilter?: boolean;
    /**
     * selectMultipleTabFilter  of onSearch.
     * @default false
     */
    selectMultipleTabFilter?: boolean;
    /**
     * listTabFilter list tab filter of onSearch.
     * @default []
     */
    listTabFilter?: InputSearchTabFilterProps[];
    /**
     * defaultTabFilterSelected list tab filter of onSearch.
     * @default []
     */
    defaultTabFilterSelected?: InputSearchTabFilterProps[];
    /**
     * onChangeTabFilterSelected by InputSearchTabFilterProps.
     */
    onChangeTabFilterSelected?: (v: InputSearchTabFilterProps[]) => void;
    /**
     * useLoseFocusInEnter .
     * @default true
     */
    useLoseFocusInEnter?: boolean;
    /**
     * iconClear .
     * @default <Close/>
     */
    iconClear?: ReactNode;
}
/**
 * Properties for the class of the InputSearch component.
 */
export interface InputSearchClassProps extends InputTextClassProps {
    /**
     * The class name for the component.
     */
    classNameSearch?: string;
    /**
     * The class name for the component bg.
     */
    classNameSearchBg?: string;
    /**
     * The class name for the component content result.
     */
    classNameSearchContentResult?: string;
    /**
     * The class name for the component result.
     */
    classNameSearchResult?: string;
}
/**
 * Properties for the InputSearch component.
 */
export interface InputSearchProps extends InputSearchBaseProps, InputSearchClassProps {
}
export declare const InputSearch: ({ classNameSearch, classNameSearchBg, classNameSearchContentResult, classNameSearchResult, placeholder, icon, iconClear, loader, onSearch, onChange, onClickSearch, onEnterSearch, onClearSearch: onClearSearchProps, useLoseFocusInEnter, defaultValue, value, useResult, useLoadMore, ButtonLoadMoreProps, onLoadMore: onLoadMore_, useSearchFixed, useTabFilter, resultList, resultEmpty, resultPreSearch, listTabFilter, defaultTabFilterSelected, onChangeTabFilterSelected, selectMultipleTabFilter, iconPos, ...props }: InputSearchProps) => React.JSX.Element;
/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectStateProps extends Omit<InputSelectTProps<StateProps>, "options" | "onParse" | "useLoader" | "loader"> {
    country?: CountryProps;
}
export declare const InputSelectState: ({ country, ...props }: InputSelectStateProps) => React.JSX.Element;
export interface InputUnitVolumenValue {
    value?: number | "";
    unit?: Unit_All;
}
/**
 * Interface that defines CSS class properties for a checkbox input component.
 */
export interface InputUnitVolumenClassProps extends InputUnitBaseClassProps {
}
/**
 * Interface that defines base properties for a checkbox input component.
 */
export interface InputUnitVolumenBaseProps extends Omit<InputUnitBaseBaseProps, "value" | "onChange" | "defaultValue" | "options"> {
    /**
     * Default Value of TextSelect.
     */
    defaultValue?: Partial<InputUnitVolumenValue>;
    /**
     * Value of TextSelect.
     */
    value?: Partial<InputUnitVolumenValue>;
    /**
     * onChange of TextSelect.
     */
    onChange?: (data: Partial<InputUnitVolumenValue>) => void;
    /**
     * posSelect of TextSelect.
     */
    options?: Unit_Volumen[];
}
/**
 * Interface that defines all properties for a checkbox input component.
 * Extends InputUnitVolumenBaseProps and InputUnitVolumenClassProps.
 */
export interface InputUnitVolumenProps extends InputUnitVolumenBaseProps, InputUnitVolumenClassProps {
}
/**
 * Component that renders a checkbox input.
 * Takes an InputUnitVolumenProps object as props.
 */
export declare const InputUnitVolumen: ({ options, ...props }: InputUnitVolumenProps) => React.JSX.Element;
export interface InputUnitValue {
    value?: number | "";
    unit?: Unit_All;
}
export interface InputUnitValueText {
    value?: string;
    unit?: Unit_All;
}
/**
 * Interface that defines CSS class properties for a checkbox input component.
 */
export interface InputUnitBaseClassProps extends InputTextSelectClassProps {
}
/**
 * Interface that defines base properties for a checkbox input component.
 */
export interface InputUnitBaseBaseProps extends Omit<InputTextSelectBaseProps, "value" | "onChange" | "defaultValue" | "options"> {
    /**
     * Default Value of TextSelect.
     */
    defaultValue?: Partial<InputUnitValue>;
    /**
     * Value of TextSelect.
     */
    value?: Partial<InputUnitValue>;
    /**
     * onChange of TextSelect.
     */
    onChange?: (data: Partial<InputUnitValue>) => void;
    /**
     * posSelect of TextSelect.
     */
    options: Unit_All[];
}
/**
 * Interface that defines all properties for a checkbox input component.
 * Extends InputUnitBaseBaseProps and InputUnitBaseClassProps.
 */
export interface InputUnitBaseProps extends InputUnitBaseBaseProps, InputUnitBaseClassProps {
}
/**
 * Component that renders a checkbox input.
 * Takes an InputUnitBaseProps object as props.
 */
export declare const InputUnitBase: ({ defaultValue, value: valueProps, onChange, options, ...props }: InputUnitBaseProps) => React.JSX.Element;
export interface InputUnitDistanceValue {
    value?: number | "";
    unit?: Unit_All;
}
/**
 * Interface that defines CSS class properties for a checkbox input component.
 */
export interface InputUnitDistanceClassProps extends InputUnitBaseClassProps {
}
/**
 * Interface that defines base properties for a checkbox input component.
 */
export interface InputUnitDistanceBaseProps extends Omit<InputUnitBaseBaseProps, "value" | "onChange" | "defaultValue" | "options"> {
    /**
     * Default Value of TextSelect.
     */
    defaultValue?: Partial<InputUnitDistanceValue>;
    /**
     * Value of TextSelect.
     */
    value?: Partial<InputUnitDistanceValue>;
    /**
     * onChange of TextSelect.
     */
    onChange?: (data: Partial<InputUnitDistanceValue>) => void;
    /**
     * posSelect of TextSelect.
     */
    options?: Unit_Distance[];
}
/**
 * Interface that defines all properties for a checkbox input component.
 * Extends InputUnitDistanceBaseProps and InputUnitDistanceClassProps.
 */
export interface InputUnitDistanceProps extends InputUnitDistanceBaseProps, InputUnitDistanceClassProps {
}
/**
 * Component that renders a checkbox input.
 * Takes an InputUnitDistanceProps object as props.
 */
export declare const InputUnitDistance: ({ options, ...props }: InputUnitDistanceProps) => React.JSX.Element;
export interface InputUnitWeightValue {
    value?: number | "";
    unit?: Unit_All;
}
/**
 * Interface that defines CSS class properties for a checkbox input component.
 */
export interface InputUnitWeightClassProps extends InputUnitBaseClassProps {
}
/**
 * Interface that defines base properties for a checkbox input component.
 */
export interface InputUnitWeightBaseProps extends Omit<InputUnitBaseBaseProps, "value" | "onChange" | "defaultValue" | "options"> {
    /**
     * Default Value of TextSelect.
     */
    defaultValue?: Partial<InputUnitWeightValue>;
    /**
     * Value of TextSelect.
     */
    value?: Partial<InputUnitWeightValue>;
    /**
     * onChange of TextSelect.
     */
    onChange?: (data: Partial<InputUnitWeightValue>) => void;
    /**
     * posSelect of TextSelect.
     */
    options?: Unit_Weight[];
}
/**
 * Interface that defines all properties for a checkbox input component.
 * Extends InputUnitWeightBaseProps and InputUnitWeightClassProps.
 */
export interface InputUnitWeightProps extends InputUnitWeightBaseProps, InputUnitWeightClassProps {
}
/**
 * Component that renders a checkbox input.
 * Takes an InputUnitWeightProps object as props.
 */
export declare const InputUnitWeight: ({ options, ...props }: InputUnitWeightProps) => React.JSX.Element;
/**
 * Properties for the Counter component.
 */
export interface CounterProps extends _TProps {
    /**
     * Number show.
     */
    number: number;
    /**
     * Text show.
     * @default undefined
     */
    text?: ReactNode;
    /**
     * Time for increment Number.
     * @default 1000
     */
    time?: number;
    /**
     * N decimal show in Number.
     * @default 2
     */
    decimal?: number;
    /**
     * Format Number.
     * @default parseNumberCount
     */
    parseNumber?: (n: number) => ReactNode;
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the Number.
     */
    classNameNumber?: string;
    /**
     * The class name for the Text.
     */
    classNameText?: string;
}
export declare const Counter: ({ className, classNameNumber, classNameText, number, text, time, decimal, parseNumber, ...props }: CounterProps) => React.JSX.Element;
/**
 * Properties for the base NotificationPop component.
 */
export interface NotificationPopBaseProps extends useNotificationProps, _TProps {
    /**
     * The class name for the component.
     */
    typePop?: "top" | "down";
}
/**
 * Properties for the class of the NotificationPop component.
 */
export interface NotificationPopClassProps extends NotificationClassProps {
    /**
     * The class name for the component.
     */
    classNamePop?: string;
}
/**
 * Properties for the NotificationPop component.
 */
export interface NotificationPopProps extends NotificationPopBaseProps, NotificationPopClassProps {
}
export declare const NotificationPop: ({ classNamePop, className, typePop, time, ...props }: NotificationPopProps) => React.JSX.Element;
/**
 * Properties for the base Notification component.
 */
export interface NotificationBaseProps extends PropsWithChildren, _TProps {
    /**
     * The class name for the component.
     */
    type?: RequestResultTypeProps | keyof typeof RequestResultTypeProps;
}
/**
 * Properties for the class of the Notification component.
 */
export interface NotificationClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the Notification component.
 */
export interface NotificationProps extends NotificationBaseProps, NotificationClassProps {
}
export declare const Notification: ({ className, type, children, ...props }: NotificationProps) => React.JSX.Element;
/**
 * Properties for the base Copy component.
 */
export interface CopyBaseProps extends _TProps {
    /**
     * The text for the copy.
     */
    text?: string;
    /**
     * The children for the component.
     */
    children?: ReactNode;
    /**
     * The onClickForCopy for the component.
     */
    onClickForCopy?: (text: string) => void;
    /**
     * The notification for the component.
     */
    notification?: NotificationDataProps;
}
/**
 * Properties for the class of the Copy component.
 */
export interface CopyClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the Copy component.
 */
export interface CopyProps extends CopyBaseProps, CopyClassProps {
}
export declare const Copy: ({ className, children, text, onClickForCopy, notification, ...props }: CopyProps) => React.JSX.Element;
/**
 * Properties for the base Slider component.
 */
export interface SliderBaseProps extends _TProps {
    /**
     * Items of slider.
     */
    items?: ReactNode[];
    /**
     * N Items of slider in Desktop.
     */
    nItemsDesktop?: number;
    /**
     * N Items of slider in Table.
     */
    nItemsTable?: number;
    /**
     * N Items of slider in Phone.
     */
    nItemsPhone?: number;
    /**
     * Time of Delay by next move Slider.
     */
    timeDelay?: number;
    /**
     * Time of Dration by animation move Slider.
     */
    timeAnimation?: number;
    /**
     * If loop in Slider.
     */
    loop?: boolean;
    /**
     * Separation in Items Slider.
     */
    separationItems?: number;
}
/**
 * Properties for the class of the Slider component.
 */
export interface SliderClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the Content slider.
     */
    classNameContent?: string;
    /**
     * The class name for the item slider.
     */
    classNameItem?: string;
    /**
     * The class name for the Dogs slider.
     */
    classNameDogs?: string;
    /**
     * The class name for the Dog slider.
     */
    classNameDog?: string;
    /**
     * The class name for the Arrows slider.
     */
    classNameArrows?: string;
    /**
     * The class name for the Arrow Pre slider.
     */
    classNameArrowPre?: string;
    /**
     * The class name for the Arrow Next slider.
     */
    classNameArrowNext?: string;
}
/**
 * Properties for the Slider component.
 */
export interface SliderProps extends SliderBaseProps, SliderClassProps {
}
export declare const Slider: ({ className, classNameContent, classNameItem, classNameDogs, classNameDog, classNameArrows, classNameArrowPre, classNameArrowNext, items, nItemsDesktop, nItemsTable, nItemsPhone, timeDelay, timeAnimation, loop, separationItems, ...props }: SliderProps) => React.JSX.Element;
/**
 * Properties for the base ImgGallery component.
 */
export interface ImgGalleryBaseProps extends _TProps {
    /**
     * List of Img.
     */
    imgs: ImgProps[];
    /**
     * Props of Button for show more Imgs.
     */
    buttonShowMoreImg?: Omit<ButtonProps, "onClick">;
    /**
     * Props of Button for hidden more Imgs.
     */
    buttonHiddenMoreImg?: Omit<ButtonProps, "onClick">;
    /**
     * loader.
     */
    loader?: boolean;
    /**
     * n items loader.
     * @default 5
     */
    nLoader?: number;
}
/**
 * Properties for the class of the ImgGallery component.
 */
export interface ImgGalleryClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the ImgGallery component.
 */
export interface ImgGalleryProps extends ImgGalleryBaseProps, ImgGalleryClassProps {
}
export declare const ImgGallery: ({ className, imgs, buttonShowMoreImg, buttonHiddenMoreImg, loader, nLoader, ...props }: ImgGalleryProps) => React.JSX.Element;
/**
 * Properties for the base ImgSlider component.
 */
export interface ImgSliderBaseProps extends _TProps {
    /**
     * List of Img.
     */
    imgs: ImgProps[];
    /**
     * defaultStep of Img.
     */
    defaultStep?: number;
    /**
     * step of Img.
     */
    step?: number;
    /**
     * step of Img.
     */
    setStep?: (e: number) => void;
}
/**
 * Properties for the class of the ImgSlider component.
 */
export interface ImgSliderClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the ImgSlider component.
 */
export interface ImgSliderProps extends ImgSliderBaseProps, ImgSliderClassProps {
}
export declare const ImgSlider: ({ className, imgs, defaultStep, setStep: setStepProps, step: stepProps, ...props }: ImgSliderProps) => React.JSX.Element;
/**
 * Class properties to customize the style of the pagination.
 */
export interface PaginationItemPageClassProps {
    /**
     * CSS class for the main container of the pagination.
     */
    classNameContent?: string;
    /**
     * CSS class for the "Go Up" button.
     */
    classNameUp?: string;
    /**
     * CSS class for the previous button.
     */
    classNamePre?: string;
    /**
     * CSS class for the current page number.
     */
    classNameCurrent?: string;
    /**
     * CSS class for the current item page number.
     */
    classNameCurrentItem?: string;
    /**
     * CSS class for the next button.
     */
    classNameNext?: string;
    /**
     * CSS class for the "Go Down" button.
     */
    classNameDown?: string;
    /**
     * Custom icons for each button of the pagination.
     */
    icons?: {
        /**
         * Custom icon for the "Go Up" button.
         */
        up?: any;
        /**
         * Custom icon for the previous button.
         */
        pre?: any;
        /**
         * Custom icon for the next button.
         */
        next?: any;
        /**
         * Custom icon for the "Go Down" button.
         */
        down?: any;
    };
}
/**
 * The base props for the pagination component
 */
export interface PaginationItemPageBaseProps extends _TProps {
    /**
     * The default page to show when the component is mounted
     */
    defaultPage?: number;
    /**
     * The total number of items to paginate
     */
    nItems: number;
    /**
     * The number of items to display per page
     */
    nItemsPage?: number;
    /**
     * Whether the component is disabled
     */
    disabled?: boolean;
    /**
     * Hidden Pagination of nItems if smaller than or equal of nItemsPages.
     * @default false
     */
    hiddenIfNItemsSmallerThanOrEqualNItemsPage?: boolean;
    /**
     * A callback function that is called when the page changes
     * @param page - The new page number
     */
    onChangePage?: (page: number) => void;
}
/**
 * Props for PaginationItemPage component
 */
export interface PaginationItemPageProps extends PaginationItemPageClassProps, PaginationItemPageBaseProps {
}
export declare const PaginationItemPage: ({ classNameContent, classNameUp, classNamePre, classNameCurrent, classNameCurrentItem, classNameNext, classNameDown, icons, defaultPage, nItems, nItemsPage, disabled, onChangePage, hiddenIfNItemsSmallerThanOrEqualNItemsPage, }: PaginationItemPageProps) => React.JSX.Element;
/**
 * Class properties to customize the style of the pagination.
 */
export interface PaginationClassProps {
    /**
     * CSS class for the main container of the pagination.
     */
    className?: string;
    /**
     * Object with className of component classNameNPage.
     */
    classNameItemPage?: PaginationItemPageClassProps;
    /**
     * Object with className of component PaginationNPage.
     */
    classNameNPage?: PaginationNPageClassProps;
}
/**
 * The base props for the pagination component
 */
export interface PaginationBaseProps extends PaginationItemPageBaseProps, PaginationNPageBaseProps, _TProps {
    showItemPage?: boolean;
    showNPage?: boolean;
}
/**
 * Props for Pagination component
 */
export interface PaginationProps extends PaginationClassProps, PaginationBaseProps {
}
export declare const Pagination: ({ className, classNameItemPage, classNameNPage, showItemPage, showNPage, listNpage, ...props }: PaginationProps) => React.JSX.Element;
/**
 * Class properties to customize the style of the pagination.
 */
export interface PaginationNPageClassProps {
    /**
     * CSS class for the main container of the pagination.
     */
    className?: string;
}
/**
 * The base props for the pagination component
 */
export interface PaginationNPageBaseProps extends Omit<InputSelectBaseProps, "options" | "onChange" | "nItems" | "maxLengthShowOptions"> {
    /**
     * List NPage for select.
     */
    listNpage?: InputSelectBaseProps["options"];
    /**
     * onChange of nPage.
     */
    onChangeNPage?: InputSelectBaseProps["onChange"];
}
/**
 * Props for PaginationNPage component
 */
export interface PaginationNPageProps extends PaginationNPageClassProps, PaginationNPageBaseProps {
}
export declare const PaginationNPage: ({ className, defaultValue, listNpage, onChangeNPage, ...props }: PaginationNPageProps) => React.JSX.Element;
/**
 * Properties for the AlertHook component.
 */
export interface AlertHookProps extends _TProps {
    className?: string;
    configHook?: useAlertProps;
}
export declare const AlertHook: ({ className, configHook, ...props }: AlertHookProps) => React.JSX.Element;
/**
 * Represents the properties that can be passed to a table component to specify CSS class names.
 */
export interface TableClassProps {
    /**
     * A CSS class name for the overall content container of the table.
     */
    classNameContent?: string;
    /**
     * A CSS class name for the table element within the content container.
     */
    classNameContentTable?: string;
    /**
     * A CSS class name for the table element itself.
     */
    classNameTable?: string;
    /**
     * A CSS class name for the table header element.
     */
    classNameTHead?: string;
    /**
     * A CSS class name for the table body element.
     */
    classNameTBody?: string;
    /**
     * A CSS class name for the table row header element.
     */
    classNameThr?: string;
    /**
     * A CSS class name for the table row element.
     */
    classNameTr?: string;
    /**
     * A CSS class name for the table cell header element.
     */
    classNameTh?: string;
    /**
     * A CSS class name for the table cell element.
     */
    classNameTd?: string;
    /**
     * A CSS class name for the content container of the pagination component.
     */
    classNameContentPagination?: string;
    /**
     * A CSS class name for the loader element.
     */
    classNameLoader?: string;
}
/**
 * A type that represents the header of a table component.
 *
 * @template T The type of data that the table contains.
 */
export type TableHeader<T> = {
    /**
     * The property key in the data object that corresponds to this header column.
     */
    id: keyof T;
    /**
     * The label to display in the header column.
     */
    th: ReactNode;
    /**
     * The name in the header column.
     */
    thText?: string;
    /**
     * A function that can be used to transform the data before displaying it in the table cell.
     * This function takes in the data object for the row and returns the transformed value.
     *
     * @param data The data object for the row.
     * @returns The transformed value to display in the table cell.
     */
    parse?: (data: T) => any;
    /**
     * The columnOptions for table.
     */
    columnOptions?: {
        orderBy?: boolean;
        showHidden?: boolean;
    };
    /**
     * The label to display in the header column.
     */
    defaultShowHidden?: "show" | "hidden";
    /**
     * The column width : 100% in new tr;
     */
    colNewTr?: boolean;
    /**
     * The className of de column;
     */
    className?: string;
}[];
/**
 * Represents the base properties that can be passed to a table component.
 *
 * @template T The type of data that the table contains.
 */
export interface TableBaseProps<T> extends _TProps {
    /**
     * Name the table.
     */
    name: string;
    /**
     * An array of data objects to display in the table.
     */
    items: T[];
    /**
     * The header configuration for the table.
     */
    header: TableHeader<T>;
    /**
     * Optional pagination properties for the table.
     */
    pagination?: PaginationProps;
    /**
     * Whether to display a loader while the table data is being loaded.
     */
    loader?: boolean;
    /**
     * typeLoader for show loader.
     * @default "line"
     */
    typeLoader?: "spinner" | "line";
    /**
     * If use checkbox in table.
     */
    useCheckbox?: boolean;
    /**
     * If on checked items.
     */
    onChecked?: (items: T[]) => void;
    /**
     * onOrderBy table.
     */
    onOrderBy?: (order: {
        id: keyof T;
        order: "ASC" | "DESC";
    }) => void;
    /**
     * onShowHidden table.
     */
    onShowHidden?: (showHidden: {
        id: keyof T;
        showHidden: "SHOW" | "HIDDEN";
    }) => void;
    /**
     * notResult the table.
     */
    notResult?: ReactNode;
    /**
     * If use checkbox in table.
     */
    showPagination?: boolean;
    actionsCheckbox?: Omit<TableActionCheckboxProps<T>, "actionAllCheckbox" | "data">;
    actionsCheckboxSelectAll?: ReactNode;
}
/**
 * Represents the properties that can be passed to a table component.
 *
 * @template T The type of data that the table contains.
 */
export interface TableProps<T> extends TableClassProps, TableBaseProps<T> {
}
export declare const Table: <T>({ classNameContent, classNameContentTable, classNameTable, classNameTHead, classNameTBody, classNameThr, classNameTr, classNameTh, classNameTd, classNameContentPagination, classNameLoader, name, items, header, pagination, showPagination, loader, typeLoader, useCheckbox, onOrderBy, onShowHidden, onChecked, notResult, actionsCheckbox, actionsCheckboxSelectAll, ...props }: TableProps<T>) => React.JSX.Element;
/**
 * Properties for the Alert component.
 */
export interface AlertComponentProps extends _TProps, AlertProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The iconClose for the component.
     */
    iconClose?: ReactNode;
    /**
     * The onClose for the component.
     */
    onClose?: () => void;
}
export declare const Alert: ({ className, message, iconClose, type, data, onClose, ...props }: AlertComponentProps) => React.JSX.Element;
/**
 * Properties for the base Collapse component.
 */
export interface CollapseBaseProps {
    /**
     * Indicates whether the Collapse is currently in the loading state.
     */
    loader?: boolean;
    /**
     * Indicates whether the Collapse is disabled or not.
     */
    disabled?: boolean;
    /**
     * Indicates whether the Collapse is defaultActive for show.
     */
    defaultActive?: boolean;
    /**
     * Indicates whether the Collapse is active for show.
     */
    active?: boolean;
    /**
     * The id for the component.
     */
    id?: string;
    /**
     * The name for the component.
     */
    name?: string;
    /**
     * status of collapse.
     */
    status?: "none" | "error" | "ok";
    /**
     * type of collapse.
     */
    type?: "radio" | "checkbox";
    /**
     * type of show content collapse.
     */
    show?: "checked" | "focus";
    /**
     * Header of Collapse.
     */
    header: ReactNode;
    /**
     * onChange of Collapse.
     */
    onChange?: (value: boolean) => void;
    /**
     * iconArrow of Collapse.
     * @default ArrowCollapse
     */
    iconArrow?: ReactNode;
    /**
     * children of Collapse.
     */
    children?: ReactNode;
    /**
     * rotateIcon of Collapse.
     */
    rotateIcon?: boolean;
    /**
     * useActiveForShowChildren of Collapse.
     */
    useActiveForShowChildren?: boolean;
}
/**
 * Properties for the class of the Collapse component.
 */
export interface CollapseClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for Header the component.
     */
    classNameHeader?: string;
    /**
     * The class name for Header Content the component.
     */
    classNameHeaderContent?: string;
    /**
     * The class name for Header Icon the component.
     */
    classNameHeaderIcon?: string;
    /**
     * The class name for Body the component.
     */
    classNameBody?: string;
}
/**
 * Properties for the Collapse component.
 */
export interface CollapseProps extends CollapseBaseProps, CollapseClassProps {
}
export declare const Collapse: ({ className, classNameHeader, classNameHeaderContent, classNameHeaderIcon, classNameBody, children, loader, header, disabled, defaultActive, active: activeProps, id, name, type, show, status, onChange, iconArrow, rotateIcon, useActiveForShowChildren, }: CollapseProps) => React.JSX.Element;
/**
 * Properties for the base CollapseMultiple component.
 */
export interface CollapseMultipleBaseProps extends Pick<CollapseBaseProps, "name" | "type" | "useActiveForShowChildren"> {
    /**
     * items of Collapse.
     */
    items?: Omit<CollapseBaseProps, "checkbox" | "name" | "id">[];
    /**
     * defaultActive of Collapse.
     */
    defaultActive?: number | number[];
}
/**
 * Properties for the class of the CollapseMultiple component.
 */
export interface CollapseMultipleClassProps extends CollapseClassProps {
    /**
     * The class name for the component.
     */
    classNameMultiple?: string;
}
/**
 * Properties for the CollapseMultiple component.
 */
export interface CollapseMultipleProps extends CollapseMultipleBaseProps, CollapseMultipleClassProps {
}
export declare const CollapseMultiple: ({ classNameMultiple, name, items, type, defaultActive, ...props }: CollapseMultipleProps) => React.JSX.Element;
export interface LavaLampGetNumberRandomProps {
    /**
     * The min number for generator number random.
     */
    min: number;
    /**
     * The max number for generator number random.
     */
    max: number;
}
/**
 * Properties for the base LavaLamp component.
 */
export interface LavaLampRangeStylesProps {
    top?: LavaLampGetNumberRandomProps;
    left?: LavaLampGetNumberRandomProps;
    scale?: LavaLampGetNumberRandomProps;
    moveX?: LavaLampGetNumberRandomProps;
    moveY?: LavaLampGetNumberRandomProps;
    time?: LavaLampGetNumberRandomProps;
}
export type LavaLampStylesElement = Pick<CSSProperties, "borderRadius" | "aspectRatio" | "width" | "background" | "animationTimingFunction">;
/**
 * Properties for the base LavaLamp component.
 */
export interface LavaLampBaseProps {
    /**
     * The number items elements.
     */
    nItems?: number;
    /**
     * The styles of elements.
     */
    styles?: CSSProperties;
    /**
     * The styles of elements.
     */
    ranges?: LavaLampRangeStylesProps;
    /**
     * The styles of elemens.
     */
    stylesElement?: LavaLampStylesElement[];
}
/**
 * Properties for the class of the LavaLamp component.
 */
export interface LavaLampClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the LavaLamp component.
 */
export interface LavaLampProps extends LavaLampBaseProps, LavaLampClassProps {
}
export declare const LavaLamp: ({ className, nItems, styles, stylesElement, ranges, }: LavaLampProps) => React.JSX.Element;
/**
 * Properties for the base ErrorComponent component.
 */
export interface ErrorComponentBaseProps extends PropsWithChildren, _TProps {
    /**
     * The class name for the component.
     */
    error?: ErrorFenextjs;
    /**
     * The data-error .
     */
    useDataError?: boolean;
    /**
     * The data-error .
     */
    useErrorInput?: boolean;
}
/**
 * Properties for the class of the ErrorComponent component.
 */
export interface ErrorComponentClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the ErrorComponent component.
 */
export interface ErrorComponentProps extends ErrorComponentBaseProps, ErrorComponentClassProps {
}
export declare const ErrorComponent: ({ error, children, className, useDataError, useErrorInput, ...props }: ErrorComponentProps) => React.JSX.Element;
export type onError = (error: string) => void;
export type onOk = () => Promise<void> | void;
export interface FormProps<D = any, R = any, E = any, T = RequestResultTypeProps> extends PropsWithChildren, _TProps {
    /**
     * The ID of the form
     */
    id?: string;
    /**
     * The initial data of the form
     */
    data: D;
    /**
     * The function to handle the form submission
     */
    onSubmit?: RequestProps<D, R, E, T>;
    /**
     * The function to call after a successful form submission
     */
    onAfterSubmit?: (data: RequestResultDataProps<R, E, T>) => void;
    /**
     * Whether the form is disabled
     */
    disabled?: boolean;
    /**
     * Whether to show a loader while the form is submitting
     */
    loader?: boolean;
    /**
     * The className to apply to the form element
     */
    className?: string;
}
export declare const Form: <D = any, R = any, E = any>({ id, data, disabled, children, className, ...props }: React.PropsWithChildren<FormProps<D, R, E, RequestResultTypeProps>>) => React.JSX.Element;
export type TooltipPositionX = "center" | "right" | "left";
export type TooltipPositionY = "center" | "top" | "bottom";
/**
 * Properties for the base Tooltip component.
 */
export interface TooltipProps extends _TProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The children for the component.
     */
    children?: ReactNode;
    /**
     * The children for the component.
     */
    tooltip?: ReactNode;
    /**
     * The position x for the component.
     */
    positionX?: TooltipPositionX;
    /**
     * The position y for the component.
     */
    positionY?: TooltipPositionY;
}
export declare const Tooltip: ({ className, children, tooltip, positionX, positionY, ...props }: TooltipProps) => React.JSX.Element;
/**
 * Properties for the TwoColSticky component.
 */
export interface TwoColStickyProps extends _TProps {
    /**
     * children for the component.
     */
    children?: ReactNode;
    /**
     * colSticky for the component.
     */
    colSticky?: ReactNode;
    /**
     *postion of col for the component.
     */
    posCol?: "left" | "right";
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name children for the component.
     */
    classNameChildren?: string;
    /**
     * The class name colSticky for the component.
     */
    classNameColSticky?: string;
}
/**
 * TwoColSticky Component
 *
 * A component that renders two columns: one sticky column and one children column.
 * The sticky column will stay fixed while the children column will be scrollable.
 *
 * @param {TwoColStickyProps} props - The props for the TwoColSticky component.
 * @returns {JSX.Element} - The TwoColSticky JSX Element.
 */
export declare const TwoColSticky: ({ className, classNameChildren, classNameColSticky, children, colSticky, posCol, ...props }: TwoColStickyProps) => React.JSX.Element;
/**
 * Properties of a tab item?.
 */
export interface TabItemProps<T = string> {
    /**
     * Unique identifier of the tab.
     */
    id: T;
    /**
     * Content to be displayed in the tab header.
     */
    head: ReactNode;
    /**
     * Content to be displayed in the tab body.
     */
    body: ReactNode;
    /**
     * Component of before list  Tabs Header;
     */
    beforeTab?: ReactNode;
    /**
     * Component of after list  Tabs Header;
     */
    afterTab?: ReactNode;
    /**
     * useCount  Tabs Header;
     */
    useCount?: boolean;
    /**
     * count  Tabs Header;
     */
    count?: number;
    /**
     * singular  Tabs Header;
     */
    singular?: ReactNode;
    /**
     * plural  Tabs Header;
     */
    plural?: ReactNode;
}
/**
 * Base properties of a tab component.
 */
export interface TabBaseProps<T = string> extends _TProps {
    /**
     * Array of `TabItemProps` objects representing the tabs.
     */
    items?: TabItemProps<T>[];
    /**
     * onChange Tab.
     */
    onChange?: (item: TabItemProps<T>) => void;
    /**
     * Index of the tab to be shown by default.
     */
    defaultTab?: number;
    /**
     * Index of the tab to be shown by default.
     */
    activeTab?: number;
    /**
     * Component of before list  Tabs Header;
     */
    beforeTabs?: ReactNode;
    /**
     * Component of after list  Tabs Header;
     */
    afterTabs?: ReactNode;
    /**
     * tabScrollActive if show all tabs in scroll in selecte.
     * @default false
     */
    tabScrollActive?: boolean;
    /**
     * validataTabOneHiddenHeader if one tab, header is hidden
     * @default true
     */
    validataTabOneHiddenHeader?: boolean;
    /**
     * useCount  Tabs;
     */
    useCount?: boolean;
}
/**
 * CSS class properties for a tab component.
 */
export interface TabClassProps {
    /**
     * Name of the CSS class for the component.
     */
    className?: string;
    /**
     * Name of the CSS class for the tab content header.
     */
    classNameContentHead?: string;
    /**
     * Name of the CSS class for the tab content before header.
     */
    classNameContentBeforeHead?: string;
    /**
     * Name of the CSS class for the tab content after header.
     */
    classNameContentAfterHead?: string;
    /**
     * Name of the CSS class for the tab header.
     */
    classNameHead?: string;
    /**
     * Name of the CSS class for an item in the tab header.
     */
    classNameHeadItem?: string;
    /**
     * Name of the CSS class for the active item in the tab header.
     */
    classNameHeadItemActive?: string;
    /**
     * Name of the CSS class for the tab body.
     */
    classNameBody?: string;
    /**
     * Name of the CSS class for an item in the tab body.
     */
    classNameBodyItem?: string;
}
/**
 * Properties for a tab component.
 * Combines `TabBaseProps` and `TabClassProps`.
 */
export interface TabProps<T = string> extends TabBaseProps<T>, TabClassProps {
}
export declare const parseTabCount: <T>(d: TabItemProps<T>, _t: ReturnType<typeof use_T>["_t"]) => TabItemProps<T>;
/**
 * Tab component that displays a set of tabs with content.
 * @param className CSS class name for the component.
 * @param classNameHead CSS class name for the tab header.
 * @param classNameHeadItem CSS class name for each item in the tab header.
 * @param classNameHeadItemActive CSS class name for the active item in the tab header.
 * @param classNameBody CSS class name for the tab body.
 * @param classNameBodyItem CSS class name for each item in the tab body.
 * @param items Array of `TabItemProps` objects representing the tabs.
 * @param defaultTab Index of the tab to be shown by default.
 */
export declare const Tab: <T = string>({ className, classNameContentHead, classNameHead, classNameHeadItem, classNameHeadItemActive, classNameBody, classNameBodyItem, classNameContentAfterHead, classNameContentBeforeHead, items, defaultTab, activeTab, afterTabs, beforeTabs, onChange, tabScrollActive, validataTabOneHiddenHeader, useCount, ...props }: TabProps<T>) => React.JSX.Element;
/**
 * Properties for the base DropDown component.
 */
export interface DropDownBaseProps extends CollapseBaseProps {
}
/**
 * Properties for the class of the DropDown component.
 */
export interface DropDownClassProps extends CollapseClassProps {
    /**
     * The class name for the component.
     */
    classNameDropDown?: string;
}
/**
 * Properties for the DropDown component.
 */
export interface DropDownProps extends DropDownBaseProps, DropDownClassProps {
}
export declare const DropDown: ({ classNameDropDown, show, ...props }: DropDownProps) => React.JSX.Element;
export interface PrintIframeComponentProps {
    loader: boolean;
}
/**
 * Properties for the base PrintIframe component.
 */
export interface PrintIframeBaseProps<T> extends usePrintIframeProps<T> {
    /**
     * The class name for the component.
     */
    onComponent: (data: PrintIframeComponentProps) => ReactNode;
}
/**
 * Properties for the class of the PrintIframe component.
 */
export interface PrintIframeClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the PrintIframe component.
 */
export interface PrintIframeProps<T> extends PrintIframeBaseProps<T>, PrintIframeClassProps {
}
export declare const PrintIframe: <T>({ className, onComponent, ...props }: PrintIframeProps<T>) => React.JSX.Element;
export interface PrintPageComponentProps<T> {
    data: T | undefined;
    load: boolean;
}
/**
 * Properties for the base PrintPage component.
 */
export interface PrintPageBaseProps<T> extends usePrintDataProps {
    /**
     * The class name for the component.
     */
    onComponent: (data: PrintPageComponentProps<T>) => ReactNode;
}
/**
 * Properties for the class of the PrintPage component.
 */
export interface PrintPageClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the PrintPage component.
 */
export interface PrintPageProps<T> extends PrintPageBaseProps<T>, PrintPageClassProps {
}
export declare const PrintPage: <T>({ className, onComponent, ...props }: PrintPageProps<T>) => React.JSX.Element;
export interface StepsItemProps {
    /**
     * Item label.
     */
    label: ReactNode;
    /**
     * Item icon.
     */
    icon?: ReactNode;
    /**
     * Item content.
     */
    content: ReactNode;
    /**
     * status Item.
     */
    status?: "none" | "ok" | "error";
}
/**
 * Properties for the base Steps component.
 */
export interface StepsBaseProps extends _TProps {
    /**
     * Items steps.
     */
    items: StepsItemProps[];
    /**
     * defaultStep show.
     * @default 0
     */
    defaultStep?: number;
    /**
     * Step show.
     * @default undefined
     */
    step?: number;
    /**
     * useArrowKey.
     * @default true
     */
    useArrowKey?: boolean;
    /**
     * Content of Button previous.
     * @default "Previous"
     */
    btnPrev?: ReactNode;
    /**
     * Content of Button next.
     * @default "Next"
     */
    btnNext?: ReactNode;
    /**
     * If Disabled Button previous.
     * @default false
     */
    disabledBtnPrev?: boolean;
    /**
     * If Disabled Button next.
     * @default false
     */
    disabledBtnNext?: boolean;
    /**
     * onClick in btn Prev.
     */
    onPrev?: (step: number) => Promise<void> | void;
    /**
     * onClick in btn Next.
     */
    onNext?: (step: number) => Promise<void> | void;
    /**
     * onSetStep.
     */
    onSetStep?: (step: number) => void;
    /**
     * Position of list Step.
     * @default left
     */
    stepPos?: "top" | "left" | "right";
    /**
     * showCurrentStepNStep of list Step.
     * @default false
     */
    showCurrentStepNStep?: boolean;
    /**
     * useDogs of list Step.
     * @default false
     */
    useDogs?: boolean;
}
/**
 * Properties for the class of the Steps component.
 */
export interface StepsClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the content steps.
     */
    classNameContentSteps?: string;
    /**
     * The class name for the content steps.
     */
    classNameListSteps?: string;
    /**
     * The class name for the contents items.
     */
    classNameContentItems?: string;
    /**
     * The class name for the step.
     */
    classNameStep?: string;
    /**
     * The class name for the item.
     */
    classNameItem?: string;
    /**
     * The class name for the step acitve.
     */
    classNameStepActive?: string;
    /**
     * The class name for the item acitve.
     */
    classNameItemActive?: string;
    /**
     * The class name for the step circle.
     */
    classNameStepCircle?: string;
    /**
     * The class name for the step label.
     */
    classNameStepLabel?: string;
    /**
     * The class name for the content btn next and prev.
     */
    classNameContentBtn?: string;
    /**
     * The class name for the btn next and prev.
     */
    classNameBtn?: string;
    /**
     * The class name for the btn next.
     */
    classNameBtnNext?: string;
    /**
     * The class name for the btn prev.
     */
    classNameBtnPrev?: string;
    forceShowBtnPrev?: boolean;
    forceShowBtnNext?: boolean;
}
/**
 * Properties for the Steps component.
 */
export interface StepsProps extends StepsBaseProps, StepsClassProps {
}
export declare const Steps: ({ className, classNameContentItems, classNameContentSteps, classNameListSteps, classNameItem, classNameItemActive, classNameStep, classNameStepActive, classNameStepCircle, classNameStepLabel, classNameContentBtn, classNameBtn, classNameBtnNext, classNameBtnPrev, defaultStep, step, items, btnNext, btnPrev, disabledBtnNext, disabledBtnPrev, onNext, onPrev, stepPos, showCurrentStepNStep, useArrowKey, useDogs, onSetStep, forceShowBtnPrev, forceShowBtnNext, ...props }: StepsProps) => React.JSX.Element;
export type BackTypeOnBack = "history" | "router" | "link" | "none";
/**
 * Properties for the base Back component.
 */
export interface BackBaseProps extends _TProps {
    /**
     * Indicates whether the Back is currently in the loading state.
     */
    loader?: boolean;
    /**
     * Indicates whether the Back is disabled or not.
     */
    disabled?: boolean;
    /**
     * The callback function that is called when the Back is clicked.
     */
    onClick?: (e?: any) => void;
    /**
     * The icon to display in the Back.
     */
    icon?: ReactNode;
    /**
     * The icon to display in the Back.
     */
    children?: ReactNode;
    /**
     * The type of onBack in component.
     */
    typeOnBack?: BackTypeOnBack;
    /**
     * The link to redirect if typeOnBack is link.
     */
    link?: string;
    /**
     * useHistoryMinLenght for show back.
     * @default false
     */
    useHistoryMinLenght?: boolean;
    /**
     * minLenght for show back.
     * @default 2
     */
    minLenght?: number;
}
/**
 * Properties for the class of the Back component.
 */
export interface BackClassProps extends LoaderClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the Disabled Back element.
     */
    classNameDisabled?: string;
    /**
     * The class name for the Icon Back element.
     */
    classNameIcon?: string;
    /**
     * The class name for the Content Back element.
     */
    classNameContent?: string;
}
/**
 * Properties for the Back component.
 */
export interface BackProps extends BackBaseProps, BackClassProps {
}
export declare const Back: ({ className, classNameLoader, classNameDisabled, classNameIcon, classNameContent, children, loader, disabled, onClick, icon, typeOnBack, link, minLenght, useHistoryMinLenght, ...props }: BackProps) => React.JSX.Element;
/**
 * Properties for the Theme component.
 */
export interface ThemeProps extends _TProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the component.
     */
    classNameItem?: string;
}
export declare const Theme: ({ className, classNameItem }: ThemeProps) => React.JSX.Element;
export type LinkTypeOnLink = "history" | "router" | "link" | "none";
/**
 * Properties for the base Link component.
 */
export interface LinkBaseProps extends PropsWithChildren, LinkNextProps, Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "referrerPolicy" | "rel">, _TProps {
}
/**
 * Properties for the class of the Link component.
 */
export interface LinkClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the Link component.
 */
export interface LinkProps extends LinkBaseProps, LinkClassProps {
}
export declare const Link: ({ className, children, ...props }: LinkProps) => React.JSX.Element;
export type ShareListType = "whatsapp" | "facebook" | "x" | "email" | "copy";
/**
 * Properties for the base Share component.
 */
export interface ShareBaseProps extends _TProps {
    /**
     * ButtonProps for the component.
     */
    ButtonProps?: ButtonProps;
    /**
     * TitleProps for the component.
     */
    TitleProps?: TitleProps;
    /**
     * share text for the component.
     */
    share?: string;
    /**
     * share text for the component.
     */
    shareList?: ShareListType[];
    /**
     * show share text for copy in the component.
     */
    showShareCopy?: boolean;
}
/**
 * Properties for the class of the Share component.
 */
export interface ShareClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the Share component.
 */
export interface ShareProps extends ShareBaseProps, ShareClassProps {
}
export declare const Share: ({ className, share, ButtonProps, TitleProps, shareList, showShareCopy, ...props }: ShareProps) => React.JSX.Element;
/**
 * Properties for the base ContentLoading component.
 */
export interface ContentLoadingBaseProps extends _TProps {
    /**
     * children for the component.
     */
    children?: ReactNode;
    /**
     * componentLoader for the component.
     * @default <LoaderSpinner/>
     */
    componentLoader?: ReactNode;
    /**
     * loader for the component.
     * @default false
     */
    loader?: boolean;
    /**
     * isPage for the component.
     * @default false
     */
    isPage?: boolean;
}
/**
 * Properties for the class of the ContentLoading component.
 */
export interface ContentLoadingClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the ContentLoading component.
 */
export interface ContentLoadingProps extends ContentLoadingBaseProps, ContentLoadingClassProps {
}
export declare const ContentLoading: ({ className, children, componentLoader, loader, isPage, ...props }: ContentLoadingProps) => React.JSX.Element;
/**
 * Properties for the GridGallery component.
 */
export interface GridGalleryProps extends _TProps {
    /**
     * The items for the component.
     */
    items: ReactNode[];
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for item the component.
     */
    classNameItem?: string;
}
export declare const GridGallery: ({ className, classNameItem, items, ...props }: GridGalleryProps) => React.JSX.Element;
/**
 * Properties for the base ChronologicalList component.
 */
export interface ChronologicalListItemsProps {
    date: Date;
    children: ReactNode;
    market?: ReactNode;
    className?: string;
}
/**
 * Properties for the base ChronologicalList component.
 */
export interface ChronologicalListBaseProps extends _TProps {
    /**
     * The list of items for chronological
     */
    items: ChronologicalListItemsProps[];
    /**
     * The market custom for all items
     */
    market?: ReactNode;
    /**
     * Function for parse day, month and year
     */
    parseDateYYYYMMDD?: (date: Date) => string;
    /**
     * Function for parse hours, minutes and seconds
     */
    parseDateHHMMSS?: (date: Date) => string;
}
/**
 * Properties for the class of the ChronologicalList component.
 */
export interface ChronologicalListClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the ChronologicalList component.
 */
export interface ChronologicalListProps extends ChronologicalListBaseProps, ChronologicalListClassProps {
}
export declare const ChronologicalList: ({ className, items, market, parseDateHHMMSS: parseDateHHMMSSProps, parseDateYYYYMMDD: parseDateYYYYMMDDProps, ...props }: ChronologicalListProps) => React.JSX.Element;
/**
 * Properties for the User component.
 */
export interface UserComponentProps {
    /**
     * User data.
     */
    user?: Partial<UserProps>;
    /**
     * If loader user.
     */
    loader?: boolean;
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name  for picture the component.
     */
    classNamePicture?: string;
    /**
     * The class name  for img the component.
     */
    classNameImg?: string;
    /**
     * The class name for name the component.
     */
    classNameName?: string;
    /**
     * The class name for letter the component.
     */
    classNameLetter?: string;
    /**
     * The class name for email the component.
     */
    classNameEmail?: string;
    /**
     * The class name for Loader the component.
     */
    classNameLoader?: LoaderUserClassProps;
}
export declare const User: ({ className, classNameEmail, classNamePicture, classNameImg, classNameName, classNameLetter, classNameLoader, user, loader, }: UserComponentProps) => React.JSX.Element;
/**
 * Properties for the base Img component.
 */
export interface ImgBaseProps extends ImgDataProps {
    /**
     * Url of Img if img not load.
     */
    imgIf404?: string;
    /**
     * Layers for Img.
     */
    layers?: Pick<React.CSSProperties, "background" | "mixBlendMode" | "filter" | "opacity">[];
    /**
     * onErrorImg.
     */
    onErrorImg?: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
    /**
     * onClick.
     */
    onClick?: () => void;
    /**
     * loader.
     */
    loader?: boolean;
}
/**
 * Properties for the class of the Img component.
 */
export interface ImgClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for the component img.
     */
    classNameImg?: string;
}
/**
 * Properties for the Img component.
 */
export interface ImgProps extends ImgBaseProps, ImgClassProps {
}
export declare const Img: ({ className, classNameImg, id, name, alt, src, srcMin1920, srcMin1680, srcMin1440, srcMin1024, srcMin992, srcMin768, srcMin575, imgIf404, layers, onErrorImg: onErrorImg_, onClick, loader, }: ImgProps) => React.JSX.Element;
/**
 * Properties for the base DesignTypography component.
 */
export interface DesignTypographyValueProps extends Partial<DesignTypographyValue> {
}
/**
 * Properties for the base DesignTypography component.
 */
export interface DesignTypographyProps extends _TProps {
    /**
     * The class name for the component.
     */
    className?: string;
    defaultValue?: DesignTypographyValueProps;
    value?: DesignTypographyValueProps;
    onChange?: (data: DesignTypographyValueProps) => void;
    onChangeStyles?: (data: CSSProperties) => void;
    textTypography?: string;
    textExample?: string;
    textExampleValue?: string;
    textColor?: string;
    textSize?: string;
    textAlign?: string;
    textWeight?: string;
    textTransform?: string;
    textStyle?: string;
    textDecoration?: string;
    textLineHeight?: string;
    textLetterSpacing?: string;
    textWordSpacing?: string;
    collapseName?: CollapseProps["name"];
    collapseType?: CollapseProps["type"];
    collapseUseActiveForShowChildren?: CollapseProps["useActiveForShowChildren"];
}
export declare const DesignTypography: ({ className, textTypography, textExample, textExampleValue, textColor, textSize, textAlign, textWeight, textTransform, textStyle, textDecoration, textLineHeight, textLetterSpacing, textWordSpacing, defaultValue, value, onChange, onChangeStyles, collapseName, collapseType, collapseUseActiveForShowChildren, ...props }: DesignTypographyProps) => React.JSX.Element;
export declare const parseDesignTypographyValueProps_to_CSSProperties: (d: Partial<DesignTypographyValue>) => CSSProperties;
export declare const ConstDesignTypographyFontSizeUnit: readonly ["px", "em", "rem"];
export type DesignTypographyFontSizeUnit = (typeof ConstDesignTypographyFontSizeUnit)[number];
export declare const ConstDesignTypographyTextAlignUnit: readonly ["center", "justify", "left", "right"];
export type DesignTypographyTextAlignUnit = (typeof ConstDesignTypographyTextAlignUnit)[number];
export declare const ConstDesignTypographyWeightUnit: readonly [100, 200, 300, 400, 500, 600, 700, 800, 900];
export type DesignTypographyWeightUnit = (typeof ConstDesignTypographyWeightUnit)[number];
export declare const ConstDesignTypographyTransformUnit: readonly ["none", "uppercase", "lowercase", "capitalize"];
export type DesignTypographyTransformUnit = (typeof ConstDesignTypographyTransformUnit)[number];
export declare const ConstDesignTypographyStyleUnit: readonly ["normal", "italic", "oblique"];
export type DesignTypographyStyleUnit = (typeof ConstDesignTypographyStyleUnit)[number];
export declare const ConstDesignTypographyDecorationUnit: readonly ["normal", "underline", "overline", "line-through"];
export type DesignTypographyDecorationUnit = (typeof ConstDesignTypographyDecorationUnit)[number];
export declare const ConstDesignTypographyLineHeightUnit: readonly ["normal", "px", "em", "rem"];
export type DesignTypographyLineHeightUnit = (typeof ConstDesignTypographyLineHeightUnit)[number];
export declare const ConstDesignTypographyLetterSpacingUnit: readonly ["px", "em", "rem"];
export type DesignTypographyLetterSpacingUnit = (typeof ConstDesignTypographyLetterSpacingUnit)[number];
export declare const ConstDesignTypographyWordSpacingUnit: readonly ["px", "em", "rem"];
export type DesignTypographyWordSpacingUnit = (typeof ConstDesignTypographyWordSpacingUnit)[number];
export interface DesignTypographyValue {
    fontFamily: string;
    fontSize: number;
    textAlign: DesignTypographyTextAlignUnit;
    color: string;
    fontSizeUnit: DesignTypographyFontSizeUnit;
    weight: DesignTypographyWeightUnit;
    transform: DesignTypographyTransformUnit;
    style: DesignTypographyStyleUnit;
    decoration: DesignTypographyDecorationUnit;
    lineHeight: number;
    lineHeightUnit: DesignTypographyLineHeightUnit;
    letterSpacing: number;
    letterSpacingUnit: DesignTypographyLetterSpacingUnit;
    wordSpacing: number;
    wordSpacingUnit: DesignTypographyWordSpacingUnit;
}
export interface DesignBoxTextProps extends DesignBoxPaddingProps, DesignBoxMarginProps, DesignBoxBorderProps, DesignBoxBorderRadiusProps, DesignBoxBorderColorProps, DesignBoxBackgroundProps, DesignBoxWidthProps, DesignBoxHeightProps, DesignBoxGapProps, DesignBoxAlignProps, DesignBoxBorderStyleProps {
}
/**
 * Properties for the base DesignBox component.
 */
export interface DesignBoxProps extends Omit<DesignBoxTextProps, "setDataFunction" | "data" | "onChangeData"> {
    /**
     * The class name for the component.
     */
    className?: string;
    onChangeStyles?: (data: CSSProperties) => void;
    collapseName?: CollapseProps["name"];
    collapseType?: CollapseProps["type"];
    collapseUseActiveForShowChildren?: CollapseProps["useActiveForShowChildren"];
    textBox?: string;
    defaultValue?: DesignBoxValueProps;
    value?: DesignBoxValueProps;
    onChange?: (data: DesignBoxValueProps) => void;
}
export declare const DesignBox: ({ className, textBox, textBackground, textPadding, textPaddingBottom, textPaddingLeft, textPaddingRight, textPaddingTop, textMargin, textMarginBottom, textMarginLeft, textMarginRight, textMarginTop, textBorder, textBorderBottom, textBorderLeft, textBorderRight, textBorderTop, textBorderRadius, textBorderRadiusTopLeft, textBorderRadiusTopRight, textBorderRadiusBottomLeft, textBorderRadiusBottomRight, textBorderStyle, textBorderStyleTop, textBorderStyleLeft, textBorderStyleRight, textBorderStyleBottom, textBorderColor, textWidth, textMinWidth, textMaxWidth, textHeight, textMinHeight, textMaxHeight, textAlignItems, textJustifyContent, textGap, textGapRow, textGapColumn, defaultValue, value, onChange, onChangeStyles, collapseName, collapseType, collapseUseActiveForShowChildren, ...props }: DesignBoxProps) => React.JSX.Element;
/**
 * Properties for the base DesignBoxWidth component.
 */
export interface DesignBoxWidthProps extends DesignBoxUseDataProps {
    textWidth?: string;
    textMinWidth?: string;
    textMaxWidth?: string;
}
export declare const DesignBoxWidth: ({ textWidth, textMinWidth, textMaxWidth, data, onChangeData, ...props }: DesignBoxWidthProps) => React.JSX.Element;
export declare const parseDesignBoxValueProps_to_CSSProperties: (d: Partial<DesignBoxValue>) => CSSProperties;
/**
 * Properties for the base DesignBoxBorderColor component.
 */
export interface DesignBoxBorderColorProps extends DesignBoxUseDataProps {
    textBorderColor?: string;
}
export declare const DesignBoxBorderColor: ({ textBorderColor, data, onChangeData, ...props }: DesignBoxBorderColorProps) => React.JSX.Element;
/**
 * Properties for the base DesignBoxBorderStyle component.
 */
export interface DesignBoxBorderStyleProps extends DesignBoxUseDataProps {
    textBorderStyle?: string;
    textBorderStyleTop?: string;
    textBorderStyleLeft?: string;
    textBorderStyleRight?: string;
    textBorderStyleBottom?: string;
}
export declare const DesignBoxBorderStyle: ({ textBorderStyle, textBorderStyleTop, textBorderStyleLeft, textBorderStyleRight, textBorderStyleBottom, data, setDataFunction, ...props }: DesignBoxBorderStyleProps) => React.JSX.Element;
export declare const ConstDesignBoxMarginUnit: readonly ["px", "em", "rem"];
export type DesignBoxMarginUnit = (typeof ConstDesignBoxMarginUnit)[number];
export declare const ConstDesignBoxPaddingUnit: readonly ["px", "em", "rem"];
export type DesignBoxPaddingUnit = (typeof ConstDesignBoxPaddingUnit)[number];
export declare const ConstDesignBoxBorderUnit: readonly ["px", "em", "rem"];
export type DesignBoxBorderUnit = (typeof ConstDesignBoxBorderUnit)[number];
export declare const ConstDesignBoxBorderRadiusUnit: readonly ["px", "em", "rem"];
export type DesignBoxBorderRadiusUnit = (typeof ConstDesignBoxBorderRadiusUnit)[number];
export declare const ConstDesignBoxBorderStylesUnit: readonly ["dashed", "dotted", "double", "groove", "hidden", "inset", "none", "outset", "ridge", "solid"];
export type DesignBoxBorderStylesUnit = (typeof ConstDesignBoxBorderStylesUnit)[number];
export declare const ConstDesignBoxWidthUnit: readonly ["px", "em", "rem", "%", "vw", "dvw", "auto"];
export type DesignBoxWidthUnit = (typeof ConstDesignBoxWidthUnit)[number];
export declare const ConstDesignBoxHeightUnit: readonly ["px", "em", "rem", "%", "vw", "dvw", "auto"];
export type DesignBoxHeightUnit = (typeof ConstDesignBoxHeightUnit)[number];
export declare const ConstDesignBoxJustifyContentUnit: readonly ["center", "end", "start", "space-around", "space-between", "space-evenly", "stretch"];
export type DesignBoxJustifyContentUnit = (typeof ConstDesignBoxJustifyContentUnit)[number];
export declare const ConstDesignBoxAlignItemsUnit: readonly ["baseline", "normal", "stretch", "center", "end", "start"];
export type DesignBoxAlignItemsUnit = (typeof ConstDesignBoxAlignItemsUnit)[number];
export declare const ConstDesignBoxGapsUnit: readonly ["px", "em", "rem"];
export type DesignBoxGapsUnit = (typeof ConstDesignBoxGapsUnit)[number];
export interface DesignBoxValue {
    background?: string;
    marginTogether?: boolean;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginUnit?: DesignBoxMarginUnit;
    paddingTogether?: boolean;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingUnit?: DesignBoxPaddingUnit;
    borderTogether?: boolean;
    borderTop?: number;
    borderRight?: number;
    borderBottom?: number;
    borderLeft?: number;
    borderUnit?: DesignBoxBorderUnit;
    borderStyleTogether?: boolean;
    borderTopStyle?: DesignBoxBorderStylesUnit;
    borderRightStyle?: DesignBoxBorderStylesUnit;
    borderBottomStyle: DesignBoxBorderStylesUnit;
    borderLeftStyle?: DesignBoxBorderStylesUnit;
    borderRadiusTogether?: boolean;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderUnitRadius?: DesignBoxBorderRadiusUnit;
    borderColor?: string;
    width?: number;
    widthUnit?: DesignBoxWidthUnit;
    maxWidth?: number;
    maxWidthUnit?: DesignBoxWidthUnit;
    minWidth?: number;
    minWidthUnit?: DesignBoxWidthUnit;
    height?: number;
    heightUnit?: DesignBoxHeightUnit;
    maxHeight?: number;
    maxHeightUnit?: DesignBoxHeightUnit;
    minHeight?: number;
    minHeightUnit?: DesignBoxHeightUnit;
    justifyContent?: DesignBoxJustifyContentUnit;
    alignItems?: DesignBoxAlignItemsUnit;
    gapTogether?: boolean;
    gapRow?: number;
    gapColumn?: number;
    gapUnit?: DesignBoxGapsUnit;
}
export type DesignBoxValueProps = Partial<DesignBoxValue>;
export type useDataDesignBoxUseDataProps = Pick<ReturnType<typeof useData<DesignBoxValueProps>>, "setDataFunction" | "data" | "onChangeData">;
export interface DesignBoxUseDataProps extends _TProps, useDataDesignBoxUseDataProps {
}
/**
 * Properties for the base DesignBoxAlign component.
 */
export interface DesignBoxAlignProps extends DesignBoxUseDataProps {
    textAlignItems?: string;
    textJustifyContent?: string;
}
export declare const DesignBoxAlign: ({ textAlignItems, textJustifyContent, data, onChangeData, ...props }: DesignBoxAlignProps) => React.JSX.Element;
/**
 * Properties for the base DesignBoxHeight component.
 */
export interface DesignBoxHeightProps extends DesignBoxUseDataProps {
    textHeight?: string;
    textMinHeight?: string;
    textMaxHeight?: string;
}
export declare const DesignBoxHeight: ({ textHeight, textMinHeight, textMaxHeight, data, onChangeData, ...props }: DesignBoxHeightProps) => React.JSX.Element;
/**
 * Properties for the base DesignBoxBorderRadius component.
 */
export interface DesignBoxBorderRadiusProps extends DesignBoxUseDataProps {
    textBorderRadius?: string;
    textBorderRadiusTopLeft?: string;
    textBorderRadiusTopRight?: string;
    textBorderRadiusBottomLeft?: string;
    textBorderRadiusBottomRight?: string;
}
export declare const DesignBoxBorderRadius: ({ textBorderRadius, textBorderRadiusTopLeft, textBorderRadiusTopRight, textBorderRadiusBottomLeft, textBorderRadiusBottomRight, data, onChangeData, setDataFunction, ...props }: DesignBoxBorderRadiusProps) => React.JSX.Element;
/**
 * Properties for the base DesignBoxGap component.
 */
export interface DesignBoxGapProps extends DesignBoxUseDataProps {
    textGap?: string;
    textGapRow?: string;
    textGapColumn?: string;
}
export declare const DesignBoxGap: ({ textGap, textGapRow, textGapColumn, data, onChangeData, setDataFunction, ...props }: DesignBoxGapProps) => React.JSX.Element;
/**
 * Properties for the base DesignBoxBorder component.
 */
export interface DesignBoxBorderProps extends DesignBoxUseDataProps {
    textBorder?: string;
    textBorderTop?: string;
    textBorderLeft?: string;
    textBorderRight?: string;
    textBorderBottom?: string;
}
export declare const DesignBoxBorder: ({ textBorder, textBorderBottom, textBorderLeft, textBorderRight, textBorderTop, data, setDataFunction, onChangeData, ...props }: DesignBoxBorderProps) => React.JSX.Element;
/**
 * Properties for the base DesignBoxBackground component.
 */
export interface DesignBoxBackgroundProps extends DesignBoxUseDataProps {
    textBackground?: string;
}
export declare const DesignBoxBackground: ({ textBackground, data, onChangeData, ...props }: DesignBoxBackgroundProps) => React.JSX.Element;
/**
 * Properties for the base DesignBoxMargin component.
 */
export interface DesignBoxMarginProps extends DesignBoxUseDataProps {
    textMargin?: string;
    textMarginTop?: string;
    textMarginLeft?: string;
    textMarginRight?: string;
    textMarginBottom?: string;
}
export declare const DesignBoxMargin: ({ textMargin, textMarginBottom, textMarginLeft, textMarginRight, textMarginTop, data, onChangeData, setDataFunction, ...props }: DesignBoxMarginProps) => React.JSX.Element;
/**
 * Properties for the base DesignBoxPadding component.
 */
export interface DesignBoxPaddingProps extends DesignBoxUseDataProps {
    textPadding?: string;
    textPaddingTop?: string;
    textPaddingLeft?: string;
    textPaddingRight?: string;
    textPaddingBottom?: string;
}
export declare const DesignBoxPadding: ({ textPadding, textPaddingBottom, textPaddingLeft, textPaddingRight, textPaddingTop, data, onChangeData, setDataFunction, ...props }: DesignBoxPaddingProps) => React.JSX.Element;
export interface PortalProps {
    container?: Element | DocumentFragment;
    children: ReactNode;
}
export declare const Portal: ({ children, container }: PortalProps) => React.JSX.Element;
/**
 * Properties for the base PageProgress component.
 */
export interface PageProgressBaseProps {
}
/**
 * Properties for the class of the PageProgress component.
 */
export interface PageProgressClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the PageProgress component.
 */
export interface PageProgressProps extends PageProgressBaseProps, PageProgressClassProps {
}
export declare const PageProgress: ({ className }: PageProgressProps) => React.JSX.Element;
export type ScheduleDayValueType = InputDateRangeValueType[];
/**
 * Properties for the base ScheduleDay component.
 */
export interface ScheduleDayBaseProps extends Omit<InputDateRangeBaseProps, "value" | "onChange" | "defaultValue">, _TProps {
    /**
     * The default value of the input field.
     */
    defaultValue?: ScheduleDayValueType;
    /**
     * The current value of the input field.
     */
    value?: ScheduleDayValueType;
    /**
     * A callback function to handle changes to the input field.
     */
    onChange?: (v: ScheduleDayValueType) => void;
    /**
     * props of button of add item.
     */
    ButtonProps?: Omit<ButtonProps, "onClick">;
}
/**
 * Properties for the class of the ScheduleDay component.
 */
export interface ScheduleDayClassProps extends InputDateRangeClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the ScheduleDay component.
 */
export interface ScheduleDayProps extends ScheduleDayBaseProps, ScheduleDayClassProps {
}
export declare const ScheduleDay: ({ className, defaultValue, value, onChange, propsStart, propsEnd, ButtonProps, ...props }: ScheduleDayProps) => React.JSX.Element;
export type ScheduleWeeklyValueType = {
    [id in DaysEnum]?: ScheduleDayValueType;
};
/**
 * Properties for the base ScheduleWeekly component.
 */
export interface ScheduleWeeklyBaseProps extends Omit<ScheduleDayBaseProps, "value" | "onChange" | "defaultValue">, _TProps {
    /**
     * title of ScheduleWeekly.
     */
    title?: ReactNode;
    /**
     * The default value of the input field.
     */
    defaultValue?: ScheduleWeeklyValueType;
    /**
     * The current value of the input field.
     */
    value?: ScheduleWeeklyValueType;
    /**
     * A callback function to handle changes to the input field.
     */
    onChange?: (v: ScheduleWeeklyValueType) => void;
    /**
     * The CollapseMultipleProps of the input field.
     */
    CollapseMultipleProps?: Omit<CollapseMultipleProps, "items">;
    /**
     * A callback function to handle onParseHeaderDay.
     */
    onParseHeaderDay?: (v: DaysEnum) => ReactNode;
}
/**
 * Properties for the class of the ScheduleWeekly component.
 */
export interface ScheduleWeeklyClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the ScheduleWeekly component.
 */
export interface ScheduleWeeklyProps extends ScheduleWeeklyBaseProps, ScheduleWeeklyClassProps {
}
export declare const ScheduleWeekly: ({ title, className, defaultValue, value, onChange, CollapseMultipleProps, onParseHeaderDay, ...props }: ScheduleWeeklyProps) => React.JSX.Element;
/**
 * Properties for the Template component.
 */
export interface TemplateProps extends _TProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
export declare const Template: ({ className }: TemplateProps) => React.JSX.Element;
/**
 * Properties for the base ModalBase component.
 */
export interface ModalBaseBaseProps extends PropsWithChildren {
    /**
     * If active modal.
     */
    active?: boolean;
    /**
     * If active modal.
     */
    activeName?: boolean | null;
    /**
     * If active modal.
     */
    activeNameLast?: boolean | null;
    /**
     * If active modal.
     */
    childrenUseActiveForShowHidden?: boolean;
    /**
     * If disabled close modal.
     */
    disabledClose?: boolean;
    /**
     * If disabled close modal.
     */
    useRender?: boolean;
    /**
     * Type of modal.
     */
    type?: "top" | "left" | "right" | "bottom" | "center" | "full" | "layout-grid" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
    /**
     * Type of btn close for modal.
     */
    typeClose?: "out" | "inset" | "none";
    /**
     * onClose ModalBase.
     */
    onClose?: () => void;
    /**
     * name of Modal.
     */
    name?: string;
    /**
     * nameLocalStorage of Modal.
     */
    nameLocalStorage?: string;
    /**
     * closeComponent of Modal.
     */
    closeComponent?: ReactNode;
}
/**
 * Properties for the class of the ModalBase component.
 */
export interface ModalBaseClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
    /**
     * The class name for Bg the component.
     */
    classNameBg?: string;
    /**
     * The class name for Icon Close the component.
     */
    classNameClose?: string;
    /**
     * The class name for Content the component.
     */
    classNameContent?: string;
}
/**
 * Properties for the ModalBase component.
 */
export interface ModalBaseProps extends ModalBaseBaseProps, ModalBaseClassProps {
}
export declare const ModalBase: ({ className, classNameBg, classNameContent, classNameClose, active, activeName, activeNameLast, childrenUseActiveForShowHidden, disabledClose, type, typeClose, onClose, children, useRender, name, closeComponent, }: ModalBaseProps) => React.JSX.Element;
/**
 * Properties for the class of the Modal component.
 */
export interface ModalClassProps {
    /**
     * The class name for the component.
     */
    classNameElementActionModalActive?: string;
    /**
     * Objet for className Modal.
     */
    classNameModal?: ModalBaseClassProps;
}
/**
 * Properties for the Modal component.
 */
export interface ModalProps extends Pick<ModalBaseBaseProps, "children" | "type" | "active" | "onClose" | "typeClose" | "disabledClose" | "useRender" | "name" | "closeComponent" | "nameLocalStorage">, ModalClassProps {
    /**
     * The element with onClick for active modal.
     */
    ElementActionModalActive?: ReactNode;
    /**
     * If The element with onClick for active modal is disabled.
     */
    disabledElementActionModalActive?: boolean;
    /**
     * onActive Modal.
     */
    onActive?: () => void;
    /**
     * onActive Modal.
     */
    activeByNameLocalStorage?: boolean;
    activeByNameContentLocalStorage?: boolean;
}
export declare const Modal: ({ classNameElementActionModalActive, classNameModal, ElementActionModalActive, disabledElementActionModalActive, children, active: activeProps, disabledClose, onClose: onCloseProps, onActive: onActiveProps, type, typeClose, useRender, name, nameLocalStorage, activeByNameLocalStorage, activeByNameContentLocalStorage, closeComponent, }: ModalProps) => React.JSX.Element;
/**
 * Properties for the base ProgressCircle component.
 */
export interface ProgressCircleBaseProps {
    /**
     * Progress Number.
     */
    p: number;
    /**
     * Show Number Progress.
     */
    showP: boolean;
}
/**
 * Properties for the class of the ProgressCircle component.
 */
export interface ProgressCircleClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the ProgressCircle component.
 */
export interface ProgressCircleProps extends ProgressCircleBaseProps, ProgressCircleClassProps {
}
export declare const ProgressCircle: ({ className, p, showP, }: ProgressCircleProps) => React.JSX.Element;
/**
 * Properties for the base ProgressLine component.
 */
export interface ProgressLineBaseProps {
    /**
     * Progress Number.
     */
    p: number;
    /**
     * Show Number Progress.
     */
    showP: boolean;
}
/**
 * Properties for the class of the ProgressLine component.
 */
export interface ProgressLineClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the ProgressLine component.
 */
export interface ProgressLineProps extends ProgressLineBaseProps, ProgressLineClassProps {
}
export declare const ProgressLine: ({ className, p, showP, }: ProgressLineProps) => React.JSX.Element;
/**
 * Properties for the base Chronometer component.
 */
export interface ChronometerBaseProps {
    /**
     * The time in seconds for the component.
     */
    time?: number;
    /**
     * The change time for the component.
     */
    onChange?: (time: number) => void;
    /**
     * The min in seconds for the component.
     */
    min?: number;
    /**
     * The optionsTimeToText for the component.
     */
    optionsTimeToText?: getTimeToTextProps;
}
/**
 * Properties for the class of the Chronometer component.
 */
export interface ChronometerClassProps {
    /**
     * The class name for the component.
     */
    className?: string;
}
/**
 * Properties for the Chronometer component.
 */
export interface ChronometerProps extends ChronometerBaseProps, ChronometerClassProps {
}
export declare const Chronometer: ({ className, time, min, onChange, optionsTimeToText, }: ChronometerProps) => React.JSX.Element;
/**
 * Properties for the base Loader component.
 */
export interface LoaderBaseProps {
}
/**
 * Properties for the class of the Loader component.
 */
export interface LoaderClassProps {
    /**
     * The class name for the component.
     */
    classNameLoader?: string;
}
/**
 * Properties for the Loader component.
 */
export interface LoaderProps extends LoaderBaseProps, LoaderClassProps {
}
export declare const Loader: ({ classNameLoader }: LoaderProps) => React.JSX.Element;
/**
 * Properties for the base LoaderLine component.
 */
export interface LoaderLineBaseProps {
    /**
     * Height of Line.
     */
    height?: number;
}
/**
 * Properties for the class of the LoaderLine component.
 */
export interface LoaderLineClassProps {
    /**
     * The class name for the component.
     */
    classNameLoaderLine?: string;
}
/**
 * Properties for the LoaderLine component.
 */
export interface LoaderLineProps extends LoaderLineBaseProps, LoaderLineClassProps {
}
export declare const LoaderLine: ({ classNameLoaderLine, height, }: LoaderLineProps) => React.JSX.Element;
/**
 * Properties for the base LoaderUser component.
 */
export interface LoaderUserBaseProps {
}
/**
 * Properties for the class of the LoaderUser component.
 */
export interface LoaderUserClassProps {
    /**
     * The class name for the component.
     */
    classNameLoaderUser?: string;
    /**
     * The class name for img the component.
     */
    classNameLoaderUserImg?: string;
    /**
     * The class name for Name the component.
     */
    classNameLoaderUserName?: string;
    /**
     * The class name for email the component.
     */
    classNameLoaderUserEmail?: string;
}
/**
 * Properties for the LoaderUser component.
 */
export interface LoaderUserProps extends LoaderUserBaseProps, LoaderUserClassProps {
}
export declare const LoaderUser: ({ classNameLoaderUser, classNameLoaderUserImg, classNameLoaderUserName, classNameLoaderUserEmail, }: LoaderUserProps) => React.JSX.Element;
/**
 * Properties for the base LoaderSpinner component.
 */
export interface LoaderSpinnerBaseProps {
}
/**
 * Properties for the class of the LoaderSpinner component.
 */
export interface LoaderSpinnerClassProps {
    /**
     * The class name for the component.
     */
    classNameLoaderSpinner?: string;
}
/**
 * Properties for the LoaderSpinner component.
 */
export interface LoaderSpinnerProps extends LoaderSpinnerBaseProps, LoaderSpinnerClassProps {
}
export declare const LoaderSpinner: ({ classNameLoaderSpinner, }: LoaderSpinnerProps) => React.JSX.Element;
export {};
