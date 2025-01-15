/// <reference types="node" />
import React, { ReactNode, PropsWithChildren, CSSProperties, SyntheticEvent, AnchorHTMLAttributes } from "react";
import { LinkProps as LinkNextProps } from "next/link";
import { AutocompleteProps as GoogleAutocompleteProps, LoadScriptProps, GoogleMapProps, MarkerProps } from "@react-google-maps/api";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/storage";
import { ParsedUrlQuery } from "querystring";
export interface FenextExportCsvFileProps {
    items: object[];
    fileName: string;
}
export declare const FenextExportCsvFile: ({ fileName, items, }: FenextExportCsvFileProps) => void;
export interface FenextExportJsonFileProps {
    jsonData: object[];
    fileName: string;
}
export declare function FenextExportJsonFile({ fileName, jsonData, }: FenextExportJsonFileProps): void;
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
    content?: any;
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
    lang?: string;
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
export interface ImgDataProps {
    id?: string | number;
    name?: string;
    alt?: string;
    src: string;
    srcMin1920?: string;
    srcMin1680?: string;
    srcMin1440?: string;
    srcMin1024?: string;
    srcMin992?: string;
    srcMin768?: string;
    srcMin575?: string;
    srcThumbnail_200?: string;
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
    content?: any;
    message: string;
    msg?: string;
    input?: string;
    data?: D;
    constructor({ code, data, message, input, content }: ErrorFenextjsProps<D>);
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
export interface FenextjsValidatorClassConstructorProps {
    name?: string;
}
export declare class FenextjsValidatorClass<T = any> {
    private name?;
    private parent?;
    private data;
    private equal;
    private equalValue;
    private required;
    private boolean;
    private number;
    private email;
    private string;
    private length;
    private lengthValue;
    private compareRef;
    private compareRefKey;
    private compareRefValue;
    private date;
    private object;
    private objectValue;
    private when;
    private whenValue;
    private array;
    private arrayValue;
    private min;
    private minOrEqual;
    private minValue;
    private max;
    private maxOrEqual;
    private maxValue;
    private regex;
    private regexValue;
    private custom;
    private customValue;
    private or;
    private orValue;
    private enum;
    private enumValue;
    private messageError;
    constructor(props?: FenextjsValidatorClassConstructorProps);
    setName(name: string): this;
    getName(): any;
    setParent(parent: FenextjsValidatorClass): this;
    isEqual(d: T[] | T, msg?: string): this;
    onEqual(): this | undefined;
    isRequired(msg?: string): this;
    onRequired(): void;
    isBoolean(msg?: string): this;
    onBoolean(): void;
    isNumber(msg?: string): this;
    onNumber(): void;
    isString(msg?: string): this;
    onString(): void;
    isLength(length: number, msg?: string): this;
    onLength(): void;
    isDate(msg?: string): this;
    onDate(): void;
    isObject(obj: {
        [id in keyof T]?: FenextjsValidatorClass;
    } | undefined, msg?: string): this;
    getObjectValidator(): {
        [id in keyof T]?: FenextjsValidatorClass;
    } | undefined;
    onObject(): void;
    isArray(item?: FenextjsValidatorClass | undefined, msg?: string): this;
    onArray(): void;
    getArrayValue(): FenextjsValidatorClass<any> | undefined;
    isMin(min: number | Date, msg?: string): this;
    isMinOrEqual(min: number | Date, msg?: string): this;
    onMin(): void;
    isMax(max: number | Date, msg?: string): this;
    isMaxOrEqual(max: number | Date, msg?: string): this;
    onMax(): void;
    isCompareRef(refKey: string, msg?: string): this;
    getCompareRef(): any;
    setCompareRef(refValue: any): this;
    onCompareRef(): void;
    onError(code?: ErrorCode, message?: string): void;
    isWhen(data: FenextjsValidatorClassIsWhenProps): this;
    onWhen(): void;
    getWhenValue(): FenextjsValidatorClassIsWhenProps[] | undefined;
    isRegex(data: RegExp, msg?: string): this;
    onRegex(): void;
    isEmail(msg?: string): this;
    onEmail(): void;
    isCustom(data: (data: T) => true | ErrorFenextjs, msg?: string): this;
    onCustom(): void;
    isOr(d: FenextjsValidatorClass[], msg?: string): this;
    onOr(): this | undefined;
    isEnum(data: object, msg?: string): this;
    onEnum(): void;
    onValidate(d: T): ErrorFenextjs | true;
}
export declare const FenextjsValidator: <T = any>(props?: FenextjsValidatorClassConstructorProps) => FenextjsValidatorClass<T>;
export declare const FV: <T = any>(props?: FenextjsValidatorClassConstructorProps) => FenextjsValidatorClass<T>;
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
export declare const parseNumberCount: (n: number | string, options?: Intl.NumberFormatOptions) => string;
export declare const parseState_to_String: (data: StateProps | undefined | null) => string | undefined;
export declare const parseString_to_State: (data: string | undefined | null) => StateProps | undefined;
export declare const parsePhone_to_String: (data: Partial<PhoneProps> | undefined | null) => string;
export declare const parseString_to_Phone: (data: string | undefined | null) => Partial<PhoneProps>;
export declare const parseDateYYYYMMDD: (date: Date) => string;
export interface parseTextToDateProps {
    text: string;
    type: TypeDate;
}
export declare const parseTextToDate: ({ text, type }: parseTextToDateProps) => Date;
export interface parseDateToTextProps {
    date?: Date;
    type: TypeDate | "YYYY-MM-DD";
}
export declare const parseDateToText: ({ date, type, }: parseDateToTextProps) => string;
export declare const getMonthValue: (date: Date) => string;
export declare const getWeekValue: (date: Date) => string;
export declare const getISOWeek: (date: Date) => number;
export declare const getTimeValue: (date: Date) => string;
export interface getTimeToTextProps {
    days?: boolean;
    hours?: boolean;
    minutes?: boolean;
    seconds?: boolean;
}
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
export declare const parseDateTimeFormat: (date: Date, options: parseDateTimeFormatOptions) => string;
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
export declare const cleanTextForTranslate: (text: string) => string;
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
    onGetDifDate({ date, dateCompare }: {
        date?: Date;
        dateCompare: Date;
    }): Date;
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
    defaultValue?: T;
    value?: T;
    onChange?: (data: T) => void;
    defaultValueJsonString?: P;
    valueJsonString?: P;
    onChangeJsonString?: (data: P | undefined) => void;
    parseString_to_Json?: (data: P) => T | undefined;
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
export interface useLocalStorageProps<T = any, O = any> {
    name: string;
    defaultValue?: T;
    parse?: (value: any) => T;
    updateValue?: (oldValue: O, newValue: T) => T;
}
export declare const useLocalStorage: <T = any, O = any>(props: useLocalStorageProps<T, O>) => {
    load: boolean;
    value: T | undefined;
    setLocalStorage: (newValue: any) => void;
    onClearLocalStorage: () => void;
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
export interface useHistoryProps {
    name?: string;
}
export interface useHistoryOnBackProps {
    onValidateRuteBack?: (path: string) => boolean;
}
export declare const useHistory: ({ name }: useHistoryProps) => {
    paths: string[] | undefined;
    onBack: ({ onValidateRuteBack }: useHistoryOnBackProps) => void;
    currentPath: string | undefined;
};
export interface useValidatorProps<T> {
    data: T;
    validator?: FenextjsValidatorClass<T>;
}
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
export interface useAlertProps {
    name?: string;
}
export declare const useAlert: <T = any>({ name, }: useAlertProps) => {
    alert: AlertProps<T> | undefined;
    setAlert: (detail?: AlertProps<T> | undefined) => void;
    onClearAlert: () => void;
};
export interface useUserProps<U = UserProps> {
    varName?: string;
    onValidateUser?: (user: U | null | undefined) => boolean;
    urlRedirectInLogut?: string;
    onLogOut?: () => void;
}
export declare const useUser: <U = UserProps>({ varName, onValidateUser, urlRedirectInLogut, onLogOut: onLogOutProps, }: useUserProps<U>) => {
    load: boolean;
    user: U | null | undefined;
    setUser: (newValue: any) => void;
    onLogin: (data: U) => unknown;
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
export interface useOnlineProps {
    onOnline?: () => void;
    onOffline?: () => void;
}
export declare const useOnline: ({ onOffline, onOnline }?: useOnlineProps) => {
    isOnline: boolean;
};
export interface NotificationDataProps {
    type?: RequestResultTypeProps | keyof typeof RequestResultTypeProps;
    message: string;
}
export interface useNotificationProps {
    time?: number;
}
export declare const useNotification: ({ time }: useNotificationProps) => {
    notification: NotificationDataProps | undefined;
    pop: (props: NotificationDataProps, options?: NotificationOptions) => void;
    reset: () => void;
};
export interface useCSCProps extends useJsonStringProps<CSCProps, CSCStringProps> {
}
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
export interface useRequestProps<Q = any, R = any, E = any, T = RequestResultTypeProps> {
    query: Q;
    request: RequestProps<Q, R, E, T>;
    autoRequest?: boolean;
    defaultResult?: RequestResultDataProps<R, E, T>;
    defaultResultValue?: R;
    defaultError?: E;
}
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
export interface QueryDataDefault {
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
export interface useQueryProps<T = QueryDataDefault> {
    ignoreQuerys?: [id: keyof T];
    parseQuery?: (data: ParsedUrlQuery) => T;
}
export declare const useQuery: <T = QueryDataDefault>(props?: useQueryProps<T> | undefined) => {
    load: boolean;
    query: T;
    setQuery: (query: T) => boolean;
    onConcatQuery: (newQuery: T) => boolean;
    onChangeQuery: (id: keyof T) => (value: T[keyof T]) => boolean;
    onDeleteQuery: (id: keyof T) => boolean;
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
export interface LanguageListProps<Langs extends string[]> {
    [word: string]: {
        [lang in Langs[number]]: any;
    };
}
export interface useLanguageProps<Langs extends string[]> {
    defaultLang?: Langs[number];
    langs: Langs;
    listTranductions: LanguageListProps<Langs>;
    onNoFoundTranslate?: (data: {
        word: string;
        lang: Langs[number];
    }) => void;
    fallbackNoFoundTranslation?: string;
}
export declare const useLanguage: <Langs extends string[]>({ langs, listTranductions, defaultLang, onNoFoundTranslate, fallbackNoFoundTranslation, }: useLanguageProps<Langs>) => {
    onTranslate: (word?: any) => any;
    load: boolean;
    currentLang: Langs[number] | undefined;
    setCurrentLang: (newValue: any) => void;
};
export interface useDataOptionsRefreshDataIfChangeDefaultDataOptions {
    active?: boolean;
    useReloadKeyData?: boolean;
}
export interface setDataOptions {
    useOptionsOnChangeDataAfter?: boolean;
    useSetIsChange?: boolean;
}
export interface useDataOptions<T, M = any, RT = void, RM = void, ET = any, EM = any> {
    data?: T;
    refreshDataIfChangeDefaultData?: useDataOptionsRefreshDataIfChangeDefaultDataOptions;
    onChangeDataAfter?: (data: T) => void;
    onDeleteDataAfter?: (data: T) => void;
    onChangeDataMemoAfter?: (data: M) => void;
    memoDependencies?: any[];
    onMemo?: (data: T) => M;
    validator?: FenextjsValidatorClass<T>;
    validatorMemo?: FenextjsValidatorClass<M>;
    onSubmitData?: (data: T) => RT | Promise<RT>;
    onBeforeSubmitData?: (d: {
        data: T;
        isValid?: ErrorFenextjs | true;
    }) => void;
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
    onBeforeSubmitDataMemo?: (d: {
        dataMemo: M;
        isValidDataMemo?: ErrorFenextjs | true;
    }) => void;
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
    useGlobalContext?: string;
}
export type useDataOptionsEnvLog = "data" | "dataMemo" | "isValidData" | "isValidDataMemo" | "dataError" | "dataErrorMemo" | "loaderSubmit" | "loaderSubmitMemo" | "keyData" | "isChange";
export interface onChangeDataOptionsProps<T> {
    onCallback?: (data: T) => void;
    parseDataBeforeOnChangeData?: (id: keyof T, data: T) => T;
}
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
export interface useSessionStorageProps<T = any, O = any> {
    name: string;
    defaultValue?: T;
    parse?: (value: any) => T;
    updateValue?: (oldValue: O, newValue: T) => T;
}
export declare const useSessionStorage: <T = any, O = any>(props: useSessionStorageProps<T, O>) => {
    load: boolean;
    value: T | undefined;
    setSessionStorage: (newValue: any) => void;
    onClearSessionStorage: () => void;
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
export interface useActionDropDownProps {
    name?: string;
    onChange?: (e?: boolean) => void;
}
export declare const useActionDropDown: ({ name, onChange, }: useActionDropDownProps) => {
    onClose: () => void;
    onActive: () => void;
    onToogle: () => void;
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
export declare const SvgFacebookF: ({ className }: {
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
export declare const SvgPaginationDown: ({ className, }: {
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
export declare const SvgStart: ({ className }: {
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
export declare const SvgCancel: ({ className }: {
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
export declare const SvgVisa: ({ className }: {
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
export declare const SvgNumberIncrease: ({ className, }: {
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
export declare const SvgPaginationNext: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgQr: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgPaginationPre: ({ className, }: {
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
export declare const SvgNumberDecrease: ({ className, }: {
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
export declare const SvgPaginationUp: ({ className }: {
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
export declare const SvgViewTableBox: ({ className }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgViewTableList: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgViewSelectList: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgViewSelectNormal: ({ className, }: {
    className?: string | undefined;
}) => React.JSX.Element;
export declare const SvgViewSelectBox: ({ className, }: {
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
export declare const FenextImgPlaceholderUrlBase: string;
export declare const FenextImgUserPlaceholder: string;
export declare const FenextImgPlaceholder: string;
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
export interface TextBaseProps extends PropsWithChildren, _TProps {
    tag?: "p" | "strong" | "small" | "em" | "b" | "del" | "i" | "mark" | "ins" | "sub" | "sup";
    loader?: boolean;
    nLineLoader?: number;
}
export interface TextClassProps {
    className?: string;
}
export interface TextProps extends TextBaseProps, TextClassProps {
}
export declare const Text: ({ className, tag, loader, children, nLineLoader, ...props }: TextProps) => React.JSX.Element;
export interface ContentShowBaseProps extends _TProps {
    children?: ReactNode;
    show?: boolean;
}
export interface ContentShowClassProps {
    className?: string;
}
export interface ContentShowProps extends ContentShowBaseProps, ContentShowClassProps {
}
export declare const ContentShow: ({ className, children, show, ...props }: ContentShowProps) => React.JSX.Element;
export interface TitleProps extends PropsWithChildren, _TProps {
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    loader?: boolean;
    className?: string;
}
export declare const Title: ({ className, tag, loader, children, ...props }: TitleProps) => React.JSX.Element;
export interface BreadcrumbLinkProps extends _TProps {
    href: string;
    children: ReactNode;
    onClick?: () => void;
}
export interface BreadcrumbBaseProps extends _TProps {
    links: BreadcrumbLinkProps[];
}
export interface BreadcrumbClassProps {
    className?: string;
    classNameItem?: string;
    classNameLink?: string;
}
export interface BreadcrumbProps extends BreadcrumbBaseProps, BreadcrumbClassProps {
}
export declare const Breadcrumb: ({ className, classNameItem, classNameLink, links, ...props }: BreadcrumbProps) => React.JSX.Element;
export interface SwichViewListBaseItemProps<T> {
    id: T;
    icon: ReactNode;
}
export interface SwichViewListBaseProps<T> extends _TProps {
    name?: string;
    list?: SwichViewListBaseItemProps<T>[];
    defaultValue?: T;
    onChange?: (e?: T) => void;
}
export interface SwichViewListClassProps {
    className?: string;
}
export interface SwichViewListProps<T> extends SwichViewListBaseProps<T>, SwichViewListClassProps {
}
export declare const SwichViewList: <T>({ className, defaultValue, onChange, list, name, }: SwichViewListProps<T>) => React.JSX.Element;
export type SwichViewTableType = "fenext-swich-view-table-box" | "fenext-swich-view-table-list";
export interface SwichViewTableBaseProps extends Omit<SwichViewListBaseProps<SwichViewTableType>, "list" | "name"> {
}
export interface SwichViewTableClassProps extends SwichViewListClassProps {
}
export interface SwichViewTableProps extends SwichViewTableBaseProps, SwichViewTableClassProps {
}
export declare const SwichViewTable: ({ className, defaultValue, ...props }: SwichViewTableProps) => React.JSX.Element;
export type SwichViewSelectType = "fenext-swich-view-select-box" | "fenext-swich-view-select-list" | "fenext-swich-view-select-normal";
export interface SwichViewSelectBaseProps extends Omit<SwichViewListBaseProps<SwichViewSelectType>, "list" | "name"> {
}
export interface SwichViewSelectClassProps extends SwichViewListClassProps {
}
export interface SwichViewSelectProps extends SwichViewSelectBaseProps, SwichViewSelectClassProps {
}
export declare const SwichViewSelect: ({ className, defaultValue, ...props }: SwichViewSelectProps) => React.JSX.Element;
export interface TableActionCheckboxBaseProps<T> extends _TProps {
    actionAllCheckbox?: InputCheckboxProps;
    actions?: ((data: T[]) => ReactNode)[];
    data?: T[];
}
export interface TableActionCheckboxClassProps {
    className?: string;
}
export interface TableActionCheckboxProps<T> extends TableActionCheckboxBaseProps<T>, TableActionCheckboxClassProps {
}
export declare const TableActionCheckbox: <T = any>({ className, actionAllCheckbox, actions, data, }: TableActionCheckboxProps<T>) => React.JSX.Element;
export interface MediaInputBaseProps extends _TProps {
    titleView?: string;
    textView?: string;
    iconView?: ReactNode;
    defaultValue?: ImgDataProps[] | ImgDataProps;
    multiple?: boolean;
    onChange?: (data: ImgDataProps[] | ImgDataProps | undefined) => void;
    ButtonUploadProps?: Omit<ButtonProps, "onClick">;
    MediaPageProps?: Omit<MediaPageProps, "onChange" | "multiple" | "defaultValue">;
    ModalProps?: Pick<ModalBaseBaseProps, "type">;
}
export interface MediaInputClassProps {
    className?: string;
}
export interface MediaInputProps extends MediaInputBaseProps, MediaInputClassProps {
}
export declare const MediaInput: ({ className, titleView, textView, iconView, defaultValue, multiple, onChange, ButtonUploadProps, MediaPageProps, ModalProps, ...props }: MediaInputProps) => React.JSX.Element;
export interface MediaPageBaseProps extends _TProps {
    defaultValue?: ImgDataProps[] | ImgDataProps;
    disabledSelectImg?: boolean;
    images?: ImgDataProps[];
    loaderImages?: boolean;
    multiple?: boolean;
    isPage?: boolean;
    onRenderImg?: (data: ImgDataProps) => ReactNode;
    onChange?: (data: ImgDataProps[] | ImgDataProps | undefined) => void;
    onUploadImg?: (data: ImgDataProps) => void;
    onDeleteImg?: (data: ImgDataProps) => void;
    onAcepte?: (data: ImgDataProps[] | ImgDataProps) => void;
    HeaderPage?: ReactNode;
    ButtonAcceptProps?: Omit<ButtonProps, "onClick">;
    ButtonCancelProps?: Omit<ButtonProps, "onClick">;
    InputUploadProps?: Omit<InputUploadProps, "onChange" | "defaultValue" | "onChangeProgress" | "onUploadFile" | "clearAfterUpload">;
    extraContentImgs?: ReactNode;
}
export interface MediaPageClassProps {
    className?: string;
}
export interface MediaPageProps extends MediaPageBaseProps, MediaPageClassProps {
}
export declare const MediaPage: ({ className, multiple, onChange, onUploadImg, onDeleteImg, onAcepte, HeaderPage, defaultValue, images, loaderImages, disabledSelectImg, InputUploadProps, ButtonAcceptProps, ButtonCancelProps, isPage, extraContentImgs, onRenderImg, ...props }: MediaPageProps) => React.JSX.Element;
export interface ColsProps extends _TProps {
    nCols?: number | string;
    breakInside?: boolean;
    children?: ReactNode;
    className?: string;
}
export declare const Cols: ({ className, children, nCols, breakInside, ...props }: ColsProps) => React.JSX.Element;
export type ButtonBaseSize = "extra-small" | "small" | "normal" | "strong" | "extra-strong";
export type ButtonOnClick = React.MouseEventHandler<HTMLButtonElement> & React.MouseEventHandler<HTMLDivElement>;
export interface ButtonBaseProps extends PropsWithChildren, _TProps {
    loader?: boolean;
    invert?: boolean;
    disabled?: boolean;
    onClick?: ButtonOnClick;
    onClickDisabled?: ButtonOnClick;
    icon?: ReactNode;
    iconLoader?: ReactNode;
    isBtn?: boolean;
    size?: ButtonBaseSize;
    full?: boolean;
}
export interface ButtonClassProps {
    className?: string;
    classNameDisabled?: string;
    classNameLoader?: string;
    classNameInvert?: string;
    classNameContentLoaderElement?: string;
    classNameLoaderElement?: string;
}
export interface ButtonProps extends ButtonBaseProps, ButtonClassProps {
}
export declare const Button: ({ className, classNameLoader, classNameInvert, classNameDisabled, classNameContentLoaderElement, classNameLoaderElement, children, loader, invert, disabled, onClick, onClickDisabled: onClickDisabledProps, icon, iconLoader, isBtn, full, size, ...props }: ButtonProps) => React.JSX.Element;
export interface LayoutGridMenuLeftBaseProps extends PropsWithChildren {
    useAlertHook?: boolean;
    alertHookProps?: AlertHookProps;
    alert?: AlertComponentProps;
    loader?: boolean;
    menuLeft?: ReactNode;
    menuLeftActive?: boolean;
    menuLeftMovilActive?: boolean;
    useHeaderButtonMenu?: boolean;
    usePageProgress?: boolean;
    target?: string;
}
export interface LayoutGridMenuLeftClassProps extends LoaderClassProps {
    className?: string;
    classNameMenuLeft?: string;
    classNameMenuLeftContent?: string;
    classNameChildren?: string;
}
export interface LayoutGridMenuLeftProps extends LayoutGridMenuLeftBaseProps, LayoutGridMenuLeftClassProps {
}
export declare const LayoutGridMenuLeft: ({ className, classNameLoader, classNameChildren, classNameMenuLeft, classNameMenuLeftContent, children, menuLeft, loader, menuLeftActive, menuLeftMovilActive, useHeaderButtonMenu, usePageProgress, useAlertHook, alertHookProps, alert, target, ...props }: LayoutGridMenuLeftProps) => React.JSX.Element;
export interface LayoutGridMenuTopLeftBaseProps extends LayoutGridMenuTopBaseProps, LayoutGridMenuLeftBaseProps {
}
export interface LayoutGridMenuTopLeftClassProps extends LayoutGridMenuTopClassProps, LayoutGridMenuLeftClassProps, LoaderClassProps {
}
export interface LayoutGridMenuTopLeftProps extends LayoutGridMenuTopLeftBaseProps, LayoutGridMenuTopLeftClassProps {
}
export declare const LayoutGridMenuTopLeft: ({ className, classNameLoader, classNameChildren, classNameMenuTop, classNameMenuLeft, classNameMenuLeftContent, children, menuLeft, menuTop, loader, menuLeftActive, menuLeftMovilActive, useHeaderButtonMenu, usePageProgress, alertHookProps, alert, useAlertHook, target, }: LayoutGridMenuTopLeftProps) => React.JSX.Element;
export interface LayoutGridMenuTopBaseProps extends PropsWithChildren {
    useAlertHook?: boolean;
    alertHookProps?: AlertHookProps;
    alert?: AlertComponentProps;
    loader?: boolean;
    menuTop?: ReactNode;
    usePageProgress?: boolean;
}
export interface LayoutGridMenuTopClassProps extends LoaderClassProps {
    className?: string;
    classNameMenuTop?: string;
    classNameChildren?: string;
}
export interface LayoutGridMenuTopProps extends LayoutGridMenuTopBaseProps, LayoutGridMenuTopClassProps {
}
export declare const LayoutGridMenuTop: ({ className, classNameLoader, classNameChildren, classNameMenuTop, children, menuTop, loader, usePageProgress, useAlertHook, alertHookProps, alert, ...props }: LayoutGridMenuTopProps) => React.JSX.Element;
export interface ContainerProps extends PropsWithChildren, _TProps {
    customSize?: number;
    usePaddingInline?: boolean;
    className?: string;
}
export declare const Container: ({ className, customSize, usePaddingInline, children, ...props }: ContainerProps) => React.JSX.Element;
export interface StepsCircleItemProps {
    children?: ReactNode;
    onClick?: () => void;
}
export interface StepsCircleClassProps {
    className?: string;
    classNameDisabled?: string;
    classNameItem?: string;
    classNameItemCircle?: string;
    classNameItemContent?: string;
    classNameItemActive?: string;
    classNameItemActiveCircle?: string;
    classNameItemActiveContent?: string;
    classNameProgressLine?: ProgressLineClassProps;
}
export interface StepsCircleProps extends StepsCircleClassProps {
    items?: StepsCircleItemProps[];
    defaultStep?: number;
    valueStep?: number;
    disabled?: boolean;
}
export declare const StepsCircle: ({ className, classNameDisabled, classNameItem, classNameItemCircle, classNameItemContent, classNameItemActive, classNameItemActiveCircle, classNameItemActiveContent, classNameProgressLine, defaultStep, valueStep, disabled, items, }: StepsCircleProps) => React.JSX.Element;
export interface ButtonMenuBaseProps extends PropsWithChildren, _TProps {
    loader?: boolean;
    disabled?: boolean;
    defaultActive?: boolean;
    target?: string;
}
export interface ButtonMenuClassProps {
    className?: string;
    classNameIcon?: string;
    classNameIconBarClose?: string;
    classNameContent?: string;
}
export interface ButtonMenuProps extends ButtonMenuBaseProps, ButtonMenuClassProps {
}
export declare const ButtonMenu: ({ className, classNameIcon, classNameIconBarClose, classNameContent, loader, disabled, defaultActive: defaultActiveProps, children, target, ...props }: ButtonMenuProps) => React.JSX.Element;
export interface MenuBaseProps extends _TProps {
    items?: ItemMenuProps[];
    iconArrow?: ReactNode;
    typeCollapse?: "radio" | "checkbox";
}
export interface MenuClassProps {
    className?: string;
    defaultShowSubMenu?: boolean;
}
export interface MenuProps extends MenuBaseProps, MenuClassProps {
}
export declare const Menu: ({ className, items, defaultShowSubMenu, iconArrow, typeCollapse, ...props }: MenuProps) => React.JSX.Element;
export interface ItemMenuBaseProps extends _TProps {
    url: string;
    text: ReactNode;
    icon?: ReactNode;
    subItems?: Omit<ItemMenuProps, "_t">[];
    defaultActive?: boolean;
    iconArrow?: ReactNode;
    nameNumber?: number;
    typeCollapse?: "radio" | "checkbox";
    isLink?: boolean;
    onClick?: () => void;
}
export interface ItemMenuClassProps {
    className?: string;
    classNameA?: string;
    classNameText?: string;
    classNameIcon?: string;
}
export interface ItemMenuProps extends ItemMenuBaseProps, ItemMenuClassProps {
}
export declare const ItemMenu: ({ className, classNameA, classNameIcon, classNameText, text, url, icon, subItems, defaultActive, iconArrow, nameNumber, typeCollapse, isLink, onClick, ...props }: ItemMenuProps) => React.JSX.Element;
export interface BoxBaseProps extends PropsWithChildren, _TProps {
}
export interface BoxClassProps {
    className?: string;
}
export interface BoxProps extends BoxBaseProps, BoxClassProps {
}
export declare const Box: ({ className, children }: BoxProps) => React.JSX.Element;
export interface ContentScrollLeftProps extends PropsWithChildren, _TProps {
    className?: string;
    classNameContent?: string;
}
export declare const ContentScrollLeft: ({ className, classNameContent, children, ...props }: ContentScrollLeftProps) => React.JSX.Element;
export interface InputNumberProps extends Omit<InputTextProps, "defaultValue" | "onChange" | "onChangeValidate" | "value"> {
    value?: number | "";
    defaultValue?: number | "";
    onChange?: (v: number | "") => void;
    onChangeValidate?: (v: number | "") => void;
    min?: number;
    max?: number;
    useBtnIncreaseDecrease?: boolean;
    disabledScroll?: boolean;
}
export declare const InputNumber: ({ defaultValue, onChange, useBtnIncreaseDecrease, validator, value, disabledScroll, ...props }: InputNumberProps) => React.JSX.Element;
export type InputTextChangeEvent = React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>;
export interface InputTextClassProps {
    className?: string;
    classNameLabel?: string;
    classNameLabelError?: string;
    classNameLabelOk?: string;
    classNameContentInput?: string;
    classNameInput?: string;
    classNameInputEnabled?: string;
    classNameInputDisabled?: string;
    classNameIcon?: string;
    classNameMaxLength?: string;
    classNameError?: string;
    classNameOptions?: string;
    classNameOption?: string;
    classNameOptionDisabled?: string;
    classNameLoaderValidate?: string;
    iconLoader?: any;
}
export interface InputTextBaseProps extends _TProps {
    id?: string;
    name?: string;
    datalist?: any;
    validator?: FenextjsValidatorClass;
    label?: ReactNode;
    placeholder?: string;
    placeholderFocus?: string;
    defaultValue?: string | undefined | null;
    value?: string | undefined | null;
    type?: "text" | "search" | "tel" | "url" | "password" | "number" | "textarea";
    onChange?: (v: string) => void;
    onBlur?: (v: string) => void;
    onEnter?: () => void;
    onChangeValidate?: (e: string) => Promise<string> | string;
    props?: any;
    icon?: ReactNode;
    iconPos?: "left" | "right";
    extraInContentInput?: ReactNode;
    extraInLabel?: ReactNode;
    disabled?: boolean;
    showIcon?: boolean;
    error?: ErrorFenextjs;
    errorWithIsChange?: boolean;
    optional?: boolean;
    optionalText?: string;
    required?: boolean;
    requiredText?: string;
    loader?: boolean;
    isChange?: boolean;
    useLoader?: boolean;
    inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
    autoComplete?: boolean | string | "off" | "on";
    onKeyDown?: (React.KeyboardEventHandler<HTMLTextAreaElement> & React.KeyboardEventHandler<HTMLInputElement>) | undefined;
    onWheel?: (React.WheelEventHandler<HTMLTextAreaElement> & React.WheelEventHandler<HTMLInputElement>) | undefined;
    maxLength?: number;
    regExp?: RegExp;
    regExpReplace?: string;
    parseText?: (data: string) => string;
    onChangeEvent?: (e: InputTextChangeEvent) => void;
    showFocusInTarget?: boolean;
}
export interface InputTextProps extends InputTextBaseProps, InputTextClassProps {
}
export declare const InputText: ({ id, datalist, name, label, placeholder, placeholderFocus, defaultValue, value, type, className, classNameLabel, classNameContentInput, classNameInput, classNameIcon, classNameMaxLength, classNameLoaderValidate, classNameError, iconLoader, onChange, onBlur, onEnter, onChangeValidate, parseText, props, icon, extraInContentInput, extraInLabel, disabled, showIcon, error, errorWithIsChange, optional, optionalText, required, requiredText, loader, autoComplete, useLoader, isChange: isChangeProps, onKeyDown, onWheel, iconPos, inputMode, validator, maxLength, regExp, regExpReplace, onChangeEvent, showFocusInTarget, ...p }: InputTextProps) => React.JSX.Element;
export interface InputCalendarClassProps {
    className?: string;
    classNameContentCalendar?: string;
    classNameInputText?: InputTextClassProps;
    classNameInputCalendarMonth?: InputCalendarMonthClassProps;
}
export interface InputCalendarProps extends Pick<InputTextProps, "label" | "placeholder" | "optional" | "optionalText" | "required" | "requiredText" | "icon" | "iconPos" | "validator" | "errorWithIsChange">, Pick<InputCalendarMonthProps, "_t" | "type" | "min" | "max">, InputCalendarClassProps {
    defaultValue?: Date;
    value?: Date;
    defaultValueRange?: Date[];
    valueRange?: Date[];
    onChange?: (d: Date | undefined) => void;
    onChangeRange?: (d: Date[]) => void;
    nMonthShow?: number;
    collapseProps?: Omit<CollapseProps, "children" | "header">;
}
export declare const InputCalendar: ({ nMonthShow, icon, type, defaultValue, value, defaultValueRange, valueRange, onChange, onChangeRange, validator, errorWithIsChange, collapseProps, className, classNameContentCalendar, classNameInputText, classNameInputCalendarMonth, ...props }: InputCalendarProps) => React.JSX.Element;
export interface InputCalendarMonthClassProps {
    className?: string;
    classNameContent?: string;
    classNameTop?: string;
    classNameTopBtn?: string;
    classNameTopBtnPrev?: string;
    classNameTopBtnNext?: string;
    classNameTopInfo?: string;
    classNameDays?: string;
    classNameDay?: string;
    classNameDate?: string;
    classNameDateValid?: string;
    classNameDateDisabled?: string;
    classNameDateInMonth?: string;
    classNameDateOtherMonth?: string;
    classNameDateSelect?: string;
    classNameDateSelectRange?: string;
}
export interface InputCalendarMonthProps extends InputCalendarMonthClassProps, _TProps {
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
export declare const InputCalendarMonth: ({ type, onPreMonth, onNextMonth, date, selectDate, selectDateRange, setSelectDate, setSelectDateRange, dataNSelect, setDataNSelect, min, max, className, classNameContent, classNameTop, classNameTopBtn, classNameTopBtnPrev, classNameTopBtnNext, classNameTopInfo, classNameDays, classNameDay, classNameDate, classNameDateValid, classNameDateDisabled, classNameDateInMonth, classNameDateOtherMonth, classNameDateSelect, classNameDateSelectRange, ...props }: InputCalendarMonthProps) => React.JSX.Element;
export interface InputSelectNumberProps extends Omit<InputSelectProps, "options" | "onChange" | "defaultValue" | "parseText"> {
    onChange?: (n?: number) => void;
    defaultValue?: number;
    min?: number;
    max?: number;
    parseText?: (e: number) => string;
}
export declare const InputSelectNumber: ({ onChange, defaultValue, min, max, parseText, useTOption, ...props }: InputSelectNumberProps) => React.JSX.Element;
export interface InputGalleryBaseProps extends Omit<InputImgBaseProps, "defaultValue" | "onRemove" | "onChange">, _TProps {
    defaultValue?: FileProps[];
    value?: FileProps[];
    textBtn?: string;
    onChange?: (items: FileProps[]) => void;
}
export interface InputGalleryClassProps {
    className?: string;
    classNameContentButton?: string;
    classNameButton?: ButtonClassProps;
}
export interface InputGalleryProps extends InputGalleryBaseProps, InputGalleryClassProps {
}
export declare const InputGallery: ({ className, classNameContentButton, classNameButton, textBtn, defaultValue, value, onChange, ...props }: InputGalleryProps) => React.JSX.Element;
export interface InputUploadBaseProps extends InputFileBaseProps {
    title?: ReactNode;
    text?: ReactNode;
    titleFile?: ReactNode;
    textFile?: ReactNode;
    textPreview?: ReactNode;
    icon?: ReactNode;
    iconFile?: ReactNode;
    btn?: ReactNode;
    tagPreview?: "embed" | "img";
    customPreview?: (data: FileProps) => ReactNode;
    loader?: boolean;
    iconLoader?: ReactNode;
}
export interface InputUploadClassProps {
    className?: string;
    classNameUp?: string;
    classNameTitle?: Omit<TitleProps, "children">;
    classNameContentIcon?: string;
    classNameBtn?: Omit<ButtonProps, "children">;
    classNameText?: Omit<TextProps, "children">;
    classNameProgress?: string;
    classNamePreview?: string;
    classNameRemove?: string;
}
export interface InputUploadProps extends InputUploadBaseProps, InputUploadClassProps {
}
export declare const InputUpload: ({ className, classNameBtn, classNameContentIcon, classNameText, classNamePreview, classNameTitle, classNameUp, classNameProgress, classNameRemove, btn, icon, text, title, titleFile, textFile, iconFile, textPreview, defaultValue, parseProgress, onChange, tagPreview, loader, iconLoader, customPreview, ...props }: InputUploadProps) => React.JSX.Element;
export interface InputScannerQrProps {
    className?: string;
    onChange?: (v: string) => void;
    buttonScannerContent?: ReactNode;
    buttonChangeCameraContent?: ReactNode;
    buttonToggleFlashContent?: ReactNode;
}
export declare const InputScannerQr: ({ className, onChange, buttonScannerContent, buttonChangeCameraContent, buttonToggleFlashContent, }: InputScannerQrProps) => React.JSX.Element;
export interface InputScannerTextQrProps extends InputTextProps, InputScannerQrProps {
}
export declare const InputScannerTextQr: ({ className, defaultValue, onChange, ...props }: InputScannerTextQrProps) => React.JSX.Element;
export interface InputSelectOptionClassProps {
    classNameOption?: string;
    classNameOptionImg?: string;
    classNameOptionDelete?: string;
}
export interface InputSelectOptionBaseProps<T = any> extends PropsWithChildren, _TProps {
    id: string | number;
    text: string;
    img?: string;
    imgComponent?: ImgProps;
    icon?: ReactNode;
    type?: "div" | "option" | "multiple";
    disabled?: boolean;
    selected?: boolean;
    hidden?: boolean;
    onClick?: (item: InputSelectOptionBaseProps) => void;
    onDelete?: (item: InputSelectOptionBaseProps) => void;
    isBtn?: boolean;
    data?: T;
    iconDelete?: ReactNode;
}
export interface InputSelectOptionProps<T = any> extends InputSelectOptionBaseProps<T>, InputSelectOptionClassProps {
}
export declare const InputSelectOption: <T = any>({ classNameOption, classNameOptionImg, classNameOptionDelete, id, text, img, imgComponent, icon, children, type, onClick, onDelete, disabled, selected, hidden, isBtn, data, iconDelete, ...props }: InputSelectOptionProps<T>) => React.JSX.Element;
export declare const InputCardNumberIcons: {
    [id in Card_Enum]: ReactNode;
};
export interface InputCardNumberProps extends Omit<InputTextProps, "onChangeValidate" | "icon" | "type"> {
    maxNumberLength?: number;
}
export declare const InputCardNumber: ({ value: valueProps, defaultValue, onChange, validator, maxNumberLength, ...props }: InputCardNumberProps) => React.JSX.Element;
export interface InputCardExpDateDataProps {
    month?: number;
    year?: number;
}
export interface InputCardExpDateProps extends Omit<InputTextProps, "onChangeValidate" | "icon" | "type" | "defaultValue" | "value" | "onChange" | "inputMode"> {
    maxExpDateLength?: number;
    defaultValue?: InputCardExpDateDataProps;
    value?: InputCardExpDateDataProps;
    onChange?: (data: InputCardExpDateDataProps) => void;
}
export declare const InputCardExpDate: ({ value: valueProps, defaultValue, placeholder, onChange, validator, maxExpDateLength, ...props }: InputCardExpDateProps) => React.JSX.Element;
export interface InputCardCCVProps extends Omit<InputTextProps, "onChangeValidate" | "icon" | "type" | "maxLength" | "regExpReplace" | "regExp" | "inputMode" | "type"> {
}
export declare const InputCardCCV: ({ placeholder, ...props }: InputCardCCVProps) => React.JSX.Element;
export interface InputSelectCityProps extends Omit<InputSelectTProps<CityProps>, "options" | "onParse" | "useLoader" | "loader"> {
    country?: CountryProps;
    state?: StateProps;
}
export declare const InputSelectCity: ({ country, state, ...props }: InputSelectCityProps) => React.JSX.Element;
export type InputSelectTypeStyle = "normal" | "normal-out" | "box" | "list" | "checkbox";
export interface InputSelectClassProps extends InputTextClassProps, InputSelectOptionClassProps {
    classNameSelect?: string;
    classNameList?: string;
}
export interface InputSelectItemOptionBaseProps<T = any> extends Omit<InputSelectOptionProps<T>, "type" | "onDelete"> {
}
export interface InputSelectBaseProps<T = any> extends Omit<InputTextBaseProps, "value" | "type" | "defaultValue" | "value" | "onChange" | "onBlur" | "onEnter" | "onChangeValidate"> {
    options: InputSelectItemOptionBaseProps<T>[];
    filterOptions?: (data: InputSelectItemOptionBaseProps<T>[]) => InputSelectItemOptionBaseProps<T>[];
    showOptions?: "hover" | "focus" | "focus-hover";
    hiddenOptions?: "not-hover" | "not-focus" | "not-focus-hover";
    defaultValue?: InputSelectItemOptionBaseProps<T>;
    typeSelect?: "div" | "select" | "datalist";
    typeSelectStyle?: InputSelectTypeStyle;
    useSwichtypeSelectStyle?: boolean;
    useTOption?: boolean;
    value?: InputSelectItemOptionBaseProps<T>;
    noResult?: InputSelectItemOptionBaseProps<T>;
    loaderOption?: InputSelectItemOptionBaseProps<T>;
    selected?: InputSelectItemOptionBaseProps<T>;
    create?: InputSelectItemOptionBaseProps<T>;
    itemMaxLengthShowOptions?: InputSelectItemOptionBaseProps<T>;
    onCreate?: () => void;
    isSelectClearText?: boolean;
    isSelectChangeText?: boolean;
    onChange?: (v?: InputSelectItemOptionBaseProps<T>) => void;
    onChangeData?: (v?: T) => void;
    onChangeText?: (v?: string) => void;
    onChangeValidate?: (e?: InputSelectItemOptionBaseProps<T>) => Promise<any> | any;
    iconCloseMovil?: any;
    clearContent?: ReactNode;
    searchById?: boolean;
    iconSearch?: ReactNode;
    changeByFirstOptionInOnBlur?: boolean;
    maxLengthShowOptions?: number;
    useItemMaxLengthShowOptions?: boolean;
    nItems?: number;
    converterInSearchWithMaxLenght?: boolean;
    showOptionIconImg?: boolean;
    validatorData?: FenextjsValidatorClass<T | undefined>;
    forceShowOptionOnLoad?: boolean;
    iconDelete?: ReactNode;
    useSearch?: boolean;
}
export interface InputSelectProps<T = any> extends InputSelectBaseProps<T>, InputSelectClassProps {
}
export interface InputSelectValue<T = any> {
    option?: InputSelectItemOptionBaseProps<T>;
    text?: string;
    textSearch?: string;
}
export declare const InputSelect: <T = any>({ classNameSelect, classNameList, classNameOption, error, options: optionsProps, showOptions, hiddenOptions, defaultValue, typeSelect, typeSelectStyle, value, onChange, onChangeData, onChangeText, onChangeValidate, icon, iconSearch, noResult, loaderOption, selected, create, onCreate, isSelectClearText, iconCloseMovil, filterOptions, clearContent, isSelectChangeText, errorWithIsChange, validator, searchById, useSwichtypeSelectStyle, changeByFirstOptionInOnBlur, converterInSearchWithMaxLenght, nItems, useSearch, useItemMaxLengthShowOptions, maxLengthShowOptions, itemMaxLengthShowOptions, showOptionIconImg, validatorData, useTOption, forceShowOptionOnLoad, iconDelete, ...props }: InputSelectProps<T>) => React.JSX.Element;
export interface useSelectOptionsPosProps {
    children?: ReactNode;
    target?: HTMLElement | null | undefined;
}
export declare const useSelectOptionsPos: ({ children, target, }: useSelectOptionsPosProps) => {
    ref: HTMLElement | undefined;
    onLoadPos: () => void;
    onLoadChildren: () => void;
};
export interface InputColorProps {
    className?: string;
    defaultValue?: string;
    value?: string;
    onChange?: (data: string) => void;
    disabled?: boolean;
}
export declare const InputColor: ({ className, defaultValue, value, onChange, disabled, }: InputColorProps) => React.JSX.Element;
export interface InputSelectTimeZoneClassProps extends InputSelectClassProps {
}
export interface InputSelectTimeZoneBaseProps extends Omit<InputSelectTProps<TimeZoneProps>, "options" | "onParse"> {
}
export interface InputSelectTimeZoneProps extends InputSelectTimeZoneBaseProps, InputSelectTimeZoneClassProps {
}
export declare const InputSelectTimeZone: ({ useTOption, ...props }: InputSelectTimeZoneProps) => React.JSX.Element;
export declare const TimeZoneList: TimeZoneProps[];
export interface InputNumberCountClassProps extends InputTextClassProps {
}
export interface InputNumberCountBaseProps extends Omit<InputTextBaseProps, "type" | "defaultValue" | "onChange" | "onChangeValidate" | "value" | "validator"> {
    symbolInit?: string;
    symbolFinal?: string;
    defaultValue?: number | "";
    value?: number | "";
    onChange?: (v: number | "") => void;
    min?: number;
    max?: number;
    aplyMin?: boolean;
    aplyMax?: boolean;
    minError?: string;
    maxError?: string;
    validator?: FenextjsValidatorClass<number>;
    optionsParseNumber?: Intl.NumberFormatOptions;
    optionsParseNumberDefault?: Intl.NumberFormatOptions;
}
export interface InputNumberCountProps extends InputNumberCountBaseProps, InputNumberCountClassProps {
}
export declare const InputNumberCount: ({ onChange, value: valueProps, defaultValue, symbolInit, symbolFinal, validator: validatorProps, min, max, minError, maxError, optionsParseNumberDefault, optionsParseNumber, aplyMax, aplyMin, ...props }: InputNumberCountProps) => React.JSX.Element;
export interface InputRateBaseProps {
    value?: number;
    defaultValue?: number;
}
export interface InputRateClassProps {
    className?: string;
    classNameContentStar?: string;
    classNameStar?: string;
    classNameStarActive?: string;
    classNameNumber?: string;
    onChange?: (star: number) => void;
}
export interface InputRateProps extends InputRateBaseProps, InputRateClassProps {
}
export declare const InputRate: ({ className, classNameContentStar, classNameStar, classNameStarActive, classNameNumber, defaultValue, value, onChange, }: InputRateProps) => React.JSX.Element;
export interface InputPhoneClassProps {
    classNameSelectCode?: InputSelectClassProps;
    classNameInputNumber?: InputTextClassProps;
    classNamePhone?: string;
    classNamePhoneLabel?: string;
    classNamePhoneCode?: string;
    classNamePhoneNumber?: string;
    classNameError?: string;
}
export interface InputPhoneBaseProps extends Omit<InputTextBaseProps, "type" | "value" | "onChange" | "defaultValue" | "datalist" | "validator"> {
    disabledSelectCode?: boolean;
    placeholderCode?: string;
    validator?: FenextjsValidatorClass<PhoneProps>;
    parseCountrys?: (data: CountryProps[]) => CountryProps[];
    defaultValue?: Partial<PhoneProps>;
    value?: Partial<PhoneProps>;
    onChange?: (data: Partial<PhoneProps>) => void;
}
export interface InputPhoneProps extends InputPhoneBaseProps, InputPhoneClassProps {
}
export declare const InputPhone: ({ classNameInputNumber, classNameSelectCode, classNamePhone, classNamePhoneCode, classNamePhoneLabel, classNamePhoneNumber, classNameError, disabledSelectCode, disabled, label, loader, placeholderCode, placeholder, validator, optional, optionalText, required, requiredText, defaultValue, value, onChange: onChangeProps, parseCountrys, ...props }: InputPhoneProps) => React.JSX.Element;
export type InputDateValueType = Date | undefined;
export interface InputDateBaseProps extends Omit<InputTextBaseProps, "type" | "value" | "onChange" | "defaultValue"> {
    type?: TypeDate;
    defaultValue?: InputDateValueType;
    value?: InputDateValueType;
    min?: InputDateValueType;
    max?: InputDateValueType;
    onChange?: (v: InputDateValueType) => void;
}
export interface InputDateClassProps extends InputTextClassProps {
    classNameInputDate?: string;
}
export interface InputDateProps extends InputDateBaseProps, InputDateClassProps {
}
export declare const InputDate: ({ classNameInputDate, type, defaultValue, value, min, max, onChange, icon, iconPos, validator, ...props }: InputDateProps) => React.JSX.Element;
export interface InputSelectCSCClassProps extends InputSelectClassProps {
    classNameSelectCSC?: string;
}
type InputCSCProps = Pick<InputSelectProps, "id" | "label" | "placeholder" | "placeholderFocus" | "disabled" | "classNameSelect" | "validator" | "validatorData" | "filterOptions" | "optional" | "optionalText" | "required" | "requiredText" | "forceShowOptionOnLoad" | "maxLengthShowOptions">;
export interface InputSelectCSCBaseProps extends useCSCProps, Omit<InputSelectBaseProps, "options" | "defaultValue" | "value" | "isSelectClearText" | "onChange" | "onChangeValidate" | "validator" | "validatorData" | "filterOptions"> {
    useContainer?: boolean;
    onChange?: (data: CSCProps) => void;
    country?: InputCSCProps;
    state?: InputCSCProps;
    city?: InputCSCProps;
}
export interface InputSelectCSCProps extends InputSelectCSCBaseProps, InputSelectCSCClassProps {
}
export declare const InputSelectCSC: ({ classNameSelectCSC, useContainer, country, state, city, defaultValue: defaultValueProps, value: valueProps, onChange: onChangeProps, defaultValueJsonString, valueJsonString, onChangeJsonString, parseJson_to_String, parseString_to_Json, ...props }: InputSelectCSCProps) => React.JSX.Element;
export interface InputSelectCountryMultipleProps extends Omit<InputSelectMultipleTProps<CountryProps>, "options" | "useLoader" | "loader" | "onParse"> {
}
export declare const InputSelectCountryMultiple: ({ ...props }: InputSelectCountryMultipleProps) => React.JSX.Element;
export type InputFileStatusContentByStatus = {
    [id in FileStatus]?: {
        title?: ReactNode;
        icon?: ReactNode;
        tag?: ReactNode;
    };
};
export interface InputFileStatusProps extends Omit<InputFileBaseProps, "onUploadFile"> {
    title?: ReactNode;
    text?: ReactNode;
    icon?: ReactNode;
    btn?: ReactNode;
    iconLoader?: ReactNode;
    className?: string;
    onUploadFile: (data: FileProps) => Promise<FileProps>;
    contentByStatus?: InputFileStatusContentByStatus;
}
export declare const InputFileStatus: ({ className, btn, icon, text, title, defaultValue, onChange, iconLoader, onUploadFile, contentByStatus: contentByStatusProps, ...props }: InputFileStatusProps) => React.JSX.Element;
export interface InputRangeConfigProps {
    min: number;
    max: number;
    value: number;
    center: number;
}
export interface InputRangeBaseProps {
    value?: number;
    valueMin?: number;
    valueMax?: number;
    defaultValue?: number;
    defaultValueMin?: number;
    defaultValueMax?: number;
    onChange?: (v: number) => void;
    useRange?: boolean;
    onChangeRange?: (v: [number, number]) => void;
    min?: number;
    max?: number;
    step?: number;
    showNumber?: "top" | "bottom" | "none";
}
export interface InputRangeClassProps {
    className?: string;
    classNameContentRange?: string;
    classNameMin?: string;
    classNameMax?: string;
    classNameCurrent?: string;
    classNameContentValue?: string;
    classNameValue?: string;
    classNameValueMin?: string;
    classNameValueMax?: string;
    classNameContentCircle?: string;
    classNameCircle?: string;
    classNameLine?: string;
}
export interface InputRangeProps extends InputRangeBaseProps, InputRangeClassProps {
}
export declare const InputRange: ({ className, classNameContentValue, classNameValue, classNameValueMax, classNameValueMin, classNameContentRange, classNameCurrent, classNameMax, classNameMin, classNameContentCircle, classNameCircle, classNameLine, min, max, defaultValue, defaultValueMin, defaultValueMax, value, valueMin, valueMax, onChange, onChangeRange, useRange, step, showNumber, }: InputRangeProps) => React.JSX.Element;
export interface InputGoogleLoadScriptBaseProps extends Omit<LoadScriptProps, "googleMapsApiKey" | "id">, _TProps {
    googleMapsApiKey?: string;
    children?: ReactNode;
}
export interface InputGoogleLoadScriptClassProps {
    className?: string;
}
export interface InputGoogleLoadScriptProps extends InputGoogleLoadScriptBaseProps, InputGoogleLoadScriptClassProps {
}
export declare const InputGoogleLoadScript: ({ googleMapsApiKey, children, className, _t, useT, ...props }: InputGoogleLoadScriptProps) => React.JSX.Element;
export interface InputGoogleMapsBaseProps extends Omit<GoogleMapProps, "onBoundsChanged"> {
    markers?: MarkerProps[];
    useLoadCenterWithMarker?: boolean;
    useLoadFitBoundsWithMarker?: boolean;
    useLoadDirectionsWithMarker?: boolean;
    showDirectionsWaypoints?: boolean;
    onBoundsChanged?: (data: LatLngBounds | undefined) => void;
}
export interface InputGoogleMapsClassProps {
}
export interface InputGoogleMapsProps extends InputGoogleMapsBaseProps, InputGoogleMapsClassProps {
}
export declare const InputGoogleMaps: ({ mapContainerStyle, markers, useLoadCenterWithMarker, useLoadFitBoundsWithMarker, useLoadDirectionsWithMarker, showDirectionsWaypoints, center, ...props }: InputGoogleMapsProps) => React.JSX.Element;
export interface InputGoogleAutocompleteBaseProps extends Omit<GoogleAutocompleteProps, "children">, Omit<InputTextBaseProps, "defaultValue" | "onChange" | "onChangeValidate" | "value" | "validator"> {
    validator?: FenextjsValidatorClass<AddressGoogle | undefined>;
    defaultValue?: AddressGoogle;
    value?: AddressGoogle;
    onChange?: (data?: AddressGoogle) => void;
}
export interface InputGoogleAutocompleteClassProps extends InputTextClassProps {
}
export interface InputGoogleAutocompleteProps extends InputGoogleAutocompleteBaseProps, InputGoogleAutocompleteClassProps {
}
export declare const InputGoogleAutocomplete: ({ defaultValue, value, onChange, className, validator, ...props }: InputGoogleAutocompleteProps) => React.JSX.Element;
export interface InputSelectTProps<T> extends Omit<InputSelectProps<T>, "defaultValue" | "value" | "options" | "onChange" | "onChangeData"> {
    defaultValue?: T;
    value?: T;
    options: T[];
    onChange?: (v?: T) => void;
    onParse: (v?: T) => InputSelectItemOptionBaseProps<T>;
}
export declare const InputSelectT: <T>({ defaultValue, value, options, onChange, onParse, ...props }: InputSelectTProps<T>) => React.JSX.Element;
export interface InputSelectMultipleClassProps extends InputSelectClassProps {
    classNameSelectMultiple?: string;
    classNameSelectMultipleList?: string;
}
export interface InputSelectMultipleBaseProps<T = any> extends Omit<InputSelectBaseProps<T>, "defaultValue" | "value" | "onChange" | "onChangeData" | "onChangeValidate" | "validator" | "validatorData"> {
    defaultValue?: InputSelectItemOptionBaseProps<T>[];
    value?: InputSelectItemOptionBaseProps<T>[];
    onChange?: (v?: InputSelectItemOptionBaseProps<T>[]) => void;
    onChangeData?: (v?: T[]) => void;
    iconDelete?: ReactNode;
    typeSelectMultipleStyle?: "normal" | "checkbox";
    CustomOptionsSelected?: typeof InputSelectOption<T>;
    validator?: FenextjsValidatorClass<(typeof InputSelectOption<T>)[]>;
    validatorData?: FenextjsValidatorClass<(T | undefined)[]>;
}
export interface InputSelectMultipleProps<T = any> extends InputSelectMultipleBaseProps<T>, InputSelectMultipleClassProps {
}
export declare const InputSelectMultiple: <T = any>({ classNameSelectMultiple, classNameSelectMultipleList, onChange, onChangeData, value, defaultValue, options, iconDelete, typeSelectMultipleStyle, CustomOptionsSelected, validatorData, validator, useTOption, ...props }: InputSelectMultipleProps<T>) => React.JSX.Element;
export interface InputRadioClassProps {
    classNameContent?: string;
    classNameLabel?: string;
    classNameLabelActive?: string;
    classNameLabelInactive?: string;
    classNameText?: string;
    classNameContentRadio?: string;
    classNameContentRadioActive?: string;
    classNameContentRadioInactive?: string;
    classNameRadio?: string;
    classNameRadioActive?: string;
    classNameRadioInactive?: string;
    icon?: ReactNode;
}
export interface InputRadioItemProps<T> {
    id: string;
    label?: ReactNode;
    data?: T;
}
export interface InputRadioBaseProps<T = any> extends _TProps {
    items?: InputRadioItemProps<T>[];
    labelPosition?: "right" | "left";
    name?: string;
    onChange?: (e: InputRadioItemProps<T>) => void;
    onChangeData?: (e: T) => void;
    defaultValue?: InputRadioItemProps<T>;
    value?: InputRadioItemProps<T>;
    disabled?: boolean;
}
export interface InputRadioProps<T> extends InputRadioBaseProps<T>, InputRadioClassProps {
}
export declare const InputRadio: <T = any>({ classNameContent, classNameLabel, classNameLabelActive, classNameLabelInactive, classNameText, classNameContentRadio, classNameContentRadioActive, classNameContentRadioInactive, classNameRadio, classNameRadioActive, classNameRadioInactive, labelPosition, name, onChange, onChangeData, defaultValue, value, disabled, icon, items, ...props }: InputRadioProps<T>) => React.JSX.Element;
export interface InputImgBaseProps extends Omit<InputFileBaseProps, "accept"> {
    title?: ReactNode;
    text?: ReactNode;
    icon?: ReactNode;
    onRemove?: () => void;
}
export interface InputImgClassProps {
    className?: string;
    classNameUp?: string;
    classNameTitle?: Omit<TitleProps, "children">;
    classNameContentIcon?: string;
    classNameText?: Omit<TextProps, "children">;
    classNameProgress?: string;
    classNameRemove?: string;
    classNameImg?: string;
}
export interface InputImgProps extends InputImgBaseProps, InputImgClassProps {
}
export declare const InputImg: ({ className, classNameContentIcon, classNameText, classNameTitle, classNameUp, classNameProgress, classNameRemove, classNameImg, icon, text, title, defaultValue, parseProgress, onChange, onRemove, ...props }: InputImgProps) => React.JSX.Element;
export interface InputCodeClassProps extends InputTextClassProps {
}
export interface InputCodeBaseProps extends Omit<InputTextBaseProps, "type" | "maxLength"> {
    maxLength: number;
}
export interface InputCodeProps extends InputCodeBaseProps, InputCodeClassProps {
}
export declare const InputCode: ({ ...props }: InputCodeProps) => React.JSX.Element;
export interface TextSelectProps {
    text?: string;
    select?: InputSelectItemOptionBaseProps;
}
export interface InputTextSelectClassProps extends InputTextClassProps, InputSelectClassProps {
}
export interface InputTextSelectBaseProps extends Omit<InputTextBaseProps, "type" | "value" | "onChange" | "defaultValue" | "datalist" | "onChangeValidate" | "label" | "placeholder" | "icon">, Omit<InputSelectBaseProps, "value" | "onChange" | "defaultValue" | "onChangeValidate" | "label" | "placeholder" | "icon"> {
    label?: any;
    placeholderSelect?: string;
    placeholderText?: string;
    defaultValue?: Partial<TextSelectProps>;
    value?: Partial<TextSelectProps>;
    onChange?: (data: Partial<TextSelectProps>) => void;
    posSelect?: "left" | "right";
}
export interface InputTextSelectProps extends InputTextSelectBaseProps, InputTextSelectClassProps {
}
export declare const InputTextSelect: ({ label, placeholderSelect, placeholderText, defaultValue, value: valueProps, onChange, validator, posSelect, errorWithIsChange, error, classNameError, ...props }: InputTextSelectProps) => React.JSX.Element;
export interface InputPasswordBaseProps extends Omit<InputTextBaseProps, "type"> {
}
export interface InputPasswordClassProps extends InputTextClassProps {
    classNameContentEye?: string;
}
export interface InputPasswordProps extends InputPasswordBaseProps, InputPasswordClassProps {
}
export declare const InputPassword: ({ classNameContentEye, ...props }: InputPasswordProps) => React.JSX.Element;
export interface InputSelectMultipleTProps<T> extends Omit<InputSelectMultipleProps<T>, "defaultValue" | "value" | "options" | "onChange" | "validator" | "validatorData"> {
    defaultValue?: T[];
    value?: T[];
    options: T[];
    onChange?: (v?: T[]) => void;
    onParse: (v?: T) => InputSelectItemOptionBaseProps<T>;
    validator?: InputSelectMultipleProps<T>["validatorData"];
}
export declare const InputSelectMultipleT: <T>({ defaultValue, value, options, onChange, onParse, validator, ...props }: InputSelectMultipleTProps<T>) => React.JSX.Element;
export interface InputSelectCountryClassProps extends InputSelectClassProps {
}
export interface InputSelectCountryBaseProps extends Omit<InputSelectTProps<CountryProps>, "options" | "onParse" | "useLoader" | "loader"> {
}
export interface InputSelectCountryProps extends InputSelectCountryBaseProps, InputSelectCountryClassProps {
}
export declare const InputSelectCountry: ({ ...props }: InputSelectCountryProps) => React.JSX.Element;
export interface InputFileClassProps {
    className?: string;
    classNameLabel?: string;
    classNameContent?: string;
    classNameInput?: string;
    classNameError?: string;
}
export interface InputFileUploadDataProps {
    file: any;
    nameFile: string;
    extend: string;
    setProgress: (progress: number) => void;
    setFileData: (data: FileProps) => void;
}
export interface InputFileBaseProps extends _TProps {
    accept?: string[];
    defaultValue?: FileProps;
    onChange?: (v: FileProps) => void;
    onChangeProgress?: (v: number) => void;
    onChangeError?: (v: ErrorProps | undefined) => void;
    onUploadFile?: (data: InputFileUploadDataProps) => Promise<FileProps>;
    clearAfterUpload?: boolean;
    MAX_SIZE_FILE?: number;
    parseProgress?: (progres: number) => any;
    disabled?: boolean;
    textMaxSizeFile?: string;
}
export interface InputFileProps extends InputFileBaseProps, InputFileClassProps, PropsWithChildren {
}
export declare const InputFile: ({ defaultValue, className, classNameLabel, classNameContent, classNameInput, classNameError, onChange, accept, children, clearAfterUpload, MAX_SIZE_FILE, parseProgress, onChangeProgress, onChangeError, disabled, textMaxSizeFile, ...props }: InputFileProps) => React.JSX.Element;
export type InputDateRangeValueType = [InputDateValueType, InputDateValueType] | undefined;
export interface InputDateRangeDataProps {
    valueMin?: Date;
    valueMax?: Date;
}
export interface InputDateRangeElementBaseProps extends Omit<InputDateBaseProps, "value" | "onChange" | "defaultValue"> {
}
export interface InputDateRangeBaseProps extends InputDateRangeElementBaseProps {
    defaultValue?: InputDateRangeValueType;
    value?: InputDateRangeValueType;
    onChange?: (v: InputDateRangeValueType) => void;
    propsStart?: InputDateRangeElementBaseProps;
    propsEnd?: InputDateRangeElementBaseProps;
}
export interface InputDateRangeClassProps extends InputDateClassProps {
    classNameInputDateRange?: string;
    classNameInputDateRangeContentInputDate?: string;
}
export interface InputDateRangeProps extends InputDateRangeBaseProps, InputDateRangeClassProps {
}
export declare const InputDateRange: ({ classNameInputDateRange, classNameInputDateRangeContentInputDate, classNameLabel, label, min, max, defaultValue, value, onChange, optional, optionalText, required, requiredText, propsStart, propsEnd, ...props }: InputDateRangeProps) => React.JSX.Element;
export interface InputCheckboxClassProps {
    classNameLabel?: string;
    classNameLabelActive?: string;
    classNameLabelInactive?: string;
    classNameText?: string;
    classNameContentCheckbox?: string;
    classNameContentCheckboxActive?: string;
    classNameContentCheckboxInactive?: string;
    classNameCheckbox?: string;
    classNameCheckboxActive?: string;
    classNameCheckboxInactive?: string;
    icon?: any;
}
export interface InputCheckboxBaseProps<VT = any, VF = any> extends _TProps {
    label?: ReactNode;
    labelPosition?: "right" | "left";
    name?: string;
    onChange?: (e: boolean) => void;
    onActive?: () => void;
    onInactive?: () => void;
    onActiveValue?: (data?: VT) => void;
    onInactiveValue?: (data?: VF) => void;
    valueActive?: VT;
    valueInactive?: VF;
    defaultValue?: boolean;
    value?: boolean;
    disabled?: boolean;
    onValidateCheck?: () => Promise<void> | void;
    optional?: boolean;
    optionalText?: string;
    required?: boolean;
    requiredText?: string;
}
export interface InputCheckboxProps<VT = any, VF = any> extends InputCheckboxBaseProps<VT, VF>, InputCheckboxClassProps {
}
export declare const InputCheckbox: <VT = any, VF = any>({ classNameLabel, classNameLabelActive, classNameLabelInactive, classNameText, classNameContentCheckbox, classNameContentCheckboxActive, classNameContentCheckboxInactive, classNameCheckbox, classNameCheckboxActive, classNameCheckboxInactive, label, labelPosition, name, onChange, defaultValue, value, disabled, icon, onValidateCheck, optional, optionalText, required, requiredText, onActive, onActiveValue, onInactive, onInactiveValue, valueActive, valueInactive, ...props }: InputCheckboxProps<VT, VF>) => React.JSX.Element;
export interface InputSwichClassProps {
    className?: string;
    classNameCicle?: string;
    classNameInactive?: string;
    classNameActive?: string;
}
export interface InputSwichBaseProps {
    name?: string;
    onChange?: (e: boolean) => void;
    defaultValue?: boolean;
    value?: boolean;
    disabled?: boolean;
    onValidateCheck?: (data: boolean) => Promise<void | boolean> | void | boolean;
}
export interface InputSwichProps extends InputSwichBaseProps, InputSwichClassProps {
}
export declare const InputSwich: ({ className, classNameActive, classNameInactive, classNameCicle, name, onChange, defaultValue, value, disabled, onValidateCheck, }: InputSwichProps) => React.JSX.Element;
export interface InputSearchTabFilterProps extends Omit<InputSelectOptionProps, "type" | "disabled" | "selected" | "onClick" | "onDelete" | "_t" | "isBtn" | "data" | "iconDelete"> {
}
export interface InputSearchResultProps {
    id: string;
    text: string;
    content?: ReactNode;
    data?: any;
}
export interface InputSearchBaseProps extends Omit<InputTextBaseProps, "type"> {
    onSearch?: (v: string, tabFilter?: InputSearchTabFilterProps[]) => Promise<InputSearchResultProps[]>;
    onEnterSearch?: (v: string) => void;
    onClearSearch?: () => void;
    onClickSearch?: (v: InputSearchResultProps) => void;
    useResult?: boolean;
    useLoadMore?: boolean;
    ButtonLoadMoreProps?: Omit<ButtonProps, "onClick">;
    onLoadMore?: () => void;
    resultList?: InputSearchResultProps[];
    resultEmpty?: ReactNode;
    resultPreSearch?: ReactNode;
    useSearchFixed?: boolean;
    useTabFilter?: boolean;
    selectMultipleTabFilter?: boolean;
    listTabFilter?: InputSearchTabFilterProps[];
    defaultTabFilterSelected?: InputSearchTabFilterProps[];
    onChangeTabFilterSelected?: (v: InputSearchTabFilterProps[]) => void;
    useLoseFocusInEnter?: boolean;
    iconClear?: ReactNode;
}
export interface InputSearchClassProps extends InputTextClassProps {
    classNameSearch?: string;
    classNameSearchBg?: string;
    classNameSearchContentResult?: string;
    classNameSearchResult?: string;
}
export interface InputSearchProps extends InputSearchBaseProps, InputSearchClassProps {
}
export declare const InputSearch: ({ classNameSearch, classNameSearchBg, classNameSearchContentResult, classNameSearchResult, placeholder, icon, iconClear, loader, onSearch, onChange, onClickSearch, onEnterSearch, onClearSearch: onClearSearchProps, useLoseFocusInEnter, defaultValue, value, useResult, useLoadMore, ButtonLoadMoreProps, onLoadMore: onLoadMore_, useSearchFixed, useTabFilter, resultList, resultEmpty, resultPreSearch, listTabFilter, defaultTabFilterSelected, onChangeTabFilterSelected, selectMultipleTabFilter, iconPos, ...props }: InputSearchProps) => React.JSX.Element;
export interface InputSelectStateProps extends Omit<InputSelectTProps<StateProps>, "options" | "onParse" | "useLoader" | "loader"> {
    country?: CountryProps;
}
export declare const InputSelectState: ({ country, ...props }: InputSelectStateProps) => React.JSX.Element;
export interface InputUnitVolumenValue {
    value?: number | "";
    unit?: Unit_All;
}
export interface InputUnitVolumenClassProps extends InputUnitBaseClassProps {
}
export interface InputUnitVolumenBaseProps extends Omit<InputUnitBaseBaseProps, "value" | "onChange" | "defaultValue" | "options"> {
    defaultValue?: Partial<InputUnitVolumenValue>;
    value?: Partial<InputUnitVolumenValue>;
    onChange?: (data: Partial<InputUnitVolumenValue>) => void;
    options?: Unit_Volumen[];
}
export interface InputUnitVolumenProps extends InputUnitVolumenBaseProps, InputUnitVolumenClassProps {
}
export declare const InputUnitVolumen: ({ options, ...props }: InputUnitVolumenProps) => React.JSX.Element;
export interface InputUnitValue {
    value?: number | "";
    unit?: Unit_All;
}
export interface InputUnitValueText {
    value?: string;
    unit?: Unit_All;
}
export interface InputUnitBaseClassProps extends InputTextSelectClassProps {
}
export interface InputUnitBaseBaseProps extends Omit<InputTextSelectBaseProps, "value" | "onChange" | "defaultValue" | "options"> {
    defaultValue?: Partial<InputUnitValue>;
    value?: Partial<InputUnitValue>;
    onChange?: (data: Partial<InputUnitValue>) => void;
    options: Unit_All[];
}
export interface InputUnitBaseProps extends InputUnitBaseBaseProps, InputUnitBaseClassProps {
}
export declare const InputUnitBase: ({ defaultValue, value: valueProps, onChange, options, ...props }: InputUnitBaseProps) => React.JSX.Element;
export interface InputUnitDistanceValue {
    value?: number | "";
    unit?: Unit_All;
}
export interface InputUnitDistanceClassProps extends InputUnitBaseClassProps {
}
export interface InputUnitDistanceBaseProps extends Omit<InputUnitBaseBaseProps, "value" | "onChange" | "defaultValue" | "options"> {
    defaultValue?: Partial<InputUnitDistanceValue>;
    value?: Partial<InputUnitDistanceValue>;
    onChange?: (data: Partial<InputUnitDistanceValue>) => void;
    options?: Unit_Distance[];
}
export interface InputUnitDistanceProps extends InputUnitDistanceBaseProps, InputUnitDistanceClassProps {
}
export declare const InputUnitDistance: ({ options, ...props }: InputUnitDistanceProps) => React.JSX.Element;
export interface InputUnitWeightValue {
    value?: number | "";
    unit?: Unit_All;
}
export interface InputUnitWeightClassProps extends InputUnitBaseClassProps {
}
export interface InputUnitWeightBaseProps extends Omit<InputUnitBaseBaseProps, "value" | "onChange" | "defaultValue" | "options"> {
    defaultValue?: Partial<InputUnitWeightValue>;
    value?: Partial<InputUnitWeightValue>;
    onChange?: (data: Partial<InputUnitWeightValue>) => void;
    options?: Unit_Weight[];
}
export interface InputUnitWeightProps extends InputUnitWeightBaseProps, InputUnitWeightClassProps {
}
export declare const InputUnitWeight: ({ options, ...props }: InputUnitWeightProps) => React.JSX.Element;
export interface CounterProps extends _TProps {
    number: number;
    text?: ReactNode;
    time?: number;
    decimal?: number;
    parseNumber?: (n: number) => ReactNode;
    className?: string;
    classNameNumber?: string;
    classNameText?: string;
}
export declare const Counter: ({ className, classNameNumber, classNameText, number, text, time, decimal, parseNumber, ...props }: CounterProps) => React.JSX.Element;
export interface NotificationPopBaseProps extends useNotificationProps, _TProps {
    typePop?: "top" | "down";
}
export interface NotificationPopClassProps extends NotificationClassProps {
    classNamePop?: string;
}
export interface NotificationPopProps extends NotificationPopBaseProps, NotificationPopClassProps {
}
export declare const NotificationPop: ({ classNamePop, className, typePop, time, ...props }: NotificationPopProps) => React.JSX.Element;
export interface NotificationBaseProps extends PropsWithChildren, _TProps {
    type?: RequestResultTypeProps | keyof typeof RequestResultTypeProps;
}
export interface NotificationClassProps {
    className?: string;
}
export interface NotificationProps extends NotificationBaseProps, NotificationClassProps {
}
export declare const Notification: ({ className, type, children, ...props }: NotificationProps) => React.JSX.Element;
export interface CopyBaseProps extends _TProps {
    text?: string;
    children?: ReactNode;
    onClickForCopy?: (text: string) => void;
    notification?: NotificationDataProps;
}
export interface CopyClassProps {
    className?: string;
}
export interface CopyProps extends CopyBaseProps, CopyClassProps {
}
export declare const Copy: ({ className, children, text, onClickForCopy, notification, ...props }: CopyProps) => React.JSX.Element;
export interface SliderBaseProps extends _TProps {
    items?: ReactNode[];
    nItemsDesktop?: number;
    nItemsTable?: number;
    nItemsPhone?: number;
    timeDelay?: number;
    timeAnimation?: number;
    loop?: boolean;
    separationItems?: number;
}
export interface SliderClassProps {
    className?: string;
    classNameContent?: string;
    classNameItem?: string;
    classNameDogs?: string;
    classNameDog?: string;
    classNameArrows?: string;
    classNameArrowPre?: string;
    classNameArrowNext?: string;
}
export interface SliderProps extends SliderBaseProps, SliderClassProps {
}
export declare const Slider: ({ className, classNameContent, classNameItem, classNameDogs, classNameDog, classNameArrows, classNameArrowPre, classNameArrowNext, items, nItemsDesktop, nItemsTable, nItemsPhone, timeDelay, timeAnimation, loop, separationItems, ...props }: SliderProps) => React.JSX.Element;
export interface ImgGalleryBaseProps extends _TProps {
    imgs: ImgProps[];
    buttonShowMoreImg?: Omit<ButtonProps, "onClick">;
    buttonHiddenMoreImg?: Omit<ButtonProps, "onClick">;
    loader?: boolean;
    nLoader?: number;
}
export interface ImgGalleryClassProps {
    className?: string;
}
export interface ImgGalleryProps extends ImgGalleryBaseProps, ImgGalleryClassProps {
}
export declare const ImgGallery: ({ className, imgs, buttonShowMoreImg, buttonHiddenMoreImg, loader, nLoader, ...props }: ImgGalleryProps) => React.JSX.Element;
export interface ImgSliderBaseProps extends _TProps {
    imgs: ImgProps[];
    defaultStep?: number;
    step?: number;
    setStep?: (e: number) => void;
}
export interface ImgSliderClassProps extends Omit<StepsClassProps, "className"> {
    className?: string;
    classNameSteps?: string;
    classNamePictureImg?: string;
    classNameImg?: string;
}
export interface ImgSliderProps extends ImgSliderBaseProps, ImgSliderClassProps {
}
export declare const ImgSlider: ({ className, classNameStep, classNamePictureImg, classNameImg, imgs, defaultStep, setStep: setStepProps, step: stepProps, ...props }: ImgSliderProps) => React.JSX.Element;
export interface PaginationItemPageClassProps {
    classNameContent?: string;
    classNameUp?: string;
    classNamePre?: string;
    classNameCurrent?: string;
    classNameCurrentItem?: string;
    classNameNext?: string;
    classNameDown?: string;
    icons?: {
        up?: any;
        pre?: any;
        next?: any;
        down?: any;
    };
}
export interface PaginationItemPageBaseProps extends _TProps {
    defaultPage?: number;
    nItems: number;
    nItemsPage?: number;
    disabled?: boolean;
    hiddenIfNItemsSmallerThanOrEqualNItemsPage?: boolean;
    onChangePage?: (page: number) => void;
}
export interface PaginationItemPageProps extends PaginationItemPageClassProps, PaginationItemPageBaseProps {
}
export declare const PaginationItemPage: ({ classNameContent, classNameUp, classNamePre, classNameCurrent, classNameCurrentItem, classNameNext, classNameDown, icons, defaultPage, nItems, nItemsPage, disabled, onChangePage, hiddenIfNItemsSmallerThanOrEqualNItemsPage, }: PaginationItemPageProps) => React.JSX.Element;
export interface PaginationClassProps {
    className?: string;
    classNameItemPage?: PaginationItemPageClassProps;
    classNameNPage?: PaginationNPageClassProps;
}
export interface PaginationBaseProps extends PaginationItemPageBaseProps, PaginationNPageBaseProps, _TProps {
    showItemPage?: boolean;
    showNPage?: boolean;
}
export interface PaginationProps extends PaginationClassProps, PaginationBaseProps {
}
export declare const Pagination: ({ className, classNameItemPage, classNameNPage, showItemPage, showNPage, listNpage, ...props }: PaginationProps) => React.JSX.Element;
export interface PaginationNPageClassProps {
    className?: string;
}
export interface PaginationNPageBaseProps extends Omit<InputSelectBaseProps, "options" | "onChange" | "nItems" | "maxLengthShowOptions"> {
    listNpage?: InputSelectBaseProps["options"];
    onChangeNPage?: InputSelectBaseProps["onChange"];
}
export interface PaginationNPageProps extends PaginationNPageClassProps, PaginationNPageBaseProps {
}
export declare const PaginationNPage: ({ className, defaultValue, listNpage, onChangeNPage, ...props }: PaginationNPageProps) => React.JSX.Element;
export interface AlertHookProps extends _TProps {
    className?: string;
    configHook?: useAlertProps;
}
export declare const AlertHook: ({ className, configHook, ...props }: AlertHookProps) => React.JSX.Element;
export interface TableClassProps {
    classNameContent?: string;
    classNameContentTable?: string;
    classNameTable?: string;
    classNameTHead?: string;
    classNameTBody?: string;
    classNameThr?: string;
    classNameTr?: string;
    classNameTh?: string;
    classNameTd?: string;
    classNameTdLabelCollapse?: string;
    classNameContentPagination?: string;
    classNameLoader?: string;
}
export type TableHeader<T> = {
    id: keyof T;
    th: ReactNode;
    thText?: string;
    parse?: (data: T) => any;
    columnOptions?: {
        orderBy?: boolean;
    };
    defaultShowHidden?: "show" | "hidden";
    colNewTr?: boolean;
    isCollapse?: boolean;
    collapseProps?: Omit<CollapseProps, "children">;
    className?: string;
}[];
export interface TableBaseProps<T> extends _TProps {
    name: string;
    items: T[];
    header: TableHeader<T>;
    pagination?: PaginationProps;
    loader?: boolean;
    typeLoader?: "spinner" | "line";
    useCheckbox?: boolean;
    onChecked?: (items: T[]) => void;
    onOrderBy?: (order: {
        id: keyof T;
        order: "ASC" | "DESC";
    }) => void;
    notResult?: ReactNode;
    showPagination?: boolean;
    actionsCheckbox?: Omit<TableActionCheckboxProps<T>, "actionAllCheckbox" | "data">;
    actionsCheckboxSelectAll?: ReactNode;
}
export interface TableProps<T> extends TableClassProps, TableBaseProps<T> {
}
export declare const Table: <T>({ classNameContent, classNameContentTable, classNameTable, classNameTHead, classNameTBody, classNameThr, classNameTr, classNameTh, classNameTd, classNameTdLabelCollapse, classNameContentPagination, classNameLoader, name, items, header, pagination, showPagination, loader, typeLoader, useCheckbox, onOrderBy, onChecked, notResult, actionsCheckbox, actionsCheckboxSelectAll, ...props }: TableProps<T>) => React.JSX.Element;
export interface AlertComponentProps extends _TProps, AlertProps {
    className?: string;
    iconClose?: ReactNode;
    onClose?: () => void;
}
export declare const Alert: ({ className, message, iconClose, type, data, onClose, ...props }: AlertComponentProps) => React.JSX.Element;
export interface CollapseBaseProps {
    loader?: boolean;
    disabled?: boolean;
    defaultActive?: boolean;
    active?: boolean;
    id?: string;
    name?: string;
    status?: "none" | "error" | "ok";
    type?: "radio" | "checkbox";
    show?: "checked" | "focus";
    header: ReactNode;
    onChange?: (value: boolean) => void;
    iconArrow?: ReactNode;
    children?: ReactNode;
    rotateIcon?: boolean;
    useActiveForShowChildren?: boolean;
}
export interface CollapseClassProps {
    className?: string;
    classNameHeader?: string;
    classNameHeaderContent?: string;
    classNameHeaderIcon?: string;
    classNameBody?: string;
}
export interface CollapseProps extends CollapseBaseProps, CollapseClassProps {
}
export declare const Collapse: ({ className, classNameHeader, classNameHeaderContent, classNameHeaderIcon, classNameBody, children, loader, header, disabled, defaultActive, active: activeProps, id, name, type, show, status, onChange, iconArrow, rotateIcon, useActiveForShowChildren, }: CollapseProps) => React.JSX.Element;
export interface CollapseMultipleBaseProps extends Pick<CollapseBaseProps, "name" | "type" | "useActiveForShowChildren"> {
    items?: Omit<CollapseBaseProps, "checkbox" | "name" | "id">[];
    defaultActive?: number | number[];
}
export interface CollapseMultipleClassProps extends CollapseClassProps {
    classNameMultiple?: string;
}
export interface CollapseMultipleProps extends CollapseMultipleBaseProps, CollapseMultipleClassProps {
}
export declare const CollapseMultiple: ({ classNameMultiple, name, items, type, defaultActive, ...props }: CollapseMultipleProps) => React.JSX.Element;
export interface LavaLampGetNumberRandomProps {
    min: number;
    max: number;
}
export interface LavaLampRangeStylesProps {
    top?: LavaLampGetNumberRandomProps;
    left?: LavaLampGetNumberRandomProps;
    scale?: LavaLampGetNumberRandomProps;
    moveX?: LavaLampGetNumberRandomProps;
    moveY?: LavaLampGetNumberRandomProps;
    time?: LavaLampGetNumberRandomProps;
}
export type LavaLampStylesElement = Pick<CSSProperties, "borderRadius" | "aspectRatio" | "width" | "background" | "animationTimingFunction">;
export interface LavaLampBaseProps {
    nItems?: number;
    styles?: CSSProperties;
    ranges?: LavaLampRangeStylesProps;
    stylesElement?: LavaLampStylesElement[];
}
export interface LavaLampClassProps {
    className?: string;
}
export interface LavaLampProps extends LavaLampBaseProps, LavaLampClassProps {
}
export declare const LavaLamp: ({ className, nItems, styles, stylesElement, ranges, }: LavaLampProps) => React.JSX.Element;
export interface ErrorComponentBaseProps extends PropsWithChildren, _TProps {
    error?: ErrorFenextjs;
    useDataError?: boolean;
    useErrorInput?: boolean;
}
export interface ErrorComponentClassProps {
    className?: string;
}
export interface ErrorComponentProps extends ErrorComponentBaseProps, ErrorComponentClassProps {
}
export declare const ErrorComponent: ({ error, children, className, useDataError, useErrorInput, ...props }: ErrorComponentProps) => React.JSX.Element;
export interface FormProps extends PropsWithChildren {
    id?: string;
    onSubmit?: () => Promise<void>;
    disabled?: boolean;
    className?: string;
}
export declare const Form: ({ id, disabled, children, className, onSubmit, }: FormProps) => React.JSX.Element;
export type TooltipPositionX = "center" | "right" | "left";
export type TooltipPositionY = "center" | "top" | "bottom";
export interface TooltipProps extends _TProps {
    className?: string;
    classNameChildren?: string;
    classNameContent?: string;
    children?: ReactNode;
    tooltip?: ReactNode;
    positionX?: TooltipPositionX;
    positionY?: TooltipPositionY;
}
export declare const Tooltip: ({ className, classNameChildren, classNameContent, children, tooltip, positionX, positionY, ...props }: TooltipProps) => React.JSX.Element;
export interface TwoColStickyProps extends _TProps {
    children?: ReactNode;
    colSticky?: ReactNode;
    posCol?: "left" | "right";
    className?: string;
    classNameChildren?: string;
    classNameColSticky?: string;
}
export declare const TwoColSticky: ({ className, classNameChildren, classNameColSticky, children, colSticky, posCol, ...props }: TwoColStickyProps) => React.JSX.Element;
export interface TabItemProps<T = string> {
    id: T;
    head: ReactNode;
    body: ReactNode;
    beforeTab?: ReactNode;
    afterTab?: ReactNode;
    useCount?: boolean;
    count?: number;
    singular?: ReactNode;
    plural?: ReactNode;
}
export interface TabBaseProps<T = string> extends _TProps {
    items?: TabItemProps<T>[];
    onChange?: (item: TabItemProps<T>) => void;
    defaultTab?: number;
    activeTab?: number;
    beforeTabs?: ReactNode;
    afterTabs?: ReactNode;
    tabScrollActive?: boolean;
    validataTabOneHiddenHeader?: boolean;
    useCount?: boolean;
}
export interface TabClassProps {
    className?: string;
    classNameContentHead?: string;
    classNameContentBeforeHead?: string;
    classNameContentAfterHead?: string;
    classNameHead?: string;
    classNameHeadItem?: string;
    classNameHeadItemActive?: string;
    classNameBody?: string;
    classNameBodyItem?: string;
}
export interface TabProps<T = string> extends TabBaseProps<T>, TabClassProps {
}
export declare const parseTabCount: <T>(d: TabItemProps<T>, _t: ReturnType<typeof use_T>["_t"]) => TabItemProps<T>;
export declare const Tab: <T = string>({ className, classNameContentHead, classNameHead, classNameHeadItem, classNameHeadItemActive, classNameBody, classNameBodyItem, classNameContentAfterHead, classNameContentBeforeHead, items, defaultTab, activeTab, afterTabs, beforeTabs, onChange, tabScrollActive, validataTabOneHiddenHeader, useCount, ...props }: TabProps<T>) => React.JSX.Element;
export interface DropDownClassProps {
    className?: string;
    classNameContentHeader?: string;
    classNameContentIcon?: string;
    classNameBody?: string;
}
export interface DropDownProps extends DropDownClassProps {
    loader?: boolean;
    disabled?: boolean;
    defaultActive?: boolean;
    active?: boolean;
    name?: string;
    header: ReactNode;
    onChange?: (value: boolean) => void;
    iconArrow?: ReactNode;
    children?: ReactNode;
    rotateIcon?: boolean;
    type?: "checked" | "focus";
}
export declare const DropDown: ({ className, classNameBody, classNameContentHeader, classNameContentIcon, header, active: activeProps, defaultActive, disabled, loader, onChange: onChangeProps, iconArrow, rotateIcon, name, children, type, }: DropDownProps) => React.JSX.Element;
export interface PrintIframeComponentProps {
    loader: boolean;
}
export interface PrintIframeBaseProps<T> extends usePrintIframeProps<T> {
    onComponent: (data: PrintIframeComponentProps) => ReactNode;
}
export interface PrintIframeClassProps {
    className?: string;
}
export interface PrintIframeProps<T> extends PrintIframeBaseProps<T>, PrintIframeClassProps {
}
export declare const PrintIframe: <T>({ className, onComponent, ...props }: PrintIframeProps<T>) => React.JSX.Element;
export interface PrintPageComponentProps<T> {
    data: T | undefined;
    load: boolean;
}
export interface PrintPageBaseProps<T> extends usePrintDataProps {
    onComponent: (data: PrintPageComponentProps<T>) => ReactNode;
}
export interface PrintPageClassProps {
    className?: string;
}
export interface PrintPageProps<T> extends PrintPageBaseProps<T>, PrintPageClassProps {
}
export declare const PrintPage: <T>({ className, onComponent, ...props }: PrintPageProps<T>) => React.JSX.Element;
export interface StepsItemProps {
    label: ReactNode;
    icon?: ReactNode;
    content: ReactNode;
    status?: "none" | "ok" | "error";
}
export interface StepsBaseProps extends _TProps {
    items: StepsItemProps[];
    defaultStep?: number;
    step?: number;
    useArrowKey?: boolean;
    btnPrev?: ReactNode;
    btnNext?: ReactNode;
    disabledBtnPrev?: boolean;
    disabledBtnNext?: boolean;
    onPrev?: (step: number) => Promise<void> | void;
    onNext?: (step: number) => Promise<void> | void;
    onPrevDisabled?: () => void;
    onNextDisabled?: () => void;
    onSetStep?: (step: number) => void;
    stepPos?: "top" | "left" | "right";
    showCurrentStepNStep?: boolean;
    useDogs?: boolean;
}
export interface StepsClassProps {
    className?: string;
    classNameContentSteps?: string;
    classNameListSteps?: string;
    classNameContentItems?: string;
    classNameStep?: string;
    classNameItem?: string;
    classNameStepActive?: string;
    classNameItemActive?: string;
    classNameStepCircle?: string;
    classNameStepLabel?: string;
    classNameContentBtn?: string;
    classNameBtn?: string;
    classNameBtnDisabled?: string;
    classNameBtnNext?: string;
    classNameBtnNextDisabled?: string;
    classNameBtnPrev?: string;
    classNameBtnPrevDisabled?: string;
    forceShowBtnPrev?: boolean;
    forceShowBtnNext?: boolean;
    classNameContentDog?: string;
    classNameDog?: string;
    classNameDogCurrent?: string;
}
export interface StepsProps extends StepsBaseProps, StepsClassProps {
}
export declare const Steps: ({ className, classNameContentItems, classNameContentSteps, classNameListSteps, classNameItem, classNameItemActive, classNameStep, classNameStepActive, classNameStepCircle, classNameStepLabel, classNameContentBtn, classNameBtn, classNameBtnDisabled, classNameBtnNext, classNameBtnNextDisabled, classNameBtnPrev, classNameBtnPrevDisabled, classNameContentDog, classNameDog, classNameDogCurrent, defaultStep, step, items, btnNext, btnPrev, disabledBtnNext, disabledBtnPrev, onNext, onPrev, onNextDisabled, onPrevDisabled, stepPos, showCurrentStepNStep, useArrowKey, useDogs, onSetStep, forceShowBtnPrev, forceShowBtnNext, ...props }: StepsProps) => React.JSX.Element;
export type BackTypeOnBack = "fenextjs-history" | "history" | "router" | "link" | "none";
export interface BackBaseProps extends _TProps, useHistoryOnBackProps {
    loader?: boolean;
    disabled?: boolean;
    onClick?: (e?: any) => void;
    icon?: ReactNode;
    children?: ReactNode;
    typeOnBack?: BackTypeOnBack;
    link?: string;
    useHistoryMinLenght?: boolean;
    minLenght?: number;
}
export interface BackClassProps extends LoaderClassProps {
    className?: string;
    classNameDisabled?: string;
    classNameIcon?: string;
    classNameContent?: string;
}
export interface BackProps extends BackBaseProps, BackClassProps {
}
export declare const Back: ({ className, classNameLoader, classNameDisabled, classNameIcon, classNameContent, children, loader, disabled, onClick, icon, typeOnBack, link, minLenght, useHistoryMinLenght, onValidateRuteBack, ...props }: BackProps) => React.JSX.Element;
export interface ThemeProps extends _TProps {
    className?: string;
    classNameItem?: string;
}
export declare const Theme: ({ className, classNameItem }: ThemeProps) => React.JSX.Element;
export type LinkTypeOnLink = "history" | "router" | "link" | "none";
export interface LinkBaseProps extends PropsWithChildren, LinkNextProps, Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "referrerPolicy" | "rel">, _TProps {
}
export interface LinkClassProps {
    className?: string;
}
export interface LinkProps extends LinkBaseProps, LinkClassProps {
}
export declare const Link: ({ className, children, ...props }: LinkProps) => React.JSX.Element;
export type ShareListType = "whatsapp" | "facebook" | "x" | "email" | "copy";
export interface ShareBaseProps extends _TProps {
    ButtonProps?: ButtonProps;
    TitleProps?: TitleProps;
    share?: string;
    shareList?: ShareListType[];
    showShareCopy?: boolean;
}
export interface ShareClassProps {
    className?: string;
}
export interface ShareProps extends ShareBaseProps, ShareClassProps {
}
export declare const Share: ({ className, share, ButtonProps, TitleProps, shareList, showShareCopy, ...props }: ShareProps) => React.JSX.Element;
export interface ContentLoadingBaseProps extends _TProps {
    children?: ReactNode;
    componentLoader?: ReactNode;
    loader?: boolean;
    isPage?: boolean;
}
export interface ContentLoadingClassProps {
    className?: string;
}
export interface ContentLoadingProps extends ContentLoadingBaseProps, ContentLoadingClassProps {
}
export declare const ContentLoading: ({ className, children, componentLoader, loader, isPage, ...props }: ContentLoadingProps) => React.JSX.Element;
export interface GridGalleryProps extends _TProps {
    items: ReactNode[];
    className?: string;
    classNameItem?: string;
}
export declare const GridGallery: ({ className, classNameItem, items, ...props }: GridGalleryProps) => React.JSX.Element;
export interface ChronologicalListItemsProps {
    date: Date;
    children: ReactNode;
    market?: ReactNode;
    className?: string;
}
export interface ChronologicalListBaseProps extends _TProps {
    items: ChronologicalListItemsProps[];
    market?: ReactNode;
    parseDateYYYYMMDD?: (date: Date) => ReactNode;
    parseDateHHMMSS?: (date: Date) => ReactNode;
}
export interface ChronologicalListClassProps {
    className?: string;
}
export interface ChronologicalListProps extends ChronologicalListBaseProps, ChronologicalListClassProps {
}
export declare const ChronologicalList: ({ className, items, market, parseDateHHMMSS: parseDateHHMMSSProps, parseDateYYYYMMDD: parseDateYYYYMMDDProps, ...props }: ChronologicalListProps) => React.JSX.Element;
export interface UserComponentProps {
    user?: Partial<UserProps>;
    loader?: boolean;
    className?: string;
    classNamePicture?: string;
    classNameImg?: string;
    classNameName?: string;
    classNameEmail?: string;
    classNameLoader?: LoaderUserClassProps;
}
export declare const User: ({ className, classNameEmail, classNamePicture, classNameImg, classNameName, classNameLoader, user, loader, }: UserComponentProps) => React.JSX.Element;
export interface ImgBaseProps extends ImgDataProps {
    imgIf404?: string;
    layers?: Pick<React.CSSProperties, "background" | "mixBlendMode" | "filter" | "opacity">[];
    onErrorImg?: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
    onClick?: () => void;
    loader?: boolean;
    onLoad?: React.ReactEventHandler<HTMLImageElement>;
}
export interface ImgClassProps {
    className?: string;
    classNameImg?: string;
}
export interface ImgProps extends ImgBaseProps, ImgClassProps {
}
export declare const Img: ({ className, classNameImg, id, name, alt, src, srcMin1920, srcMin1680, srcMin1440, srcMin1024, srcMin992, srcMin768, srcMin575, imgIf404, layers, onErrorImg: onErrorImg_, onClick, loader, onLoad, }: ImgProps) => React.JSX.Element;
export interface DesignTypographyValueProps extends Partial<DesignTypographyValue> {
}
export interface DesignTypographyProps extends _TProps {
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
export interface DesignBoxProps extends Omit<DesignBoxTextProps, "setDataFunction" | "data" | "onChangeData"> {
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
export interface DesignBoxWidthProps extends DesignBoxUseDataProps {
    textWidth?: string;
    textMinWidth?: string;
    textMaxWidth?: string;
}
export declare const DesignBoxWidth: ({ textWidth, textMinWidth, textMaxWidth, data, onChangeData, ...props }: DesignBoxWidthProps) => React.JSX.Element;
export declare const parseDesignBoxValueProps_to_CSSProperties: (d: Partial<DesignBoxValue>) => CSSProperties;
export interface DesignBoxBorderColorProps extends DesignBoxUseDataProps {
    textBorderColor?: string;
}
export declare const DesignBoxBorderColor: ({ textBorderColor, data, onChangeData, ...props }: DesignBoxBorderColorProps) => React.JSX.Element;
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
export interface DesignBoxAlignProps extends DesignBoxUseDataProps {
    textAlignItems?: string;
    textJustifyContent?: string;
}
export declare const DesignBoxAlign: ({ textAlignItems, textJustifyContent, data, onChangeData, ...props }: DesignBoxAlignProps) => React.JSX.Element;
export interface DesignBoxHeightProps extends DesignBoxUseDataProps {
    textHeight?: string;
    textMinHeight?: string;
    textMaxHeight?: string;
}
export declare const DesignBoxHeight: ({ textHeight, textMinHeight, textMaxHeight, data, onChangeData, ...props }: DesignBoxHeightProps) => React.JSX.Element;
export interface DesignBoxBorderRadiusProps extends DesignBoxUseDataProps {
    textBorderRadius?: string;
    textBorderRadiusTopLeft?: string;
    textBorderRadiusTopRight?: string;
    textBorderRadiusBottomLeft?: string;
    textBorderRadiusBottomRight?: string;
}
export declare const DesignBoxBorderRadius: ({ textBorderRadius, textBorderRadiusTopLeft, textBorderRadiusTopRight, textBorderRadiusBottomLeft, textBorderRadiusBottomRight, data, onChangeData, setDataFunction, ...props }: DesignBoxBorderRadiusProps) => React.JSX.Element;
export interface DesignBoxGapProps extends DesignBoxUseDataProps {
    textGap?: string;
    textGapRow?: string;
    textGapColumn?: string;
}
export declare const DesignBoxGap: ({ textGap, textGapRow, textGapColumn, data, onChangeData, setDataFunction, ...props }: DesignBoxGapProps) => React.JSX.Element;
export interface DesignBoxBorderProps extends DesignBoxUseDataProps {
    textBorder?: string;
    textBorderTop?: string;
    textBorderLeft?: string;
    textBorderRight?: string;
    textBorderBottom?: string;
}
export declare const DesignBoxBorder: ({ textBorder, textBorderBottom, textBorderLeft, textBorderRight, textBorderTop, data, setDataFunction, onChangeData, ...props }: DesignBoxBorderProps) => React.JSX.Element;
export interface DesignBoxBackgroundProps extends DesignBoxUseDataProps {
    textBackground?: string;
}
export declare const DesignBoxBackground: ({ textBackground, data, onChangeData, ...props }: DesignBoxBackgroundProps) => React.JSX.Element;
export interface DesignBoxMarginProps extends DesignBoxUseDataProps {
    textMargin?: string;
    textMarginTop?: string;
    textMarginLeft?: string;
    textMarginRight?: string;
    textMarginBottom?: string;
}
export declare const DesignBoxMargin: ({ textMargin, textMarginBottom, textMarginLeft, textMarginRight, textMarginTop, data, onChangeData, setDataFunction, ...props }: DesignBoxMarginProps) => React.JSX.Element;
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
export interface PageProgressBaseProps {
}
export interface PageProgressClassProps {
    className?: string;
}
export interface PageProgressProps extends PageProgressBaseProps, PageProgressClassProps {
}
export declare const PageProgress: ({ className }: PageProgressProps) => React.JSX.Element;
export interface FilterDateDataProps {
    type?: InputCalendarMonthProps["type"];
    date?: Date;
    dateRange?: Date[];
}
export interface FilterDateClassProps {
    className?: string;
    classNameDropDown?: DropDownClassProps;
    classNameCollapse?: InputCalendarClassProps;
    classNameBtnToday?: ButtonClassProps;
    classNameBtnWeek?: ButtonClassProps;
    classNameTextValue?: Pick<TextProps, "tag" | "className">;
    classNameTextSwich?: Pick<TextProps, "tag" | "className">;
    classNameInputSwich?: InputSwichClassProps;
    classNameContentTop?: string;
    classNameLabelSwich?: string;
    classNameClear?: string;
}
export interface FilterDateProps extends FilterDateClassProps, _TProps {
    defaultValue?: FilterDateDataProps;
    onChange?: (data: FilterDateDataProps) => void;
    formatDateOption?: FenextjsDateFormatOptions;
    textValue?: string;
    textFilterByDate?: string;
    textFilterByRange?: string;
    textBtnToday?: string;
    textBtnWeek?: string;
    iconTrash?: ReactNode;
    extraListBtn?: ((data: ReturnType<typeof useData<FilterDateDataProps>>) => ReactNode)[];
    nMonthShow?: number;
}
export declare const FilterDate: ({ onChange, defaultValue, formatDateOption, className, classNameDropDown, classNameCollapse, classNameBtnToday, classNameBtnWeek, classNameTextValue, classNameTextSwich, classNameInputSwich, classNameContentTop, classNameLabelSwich, classNameClear, textValue, textFilterByDate, textFilterByRange, textBtnToday, textBtnWeek, iconTrash, extraListBtn, nMonthShow, ...p }: FilterDateProps) => React.JSX.Element;
export type ScheduleDayValueType = InputDateRangeValueType[];
export interface ScheduleDayBaseProps extends Omit<InputDateRangeBaseProps, "value" | "onChange" | "defaultValue">, _TProps {
    defaultValue?: ScheduleDayValueType;
    value?: ScheduleDayValueType;
    onChange?: (v: ScheduleDayValueType) => void;
    ButtonProps?: Omit<ButtonProps, "onClick">;
}
export interface ScheduleDayClassProps extends InputDateRangeClassProps {
    className?: string;
}
export interface ScheduleDayProps extends ScheduleDayBaseProps, ScheduleDayClassProps {
}
export declare const ScheduleDay: ({ className, defaultValue, value, onChange, propsStart, propsEnd, ButtonProps, ...props }: ScheduleDayProps) => React.JSX.Element;
export type ScheduleWeeklyValueType = {
    [id in DaysEnum]?: ScheduleDayValueType;
};
export interface ScheduleWeeklyBaseProps extends Omit<ScheduleDayBaseProps, "value" | "onChange" | "defaultValue">, _TProps {
    title?: ReactNode;
    defaultValue?: ScheduleWeeklyValueType;
    value?: ScheduleWeeklyValueType;
    onChange?: (v: ScheduleWeeklyValueType) => void;
    CollapseMultipleProps?: Omit<CollapseMultipleProps, "items">;
    onParseHeaderDay?: (v: DaysEnum) => ReactNode;
}
export interface ScheduleWeeklyClassProps {
    className?: string;
}
export interface ScheduleWeeklyProps extends ScheduleWeeklyBaseProps, ScheduleWeeklyClassProps {
}
export declare const ScheduleWeekly: ({ title, className, defaultValue, value, onChange, CollapseMultipleProps, onParseHeaderDay, ...props }: ScheduleWeeklyProps) => React.JSX.Element;
export interface TemplateProps extends _TProps {
    className?: string;
}
export declare const Template: ({ className }: TemplateProps) => React.JSX.Element;
export interface ModalBaseBaseProps extends PropsWithChildren {
    active?: boolean;
    activeName?: boolean | null;
    activeNameLast?: boolean | null;
    childrenUseActiveForShowHidden?: boolean;
    disabledClose?: boolean;
    useRender?: boolean;
    type?: "top" | "left" | "right" | "bottom" | "center" | "full" | "layout-grid" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
    typeClose?: "out" | "inset" | "none";
    onClose?: () => void;
    name?: string;
    nameLocalStorage?: string;
    closeComponent?: ReactNode;
}
export interface ModalBaseClassProps {
    className?: string;
    classNameBg?: string;
    classNameClose?: string;
    classNameContent?: string;
}
export interface ModalBaseProps extends ModalBaseBaseProps, ModalBaseClassProps {
}
export declare const ModalBase: ({ className, classNameBg, classNameContent, classNameClose, active, activeName, activeNameLast, childrenUseActiveForShowHidden, disabledClose, type, typeClose, onClose, children, useRender, name, closeComponent, }: ModalBaseProps) => React.JSX.Element;
export interface ModalClassProps {
    classNameElementActionModalActive?: string;
    classNameModal?: ModalBaseClassProps;
}
export interface ModalProps extends Pick<ModalBaseBaseProps, "children" | "type" | "active" | "onClose" | "typeClose" | "disabledClose" | "useRender" | "name" | "closeComponent" | "nameLocalStorage">, ModalClassProps {
    ElementActionModalActive?: ReactNode;
    disabledElementActionModalActive?: boolean;
    onActive?: () => void;
    activeByNameLocalStorage?: boolean;
    activeByNameContentLocalStorage?: boolean;
}
export declare const Modal: ({ classNameElementActionModalActive, classNameModal, ElementActionModalActive, disabledElementActionModalActive, children, active: activeProps, disabledClose, onClose: onCloseProps, onActive: onActiveProps, type, typeClose, useRender, name, nameLocalStorage, activeByNameLocalStorage, activeByNameContentLocalStorage, closeComponent, }: ModalProps) => React.JSX.Element;
export interface ProgressCircleBaseProps {
    p: number;
    showP: boolean;
}
export interface ProgressCircleClassProps {
    className?: string;
}
export interface ProgressCircleProps extends ProgressCircleBaseProps, ProgressCircleClassProps {
}
export declare const ProgressCircle: ({ className, p, showP, }: ProgressCircleProps) => React.JSX.Element;
export interface ProgressLineBaseProps {
    p: number;
    showP: boolean;
}
export interface ProgressLineClassProps {
    className?: string;
    classNameBar?: string;
}
export interface ProgressLineProps extends ProgressLineBaseProps, ProgressLineClassProps {
}
export declare const ProgressLine: ({ className, classNameBar, p, showP, }: ProgressLineProps) => React.JSX.Element;
export interface ChronometerBaseProps {
    time?: number;
    onChange?: (time: number) => void;
    min?: number;
    optionsTimeToText?: getTimeToTextProps;
}
export interface ChronometerClassProps {
    className?: string;
}
export interface ChronometerProps extends ChronometerBaseProps, ChronometerClassProps {
}
export declare const Chronometer: ({ className, time, min, onChange, optionsTimeToText, }: ChronometerProps) => React.JSX.Element;
export interface LoaderBaseProps {
}
export interface LoaderClassProps {
    classNameLoader?: string;
}
export interface LoaderProps extends LoaderBaseProps, LoaderClassProps {
}
export declare const Loader: ({ classNameLoader }: LoaderProps) => React.JSX.Element;
export interface LoaderLineBaseProps {
    height?: number;
}
export interface LoaderLineClassProps {
    classNameLoaderLine?: string;
}
export interface LoaderLineProps extends LoaderLineBaseProps, LoaderLineClassProps {
}
export declare const LoaderLine: ({ classNameLoaderLine, height, }: LoaderLineProps) => React.JSX.Element;
export interface LoaderUserBaseProps {
}
export interface LoaderUserClassProps {
    classNameLoaderUser?: string;
    classNameLoaderUserImg?: string;
    classNameLoaderUserName?: string;
    classNameLoaderUserEmail?: string;
}
export interface LoaderUserProps extends LoaderUserBaseProps, LoaderUserClassProps {
}
export declare const LoaderUser: ({ classNameLoaderUser, classNameLoaderUserImg, classNameLoaderUserName, classNameLoaderUserEmail, }: LoaderUserProps) => React.JSX.Element;
export interface LoaderSpinnerBaseProps {
}
export interface LoaderSpinnerClassProps {
    classNameLoaderSpinner?: string;
}
export interface LoaderSpinnerProps extends LoaderSpinnerBaseProps, LoaderSpinnerClassProps {
}
export declare const LoaderSpinner: ({ classNameLoaderSpinner, }: LoaderSpinnerProps) => React.JSX.Element;
export {};
