import React, {
  ReactNode,
  PropsWithChildren,
  CSSProperties,
  useMemo,
  useEffect,
  useState,
  useRef,
  useCallback,
  SyntheticEvent,
  AnchorHTMLAttributes,
  SetStateAction,
} from "react";
import * as ReactDOM from "react-dom";
import { createPortal } from "react-dom";
import {
  useMutation,
  useQuery as useQueryTanstack,
  QueryClient,
  QueryClientProvider as QueryClientProviderTanstack,
} from "@tanstack/react-query";
import {
  Autocomplete as GoogleAutocomplete,
  AutocompleteProps as GoogleAutocompleteProps,
  LoadScript,
  LoadScriptProps,
  GoogleMap,
  GoogleMapProps,
  MarkerClusterer,
  Marker,
  MarkerProps,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {
  // countryProps as CountryProps,
  // stateProps as StateProps,
  // cityProps as CityProps,
  getDataStatesByCountry,
  getDataCitysByStateAndCountry,
  getDataCountrys,
  getRuteCountryImg,
  getDataStates,
  getDataCitys,
  getDataCitysByCountry,
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
import QrScanner from "qr-scanner";

export interface FenextExportCsvFileProps {
  items: object[];
  fileName: string;
}

export const FenextExportCsvFile = ({
  fileName,
  items,
}: FenextExportCsvFileProps) => {
  function converterLine(obj: object) {
    return Object.values(obj)
      .map((e) => {
        if (Array.isArray(e)) {
          return `${e.join("|")}`;
        }
        if (`${e}`.indexOf(",") > -1) {
          return `"${e}"`;
        }
        return `${e}`;
      })
      .join(",");
  }

  const converterCsv = (items: object[]) => {
    const header = Object.keys(items[0]);

    const lines = items.map(converterLine).join("\r\n");

    return header + "\r\n" + lines;
  };

  const csv = converterCsv(items);

  const exportedFilenmae = `${fileName}.csv`;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const n: any = navigator;

  if (n.msSaveBlob) {
    // IE 10+
    n.msSaveBlob(blob, exportedFilenmae);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

export interface FenextExportJsonFileProps {
  jsonData: object[];
  fileName: string;
}

export function FenextExportJsonFile({
  fileName,
  jsonData,
}: FenextExportJsonFileProps) {
  const jsonString = JSON.stringify(jsonData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName + ".json";
  link.click();

  URL.revokeObjectURL(url);
}

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

export type DateDataTypeProps = "normal" | "range";

export interface DateDataProps {
  type?: DateDataTypeProps;
  date?: Date;
  dateRange?: Date[];
}

export interface PaginationDataProps {
  page?: number;
  npage?: number;
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
  content?: any;
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
  file?: File;
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
export interface AutocompleteGoogle extends Autocomplete {}

export interface SearchDataProps {
  search?: string;
}

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
  content?: any;
  message: string;
  msg?: string;
  input?: string;
  data?: D;

  constructor({ code, data, message, input, content }: ErrorFenextjsProps<D>) {
    super(message);
    this.code = code ?? ErrorCode.ERROR;
    this.name = code ?? ErrorCode.ERROR;
    this.message = (message ?? "") + (input ? ` [${input}]` : "");
    this.msg = message ?? "";
    this.data = data;
    this.input = input;
    this.content = content;
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
        d?.message ?? `Input Value Too High${d?.max ? `, max: ${d?.max}` : ""}`,
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
        d?.message ?? `Input Too Long${d?.max ? `, max: ${d?.max}` : ""}`,
      input: d?.input,
    });
  }
}

export class ErrorInputValueTooLow extends ErrorFenextjs {
  constructor(d?: { input?: string; min?: number | Date; message?: string }) {
    super({
      code: ErrorCode.INPUT_VALUE_TOO_LOW,
      message:
        d?.message ?? `Input Value Too Low${d?.min ? `, min: ${d?.min}` : ""}`,
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
          d?.equal ? `, equal: ${JSON.stringify([d?.equal].flat(2))}` : ""
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
        d?.message ?? `Input Too Short${d?.min ? `, min: ${d?.min}` : ""}`,
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
  private customValue:
    | ((data: T, parent?: FenextjsValidatorClass) => true | ErrorFenextjs)
    | undefined = undefined;

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
   * Método public para obtener el valor de data.
   * @returns {T | undefined}
   * @public
   */
  getData() {
    return this.data;
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
      this.onError(ErrorCode.INPUT_REQUIRED, this.messageError?.isRequered);
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
        this.onError(ErrorCode.INPUT_LENGTH, this.messageError?.isLength);
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
    if (typeof this.data !== "object" && this.messageError?.isObject) {
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
      if (r instanceof ErrorFenextjs) {
        this.onError(r.code, r.msg ?? r?.message);
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
  isArray(item: FenextjsValidatorClass | undefined = undefined, msg?: string) {
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
      this.onError(ErrorCode.INPUT_VALUE_TOO_LOW, this.messageError?.isMin);
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
      this.onError(ErrorCode.INPUT_VALUE_TOO_HIGH, this.messageError?.isMax);
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
      this.onError(ErrorCode.INPUT_NOT_EQUAL, this.messageError?.isCompareRef);
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
  isCustom(
    data: (data: T, parent?: FenextjsValidatorClass) => true | ErrorFenextjs,
    msg?: string,
  ) {
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
    const v = this.customValue(this.data, this?.parent);
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
export const FenextjsValidator = <T = any,>(
  props?: FenextjsValidatorClassConstructorProps,
) => new FenextjsValidatorClass<T>(props);

export const FV = FenextjsValidator;

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

export interface parseInputToQueryProps {
  input?: object;
}

export const parseInputToQuery = ({ input }: parseInputToQueryProps) => {
  const objInput: any = {};
  Object.keys(input ?? {}).forEach((key) => {
    const v = (input as any)?.[key];
    if (v != undefined && v != null) {
      if (key == "date") {
        const dateValue = v as DateDataProps;
        if (dateValue?.type == "normal" && dateValue?.date) {
          objInput["date"] = dateValue?.date?.toISOString();
        }
        if (
          dateValue?.type == "range" &&
          dateValue?.dateRange &&
          dateValue?.dateRange?.[0] &&
          dateValue?.dateRange?.[1]
        ) {
          objInput["date_start"] = dateValue?.dateRange?.[0]?.toISOString();
          objInput["date_end"] = dateValue?.dateRange?.[1]?.toISOString();
        }
      } else if (key == "search" && v == "") {
        return;
      } else {
        objInput[key] = v;
      }
    }
  });
  const query = new URLSearchParams(
    objInput as Record<string, string>,
  ).toString();
  return query;
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
    const num = `${data}`.replace(/[^0-9-+ ]/g, "");
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
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
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
    const newHeight = height == "auto" ? image.height * scaleFactor : height;

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
  EMPY: process?.env?.["NEXT_PUBLIC_EMPY"] == "TRUE",
  MODATA: process?.env?.["NEXT_PUBLIC_MODATA"] == "TRUE",
  LOG: process?.env?.["NEXT_PUBLIC_LOG"] == "TRUE",
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

export const cleanTextForTranslate = (text: string) => {
  return text
    .replaceAll("\\n", "")
    .replaceAll("\n", "")
    .replace(/ {2,}/g, " ")
    .trim();
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

  public storage: FenextFirebaseStorage;

  constructor({ config }: FenextFirebaseConstructorProps) {
    this.config = config;
    this.app = this.getApp();

    this.database = new FenextFirebaseDataBase({ app: this.app, config });

    this.storage = new FenextFirebaseStorage({ app: this.app, config });
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
    DATEMAX.setDate(1);
    DATEMAX.setMonth(D.getMonth() + 1);
    DATEMAX.setDate(DATEMAX.getDate() - 1);
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
  onGetDifDate({ date, dateCompare }: { date?: Date; dateCompare: Date }) {
    const d = new Date();
    d.setFullYear(0);
    d.setMonth(1);
    d.setDate(1);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);

    d.setTime(
      d.getTime() +
        (dateCompare?.getTime() - (date ?? this?.date)?.getTime?.()),
    );

    return d;
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

export interface useLocalStorageProps<T = any, O = any> {
  name: string;
  defaultValue?: T;
  parse?: (value: any) => T;
  updateValue?: (oldValue: O, newValue: T) => T;
}

export const useLocalStorage = <T = any, O = any>(
  props: useLocalStorageProps<T, O>,
) => {
  const { name, defaultValue, parse, updateValue } = useMemo(
    () => ({
      parse: (v: any) => v,
      updateValue: (o: O, n: T) => {
        o;
        return n;
      },
      ...props,
    }),
    [props],
  );

  const [load, setLoad] = useState(false);
  const [value, setValue] = useState<T>();

  const onListenerStorage = () => {
    window.addEventListener("storage", (e) => {
      if (e.key == name) {
        onLoadValue();
      }
    });
  };
  const getLocalStorage = () => {
    const valueLocal: any = window.localStorage.getItem(name);
    return valueLocal ? parse(valueLocal) : defaultValue;
  };
  const onLoadValue = () => {
    const valueLocal = getLocalStorage();
    setValue(valueLocal);
    setLoad(true);
    return valueLocal;
  };

  const updateLocalStorage = (newValue: any) => {
    if (typeof newValue == "object") {
      newValue = JSON.stringify(newValue);
    }
    window.localStorage.setItem(name, newValue);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: name,
      }),
    );
  };
  const setLocalStorage = (newValue: any) => {
    const oldValue = getLocalStorage();
    const nValue = updateValue(oldValue, newValue);
    setValue(nValue);
    updateLocalStorage(nValue);
  };

  const onClearLocalStorage = () => {
    window.localStorage.removeItem(name);
    setValue(undefined);
  };

  useEffect(() => {
    onLoadValue();
    onListenerStorage();
  }, []);

  return {
    load,
    value,
    setLocalStorage,
    onClearLocalStorage,
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

export interface useHistoryProps {
  name?: string;
  useRouterCustom?: typeof useRouter;
}
export interface useHistoryOnBackProps {
  onValidateRuteBack?: (path: string) => boolean;
}

export const useHistory = ({
  name = "fenextjs-history",
  useRouterCustom = useRouter,
}: useHistoryProps) => {
  const {
    setSessionStorage,
    value: paths,
    load,
  } = useSessionStorage<string[]>({
    name,
    parse: (e) => {
      try {
        return JSON.parse(e);
      } catch {
        return [];
      }
    },
  });

  const onPushPath = useCallback(
    (n: string) => {
      if (paths?.at(-1) === n) {
        return;
      }
      setSessionStorage([...(paths ?? []), ...[n].flat(2)]);
    },
    [paths],
  );

  const router = useRouterCustom();
  useEffect(() => {
    if (load && !router.asPath.includes("[")) {
      onPushPath(router.asPath);
    }
  }, [router.asPath, load]);

  const currentPath = useMemo(() => [paths ?? []].flat(2).at(-1), [paths]);

  const onBack = useCallback(
    ({ onValidateRuteBack }: useHistoryOnBackProps) => {
      let listPaths = [...(paths ?? [])];
      let nSlice = 1;
      let pathBack = listPaths.at(-nSlice) ?? "";

      const onBackPath = () => {
        nSlice++;
        pathBack = listPaths.at(-nSlice) ?? "";
        if (pathBack == currentPath) {
          onBackPath();
          return;
        }
        if (pathBack == "") {
          pathBack = listPaths[0] ?? "";
        }
      };
      do {
        onBackPath();
      } while (
        onValidateRuteBack != undefined &&
        !onValidateRuteBack(pathBack)
      );

      listPaths = listPaths.slice(0, Math.max(listPaths.length - nSlice, 1));

      setSessionStorage(listPaths);
      router.push(pathBack);
    },
    [paths, currentPath],
  );

  return {
    paths,
    onBack,
    currentPath,
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
  const error: undefined | ErrorFenextjs = result !== true ? result : undefined;

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

export interface useRefreshData {
  [id: string]: number;
}

export interface useRefreshProps {}

export const useRefresh = ({ ...props }: useRefreshProps) => {
  const { data, onConcatData } = useData<useRefreshData>(
    {},
    {
      ...props,
      useGlobalContext: `useRefresh`,
    },
  );
  const onRefresh = (ids: string | string[]) => {
    const obj: useRefreshData = {};
    const time = new Date().getTime();
    [ids].flat(2).forEach((k) => {
      obj[`${k}`] = time;
    });
    onConcatData(obj);
  };
  return {
    data: data,
    onRefresh,
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

  const { data: error, setData: setError } = useData<ErrorFenextjs | undefined>(
    undefined,
    {
      onChangeDataAfter: onChangeError,
    },
  );

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

export type useFilterDataProps<CF extends Record<string, any>> =
  SearchDataProps &
    Partial<CF> & {
      date?: DateDataProps;
    };

export interface useFilterProps<CF extends Record<string, any>> {
  name?: string;
  onChage?: (data: useFilterDataProps<CF>) => void;
}

export const useFilter = <CF extends Record<string, any> = any>({
  name,
  onChage,
}: useFilterProps<CF>) => {
  return useData<useFilterDataProps<CF>>(
    {},
    {
      useGlobalContext: `fenext-filter-${name ?? ""}`,
      onChangeDataAfter: onChage,
    },
  );
};

export const useRouter = () => {
  const _w = {
    location: {
      pathname: "",
      search: "",
      hash: "",
      href: "",
      reload: () => {},
    },
    history: {
      forward: () => {},
      back: () => {},
      replaceState: () => {},
    },
    addEventListener: () => {},
    removeEventListener: () => {},
  };

  const w = (typeof window == "undefined" ? _w : window) ?? _w;

  const [pathname, setPathname] = useState(w?.location?.pathname ?? "");
  const [query, setQuery] = useState(
    new URLSearchParams(w?.location?.search ?? ""),
  );
  const [hash, setHash] = useState(w?.location?.hash ?? "");

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(w?.location?.pathname ?? "");
      setQuery(new URLSearchParams(w?.location?.search ?? ""));
      setHash(w?.location?.hash ?? "");
    };

    w.addEventListener("popstate", handleLocationChange); // Cambios en el historial
    return () => {
      w.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const push = (url: string) => {
    w.location.href = url;
    setPathname(w?.location?.pathname ?? "");
    setQuery(new URLSearchParams(w?.location?.search ?? ""));
    setHash(w?.location?.hash ?? "");
  };

  const replace = (url: string) => {
    w?.history?.replaceState({}, "", url);
    setPathname(w?.location?.pathname ?? "");
    setQuery(new URLSearchParams(w?.location?.search ?? ""));
    setHash(w?.location?.hash ?? "");
  };

  const back = () => {
    w?.history?.back();
  };

  const forward = () => {
    w?.history?.forward();
  };

  const reload = () => {
    w?.location?.reload();
  };

  return {
    asPath: pathname + (query.toString() ? `?${query.toString()}` : "") + hash,
    back,
    forward,
    isReady: true, // Siempre está listo en w.location
    pathname,
    push,
    query: Object.fromEntries(query.entries()),
    reload,
    replace,
    route: pathname,
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

export interface onApiErrorData {
  message: string;
}

export interface useApiErrorProps {
  onActionExecute?: (data?: onApiErrorData) => void;
}

export const useApiError = ({ onActionExecute }: useApiErrorProps) => {
  const { onAction: onApiError } = useAction<onApiErrorData>({
    name: "api-error",
    onActionExecute,
  });
  return { onApiError };
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
export interface useUserProps<U = UserProps> {
  /**
   * Name Var of save user in localStorage.
   */
  varName?: string;

  onValidateUser?: (user: U | null | undefined) => boolean;

  urlRedirectInLogin?: string;

  urlRedirectInLogout?: string;

  onLogOut?: () => void;

  onLogin?: () => void;
}

/**
 * Hook to manage user data and authentication.
 * @param validateTokenUser Function to validate the user's token. By default, it will check that the user
 * object has a "token" property and decode it using JSON web tokens.
 * You can replace it with your own custom validation function.
 * @returns An object with the user data and authentication methods.
 */
export const useUser = <U = UserProps,>({
  varName = "fenextjs-user",
  onValidateUser,
  urlRedirectInLogin,
  urlRedirectInLogout,
  onLogOut: onLogOutProps,
  onLogin: onLoginProps,
}: useUserProps<U>) => {
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
  const onLogin = (data: U) => {
    try {
      if (onValidateUser) {
        if (!onValidateUser(data)) {
          throw new Error("Invalid User");
        }
      }
      setUser(data);
      onLoginProps?.();
      if (urlRedirectInLogin && typeof window != "undefined") {
        window.location.href = urlRedirectInLogin;
      }
      return true;
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
    if (urlRedirectInLogout && typeof window != "undefined") {
      window.location.href = urlRedirectInLogout;
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
    if (name && (activeByNameLocalStorage || activeByNameContentLocalStorage)) {
      const n = [...(listNamesLocalStorage ?? []), name];
      setLocalStorage(n);
    }
  };
  const onPop = (name?: string) => {
    if (name && (activeByNameLocalStorage || activeByNameContentLocalStorage)) {
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

export interface useOnlineProps {
  onOnline?: () => void;
  onOffline?: () => void;
}

export const useOnline = ({ onOffline, onOnline }: useOnlineProps = {}) => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    // Fallback para entornos donde navigator.onLine no esté disponible.
    return typeof navigator !== "undefined" ? navigator.onLine : true;
  });

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    onOnline?.();
  }, [onOnline]);
  const handleOffline = useCallback(() => {
    setIsOnline(false);
    onOffline?.();
  }, [onOffline]);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      // Limpieza de eventos para evitar fugas de memoria
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return { isOnline };
};

export interface IApiResult<T> {
  message: string;
  data: T;
}

export interface IApiError {
  message: string;
  error: ErrorFenextjs;
}

export type IApiRespond<T> = IApiResult<T> | IApiError;

export interface useApiQueryProps<I> {
  url: string;
  options?: RequestInit;
  input?: I;
  key: string;
  useUserToken?: boolean;
  usedataFilter?: boolean;
  usepagination?: boolean;
}

export const useApiQuery = <I, R>({
  url,
  options,
  input,
  key,
  useUserToken = true,
  usedataFilter = true,
  usepagination = true,
}: useApiQueryProps<I>) => {
  const { user, load } = useUser({});
  const { data: dataFilter } = useFilter({});
  const { data: pagination } = usePagination({});
  const { onApiError } = useApiError({});
  const {
    data: { [key]: _key },
  } = useRefresh({});

  const onQuery = async (): Promise<IApiResult<R>> => {
    const query = parseInputToQuery({
      input: { ...dataFilter, ...input, ...pagination },
    });
    let FenextUser: string | undefined = undefined;
    if (user) {
      try {
        FenextUser = JSON.stringify(user);
      } catch {
        FenextUser = undefined;
      }
    }
    const response = await fetch(`${url}?${query}`, {
      method: "GET",
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${user?.token}`,
        ...(FenextUser ? { FenextUser } : {}),
        ...options?.headers,
      },
    });
    const data = await response.json();
    if (data?.error) {
      onApiError(data);
      throw data;
    }
    return data;
  };

  const onQueryNotLoadUser = async () => {
    if (useUserToken == false) {
      return await onQuery();
    }
    await sleep(1000);
    return {} as IApiResult<R>;
  };

  return useQueryTanstack<IApiResult<R>, IApiError>({
    queryKey: [key],
    queryFn: load ? onQuery : onQueryNotLoadUser,
    queryHash:
      key +
      "-" +
      JSON.stringify({
        _key,
        input,
        user,
        load,
        ...(usedataFilter ? { dataFilter } : {}),
        ...(usepagination ? { pagination } : {}),
      }),
  });
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
export const useNotification = ({ time = 4000 }: useNotificationProps) => {
  const [notification, setNotification] = useState<NotificationDataProps[]>([]);
  const { onAction } = useAction<NotificationDataProps[]>({
    name: "fenextjs-notification",
    onActionExecute: (e) => {
      if (e) {
        setNotification((a) => [...a, ...e]);
        setTimeout(() => {
          setNotification((a) => [...a].slice(e.length));
        }, time);
      }
    },
  });

  /**
   * Resets the notification to its default state
   */
  const reset = () => {
    onAction([]);
  };

  /**
   * Sets a notification to be displayed
   * @param props - Notification properties
   */
  const pop = (props: NotificationDataProps, options?: NotificationOptions) => {
    onAction([props]);
    window.Notification.requestPermission().then((permission) => {
      if (permission == "granted") {
        new window.Notification(props.message, options);
      }
    });
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

export interface useApiMutationCallbackProps<R> {
  onSuccess?: (data: IApiResult<R>) => void;
  onError?: (error: IApiError) => void;
}
export interface useApiMutationProps<I, R>
  extends useApiMutationCallbackProps<R> {
  url: string;
  options?: RequestInit;
  key: string;
  parseBody?: (data: I) => BodyInit | null;
}

export const useApiMutation = <I, R>({
  url,
  onSuccess,
  onError,
  options,
  key,
  parseBody = JSON.stringify,
}: useApiMutationProps<I, R>) => {
  const { user } = useUser({});
  const { onApiError } = useApiError({});
  const { onRefresh } = useRefresh({});

  const onMutation = async (input: I): Promise<IApiResult<R>> => {
    let FenextUser: string | undefined = undefined;
    if (user) {
      try {
        FenextUser = JSON.stringify(user);
      } catch {
        FenextUser = undefined;
      }
    }
    const response = await fetch(url, {
      method: "POST",
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${user?.token}`,
        ...(FenextUser ? { FenextUser } : {}),
        ...options?.headers,
      },
      body: parseBody(input),
    });
    const data = await response.json();
    if (data?.error) {
      const err = {
        ...data,
        error: new ErrorFenextjs({
          message: data?.error?.message ?? data?.error ?? "",
        }),
      };
      onApiError(err);
      throw err;
    }
    return data;
  };

  return useMutation<IApiResult<R>, IApiError, I>({
    mutationFn: onMutation,
    onSuccess: (data) => {
      onRefresh([key]);
      onSuccess?.(data);
    },
    onError,
  });
};

export interface use_TProps extends _TProps {}

export const use_T = ({ _t: _tProps, useT = true }: use_TProps) => {
  const _t = useCallback(
    (message: any) => _tValidate(message, useT !== false ? _tProps : undefined),
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

export interface LanguageListProps<Langs extends string[]> {
  [word: string]: {
    [lang in Langs[number]]: any;
  };
}

export interface useLanguageProps<Langs extends string[]> {
  defaultLang?: Langs[number];
  langs: Langs;
  listTranductions: LanguageListProps<Langs>;
  onNoFoundTranslate?: (data: { word: string; lang: Langs[number] }) => void;

  fallbackNoFoundTranslation?: string;
}

export const useLanguage = <Langs extends string[]>({
  langs,
  listTranductions,
  defaultLang,
  onNoFoundTranslate,
  fallbackNoFoundTranslation = undefined,
}: useLanguageProps<Langs>) => {
  const {
    setLocalStorage: setCurrentLang,
    value: currentLang,
    load,
  } = useLocalStorage<Langs[number]>({
    name: "fenextjs-lang",
    defaultValue: defaultLang ?? langs?.[0],
  });

  const onTranslate = useCallback(
    (word?: any) => {
      if (!word || word === "") return word;

      if (
        typeof word === "string" &&
        currentLang &&
        typeof window !== "undefined"
      ) {
        const cleanedWord = cleanTextForTranslate(word);

        if (cleanedWord === "") return "";

        const translation = listTranductions?.[cleanedWord]?.[currentLang];
        if (translation) {
          return translation;
        } else {
          onNoFoundTranslate?.({
            lang: currentLang,
            word: cleanedWord,
          });
          if (fallbackNoFoundTranslation != undefined) {
            return fallbackNoFoundTranslation;
          }
        }
      }

      return word;
    },
    [
      currentLang,
      listTranductions,
      onNoFoundTranslate,
      fallbackNoFoundTranslation,
    ],
  );

  return {
    onTranslate,
    load,
    currentLang,
    setCurrentLang,
  };
};

export interface useStateGlobalContextProps<T> {
  defaultValue: T;
  name?: string;
}

export const useStateGlobalContext = <T,>({
  name,
  defaultValue,
}: useStateGlobalContextProps<T>) => {
  const [data, _setData] = useState<T>(defaultValue);
  const { onAction } = useAction<T>({
    name: `${name ?? ""}`,
    onActionExecute: name
      ? (e) => {
          const w = (window ?? {}) as any;
          w[name] = e;
          _setData(e as T);
        }
      : undefined,
  });
  const setData = (f: SetStateAction<T>) => {
    if (name) {
      const n = typeof f == "function" ? (f as any)(data) : f;
      onAction(n);
    } else {
      _setData(f);
    }
  };
  const onLoadDataAction = () => {
    if (name) {
      const w = (window ?? {}) as any;
      const e = w?.[name];
      if (e != undefined) {
        _setData(e as T);
      }
    }
  };
  useEffect(onLoadDataAction, []);
  return {
    data,
    setData,
  };
};

export interface usePaginationProps {
  name?: string;
  onChage?: (data: PaginationDataProps) => void;
}

export const usePagination = ({ name, onChage }: usePaginationProps) => {
  const { data, setData, onChangeData, setDataFunction } =
    useData<PaginationDataProps>(
      {
        page: 0,
        npage: 10,
      },
      {
        useGlobalContext: `fenext-pagination-${name ?? ""}`,
        onChangeDataAfter: onChage,
      },
    );

  return { data, setData, onChangeData, setDataFunction };
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
  memoDependencies?: any[];
  onMemo?: (data: T) => M;
  validator?: FenextjsValidatorClass<T>;
  validatorMemo?: FenextjsValidatorClass<M>;
  onSubmitData?: (data: T) => RT | Promise<RT>;
  onBeforeSubmitData?: (d: { data: T; isValid?: ErrorFenextjs | true }) => void;
  onAfterSubmitDataOk?: (d: { data: T; result: RT }) => void;
  onAfterSubmitParseError?: (error: any) => ET;
  onAfterSubmitDataError?: (d: { data: T; error: ET }) => void;
  afterSubmitDataSetIsChangeFalse?: boolean;

  onSubmitDataMemo?: (data: M) => RM | Promise<RM>;
  onBeforeSubmitDataMemo?: (d: {
    dataMemo: M;
    isValidDataMemo?: ErrorFenextjs | true;
  }) => void;
  onAfterSubmitDataMemoOk?: (d: { dataMemo: M; result: RM }) => void;
  onAfterSubmitParseErrorMemo?: (error: any) => EM;
  onAfterSubmitDataMemoError?: (d: { dataMemo: M; error: EM }) => void;
  afterSubmitDataMemoSetIsChangeFalse?: boolean;
  autoOnValidate?: boolean;

  env_log?: {
    [id in useDataOptionsEnvLog]?: boolean;
  };

  useGlobalContext?: string;
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
  const [keyData, setKeyData] = useState<number>(0);

  const NAME_IS_CHANGE_ACTION = options?.useGlobalContext
    ? `fenextjs-is-change-action-${options?.useGlobalContext}`
    : undefined;
  const { data: isChange, setData: setIsChange } =
    useStateGlobalContext<boolean>({
      defaultValue: false,
      name: NAME_IS_CHANGE_ACTION,
    });

  const NAME_DATA_ACTION = options?.useGlobalContext
    ? `fenextjs-data-action-${options?.useGlobalContext}`
    : undefined;
  const { data: data_, setData: setDataD } = useStateGlobalContext<T>({
    defaultValue: defaultData,
    name: NAME_DATA_ACTION,
  });

  const NAME_DATA_ERROR_ACTION = options?.useGlobalContext
    ? `fenextjs-data-error-action-${options?.useGlobalContext}`
    : undefined;
  const { data: dataError, setData: setDataError } = useStateGlobalContext<
    ET | undefined
  >({ defaultValue: undefined, name: NAME_DATA_ERROR_ACTION });

  const NAME_LOADER_SUBMIT_ACTION = options?.useGlobalContext
    ? `fenextjs-loader-submit-action-${options?.useGlobalContext}`
    : undefined;
  const { data: loaderSubmit, setData: setLoaderSubmit } =
    useStateGlobalContext<boolean>({
      defaultValue: false,
      name: NAME_LOADER_SUBMIT_ACTION,
    });

  const NAME_RESULT_SUBMIT_DATA_ACTION = options?.useGlobalContext
    ? `fenextjs-result-submit-data-action-${options?.useGlobalContext}`
    : undefined;
  const { data: resultSubmitData, setData: setResultSubmitData } =
    useStateGlobalContext<RT | undefined>({
      defaultValue: undefined,
      name: NAME_RESULT_SUBMIT_DATA_ACTION,
    });

  const NAME_DATA_ERROR_MEMO_ACTION = options?.useGlobalContext
    ? `fenextjs-data-error-memo-action-${options?.useGlobalContext}`
    : undefined;
  const { data: dataErrorMemo, setData: setDataErrorMemo } =
    useStateGlobalContext<EM | undefined>({
      defaultValue: undefined,
      name: NAME_DATA_ERROR_MEMO_ACTION,
    });

  const NAME_LOADER_SUBMIT_MEMO_ACTION = options?.useGlobalContext
    ? `fenextjs-loader-submit-memo-action-${options?.useGlobalContext}`
    : undefined;
  const { data: loaderSubmitMemo, setData: setLoaderSubmitMemo } =
    useStateGlobalContext<boolean>({
      defaultValue: false,
      name: NAME_LOADER_SUBMIT_MEMO_ACTION,
    });

  const NAME_RESULT_SUBMIT_DATA_MEMO_ACTION = options?.useGlobalContext
    ? `fenextjs-result-submit-data-memo-action-${options?.useGlobalContext}`
    : undefined;
  const { data: resultSubmitDataMemo, setData: setResultSubmitDataMemo } =
    useStateGlobalContext<RM | undefined>({
      defaultValue: undefined,
      name: NAME_RESULT_SUBMIT_DATA_MEMO_ACTION,
    });

  const data = useMemo<T>(() => options?.data ?? data_, [data_, options?.data]);

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
    (value: (typeof data)[keys], _options?: onChangeDataOptionsProps<T>) => {
      if (value === data[id]) {
        return;
      }
      setDataD((pre: T) => {
        let nData: any;
        if (typeof pre === "string" || typeof pre === "number") {
          nData = `${pre}` as T;
          if (typeof id == "number" && id >= 0 && id < nData.length) {
            nData = nData.substring(0, id) + value + nData.substring(id + 1);
          }
          if (typeof pre === "number") {
            nData = parseNumber(nData);
          }
        } else if (Array.isArray(pre)) {
          nData = [...pre] as T;
          nData[id] = value;
        } else if (typeof pre == "object") {
          nData = { ...pre, [id]: value };
        } else {
          return pre;
        }
        options?.onChangeDataAfter?.(nData);
        _options?.onCallback?.(nData);
        if (_options?.parseDataBeforeOnChangeData) {
          nData = _options?.parseDataBeforeOnChangeData(id, nData) as any;
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
      let nData: any;
      if (typeof pre === "string" || typeof pre === "number") {
        nData = `${pre}` as T;
        if (typeof id == "number" && id >= 0 && id < nData.length) {
          nData = nData.substring(0, id) + nData.substring(id + 1);
        }
        if (typeof pre === "number") {
          nData = parseNumber(nData);
        }
      } else if (Array.isArray(pre)) {
        nData = [...pre].filter(
          (v, i) => i !== (id as number) && (v || !v),
        ) as T;
      } else if (typeof pre == "object") {
        nData = { ...pre };
        delete nData[id];
      } else {
        return pre;
      }
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
  }, [data, JSON.stringify({ a: options?.memoDependencies })]);

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
      overwrite?: {
        onSubmitData?: useDataOptions<T, M, RT, RM, ET, EM>["onSubmitData"];
      };
      onSaveData?: (p: { data: T; result: RT }) => T;
      useValidator?: boolean;
    }) => {
      const dataUse = optionsSubmitData?.data ?? data;
      const isValidDataUse =
        optionsSubmitData?.useValidator === false ||
        (optionsSubmitData?.data
          ? options?.validator?.onValidate?.(optionsSubmitData?.data) ?? true
          : isValidData);
      options?.onBeforeSubmitData?.({
        data: dataUse,
        isValid: isValidDataUse,
      });
      const _onSubmitData =
        optionsSubmitData?.overwrite?.onSubmitData ?? options?.onSubmitData;

      if (_onSubmitData && isValidDataUse === true) {
        try {
          setDataError(undefined);
          setResultSubmitData(undefined);
          setLoaderSubmit(true);
          const result = await _onSubmitData?.(dataUse);
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
          setLoaderSubmit(false);
          return result;
        } catch (err) {
          setLoaderSubmit(false);
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
      overwrite?: {
        onSubmitDataMemo?: useDataOptions<
          T,
          M,
          RT,
          RM,
          ET,
          EM
        >["onSubmitDataMemo"];
      };
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
      options?.onBeforeSubmitDataMemo?.({
        dataMemo: dataUse,
        isValidDataMemo: isValidDataUse,
      });
      const _onSubmitDataMemo =
        optionsSubmitDataMemo?.overwrite?.onSubmitDataMemo ??
        options?.onSubmitDataMemo;
      if (_onSubmitDataMemo && isValidDataUse === true) {
        try {
          setDataErrorMemo(undefined);
          setResultSubmitDataMemo(undefined);
          setLoaderSubmitMemo(true);
          const result = await _onSubmitDataMemo?.(dataUse);
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
          const error = (options?.onAfterSubmitParseErrorMemo?.(err) ??
            (err as any)) as EM;
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
      if (options?.refreshDataIfChangeDefaultData?.useReloadKeyData === true) {
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

    setLoaderSubmit,
    setLoaderSubmitMemo,

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

export interface useSessionStorageProps<T = any, O = any> {
  name: string;
  defaultValue?: T;
  parse?: (value: any) => T;
  updateValue?: (oldValue: O, newValue: T) => T;
}

export const useSessionStorage = <T = any, O = any>(
  props: useSessionStorageProps<T, O>,
) => {
  const { name, defaultValue, parse, updateValue } = useMemo(
    () => ({
      parse: (v: any) => v,
      updateValue: (o: O, n: T) => {
        o;
        return n;
      },
      ...props,
    }),
    [props],
  );

  const [load, setLoad] = useState(false);
  const [value, setValue] = useState<T>();

  const onListenerStorage = () => {
    window.addEventListener("sessionStorage", (e) => {
      if ((e as any).key == name) {
        onLoadValue();
      }
    });
  };
  const getSessionStorage = () => {
    const valueSession: any = window.sessionStorage.getItem(name);
    return valueSession ? parse(valueSession) : defaultValue;
  };
  const onLoadValue = () => {
    const valueSession = getSessionStorage();
    setValue(valueSession);
    setLoad(true);
    return valueSession;
  };

  const updateSessionStorage = (newValue: any) => {
    if (typeof newValue == "object") {
      newValue = JSON.stringify(newValue);
    }
    window.sessionStorage.setItem(name, newValue);
    window.dispatchEvent(
      new StorageEvent("sessionStorage", {
        key: name,
      }),
    );
  };
  const setSessionStorage = (newValue: any) => {
    const oldValue = getSessionStorage();
    const nValue = updateValue(oldValue, newValue);
    setValue(nValue);
    updateSessionStorage(nValue);
  };

  const onClearSessionStorage = () => {
    window.sessionStorage.removeItem(name);
    setValue(undefined);
  };

  useEffect(() => {
    onLoadValue();
    onListenerStorage();
  }, []);

  return {
    load,
    value,
    setSessionStorage,
    onClearSessionStorage,
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

export interface useActionDropDownProps {
  name?: string;
  onChange?: (e?: boolean) => void;
}
export const useActionDropDown = ({
  name,
  onChange,
}: useActionDropDownProps) => {
  const { onAction } = useAction<boolean>({
    name: `fenext-dropdown-${name ?? ""}`,
    onActionExecute: name != undefined ? onChange : undefined,
  });
  return {
    onClose: () => {
      onAction(false);
    },
    onActive: () => {
      onAction(true);
    },
    onToogle: () => {
      onAction();
    },
  };
};

export const SvgMove = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 10.313 17.189"
  >
    <path
      d="M0 1.719a1.719 1.719 0 1 1 1.719 1.719A1.719 1.719 0 0 1 0 1.719zm1.719 8.594A1.719 1.719 0 1 0 0 8.594a1.719 1.719 0 0 0 1.719 1.719zm0 6.876A1.719 1.719 0 1 0 0 15.47a1.719 1.719 0 0 0 1.719 1.719zM8.594 3.438a1.719 1.719 0 1 0-1.719-1.719 1.719 1.719 0 0 0 1.719 1.719zm0 6.876a1.719 1.719 0 1 0-1.719-1.719 1.719 1.719 0 0 0 1.719 1.718zm0 6.876a1.719 1.719 0 1 0-1.719-1.719 1.719 1.719 0 0 0 1.719 1.718z"
      data-name="Group 15804"
      fill="currentColor"
    />
  </svg>
);

export const SvgClose = ({ className = "" }: { className?: string }) => (
  <>
    <svg
      className={`fenext_svg ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path
        d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
        fill="currentColor"
      />
    </svg>
  </>
);

export const SvgShareArrow = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 42.975 37.247"
    className={`fenext_svg ${className}`}
  >
    <path
      d="M5.433 49.246a1.47 1.47 0 0 1-.329-.038A1.435 1.435 0 0 1 4 47.813C4 34.8 5.647 23.97 25.488 23.477V13.433a1.432 1.432 0 0 1 2.4-1.052l18.623 17.19a1.433 1.433 0 0 1 0 2.1L27.893 48.865a1.432 1.432 0 0 1-2.4-1.052V37.8c-13.61.326-16.122 5.347-18.774 10.651a1.432 1.432 0 0 1-1.281.792zM26.92 34.921a1.432 1.432 0 0 1 1.433 1.433v8.188l15.078-13.919-15.078-13.918v8.188a1.432 1.432 0 0 1-1.433 1.433c-15.825 0-19.233 6.12-19.9 15.9 2.965-3.99 8.022-7.305 19.9-7.305z"
      transform="translate(-4 -12)"
      fill="currentColor"
    ></path>
  </svg>
);

export const SvgOnlyFans = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="325" cy="325" r="295" stroke="currentColor" strokeWidth="30" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M321 212C280.013 212 250.428 227.201 229.66 245.506C254.35 224.596 286.214 212 321 212ZM412.342 245.508C443.316 271.739 463 311.055 463 355C463 433.977 399.424 498 321 498C242.576 498 179 433.977 179 355C179 311.054 198.685 271.738 229.66 245.506C198.237 273.201 187 308 187 308L455 308C455 308 443.763 273.202 412.342 245.508ZM321 212C355.786 212 387.651 224.597 412.342 245.508C391.574 227.202 361.988 212 321 212ZM335 421.066C350.106 416.043 361 401.793 361 385C361 364.013 343.987 347 323 347C302.013 347 285 364.013 285 385C285 401.793 295.894 416.043 311 421.066V461H335V421.066ZM334.56 421.21C334.859 421.081 335 421 335 421V421.066C334.854 421.115 334.707 421.163 334.56 421.21ZM334.56 421.21C331.619 422.148 328.523 422.737 325.319 422.93C330.675 422.657 333.539 421.651 334.56 421.21ZM322.778 422.999C323.681 422.995 324.527 422.971 325.319 422.93C324.552 422.977 323.779 423 323 423C322.926 423 322.852 423 322.778 422.999ZM311.2 421.132C314.848 422.323 318.738 422.976 322.778 422.999C322.686 423 322.593 423 322.5 423C314.913 423 311.945 421.579 311.2 421.132ZM311.2 421.132C311.062 421.049 311 421 311 421V421.066C311.067 421.089 311.133 421.111 311.2 421.132Z"
      fill="currentColor"
    />
    <mask
      id="mask0_538_176"
      // style={{ maskType: 'alpha' }}

      {...({ maskType: "alpha" } as any)}
      maskUnits="userSpaceOnUse"
      x="176"
      y="150"
      width="311"
      height="158"
    >
      <rect
        width="311"
        height="158"
        transform="matrix(1 0 0 -1 176 308)"
        fill="#D9D9D9"
      />
    </mask>
    <g mask="url(#mask0_538_176)">
      <path
        d="M422 285.5C422 337.855 377.517 382 320.5 382C263.483 382 219 337.855 219 285.5C219 233.145 263.483 189 320.5 189C377.517 189 422 233.145 422 285.5Z"
        stroke="currentColor"
        strokeWidth="50"
      />
    </g>
  </svg>
);

export const SvgBehance = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M269 305.8C300.8 290.6 317.4 267.6 317.4 231.8C317.4 161.2 264.8 144 204.1 144H37V498.4H208.8C273.2 498.4 333.7 467.5 333.7 395.5C333.7 351 312.6 318.1 269 305.8V305.8ZM114.9 204.5H188C216.1 204.5 241.4 212.4 241.4 245C241.4 275.1 221.7 287.2 193.9 287.2H114.9V204.5V204.5ZM198.2 438.2H114.9V340.6H199.8C234.1 340.6 255.8 354.9 255.8 391.2C255.8 427 229.9 438.2 198.2 438.2V438.2ZM556.7 197.5H413V162.6H556.7V197.5V197.5ZM613 373.8C613 297.9 568.6 234.6 488.1 234.6C409.9 234.6 356.8 293.4 356.8 370.4C356.8 450.3 407.1 505.1 488.1 505.1C549.4 505.1 589.1 477.5 608.2 418.8H546C539.3 440.7 511.7 452.3 490.3 452.3C449 452.3 427.3 428.1 427.3 387H612.4C612.7 382.8 613 378.3 613 373.8ZM427.4 342.6C429.7 308.9 452.1 287.8 485.9 287.8C521.3 287.8 539.1 308.6 542.1 342.6H427.4Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgSettings = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z"
      fill="currentColor"
    />
  </svg>
);

export const SvgFrontIdentification = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 151.615 78.707"
  >
    <g data-name="Group 16123">
      <g data-name="Group 16040">
        <path
          data-name="Path 11665"
          d="M130.195 79.946H8.369A5.369 5.369 0 0 1 3 74.577V8.369A5.369 5.369 0 0 1 8.369 3h121.826a5.369 5.369 0 0 1 5.369 5.369v66.208a5.369 5.369 0 0 1-5.369 5.369"
          transform="translate(-2.119 -2.119)"
          fill="#fff"
        />
        <path
          data-name="Path 11666"
          d="M128.075 78.707H6.249A6.256 6.256 0 0 1 0 72.458V6.25A6.256 6.256 0 0 1 6.249 0h121.826a6.257 6.257 0 0 1 6.25 6.25v66.208a6.257 6.257 0 0 1-6.25 6.25M6.249 1.761A4.493 4.493 0 0 0 1.761 6.25v66.208a4.493 4.493 0 0 0 4.488 4.489h121.826a4.494 4.494 0 0 0 4.489-4.489V6.25a4.494 4.494 0 0 0-4.489-4.489z"
          fill="#1a1818"
        />
        <path
          data-name="Path 11667"
          d="m237.724 164.24-41.534-.087a.587.587 0 0 1 0-1.174l41.534.087a.587.587 0 0 1 0 1.174"
          transform="translate(-138.192 -115.144)"
          fill="#1a1818"
        />
        <path
          data-name="Path 11668"
          d="m246.82 87.136-50.764-.107a.587.587 0 0 1 0-1.174l50.764.107a.587.587 0 0 1 0 1.174"
          transform="translate(-138.098 -60.656)"
          fill="#1a1818"
        />
        <path
          data-name="Path 11669"
          d="m237.655 124.407-41.534-.087a.587.587 0 0 1 0-1.174l41.534.087a.587.587 0 0 1 0 1.174"
          transform="translate(-138.143 -87.002)"
          fill="#1a1818"
        />
        <path
          data-name="Path 11670"
          d="M210.3 41.8h-86.749a.734.734 0 0 1 0-1.468H210.3a.734.734 0 0 1 0 1.468"
          transform="translate(-86.77 -28.492)"
          fill="#1a1818"
        />
        <path
          data-name="Path 11671"
          d="M49.51 36.958H37.819a4.172 4.172 0 1 1 0-8.343H49.51a4.172 4.172 0 0 1 0 8.343M37.819 29.5a3.291 3.291 0 1 0 0 6.582H49.51a3.291 3.291 0 1 0 0-6.582z"
          transform="translate(-23.771 -20.216)"
          fill="#1a1818"
        />
        <path
          data-name="Path 11672"
          d="M337.214 208.4h-27.557a3.261 3.261 0 0 1-3.261-3.261V199.6a3.261 3.261 0 0 1 3.261-3.261h27.557a3.261 3.261 0 0 1 3.261 3.261v5.542a3.261 3.261 0 0 1-3.261 3.261"
          transform="translate(-216.467 -138.713)"
          fill="#b8b7b7"
        />
        <path
          data-name="Path 11673"
          d="M69.946 135.058H38.408a3.261 3.261 0 0 1-3.261-3.261V95.533a3.261 3.261 0 0 1 3.261-3.261h31.538a3.261 3.261 0 0 1 3.261 3.261V131.8a3.261 3.261 0 0 1-3.261 3.261"
          transform="translate(-24.831 -65.19)"
          fill="#fff"
        />
        <path
          data-name="Path 11674"
          d="M68.533 134.232H37a3.853 3.853 0 0 1-3.848-3.848V94.12A3.852 3.852 0 0 1 37 90.272h31.533a3.852 3.852 0 0 1 3.848 3.848v36.264a3.853 3.853 0 0 1-3.848 3.848M37 91.446a2.677 2.677 0 0 0-2.674 2.674v36.264A2.677 2.677 0 0 0 37 133.058h31.533a2.677 2.677 0 0 0 2.674-2.674V94.12a2.677 2.677 0 0 0-2.674-2.674z"
          transform="translate(-23.418 -63.776)"
          fill="#1a1818"
        />
        <path
          data-name="Path 11675"
          d="M75.633 141.927H52.18a3.261 3.261 0 0 1-3.261-3.261v-26.5a3.261 3.261 0 0 1 3.261-3.266h23.453a3.261 3.261 0 0 1 3.261 3.261v26.5a3.261 3.261 0 0 1-3.261 3.261"
          transform="translate(-34.561 -76.941)"
          fill="#b8b7b7"
        />
        <path
          data-name="Path 11676"
          d="M84.545 165.094a.824.824 0 1 0-1.159 1.171 7.364 7.364 0 0 1 2.2 5.269c0 1.007-2.888 2.471-7.413 2.471s-7.412-1.465-7.412-2.473a7.362 7.362 0 0 1 2.17-5.241.824.824 0 0 0-1.165-1.165 9 9 0 0 0-2.653 6.408c0 2.675 4.668 4.118 9.061 4.118s9.061-1.443 9.061-4.118a9 9 0 0 0-2.687-6.44z"
          transform="translate(-48.827 -116.469)"
          fill="#040504"
        />
        <path
          data-name="Path 11677"
          d="M86.1 140.208a5.766 5.766 0 1 0-5.766-5.766 5.766 5.766 0 0 0 5.766 5.766zm0-9.884a4.118 4.118 0 1 1-4.118 4.119 4.119 4.119 0 0 1 4.118-4.118"
          transform="translate(-56.758 -90.91)"
          fill="#040504"
        />
        <path
          data-name="Path 11678"
          d="M431.785 138.928a17.61 17.61 0 1 1-17.61-17.61 17.61 17.61 0 0 1 17.61 17.61"
          transform="translate(-280.171 -85.71)"
          fill="#fff"
        />
        <path
          data-name="Path 11679"
          d="M420.579 151.554v-3.959h-3.959a1.131 1.131 0 0 1 0-2.262h3.959v-3.959a1.131 1.131 0 0 1 2.262 0v3.959h3.959a1.131 1.131 0 0 1 0 2.262h-3.959v3.959a1.131 1.131 0 0 1-2.262 0m11.37-15.328a14.478 14.478 0 1 0-2.747 22.631 1.131 1.131 0 1 0-1.172-1.935 12.325 12.325 0 1 1 3.826-3.677 1.131 1.131 0 0 0 1.881 1.257 14.444 14.444 0 0 0-1.788-18.277"
          transform="translate(-287.707 -93.246)"
          fill="#050605"
        />
        <path
          data-name="Rectangle 7828"
          fill="none"
          d="M0 0h151.615v78.707H0z"
        />
      </g>
    </g>
  </svg>
);

export const SvgCreditCard = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 62 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M54.434 1H7.213C5.56594 1.00238 3.98702 1.65772 2.82238 2.82237C1.65773 3.98702 1.00238 5.56594 1 7.213L1 34.551C1.00159 36.1986 1.65658 37.7783 2.82132 38.9436C3.98605 40.1089 5.56542 40.7646 7.213 40.767H54.433C56.0801 40.7646 57.659 40.1093 58.8236 38.9446C59.9883 37.78 60.6436 36.2011 60.646 34.554V7.213C60.6436 5.56611 59.9884 3.98735 58.824 2.82273C57.6595 1.65811 56.0809 1.00265 54.434 1ZM58.162 34.551C58.1609 35.5394 57.7678 36.487 57.0689 37.1859C56.37 37.8848 55.4224 38.2779 54.434 38.279H7.213C6.2246 38.2779 5.27698 37.8848 4.57808 37.1859C3.87917 36.487 3.48606 35.5394 3.485 34.551V7.213C3.48606 6.2246 3.87917 5.27698 4.57808 4.57807C5.27698 3.87917 6.2246 3.48606 7.213 3.485H54.433C55.4214 3.48606 56.369 3.87917 57.0679 4.57807C57.7668 5.27698 58.1599 6.2246 58.161 7.213V34.551H58.162Z"
      fill="black"
      stroke="currentColor"
    />
    <path
      d="M59.4 8.45508H2.243C1.91334 8.45508 1.59717 8.58605 1.36407 8.81915C1.13096 9.05226 1 9.36843 1 9.69809L1 17.1541C1 17.4837 1.13096 17.7999 1.36407 18.033C1.59717 18.2661 1.91334 18.3971 2.243 18.3971H59.4C59.7297 18.3971 60.0458 18.2661 60.2789 18.033C60.512 17.7999 60.643 17.4837 60.643 17.1541V9.69809C60.643 9.36843 60.512 9.05226 60.2789 8.81915C60.0458 8.58605 59.7297 8.45508 59.4 8.45508ZM58.157 15.9111H3.485V10.9401H58.161V15.9111H58.157Z"
      fill="black"
      stroke="currentColor"
    />
    <path
      d="M24.6111 25.8521H9.70012C9.53399 25.8473 9.3686 25.876 9.21373 25.9363C9.05887 25.9966 8.91767 26.0874 8.7985 26.2033C8.67932 26.3191 8.58458 26.4577 8.51989 26.6108C8.4552 26.7639 8.42188 26.9284 8.42188 27.0946C8.42188 27.2608 8.4552 27.4253 8.51989 27.5784C8.58458 27.7315 8.67932 27.87 8.7985 27.9859C8.91767 28.1017 9.05887 28.1925 9.21373 28.2528C9.3686 28.3131 9.53399 28.3418 9.70012 28.3371H24.6111C24.7773 28.3418 24.9426 28.3131 25.0975 28.2528C25.2524 28.1925 25.3936 28.1017 25.5128 27.9859C25.6319 27.87 25.7267 27.7315 25.7914 27.5784C25.8561 27.4253 25.8894 27.2608 25.8894 27.0946C25.8894 26.9284 25.8561 26.7639 25.7914 26.6108C25.7267 26.4577 25.6319 26.3191 25.5128 26.2033C25.3936 26.0874 25.2524 25.9966 25.0975 25.9363C24.9426 25.876 24.7773 25.8473 24.6111 25.8521Z"
      fill="black"
      stroke="currentColor"
    />
    <path
      d="M24.6109 30.8223H9.69993C9.3765 30.8314 9.0694 30.9664 8.84387 31.1984C8.61835 31.4304 8.49219 31.7412 8.49219 32.0648C8.49219 32.3883 8.61835 32.6991 8.84387 32.9312C9.0694 33.1632 9.3765 33.2981 9.69993 33.3073H24.6109C24.9344 33.2981 25.2415 33.1632 25.467 32.9312C25.6925 32.6991 25.8187 32.3883 25.8187 32.0648C25.8187 31.7412 25.6925 31.4304 25.467 31.1984C25.2415 30.9664 24.9344 30.8314 24.6109 30.8223Z"
      fill="black"
      stroke="currentColor"
    />
    <path
      d="M49.463 23.3672H46.978C45.9896 23.3682 45.042 23.7614 44.3431 24.4603C43.6442 25.1592 43.2511 26.1068 43.25 27.0952V29.5802C43.2511 30.5686 43.6442 31.5162 44.3431 32.2151C45.042 32.914 45.9896 33.3071 46.978 33.3082H49.463C50.4514 33.3071 51.399 32.914 52.0979 32.2151C52.7968 31.5162 53.19 30.5686 53.191 29.5802V27.0952C53.1897 26.1069 52.7965 25.1594 52.0976 24.4605C51.3988 23.7617 50.4513 23.3685 49.463 23.3672ZM50.706 29.5802C50.706 29.9098 50.5751 30.226 50.3419 30.4591C50.1088 30.6922 49.7927 30.8232 49.463 30.8232H46.978C46.6483 30.8232 46.3322 30.6922 46.0991 30.4591C45.866 30.226 45.735 29.9098 45.735 29.5802V27.0952C45.735 26.7655 45.866 26.4494 46.0991 26.2162C46.3322 25.9831 46.6483 25.8522 46.978 25.8522H49.463C49.7927 25.8522 50.1088 25.9831 50.3419 26.2162C50.5751 26.4494 50.706 26.7655 50.706 27.0952V29.5802Z"
      fill="black"
      stroke="currentColor"
    />
  </svg>
);

export const SvgExclamation = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    height="20.759"
    viewBox="0 0 20.759 20.759"
  >
    <g data-name="Group 16111">
      <g data-name="Group 16110">
        <g data-name="Group 16109">
          <g data-name="info (3)">
            <g data-name="Group 16008">
              <g data-name="Group 16007">
                <path
                  data-name="Path 12234"
                  d="M10.379 0a10.379 10.379 0 1 0 10.38 10.379A10.374 10.374 0 0 0 10.379 0zm0 19.31a8.931 8.931 0 1 1 8.931-8.931 8.941 8.941 0 0 1-8.931 8.931z"
                  fill="currentColor"
                />
              </g>
            </g>
            <g data-name="Group 16010">
              <g data-name="Group 16009">
                <path
                  data-name="Path 12235"
                  d="M231.111 213.4c-.615 0-1.052.26-1.052.642v5.205c0 .328.437.656 1.052.656.587 0 1.066-.328 1.066-.656v-5.205c0-.385-.477-.642-1.066-.642z"
                  transform="translate(-220.731 -204.745)"
                  fill="currentColor"
                />
              </g>
            </g>
            <g data-name="Group 16012">
              <g data-name="Group 16011">
                <path
                  data-name="Path 12236"
                  d="M229.5 134.208a.984.984 0 1 0 1.107.97 1.058 1.058 0 0 0-1.107-.97z"
                  transform="translate(-219.116 -128.767)"
                  fill="currentColor"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export const SvgPayment = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 62 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M54.434 1H7.213C5.56594 1.00238 3.98702 1.65772 2.82238 2.82237C1.65773 3.98702 1.00238 5.56594 1 7.213L1 34.551C1.00159 36.1986 1.65658 37.7783 2.82132 38.9436C3.98605 40.1089 5.56542 40.7646 7.213 40.767H54.433C56.0801 40.7646 57.659 40.1093 58.8236 38.9446C59.9883 37.78 60.6436 36.2011 60.646 34.554V7.213C60.6436 5.56611 59.9884 3.98735 58.824 2.82273C57.6595 1.65811 56.0809 1.00265 54.434 1ZM58.162 34.551C58.1609 35.5394 57.7678 36.487 57.0689 37.1859C56.37 37.8848 55.4224 38.2779 54.434 38.279H7.213C6.2246 38.2779 5.27698 37.8848 4.57808 37.1859C3.87917 36.487 3.48606 35.5394 3.485 34.551V7.213C3.48606 6.2246 3.87917 5.27698 4.57808 4.57807C5.27698 3.87917 6.2246 3.48606 7.213 3.485H54.433C55.4214 3.48606 56.369 3.87917 57.0679 4.57807C57.7668 5.27698 58.1599 6.2246 58.161 7.213V34.551H58.162Z"
      fill="currentColor"
      stroke="currentColor"
    ></path>
    <path
      d="M59.4 8.45508H2.243C1.91334 8.45508 1.59717 8.58605 1.36407 8.81915C1.13096 9.05226 1 9.36843 1 9.69809L1 17.1541C1 17.4837 1.13096 17.7999 1.36407 18.033C1.59717 18.2661 1.91334 18.3971 2.243 18.3971H59.4C59.7297 18.3971 60.0458 18.2661 60.2789 18.033C60.512 17.7999 60.643 17.4837 60.643 17.1541V9.69809C60.643 9.36843 60.512 9.05226 60.2789 8.81915C60.0458 8.58605 59.7297 8.45508 59.4 8.45508ZM58.157 15.9111H3.485V10.9401H58.161V15.9111H58.157Z"
      fill="currentColor"
      stroke="currentColor"
    ></path>
    <path
      d="M24.6111 25.8521H9.70012C9.53399 25.8473 9.3686 25.876 9.21373 25.9363C9.05887 25.9966 8.91767 26.0874 8.7985 26.2033C8.67932 26.3191 8.58458 26.4577 8.51989 26.6108C8.4552 26.7639 8.42188 26.9284 8.42188 27.0946C8.42188 27.2608 8.4552 27.4253 8.51989 27.5784C8.58458 27.7315 8.67932 27.87 8.7985 27.9859C8.91767 28.1017 9.05887 28.1925 9.21373 28.2528C9.3686 28.3131 9.53399 28.3418 9.70012 28.3371H24.6111C24.7773 28.3418 24.9426 28.3131 25.0975 28.2528C25.2524 28.1925 25.3936 28.1017 25.5128 27.9859C25.6319 27.87 25.7267 27.7315 25.7914 27.5784C25.8561 27.4253 25.8894 27.2608 25.8894 27.0946C25.8894 26.9284 25.8561 26.7639 25.7914 26.6108C25.7267 26.4577 25.6319 26.3191 25.5128 26.2033C25.3936 26.0874 25.2524 25.9966 25.0975 25.9363C24.9426 25.876 24.7773 25.8473 24.6111 25.8521Z"
      fill="currentColor"
      stroke="currentColor"
    ></path>
    <path
      d="M24.6109 30.8223H9.69993C9.3765 30.8314 9.0694 30.9664 8.84387 31.1984C8.61835 31.4304 8.49219 31.7412 8.49219 32.0648C8.49219 32.3883 8.61835 32.6991 8.84387 32.9312C9.0694 33.1632 9.3765 33.2981 9.69993 33.3073H24.6109C24.9344 33.2981 25.2415 33.1632 25.467 32.9312C25.6925 32.6991 25.8187 32.3883 25.8187 32.0648C25.8187 31.7412 25.6925 31.4304 25.467 31.1984C25.2415 30.9664 24.9344 30.8314 24.6109 30.8223Z"
      fill="currentColor"
      stroke="currentColor"
    ></path>
    <path
      d="M49.463 23.3672H46.978C45.9896 23.3682 45.042 23.7614 44.3431 24.4603C43.6442 25.1592 43.2511 26.1068 43.25 27.0952V29.5802C43.2511 30.5686 43.6442 31.5162 44.3431 32.2151C45.042 32.914 45.9896 33.3071 46.978 33.3082H49.463C50.4514 33.3071 51.399 32.914 52.0979 32.2151C52.7968 31.5162 53.19 30.5686 53.191 29.5802V27.0952C53.1897 26.1069 52.7965 25.1594 52.0976 24.4605C51.3988 23.7617 50.4513 23.3685 49.463 23.3672ZM50.706 29.5802C50.706 29.9098 50.5751 30.226 50.3419 30.4591C50.1088 30.6922 49.7927 30.8232 49.463 30.8232H46.978C46.6483 30.8232 46.3322 30.6922 46.0991 30.4591C45.866 30.226 45.735 29.9098 45.735 29.5802V27.0952C45.735 26.7655 45.866 26.4494 46.0991 26.2162C46.3322 25.9831 46.6483 25.8522 46.978 25.8522H49.463C49.7927 25.8522 50.1088 25.9831 50.3419 26.2162C50.5751 26.4494 50.706 26.7655 50.706 27.0952V29.5802Z"
      fill="currentColor"
      stroke="currentColor"
    ></path>
  </svg>
);

export const SvgLaterIdentification = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 151.648 78.723"
  >
    <g data-name="Group 16124">
      <g data-name="Group 16041">
        <path
          data-name="Path 11680"
          d="M130.621 79.962H8.387A5.379 5.379 0 0 1 3 74.592V8.37A5.379 5.379 0 0 1 8.387 3h122.234a5.379 5.379 0 0 1 5.387 5.37v66.222a5.379 5.379 0 0 1-5.387 5.37"
          transform="translate(-2.116 -2.119)"
          fill="#fff"
        />
        <path
          data-name="Path 11681"
          d="M128.5 78.723H6.271A6.268 6.268 0 0 1 0 72.472V6.251A6.268 6.268 0 0 1 6.271 0H128.5a6.268 6.268 0 0 1 6.271 6.251v66.221a6.268 6.268 0 0 1-6.271 6.251M6.271 1.761a4.5 4.5 0 0 0-4.5 4.489v66.222a4.5 4.5 0 0 0 4.5 4.489H128.5a4.5 4.5 0 0 0 4.5-4.489V6.251a4.5 4.5 0 0 0-4.5-4.489z"
          fill="#1a1818"
        />
        <path
          data-name="Path 11682"
          d="M33.364 133.5a.44.44 0 1 1 0-.881l65.774-.061a.44.44 0 1 1 0 .881l-65.774.061z"
          transform="translate(-23.227 -93.645)"
          fill="#1a1818"
        />
        <path
          data-name="Path 11683"
          d="M33.228 42.6a.44.44 0 1 1 0-.881l79.513-.074a.44.44 0 1 1 0 .881l-79.513.074z"
          transform="translate(-23.131 -29.423)"
          fill="#1a1818"
        />
        <path
          data-name="Path 11684"
          d="M33.294 86.6a.44.44 0 1 1 0-.881l79.513-.074a.44.44 0 1 1 0 .881l-79.513.074z"
          transform="translate(-23.178 -60.506)"
          fill="#1a1818"
        />
        <path
          data-name="Path 11685"
          d="M334.1 208.406h-27.65a3.267 3.267 0 0 1-3.272-3.262V199.6a3.267 3.267 0 0 1 3.272-3.262h27.65a3.267 3.267 0 0 1 3.272 3.262v5.543a3.267 3.267 0 0 1-3.272 3.262"
          transform="translate(-213.894 -138.701)"
          fill="#b8b7b7"
        />
        <path
          data-name="Path 11686"
          d="M365.852 62.335h-16.1a3.267 3.267 0 0 1-3.272-3.262V43.025a3.267 3.267 0 0 1 3.272-3.262h16.1a3.267 3.267 0 0 1 3.272 3.262v16.048a3.267 3.267 0 0 1-3.272 3.262"
          transform="translate(-244.446 -28.09)"
          fill="#fff"
        />
        <path
          data-name="Path 11687"
          d="M364.441 61.509h-16.1a3.86 3.86 0 0 1-3.861-3.849V41.612a3.86 3.86 0 0 1 3.861-3.849h16.1a3.86 3.86 0 0 1 3.861 3.849V57.66a3.86 3.86 0 0 1-3.861 3.849m-16.1-22.572a2.682 2.682 0 0 0-2.683 2.675V57.66a2.682 2.682 0 0 0 2.683 2.675h16.1a2.682 2.682 0 0 0 2.683-2.675V41.612a2.682 2.682 0 0 0-2.683-2.675z"
          transform="translate(-243.035 -26.677)"
          fill="#1a1818"
        />
        <path
          data-name="Path 11688"
          d="M430.293 138.932a17.669 17.669 0 1 1-17.669-17.614 17.642 17.642 0 0 1 17.669 17.614"
          transform="translate(-278.644 -85.703)"
          fill="#fff"
        />
        <path
          data-name="Path 11689"
          d="M419.014 151.558V147.6h-3.973a1.131 1.131 0 1 1 0-2.263h3.973v-3.96a1.135 1.135 0 0 1 2.27 0v3.96h3.973a1.131 1.131 0 1 1 0 2.263h-3.973v3.96a1.135 1.135 0 0 1-2.27 0m11.408-15.331a14.485 14.485 0 1 0-2.756 22.636 1.132 1.132 0 1 0-1.176-1.935 12.214 12.214 0 1 1 5.917-10.46 12.143 12.143 0 0 1-2.078 6.782 1.134 1.134 0 0 0 1.887 1.258 14.413 14.413 0 0 0-1.794-18.281"
          transform="translate(-286.17 -93.239)"
          fill="#050605"
        />
        <path
          data-name="Rectangle 7830"
          fill="none"
          d="M0 0h151.648v78.723H0z"
        />
      </g>
    </g>
  </svg>
);

export const SvgDinersClub = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 24.735 21.381"
  >
    <g transform="translate(0 -34.712)">
      <ellipse
        data-name="Ellipse 129"
        cx="10.321"
        cy="10.322"
        rx="10.321"
        ry="10.322"
        transform="translate(.374 35.339)"
        fill="#fff"
      />
      <path
        data-name="Path 12237"
        d="M10.783 56.093A10.712 10.712 0 0 1 0 45.5a10.548 10.548 0 0 1 10.783-10.788h2.772A10.92 10.92 0 0 1 24.735 45.5c0 5.831-5.335 10.6-11.18 10.6zm.024-20.5a9.786 9.786 0 1 0 9.788 9.788 9.788 9.788 0 0 0-9.788-9.781zM8.585 51.172V39.595a6.2 6.2 0 0 0 0 11.577zm8.426-5.788a6.21 6.21 0 0 0-3.984-5.79v11.58a6.21 6.21 0 0 0 3.984-5.79z"
        fill="#004a98"
      />
    </g>
  </svg>
);

export const SvgSpotify = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M325 77C188.1 77 77 188.1 77 325C77 461.9 188.1 573 325 573C461.9 573 573 461.9 573 325C573 188.1 461.9 77 325 77ZM425.7 441.9C421.5 441.9 418.9 440.6 415 438.3C352.6 400.7 280 399.1 208.3 413.8C204.4 414.8 199.3 416.4 196.4 416.4C186.7 416.4 180.6 408.7 180.6 400.6C180.6 390.3 186.7 385.4 194.2 383.8C276.1 365.7 359.8 367.3 431.2 410C437.3 413.9 440.9 417.4 440.9 426.5C440.9 435.6 433.8 441.9 425.7 441.9V441.9ZM452.6 376.3C447.4 376.3 443.9 374 440.3 372.1C377.8 335.1 284.6 320.2 201.7 342.7C196.9 344 194.3 345.3 189.8 345.3C179.1 345.3 170.4 336.6 170.4 325.9C170.4 315.2 175.6 308.1 185.9 305.2C213.7 297.4 242.1 291.6 283.7 291.6C348.6 291.6 411.3 307.7 460.7 337.1C468.8 341.9 472 348.1 472 356.8C471.9 367.6 463.5 376.3 452.6 376.3V376.3ZM483.6 300.1C478.4 300.1 475.2 298.8 470.7 296.2C399.5 253.7 272.2 243.5 189.8 266.5C186.2 267.5 181.7 269.1 176.9 269.1C163.7 269.1 153.6 258.8 153.6 245.5C153.6 231.9 162 224.2 171 221.6C206.2 211.3 245.6 206.4 288.5 206.4C361.5 206.4 438 221.6 493.9 254.2C501.7 258.7 506.8 264.9 506.8 276.8C506.8 290.4 495.8 300.1 483.6 300.1V300.1Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgPaypal = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M244.317 364.6C240.817 383.8 226.917 473.3 222.817 498.6C222.517 500.4 221.817 501.1 219.817 501.1H145.217C137.617 501.1 132.117 494.5 133.117 487.2L191.717 115.3C193.217 105.7 201.817 98.4002 211.717 98.4002C364.017 98.4002 376.817 94.7002 415.717 109.8C475.817 133.1 481.317 189.3 459.717 250.1C438.217 312.7 387.217 339.6 319.617 340.4C276.217 341.1 250.117 333.4 244.317 364.6V364.6ZM490.017 220.7C488.217 219.4 487.517 218.9 487.017 222C485.017 233.4 481.917 244.5 478.217 255.6C438.317 369.4 327.717 359.5 273.717 359.5C267.617 359.5 263.617 362.8 262.817 368.9C240.217 509.3 235.717 538.6 235.717 538.6C234.717 545.7 239.217 551.5 246.317 551.5H309.817C318.417 551.5 325.517 545.2 327.217 536.6C327.917 531.2 326.117 542.7 341.617 445.3C346.217 423.3 355.917 425.6 370.917 425.6C441.917 425.6 497.317 396.8 513.817 313.3C520.317 278.5 518.417 241.9 490.017 220.7V220.7Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgInstagram = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M325.175 210.175C261.575 210.175 210.275 261.475 210.275 325.075C210.275 388.675 261.575 439.975 325.175 439.975C388.775 439.975 440.075 388.675 440.075 325.075C440.075 261.475 388.775 210.175 325.175 210.175ZM325.175 399.775C284.075 399.775 250.475 366.275 250.475 325.075C250.475 283.875 283.975 250.375 325.175 250.375C366.375 250.375 399.875 283.875 399.875 325.075C399.875 366.275 366.275 399.775 325.175 399.775V399.775ZM471.575 205.475C471.575 220.375 459.575 232.275 444.775 232.275C429.875 232.275 417.975 220.275 417.975 205.475C417.975 190.675 429.975 178.675 444.775 178.675C459.575 178.675 471.575 190.675 471.575 205.475ZM547.675 232.675C545.975 196.775 537.775 164.975 511.475 138.775C485.275 112.575 453.475 104.375 417.575 102.575C380.575 100.475 269.675 100.475 232.675 102.575C196.875 104.275 165.075 112.475 138.775 138.675C112.475 164.875 104.375 196.675 102.575 232.575C100.475 269.575 100.475 380.475 102.575 417.475C104.275 453.375 112.475 485.175 138.775 511.375C165.075 537.575 196.775 545.775 232.675 547.575C269.675 549.675 380.575 549.675 417.575 547.575C453.475 545.875 485.275 537.675 511.475 511.375C537.675 485.175 545.875 453.375 547.675 417.475C549.775 380.475 549.775 269.675 547.675 232.675V232.675ZM499.875 457.175C492.075 476.775 476.975 491.875 457.275 499.775C427.775 511.475 357.775 508.775 325.175 508.775C292.575 508.775 222.475 511.375 193.075 499.775C173.475 491.975 158.375 476.875 150.475 457.175C138.775 427.675 141.475 357.675 141.475 325.075C141.475 292.475 138.875 222.375 150.475 192.975C158.275 173.375 173.375 158.275 193.075 150.375C222.575 138.675 292.575 141.375 325.175 141.375C357.775 141.375 427.875 138.775 457.275 150.375C476.875 158.175 491.975 173.275 499.875 192.975C511.575 222.475 508.875 292.475 508.875 325.075C508.875 357.675 511.575 427.775 499.875 457.175Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgFacebookF = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M444.25 357L458.47 264.34H369.56V204.21C369.56 178.86 381.98 154.15 421.8 154.15H462.22V75.26C462.22 75.26 425.54 69 390.47 69C317.25 69 269.39 113.38 269.39 193.72V264.34H188V357H269.39V581H369.56V357H444.25Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgJcb = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 31.388 23.52"
  >
    <defs>
      <linearGradient
        id="m9lkceuzla"
        y1=".5"
        x2="1"
        y2=".5"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#2b327b" />
        <stop offset="1" stop-color="#0078c0" />
      </linearGradient>
      <linearGradient
        id="nkbbikufwb"
        y1=".5"
        x2="1"
        y2=".5"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#872d34" />
        <stop offset="1" stop-color="#ff1146" />
      </linearGradient>
      <linearGradient
        id="yw2ll5vl0c"
        y1=".5"
        x2="1"
        y2=".5"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#008144" />
        <stop offset="1" stop-color="#00bb36" />
      </linearGradient>
    </defs>
    <path
      data-name="Path 12246"
      d="M3.8 64.16a3.937 3.937 0 0 0-3.8 3.8v9.83a10.723 10.723 0 0 0 2.818.84c1.542.109 2.5-.4 2.645-1.685l-.008-4.771h3.41v4.662c-.179 2.67-2.522 3.214-6.088 3.035A16.511 16.511 0 0 1 0 79.429v8.251h5.935a3.933 3.933 0 0 0 3.727-3.814V64.16z"
      transform="translate(0 -64.16)"
      fill="url(#m9lkceuzla)"
    />
    <path
      data-name="Path 12247"
      d="M181.383 64.16a3.937 3.937 0 0 0-3.8 3.8v5.2a8.057 8.057 0 0 1 5.555-1.2 15.6 15.6 0 0 1 2.979.467v1.651a8.735 8.735 0 0 0-2.855-.841c-2.3-.166-3.514.914-3.514 2.659 0 1.571.934 2.915 3.5 2.736a10.34 10.34 0 0 0 2.858-.838l.007 1.6a14.9 14.9 0 0 1-3.636.525 7.85 7.85 0 0 1-4.9-1.25v9.008h5.935a3.933 3.933 0 0 0 3.727-3.814V64.16z"
      transform="translate(-166.692 -64.16)"
      fill="url(#nkbbikufwb)"
    />
    <path
      data-name="Path 12248"
      d="M387.643 263.719c-.65.006-2.068-.007-2.324 0v2.078l2.324.008a1.054 1.054 0 0 0 1.02-1.061 1.02 1.02 0 0 0-1.02-1.025z"
      transform="translate(-361.69 -251.481)"
      fill="url(#yw2ll5vl0c)"
    />
    <path
      data-name="Path 12249"
      d="M388.2 214.586a.94.94 0 0 0-.924-.988c-.67.016-1.877-.017-2.141.007l-.008 1.892 2.2.016a.939.939 0 0 0 .873-.927z"
      transform="translate(-361.512 -204.434)"
      fill="url(#yw2ll5vl0c)"
    />
    <path
      data-name="Path 12250"
      d="M358.137 64.159a3.937 3.937 0 0 0-3.8 3.8v4.181h5.641c1.122 0 2.444.48 2.444 1.845 0 .732-.39 1.561-1.794 1.83v.031a2.083 2.083 0 0 1 2.242 1.928c0 1.495-1.536 1.91-2.359 1.91l-6.176.006v7.989h5.935a3.933 3.933 0 0 0 3.73-3.815V64.159z"
      transform="translate(-332.608 -64.159)"
      fill="url(#yw2ll5vl0c)"
    />
  </svg>
);

export const SvgCamera = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 28 22"
  >
    <path
      data-name="Path 11880"
      d="M28 8.922V8a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v.191l-1.368-.183A1 1 0 0 0 21.5 8a.5.5 0 0 1-.5-.5A2.5 2.5 0 0 0 18.5 5h-5A2.5 2.5 0 0 0 11 7.5a.5.5 0 0 1-.5.5.978.978 0 0 0-.132.009l-5.79.773A2.977 2.977 0 0 0 2 11.725V24.03A2.973 2.973 0 0 0 4.97 27h22.06A2.973 2.973 0 0 0 30 24.03V11.725a2.977 2.977 0 0 0-2-2.8zM15 6h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm-6 8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1zm7 9a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6z"
      fill="currentColor"
      transform="translate(-2 -5)"
    ></path>
    <path
      data-name="Path 11881"
      d="M16 13a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 7a1 1 0 0 1 0-2 1 1 0 0 0 1-1 1 1 0 0 1 2 0 3 3 0 0 1-3 3z"
      fill="currentColor"
      transform="translate(-2 -5)"
    ></path>
  </svg>
);

export const SvgCamera2 = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z"
      fill="currentColor"
    />
  </svg>
);

export const SvgCameraChange = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM384 256c0 8.8-7.2 16-16 16H291.3c-6.2 0-11.3-5.1-11.3-11.3c0-3 1.2-5.9 3.3-8L307 229c-13.6-13.4-31.9-21-51-21c-19.2 0-37.7 7.6-51.3 21.3L185 249c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l19.7-19.7C193.4 172.7 224 160 256 160c31.8 0 62.4 12.6 85 35l23.7-23.7c2.1-2.1 5-3.3 8-3.3c6.2 0 11.3 5.1 11.3 11.3V256zM128 320c0-8.8 7.2-16 16-16h76.7c6.2 0 11.3 5.1 11.3 11.3c0 3-1.2 5.9-3.3 8L205 347c13.6 13.4 31.9 21 51 21c19.2 0 37.7-7.6 51.3-21.3L327 327c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-19.7 19.7C318.6 403.3 288 416 256 416c-31.8 0-62.4-12.6-85-35l-23.7 23.7c-2.1 2.1-5 3.3-8 3.3c-6.2 0-11.3-5.1-11.3-11.3V320z"
      fill="currentColor"
    />
  </svg>
);

export const SvgEdit = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.8086 37.1509H4.95359C3.85442 37.1498 2.80059 36.7126 2.02345 35.9353C1.24632 35.158 0.809388 34.1041 0.808594 33.0049L0.808594 11.1499C0.809653 10.0509 1.2467 8.9972 2.02381 8.22009C2.80091 7.44298 3.8546 7.00594 4.95359 7.00488H17.7656C18.0654 7.00488 18.353 7.12399 18.565 7.336C18.777 7.54801 18.8961 7.83556 18.8961 8.13538C18.8961 8.43521 18.777 8.72276 18.565 8.93477C18.353 9.14678 18.0654 9.26588 17.7656 9.26588H4.95359C4.45417 9.26668 3.97543 9.46542 3.62228 9.81857C3.26913 10.1717 3.07039 10.6505 3.06959 11.1499V33.0049C3.07039 33.5043 3.26913 33.983 3.62228 34.3362C3.97543 34.6893 4.45417 34.8881 4.95359 34.8889H26.8086C27.308 34.8881 27.7868 34.6893 28.1399 34.3362C28.4931 33.983 28.6918 33.5043 28.6926 33.0049V20.1939C28.6926 19.8941 28.8117 19.6065 29.0237 19.3945C29.2357 19.1825 29.5233 19.0634 29.8231 19.0634C30.1229 19.0634 30.4105 19.1825 30.6225 19.3945C30.8345 19.6065 30.9536 19.8941 30.9536 20.1939V33.0059C30.9525 34.1049 30.5155 35.1586 29.7384 35.9357C28.9613 36.7128 27.9076 37.1498 26.8086 37.1509Z"
      fill="currentColor"
      stroke="currentColor"
    ></path>
    <path
      d="M14.0324 25.0588C13.8651 25.0588 13.7 25.0217 13.5489 24.9502C13.3977 24.8786 13.2643 24.7744 13.1583 24.6451C13.0524 24.5157 12.9764 24.3645 12.9359 24.2022C12.8955 24.04 12.8915 23.8708 12.9244 23.7068L13.9904 18.3768C14.034 18.1581 14.1416 17.9573 14.2994 17.7998L29.9104 2.18981C30.2933 1.79674 30.7505 1.48364 31.2554 1.26868C31.7603 1.05372 32.3028 0.941176 32.8516 0.937589C33.4003 0.934001 33.9443 1.03944 34.452 1.24778C34.9597 1.45612 35.4209 1.76322 35.8089 2.15125C36.197 2.53928 36.5041 3.00051 36.7124 3.50818C36.9207 4.01585 37.0262 4.55985 37.0226 5.10859C37.019 5.65734 36.9065 6.19991 36.6915 6.70481C36.4765 7.20971 36.1634 7.66689 35.7704 8.04981L20.1574 23.6618C20 23.8199 19.7991 23.9275 19.5804 23.9708L14.2574 25.0358C14.184 25.051 14.1093 25.0587 14.0344 25.0588H14.0324ZM16.1404 19.1528L15.4754 22.4838L18.8054 21.8178L34.1724 6.45281C34.5258 6.09941 34.7243 5.6201 34.7243 5.12031C34.7243 4.62053 34.5258 4.14122 34.1724 3.78781C33.819 3.43441 33.3396 3.23587 32.8399 3.23587C32.3401 3.23587 31.8608 3.43441 31.5074 3.78781L16.1404 19.1528Z"
      fill="currentColor"
      stroke="currentColor"
    ></path>
    <path
      d="M32.8358 10.5157C32.6871 10.5161 32.5398 10.487 32.4024 10.43C32.2651 10.373 32.1405 10.2893 32.0358 10.1837L27.7728 5.91965C27.5606 5.70748 27.4414 5.41971 27.4414 5.11966C27.4414 4.8196 27.5606 4.53183 27.7728 4.31965C27.985 4.10748 28.2727 3.98828 28.5728 3.98828C28.8728 3.98828 29.1606 4.10748 29.3728 4.31965L33.6348 8.58365C33.7931 8.74183 33.9009 8.9434 33.9445 9.16286C33.9882 9.38232 33.9658 9.60981 33.8802 9.81654C33.7945 10.0233 33.6495 10.1999 33.4634 10.3242C33.2773 10.4485 33.0585 10.5148 32.8348 10.5147L32.8358 10.5157Z"
      fill="currentColor"
      stroke="currentColor"
    ></path>
  </svg>
);

export const SvgPaginationDown = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={`fenext_svg ${className}`}
  >
    <path
      d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z"
      fill="currentColor"
    />
  </svg>
);

export const SvgReddit = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M509.547 272.6C494.547 272.6 481.347 278.8 471.647 288.5C435.947 263.8 387.847 247.9 334.547 246.2L362.247 121.4L450.447 141.2C450.447 162.8 468.047 180.4 489.647 180.4C511.647 180.4 529.347 162.3 529.347 140.7C529.347 119.1 511.747 101 489.647 101C474.247 101 460.947 110.3 454.347 123L356.947 101.4C352.047 100.1 347.247 103.6 345.947 108.5L315.547 246.1C262.647 248.3 215.047 264.2 179.247 288.9C169.547 278.8 155.847 272.6 140.847 272.6C85.2472 272.6 67.0472 347.2 117.947 372.7C116.147 380.6 115.347 389 115.347 397.4C115.347 481.2 209.747 549.1 325.647 549.1C442.047 549.1 536.447 481.2 536.447 397.4C536.447 389 535.547 380.2 533.347 372.3C583.247 346.7 564.847 272.6 509.547 272.6V272.6ZM198.647 378C198.647 356 216.247 338.3 238.347 338.3C259.947 338.3 277.547 355.9 277.547 378C277.547 399.6 259.947 417.2 238.347 417.2C216.347 417.3 198.647 399.6 198.647 378V378ZM412.947 471.5C376.547 507.9 273.847 507.9 237.447 471.5C233.447 468 233.447 461.8 237.447 457.8C240.947 454.3 247.147 454.3 250.647 457.8C278.447 486.3 370.647 486.8 399.647 457.8C403.147 454.3 409.347 454.3 412.847 457.8C416.947 461.8 416.947 468 412.947 471.5ZM412.147 417.3C390.547 417.3 372.947 399.7 372.947 378.1C372.947 356.1 390.547 338.4 412.147 338.4C434.147 338.4 451.847 356 451.847 378.1C451.747 399.6 434.147 417.3 412.147 417.3Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgBusiness = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50.3753 48.9862H48.7683V23.3682C48.7684 23.0519 48.669 22.7436 48.4841 22.487C48.2993 22.2303 48.0383 22.0384 47.7383 21.9382L30.6843 16.2542V11.1112C30.6843 10.8045 30.5906 10.505 30.4159 10.2529C30.2411 10.0007 29.9936 9.80793 29.7063 9.70024L5.59631 0.662239C5.3685 0.576901 5.12343 0.547942 4.88201 0.577835C4.64058 0.607727 4.40997 0.695583 4.20986 0.833905C4.00974 0.972228 3.84606 1.15691 3.73278 1.37219C3.6195 1.58748 3.55998 1.82697 3.55931 2.07024V48.9862H1.95231C1.55263 48.9862 1.16932 49.145 0.886703 49.4276C0.604085 49.7102 0.445313 50.0936 0.445312 50.4932C0.445313 50.8929 0.604085 51.2762 0.886703 51.5588C1.16932 51.8415 1.55263 52.0002 1.95231 52.0002H50.3753C50.775 52.0002 51.1583 51.8415 51.4409 51.5588C51.7235 51.2762 51.8823 50.8929 51.8823 50.4932C51.8823 50.0936 51.7235 49.7102 51.4409 49.4276C51.1583 49.145 50.775 48.9862 50.3753 48.9862ZM15.6153 48.9862H12.6013V42.9622H15.6153V48.9862ZM21.6433 48.9862H18.6293V42.9622H21.6403L21.6433 48.9862ZM27.6703 17.3402V48.9862H24.6573V41.4512C24.6573 41.2533 24.6183 41.0574 24.5426 40.8745C24.4669 40.6917 24.3559 40.5256 24.2159 40.3856C24.076 40.2457 23.9099 40.1347 23.727 40.059C23.5442 39.9832 23.3482 39.9442 23.1503 39.9442H11.0943C10.6946 39.9442 10.3113 40.103 10.0287 40.3856C9.74609 40.6682 9.58731 41.0516 9.58731 41.4512V48.9862H6.57331V4.24424L27.6733 12.1552L27.6703 17.3402ZM39.7263 48.9862H36.7123V42.9622H39.7263V48.9862ZM45.7543 48.9862H42.7403V41.4512C42.7403 41.0516 42.5815 40.6682 42.2989 40.3856C42.0163 40.103 41.633 39.9442 41.2333 39.9442H35.2053C34.8056 39.9442 34.4223 40.103 34.1397 40.3856C33.8571 40.6682 33.6983 41.0516 33.6983 41.4512V48.9862H30.6843V19.4312L45.7533 24.4542L45.7543 48.9862Z"
      fill="currentColor"
    ></path>
    <path
      d="M14.1069 33.9141H11.0929C10.6933 33.9141 10.3099 34.0728 10.0273 34.3554C9.74471 34.6381 9.58594 35.0214 9.58594 35.4211C9.58594 35.8207 9.74471 36.204 10.0273 36.4867C10.3099 36.7693 10.6933 36.9281 11.0929 36.9281H14.1069C14.5066 36.9281 14.8899 36.7693 15.1725 36.4867C15.4552 36.204 15.6139 35.8207 15.6139 35.4211C15.6139 35.0214 15.4552 34.6381 15.1725 34.3554C14.8899 34.0728 14.5066 33.9141 14.1069 33.9141Z"
      fill="currentColor"
    ></path>
    <path
      d="M23.1499 33.9141H20.1359C19.7362 33.9141 19.3529 34.0728 19.0703 34.3554C18.7877 34.6381 18.6289 35.0214 18.6289 35.4211C18.6289 35.8207 18.7877 36.204 19.0703 36.4867C19.3529 36.7693 19.7362 36.9281 20.1359 36.9281H23.1499C23.5496 36.9281 23.9329 36.7693 24.2155 36.4867C24.4981 36.204 24.6569 35.8207 24.6569 35.4211C24.6569 35.0214 24.4981 34.6381 24.2155 34.3554C23.9329 34.0728 23.5496 33.9141 23.1499 33.9141Z"
      fill="currentColor"
    ></path>
    <path
      d="M14.1069 27.8887H11.0929C10.6933 27.8887 10.3099 28.0474 10.0273 28.33C9.74471 28.6127 9.58594 28.996 9.58594 29.3957C9.58594 29.7953 9.74471 30.1787 10.0273 30.4613C10.3099 30.7439 10.6933 30.9027 11.0929 30.9027H14.1069C14.5066 30.9027 14.8899 30.7439 15.1725 30.4613C15.4552 30.1787 15.6139 29.7953 15.6139 29.3957C15.6139 28.996 15.4552 28.6127 15.1725 28.33C14.8899 28.0474 14.5066 27.8887 14.1069 27.8887Z"
      fill="currentColor"
    ></path>
    <path
      d="M23.1499 27.8887H20.1359C19.7362 27.8887 19.3529 28.0474 19.0703 28.33C18.7877 28.6127 18.6289 28.996 18.6289 29.3957C18.6289 29.7953 18.7877 30.1787 19.0703 30.4613C19.3529 30.7439 19.7362 30.9027 20.1359 30.9027H23.1499C23.5496 30.9027 23.9329 30.7439 24.2155 30.4613C24.4981 30.1787 24.6569 29.7953 24.6569 29.3957C24.6569 28.996 24.4981 28.6127 24.2155 28.33C23.9329 28.0474 23.5496 27.8887 23.1499 27.8887Z"
      fill="currentColor"
    ></path>
    <path
      d="M41.2342 33.9141H35.2062C34.8066 33.9141 34.4232 34.0728 34.1406 34.3554C33.858 34.6381 33.6992 35.0214 33.6992 35.4211C33.6992 35.8207 33.858 36.204 34.1406 36.4867C34.4232 36.7693 34.8066 36.9281 35.2062 36.9281H41.2342C41.6339 36.9281 42.0172 36.7693 42.2998 36.4867C42.5825 36.204 42.7412 35.8207 42.7412 35.4211C42.7412 35.0214 42.5825 34.6381 42.2998 34.3554C42.0172 34.0728 41.6339 33.9141 41.2342 33.9141Z"
      fill="currentColor"
    ></path>
    <path
      d="M41.2342 27.8887H35.2062C34.8066 27.8887 34.4232 28.0474 34.1406 28.33C33.858 28.6127 33.6992 28.996 33.6992 29.3957C33.6992 29.7953 33.858 30.1787 34.1406 30.4613C34.4232 30.7439 34.8066 30.9027 35.2062 30.9027H41.2342C41.6339 30.9027 42.0172 30.7439 42.2998 30.4613C42.5825 30.1787 42.7412 29.7953 42.7412 29.3957C42.7412 28.996 42.5825 28.6127 42.2998 28.33C42.0172 28.0474 41.6339 27.8887 41.2342 27.8887Z"
      fill="currentColor"
    ></path>
    <path
      d="M14.1069 21.8613H11.0929C10.6933 21.8613 10.3099 22.0201 10.0273 22.3027C9.74471 22.5853 9.58594 22.9687 9.58594 23.3683C9.58594 23.768 9.74471 24.1513 10.0273 24.4339C10.3099 24.7166 10.6933 24.8753 11.0929 24.8753H14.1069C14.5066 24.8753 14.8899 24.7166 15.1725 24.4339C15.4552 24.1513 15.6139 23.768 15.6139 23.3683C15.6139 22.9687 15.4552 22.5853 15.1725 22.3027C14.8899 22.0201 14.5066 21.8613 14.1069 21.8613Z"
      fill="currentColor"
    ></path>
    <path
      d="M23.1499 21.8613H20.1359C19.7362 21.8613 19.3529 22.0201 19.0703 22.3027C18.7877 22.5853 18.6289 22.9687 18.6289 23.3683C18.6289 23.768 18.7877 24.1513 19.0703 24.4339C19.3529 24.7166 19.7362 24.8753 20.1359 24.8753H23.1499C23.5496 24.8753 23.9329 24.7166 24.2155 24.4339C24.4981 24.1513 24.6569 23.768 24.6569 23.3683C24.6569 22.9687 24.4981 22.5853 24.2155 22.3027C23.9329 22.0201 23.5496 21.8613 23.1499 21.8613Z"
      fill="currentColor"
    ></path>
    <path
      d="M14.1069 15.834H11.0929C10.6933 15.834 10.3099 15.9928 10.0273 16.2754C9.74471 16.558 9.58594 16.9413 9.58594 17.341C9.58594 17.7407 9.74471 18.124 10.0273 18.4066C10.3099 18.6892 10.6933 18.848 11.0929 18.848H14.1069C14.5066 18.848 14.8899 18.6892 15.1725 18.4066C15.4552 18.124 15.6139 17.7407 15.6139 17.341C15.6139 16.9413 15.4552 16.558 15.1725 16.2754C14.8899 15.9928 14.5066 15.834 14.1069 15.834Z"
      fill="currentColor"
    ></path>
    <path
      d="M23.1499 15.834H20.1359C19.7362 15.834 19.3529 15.9928 19.0703 16.2754C18.7877 16.558 18.6289 16.9413 18.6289 17.341C18.6289 17.7407 18.7877 18.124 19.0703 18.4066C19.3529 18.6892 19.7362 18.848 20.1359 18.848H23.1499C23.5496 18.848 23.9329 18.6892 24.2155 18.4066C24.4981 18.124 24.6569 17.7407 24.6569 17.341C24.6569 16.9413 24.4981 16.558 24.2155 16.2754C23.9329 15.9928 23.5496 15.834 23.1499 15.834Z"
      fill="currentColor"
    ></path>
  </svg>
);

export const SvgFacebook = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="facebook-square"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={`fenext_svg ${className}`}
  >
    <path
      fill="currentColor"
      d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
    ></path>
  </svg>
);

export const SvgFacebookBox = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 624 624"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M100 0C44.7715 0 0 44.7715 0 100V524C0 579.228 44.7715 624 100 624H524C579.228 624 624 579.229 624 524V100C624 44.7715 579.229 0 524 0H100ZM445.47 251.34L431.25 344H356.56V568H256.39V344H175V251.34H256.39V180.72C256.39 100.38 304.25 56 377.47 56C412.54 56 449.22 62.26 449.22 62.26V141.15H408.8C368.98 141.15 356.56 165.86 356.56 191.21V251.34H445.47Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgManyvids = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M302.386 587.889L154.861 446.872C130.042 423.215 116 390.03 116 355.34V350.492C116 292.062 157.229 242.242 213.479 232.629C250.707 226.276 288.588 238.731 315.203 265.982L325 276.013L334.797 265.982C361.412 238.731 399.293 226.276 436.521 232.629C492.771 242.242 534 292.062 534 350.492V355.34C534 390.03 519.958 423.215 495.139 446.872L347.614 587.889C341.491 593.74 333.409 597 325 597C316.591 597 308.509 593.74 302.386 587.889ZM292 376C292 357.775 306.775 343 325 343C343.225 343 358 357.775 358 376C358 385.848 353.686 394.689 346.845 400.735L363.877 468.565C365.463 474.879 360.688 481 354.178 481H296.898C290.364 481 285.585 474.837 287.213 468.509L304.381 401.767C296.833 395.719 292 386.424 292 376Z"
      fill="currentColor"
    />
    <path
      d="M333.995 54.0625C338.606 51.2188 341.681 46.0594 341.681 40.25C341.681 31.2719 334.44 24 325.5 24C316.56 24 309.319 31.2719 309.319 40.25C309.319 46.1 312.394 51.2188 317.005 54.0625L293.827 100.619C290.145 108.013 280.599 110.125 274.167 104.966L238.125 76C240.148 73.2781 241.361 69.9062 241.361 66.25C241.361 57.2719 234.12 50 225.181 50C216.241 50 209 57.2719 209 66.25C209 75.2281 216.241 82.5 225.181 82.5C225.261 82.5 225.383 82.5 225.464 82.5L243.95 184.631C246.175 196.981 256.894 206 269.434 206H381.566C394.065 206 404.785 197.022 407.05 184.631L425.536 82.5C425.617 82.5 425.739 82.5 425.819 82.5C434.759 82.5 442 75.2281 442 66.25C442 57.2719 434.759 50 425.819 50C416.88 50 409.639 57.2719 409.639 66.25C409.639 69.9062 410.852 73.2781 412.875 76L376.833 104.966C370.401 110.125 360.855 108.013 357.173 100.619L333.995 54.0625Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgTiktok = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M548.87 278.91C504.845 279.015 461.899 265.285 426.1 239.66V418.38C426.088 451.481 415.971 483.789 397.101 510.985C378.231 538.18 351.508 558.967 320.506 570.565C289.504 582.164 255.699 584.02 223.613 575.888C191.527 567.755 162.688 550.021 140.953 525.055C119.218 500.09 105.622 469.085 101.985 436.184C98.347 403.284 104.84 370.057 120.596 340.947C136.352 311.836 160.62 288.23 190.155 273.284C219.689 258.338 253.083 252.765 285.87 257.31V347.2C270.867 342.481 254.755 342.623 239.838 347.606C224.92 352.59 211.958 362.159 202.803 374.949C193.648 387.738 188.769 403.093 188.861 418.821C188.954 434.549 194.014 449.846 203.319 462.526C212.624 475.207 225.697 484.624 240.673 489.431C255.648 494.238 271.76 494.19 286.707 489.295C301.654 484.399 314.672 474.905 323.901 462.17C333.131 449.434 338.1 434.108 338.1 418.38V69H426.1C426.039 76.4314 426.662 83.8527 427.96 91.17V91.17C431.018 107.505 437.376 123.044 446.646 136.837C455.915 150.631 467.901 162.388 481.87 171.39C501.744 184.531 525.045 191.535 548.87 191.53V278.91Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgVerified = ({ className = "" }: { className?: string }) => (
  <svg
    data-name="Group 16147"
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 15.328 15.328"
  >
    <circle
      data-name="Ellipse 137"
      cx="7.664"
      cy="7.664"
      r="7.664"
      fill="#00ba00"
    />
    <path
      data-name="Path 12351"
      d="m3.44 7.843-2.8-3a1.022 1.022 0 0 1 1.493-1.4l2.16 2.318 3.422-3.2a1.025 1.025 0 0 1 .1-.079L9.421.981a1.022 1.022 0 0 1 1.4 1.493L5.9 7.067v-.006L4.195 8.65l-.755-.808z"
      transform="translate(1.83 3.56)"
      fill="#fff;fillRule:evenodd"
    />
  </svg>
);

export const SvgStart = ({ className = "" }: { className?: string }) => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`fenext_svg ${className}`}
      viewBox="0 0 576 512"
    >
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
        fill="currentColor"
      />
    </svg>
  </>
);

export const SvgLocation = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 14.668 20.65"
  >
    <g data-name="location (1)">
      <path
        data-name="Path 11844"
        d="M82.593 19.887a.59.59 0 0 0 .982 0c1.4-2.1 3.455-4.684 4.889-7.316a11.728 11.728 0 0 0 1.7-5.487 7.084 7.084 0 0 0-14.164 0 11.728 11.728 0 0 0 1.7 5.487c1.437 2.629 3.5 5.229 4.893 7.316zm.491-18.706a5.91 5.91 0 0 1 5.9 5.9 10.624 10.624 0 0 1-1.56 4.923 74.247 74.247 0 0 1-4.343 6.505 74.255 74.255 0 0 1-4.343-6.505 10.624 10.624 0 0 1-1.56-4.923 5.91 5.91 0 0 1 5.9-5.9z"
        transform="translate(-75.75 .25)"
        fill="#464646"
        stroke="#464646"
        strokeWidth="1px"
      ></path>
      <path
        data-name="Path 11845"
        d="M169.542 97.084A3.542 3.542 0 1 0 166 93.542a3.546 3.546 0 0 0 3.542 3.542zm0-5.9a2.361 2.361 0 1 1-2.361 2.361 2.364 2.364 0 0 1 2.361-2.364z"
        transform="translate(-162.208 -86.208)"
        fill="#464646"
        stroke="#464646"
        strokeWidth="1px"
      ></path>
    </g>
  </svg>
);

export const SvgUpload = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"
      fill="currentColor"
    />
  </svg>
);
export const SvgUpload2 = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 76 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M34.5486 11.7934L19.7186 26.6234C19.0708 27.2716 18.1921 27.6359 17.2757 27.6362C16.8219 27.6363 16.3726 27.5471 15.9533 27.3736C15.534 27.2 15.1531 26.9456 14.8321 26.6249C14.5112 26.3041 14.2565 25.9233 14.0828 25.5041C13.909 25.085 13.8195 24.6357 13.8193 24.182C13.8191 23.2656 14.1828 22.3866 14.8306 21.7384L35.5576 1.01139C36.2055 0.363793 37.0841 0 38.0001 0C38.9162 0 39.7947 0.363793 40.4426 1.01139L61.1726 21.7374C61.8204 22.3852 62.1843 23.2638 62.1843 24.1799C62.1843 25.096 61.8204 25.9746 61.1726 26.6224C60.5248 27.2702 59.6462 27.6341 58.7301 27.6341C57.814 27.6341 56.9354 27.2702 56.2876 26.6224L41.4576 11.7924V55.2724C41.4422 56.1784 41.0715 57.0421 40.4253 57.6774C39.7791 58.3126 38.9093 58.6686 38.0031 58.6686C37.097 58.6686 36.2271 58.3126 35.5809 57.6774C34.9348 57.0421 34.564 56.1784 34.5486 55.2724V11.7934ZM70.1034 42.4653C70.7514 41.8173 71.6302 41.4533 72.5465 41.4533C73.4627 41.4536 74.3412 41.8177 74.9889 42.4656C75.6366 43.1135 76.0005 43.9922 76.0005 44.9083V59.4623C75.996 63.8468 74.2523 68.0504 71.152 71.1508C68.0516 74.2511 63.848 75.9948 59.4635 75.9993H16.5375C12.153 75.9948 7.94936 74.2511 4.84905 71.1508C1.74873 68.0504 0.00500036 63.8468 0.000500036 59.4623V44.9083C-0.00730283 44.4497 0.0762842 43.9941 0.246386 43.5682C0.416488 43.1422 0.669699 42.7544 0.991253 42.4273C1.31281 42.1003 1.69626 41.8405 2.11926 41.6632C2.54226 41.4859 2.99634 41.3945 3.455 41.3945C3.91366 41.3945 4.36774 41.4859 4.79074 41.6632C5.21374 41.8405 5.59719 42.1003 5.91875 42.4273C6.2403 42.7544 6.49351 43.1422 6.66361 43.5682C6.83372 43.9941 6.9173 44.4497 6.9095 44.9083V59.4623C6.91215 62.015 7.92737 64.4624 9.7324 66.2674C11.5374 68.0724 13.9848 69.0877 16.5375 69.0903H59.4635C62.0162 69.0877 64.4636 68.0724 66.2686 66.2674C68.0736 64.4624 69.0889 62.015 69.0915 59.4623V44.9083C69.0915 43.992 69.4555 43.1132 70.1034 42.4653Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgArrow = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 452 258"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M225.922 257.565C217.824 257.565 209.727 254.473 203.553 248.302L9.26925 54.0165C-3.08975 41.6575 -3.08975 21.6195 9.26925 9.2655C21.6233 -3.0885 41.6573 -3.0885 54.0173 9.2655L225.922 181.181L397.828 9.2715C410.187 -3.0825 430.219 -3.0825 442.572 9.2715C454.937 21.6255 454.937 41.6635 442.572 54.0225L248.291 248.309C242.114 254.481 234.017 257.565 225.922 257.565Z"
      fill="currentColor"
    ></path>
  </svg>
);

export const SvgArrowSelect = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 36 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.82843 0C1.04662 0 0.154284 2.15428 1.41421 3.41421L16.5858 18.5858C17.3668 19.3668 18.6332 19.3668 19.4142 18.5858L34.5858 3.41421C35.8457 2.15428 34.9534 0 33.1716 0H2.82843Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgPinterest = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M337 75C234.4 75 133 143.4 133 254.1C133 324.5 172.6 364.5 196.6 364.5C206.5 364.5 212.2 336.9 212.2 329.1C212.2 319.8 188.5 300 188.5 261.3C188.5 180.9 249.7 123.9 328.9 123.9C397 123.9 447.4 162.6 447.4 233.7C447.4 286.8 426.1 386.4 357.1 386.4C332.2 386.4 310.9 368.4 310.9 342.6C310.9 304.8 337.3 268.2 337.3 229.2C337.3 163 243.4 175 243.4 255C243.4 271.8 245.5 290.4 253 305.7C239.2 365.1 211 453.6 211 514.8C211 533.7 213.7 552.3 215.5 571.2C218.9 575 217.2 574.6 222.4 572.7C272.8 503.7 271 490.2 293.8 399.9C306.1 423.3 337.9 435.9 363.1 435.9C469.3 435.9 517 332.4 517 239.1C517 139.8 431.2 75 337 75Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgClone = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={`fenext_svg ${className}`}
  >
    <path
      d="M0 448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H224c-53 0-96-43-96-96V160H64c-35.3 0-64 28.7-64 64V448zm224-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z"
      fill="currentColor"
    />
  </svg>
);

export const SvgUnicornWithMoney = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 158.872 158.016"
  >
    <g data-name="unicorn (1)">
      <g data-name="Group 16050" transform="translate(1.867 3.108)">
        <path
          data-name="Path 12318"
          d="M37.747 86.212 26.346 69.95a2.831 2.831 0 0 1 .693-3.944L58.527 43.93a2.831 2.831 0 0 1 3.944.693l11.4 16.262a2.831 2.831 0 0 1-.693 3.944L41.691 86.9a2.831 2.831 0 0 1-3.944-.688z"
          transform="translate(-19.684 -33.481)"
          fill="#a1e8c3"
        />
        <circle
          data-name="Ellipse 133"
          cx="11.014"
          cy="11.014"
          r="11.014"
          transform="rotate(-40.906 48.693 -3.678)"
          fill="#ccf3e2"
        />
        <path
          data-name="Path 12319"
          d="m343.584 31.109 8.266-18.058a2.831 2.831 0 0 1 3.753-1.4l34.966 16.009a2.831 2.831 0 0 1 1.4 3.753L383.7 49.471a2.831 2.831 0 0 1-3.753 1.4L344.98 34.862a2.831 2.831 0 0 1-1.4-3.753z"
          transform="translate(-238.661 -11.397)"
          fill="#a1e8c3"
        />
        <circle
          data-name="Ellipse 134"
          cx="11.014"
          cy="11.014"
          r="11.014"
          transform="rotate(-37.363 82.297 -158.79)"
          fill="#ccf3e2"
        />
        <path
          data-name="Path 12320"
          d="M81.814 436.86c7.864 5.2 25.869 5.739 30-.748-1.124-.5 2.831-12.513 2.206-13.417-1.038-1.5-15.145 4.36-19.849 2.389-2.364-.99-14.486-11.464-20.324-6.79s.102 13.369 7.967 18.566z"
          transform="translate(-51.179 -291.212)"
          fill="#fff"
        />
        <path
          data-name="Path 12321"
          d="M76.662 432.606c-4.869-4.9-7.262-10.8-2.814-14.358 4.833-3.87 9.464 2.482 12.256 5.345-3.139 3.015-6.176 6.141-9.442 9.013z"
          transform="translate(-51.18 -291.165)"
          fill="#a1e8c3"
        />
        <path
          data-name="Path 12322"
          d="M347.048 240.28s10.465-4.91 11.731-13.861-5.814-13.833-5.814-13.833 14.329-4.587 12.87-24.451S351.1 165.06 351.1 165.06s5.42-26.441-20.871-15.559c0 0 6.619-35.618-18.668-24.006l-6.824 63.705z"
          transform="translate(-212.045 -88.485)"
          fill="#ccf3e2"
        />
        <path
          data-name="Path 12323"
          d="M377.462 328.753s15.449-4.451 14.188-25.25c-.227-3.741-3.108-9.077-4.014-11.788 1.07 29.694-20.637 40-39.584 21.164-1.017-1.011-5.708 8.882-7.059 8.479l29.693 36.2s11.307-4.882 12.8-14.208-6.027-14.6-6.027-14.6z"
          transform="translate(-237.051 -204.733)"
          fill="#b1b6e1"
        />
        <path
          data-name="Path 12324"
          d="M224.95 226.992c-4.326-11.648-11.153-20.752-19.064-26.712v.068c3.205-4.542 5.7-9.712 8.032-17.953l4.933-16.311a29.336 29.336 0 0 0-.359-17.208 15.781 15.781 0 0 0 5.053-4.811c4.636-6.68 2.891-18.312.811-19.755s-13.587.992-18.223 7.672c-.183.264-.354.527-.519.791a29.507 29.507 0 0 0-7.115-3.062l-17.5-4.944a26.048 26.048 0 0 0-3.85-.782 16.552 16.552 0 0 0-.087-5.548c-1.38-7.927-10.7-14.9-13.165-14.475s-8.878 10.145-7.5 18.073a15.588 15.588 0 0 0 2.56 6.461 34.535 34.535 0 0 0-9.051 8.453 97.839 97.839 0 0 0-8.418 15.333c-8.653 4.5-13.315 12.695-12.742 21.126a25.979 25.979 0 0 0 8.686 17.562c4.455 4.143 12.638 7.489 17.382 8.394l.728.351c-2.776 9.216-4.552 21.1-4.539 27.279"
          transform="translate(-90.629 -75.226)"
          fill="#fff"
        />
        <path
          data-name="Path 12325"
          d="M297.977 98.846a2.869 2.869 0 0 0 .06-.395c1.265-4.957 1.023-9.642-1.42-13.931 1.529-5.514 1.328-10.215-1.4-13.771a119.754 119.754 0 0 0-2.2-21.616 1.048 1.048 0 0 0-2.059-.15c-2.206 5.961-3.895 11.605-4.128 16.359a12.983 12.983 0 0 0-2.793 11.067 16.484 16.484 0 0 0-2.919 11.568c-2.907 3.316-2.609 7.215-2.617 9.018.327 6.155 18.246 7.549 19.476 1.851z"
          transform="translate(-193.942 -36.774)"
          fill="#f6e06e"
        />
        <path
          data-name="Path 12326"
          d="M297.977 188.1a2.869 2.869 0 0 0 .06-.395 19.619 19.619 0 0 0 .161-10.1 20.372 20.372 0 0 1-.52 2.877 2.377 2.377 0 0 1-.05.337c-1.038 4.865-16.784 3.541-17.122-1.727 0-.3-.013-.663-.013-1.077-2.243 3.128-1.992 6.574-2 8.237.334 6.154 18.254 7.548 19.484 1.848z"
          transform="translate(-193.942 -126.03)"
          fill="#dda86a"
        />
        <path
          data-name="Path 12327"
          d="M193.442 158.976a20.38 20.38 0 0 0 11.4-7.634 13.779 13.779 0 1 1 19.812 18.895 17.921 17.921 0 0 1-17.229 3.15c-3.147-1.035-9.9-5.143-14.987-8.393a3.316 3.316 0 0 1 1.004-6.018z"
          transform="translate(-133.536 -104.151)"
          fill="#ccf3e2"
        />
        <path
          data-name="Path 12328"
          d="M225.727 150.053a13.783 13.783 0 0 0-20.882 1.29 20.383 20.383 0 0 1-11.4 7.634 3.316 3.316 0 0 0-1 6.018c5.088 3.249 11.84 7.357 14.987 8.393a17.921 17.921 0 0 0 17.229-3.15 13.78 13.78 0 0 0 1.066-20.185zm-3.078 12.723a12.851 12.851 0 0 1-11.856 4.532c-2.408-.324-7.855-2.37-11.984-4.022a2.411 2.411 0 0 1-.187-4.438 14.357 14.357 0 0 0 7.014-6.969 9.743 9.743 0 0 1 1.675-2.446 10.183 10.183 0 0 1 15.338 13.342z"
          transform="translate(-133.535 -104.151)"
          fill="#b1b6e1"
        />
        <path
          data-name="Path 12329"
          d="M254.519 244.684c3.19-4.531 5.681-9.693 8-17.907l4.934-16.311a29.334 29.334 0 0 0-.36-17.208 15.777 15.777 0 0 0 5.053-4.81c4.636-6.68 2.892-18.312.811-19.755-.959-.666-3.926-.5-7.3.517 1.356 2.275 1.139 12.7-3.423 18.578a16.023 16.023 0 0 1-4.913 4.365 31.861 31.861 0 0 1-1.884 16.486l-6.275 15.377a72.825 72.825 0 0 1-5.94 12.276 7.594 7.594 0 0 0 .318 8.553 49.342 49.342 0 0 1 6.482 12.134 7.171 7.171 0 0 1-7.1 9.686l-42.948-.957a40.679 40.679 0 0 0-.37 5.669h73.95c-4.32-11.634-11.136-20.729-19.035-26.69z"
          transform="translate(-139.535 -119.608)"
          fill="#e1bdfc"
        />
        <path
          data-name="Path 12330"
          d="m37.4 274.374-6.52-.674a2.835 2.835 0 0 0-2.455-1.084l-4.6.354-6.16-.636a2.837 2.837 0 0 0-2.7 1.318l-6.327.487a2.839 2.839 0 0 0-2.613 3.049l2.951 38.326a2.839 2.839 0 0 0 3.049 2.613l11.217-.863 9.624.994a2.839 2.839 0 0 0 3.116-2.533l3.95-38.236a2.839 2.839 0 0 0-2.532-3.116z"
          transform="translate(-6.018 -191.356)"
          fill="#a1e8c3"
        />
        <g data-name="Group 16049">
          <path
            data-name="Path 12331"
            d="M240.626 420.192a25.372 25.372 0 0 0-3.711-1.048l.131-.787a1.868 1.868 0 0 0-1.827-2.066 2.205 2.205 0 0 0-2.446 1.654l-.153.918c-.075.011-.148.016-.225.029-2.468.392-4.437 1.366-5.37 4.138a5.582 5.582 0 0 0 .757 5.271 6.869 6.869 0 0 0 2.2 1.96l-.765 4.389a5.563 5.563 0 0 1-1.988-.5c-.973-.532-2.663-1.455-3.935.25s.216 3.731 1.11 4.389a10.411 10.411 0 0 0 4.596 1.834l-.148.89a1.868 1.868 0 0 0 1.827 2.066 2.5 2.5 0 0 0 .525 0 2.129 2.129 0 0 0 1.92-1.649l.179-1.074c3.335-.46 5.7-1.495 6.648-5.005a5.978 5.978 0 0 0-3.67-7.478c-.277-.118-.285-.257-.568-.382l.482-2.9a11.578 11.578 0 0 1 1.119.313c.659.221 3.762 2.1 5.227-.524 1.506-2.697-.829-4.144-1.915-4.688z"
            transform="translate(-155.541 -290.646)"
            fill="#f6e06e"
          />
          <path
            data-name="Path 12332"
            d="M298.133 440.2h-4.664a3.153 3.153 0 0 1-3.153-3.153v-.147a3.153 3.153 0 0 1 3.153-3.153h4.664a3.153 3.153 0 0 1 3.153 3.153v.147a3.153 3.153 0 0 1-3.153 3.153z"
            transform="translate(-202.099 -302.693)"
            fill="#f6e06e"
          />
          <path
            data-name="Path 12333"
            d="m337.252 429.634-4.361 1.657a3.153 3.153 0 0 1-4.067-1.828l-.052-.137a3.153 3.153 0 0 1 1.828-4.067l4.359-1.656a3.154 3.154 0 0 1 4.068 1.827l.052.137a3.152 3.152 0 0 1-1.827 4.067z"
            transform="translate(-228.48 -295.553)"
            fill="#f6e06e"
          />
          <path
            data-name="Path 12334"
            d="m373.323 413.412-4.111 2.2a3.153 3.153 0 0 1-4.268-1.291l-.069-.129a3.153 3.153 0 0 1 1.291-4.268l4.111-2.2a3.153 3.153 0 0 1 4.268 1.291l.069.129a3.153 3.153 0 0 1-1.291 4.268z"
            transform="translate(-253.264 -284.486)"
            fill="#f6e06e"
          />
          <path
            data-name="Path 12335"
            d="m203.62 425.606-4.156-2.115a3.153 3.153 0 0 1-1.38-4.24l.067-.131a3.153 3.153 0 0 1 4.24-1.38l4.156 2.115a3.153 3.153 0 0 1 1.38 4.24l-.067.131a3.153 3.153 0 0 1-4.24 1.38z"
            transform="translate(-138.249 -291.415)"
            fill="#f6e06e"
          />
        </g>
        <circle
          data-name="Ellipse 135"
          cx="11.014"
          cy="11.014"
          r="11.014"
          transform="rotate(-76.7 74.095 52.75)"
          fill="#ccf3e2"
        />
      </g>
      <g data-name="Group 16052">
        <g data-name="Group 16051">
          <path
            data-name="Path 12336"
            d="M28.291 81.087a5.914 5.914 0 0 0 3.843 2.446 6.017 6.017 0 0 0 1.042.091 5.907 5.907 0 0 0 3.4-1.08l31.478-22.067a5.958 5.958 0 0 0 1.457-8.289L58.118 35.939a5.958 5.958 0 0 0-8.289-1.456L18.355 56.55a5.959 5.959 0 0 0-1.455 8.289zm24.888-41.352 11.079 15.8-9.207 6.455a12.859 12.859 0 0 0-10.713-16.056zM36.613 51.778a9.147 9.147 0 1 1-.917 12.9 9.107 9.107 0 0 1 .917-12.9zm-6.6 4.2a13.072 13.072 0 0 0-.256 1.8 12.875 12.875 0 0 0 11.711 13.738l-8.238 5.776-11.08-15.803z"
            transform="translate(-10.913 -23.469)"
            fill="#3c122c"
          />
          <path
            data-name="Path 12337"
            d="M226.332 314.093a1.868 1.868 0 0 0-2.332 1.236 3.288 3.288 0 0 1-1.463 1.893 2.438 2.438 0 0 1-3.537-1.085 3.286 3.286 0 0 1-.146-2.388 1.867 1.867 0 0 0-3.569-1.1 7.013 7.013 0 0 0 .346 5.094 6.2 6.2 0 0 0 3.79 3.314 6.118 6.118 0 0 0 1.8.272 6.32 6.32 0 0 0 3.2-.885 7.012 7.012 0 0 0 3.148-4.02 1.867 1.867 0 0 0-1.237-2.331z"
            transform="translate(-148.262 -215.155)"
            fill="#3c122c"
          />
          <path
            data-name="Path 12338"
            d="M201.125 232.237a1.867 1.867 0 1 0 1.476 3.43 1.783 1.783 0 0 1 2.182.684 1.867 1.867 0 1 0 3.176-1.964 5.517 5.517 0 0 0-6.834-2.15z"
            transform="translate(-137.938 -160.299)"
            fill="#3c122c"
          />
          <path
            data-name="Path 12339"
            d="M307.457 265.659a1.867 1.867 0 1 0 1.475 3.43 1.782 1.782 0 0 1 2.182.684 1.867 1.867 0 1 0 3.176-1.964 5.517 5.517 0 0 0-6.833-2.15z"
            transform="translate(-211.275 -183.35)"
            fill="#3c122c"
          />
          <path
            data-name="Path 12340"
            d="M248.795 437.782a1.727 1.727 0 0 0-.9 3.325c.855.232 1.756-3.093.9-3.325z"
            transform="translate(-170.169 -302.332)"
            fill="#3c122c"
          />
          <path
            data-name="Path 12341"
            d="M258.46 472.1a1.986 1.986 0 0 0 .611-3.915c-1.009-.16-1.62 3.755-.611 3.915z"
            transform="translate(-177.904 -323.332)"
            fill="#3c122c"
          />
          <path
            data-name="Path 12342"
            d="M152.04 125.94c3.527-3.766 7.557-10.644 6.72-22.03-1.206-16.421-9.885-22.681-14.405-24.847.386-3.8.406-10.693-3.572-15.214a29.85 29.85 0 0 0 .031-2.456c-.057-1.913-.474-8.313-3.449-10.378s-9.117-.216-10.929.4c-.742.252-1.644.6-2.626 1.036-.456-5.295-2-10.81-6.012-13.935-3.028-2.36-6.905-3.015-11.565-1.98q-.057-3.038-.333-6.329a6.008 6.008 0 0 0 1 .579l34.952 16a5.953 5.953 0 0 0 7.888-2.934L158 25.806a5.95 5.95 0 0 0-2.934-7.888l-34.953-16a5.959 5.959 0 0 0-7.888 2.934L104.8 21.073q-.351-2.288-.788-4.7a4.16 4.16 0 0 0-8.093-.648c-2.542 6.883-3.86 11.942-4.212 16.2a16.038 16.038 0 0 0-3.1 8.408 28.46 28.46 0 0 0-4.336-5.255c-1.372-1.31-6.127-5.533-9.673-4.918s-6.592 6.2-7.441 7.9c-1.382 2.761-3.555 8.221-2.588 13.774a20.956 20.956 0 0 0 1.1 3.975 17.487 17.487 0 0 1-4.336 1.691 5.2 5.2 0 0 0-3.258 7.663 87.8 87.8 0 0 0-5.942 10.322 1.864 1.864 0 0 0-1.69 1.152l-.157-.054a15.5 15.5 0 0 0-.734 3.179 26.613 26.613 0 0 0-10.767 12.077l.093-.9a5.958 5.958 0 0 0-5.308-6.531l-19.739-2.036A5.955 5.955 0 0 0 8.2 85.114l-3.851.3a4.707 4.707 0 0 0-4.335 5.051l2.951 38.326a4.707 4.707 0 0 0 4.685 4.345q.183 0 .369-.014l4.109-.316 7.75.8a8.542 8.542 0 0 0-.1 2.508c.755 7.309 9.979 15.676 16.347 18.9a27.14 27.14 0 0 0 12.309 2.828 31.905 31.905 0 0 0 10.7-1.873v.286a3.112 3.112 0 0 0 3.111 3.105h.007a3.112 3.112 0 0 0 3.105-3.118 92.294 92.294 0 0 1 1.813-15.6 4.949 4.949 0 0 0 1.5.239 5 5 0 0 0 2.6-.725 6.829 6.829 0 0 0 1.4 3.151 9.488 9.488 0 0 0 1.611 1.666l-.2 1.167c-2.523-1.246-4.518-.919-5.933.977a4.253 4.253 0 0 0-.809 3.234 6.15 6.15 0 0 0 2.309 3.775 11.189 11.189 0 0 0 3.672 1.782 3.507 3.507 0 0 0 .725 1.856 4.009 4.009 0 0 0 2.8 1.508q.207.02.415.02a4.365 4.365 0 0 0 .5-.029 4.02 4.02 0 0 0 3.5-2.958c2.894-.6 5.717-1.994 6.836-6.137a7.788 7.788 0 0 0-2.474-8.318 4.6 4.6 0 0 0 3.293-.5 5.028 5.028 0 0 0 4.346 2.51h4.646a5.027 5.027 0 0 0 4.344-2.506 5.067 5.067 0 0 0 .868.5 5 5 0 0 0 3.847.114l4.343-1.65a5 5 0 0 0 2.8-2.64c.044-.1.079-.2.117-.3a4.912 4.912 0 0 0 2.125.476 5 5 0 0 0 2.368-.6l1.548-.829a58.265 58.265 0 0 1 13.018 20.91 3.112 3.112 0 0 0 2.917 2.029c.071 0 .142 0 .214-.009a3.052 3.052 0 0 0 1.789-.258c.489-.23 12.005-5.745 13.491-16.242a17.332 17.332 0 0 0-3.691-13.477 23.267 23.267 0 0 0 4.05-3.442zm-9.632-106.97 9.818 4.494-8.032 17.549-10.218-4.677a13.013 13.013 0 0 0 2.26-.863 12.864 12.864 0 0 0 6.172-16.5zm-8.948-3.71a9.147 9.147 0 1 1-5.86 17.329 9.147 9.147 0 1 1 5.86-17.329zm-15.69-7.568 8.739 4a12.857 12.857 0 0 0-7.615 17.739l-9.156-4.191zM106.781 51.82a22.269 22.269 0 0 0 1.245-9.313c2.536-.488 4.527-.186 5.944.917 2.93 2.28 3.735 7.8 3.74 12.851a18.4 18.4 0 0 0-1.761 1.743 32.775 32.775 0 0 0-5.368-2.039l-2.769-.782a18.062 18.062 0 0 0-1.177-3 3.215 3.215 0 0 0 .147-.373zm-8.947-18.388c.007-.06.014-.12.018-.181v-.042a36.384 36.384 0 0 1 1.322-7.438c.413 3.264.671 6.308.783 9.175l-2.129-1.494v-.02zm-1.822 3.3 4.3 3.015c.019.042.039.084.06.125s.051.1.078.143.047.082.073.122.064.095.1.141c.018.025.034.052.053.077 1.42 1.849 1.625 4.232.634 8.006l-6.242-4.352a3.088 3.088 0 0 0-.053-.488 9.593 9.593 0 0 1 1-6.789zm5.853 16.571a3.067 3.067 0 0 0 .34.237l1.024.714a1.864 1.864 0 0 0 .339.183A15.675 15.675 0 0 1 104.6 63.5l-4.8-3.093a15.593 15.593 0 0 0-5.722-12.527zM103.3 67.1a11.183 11.183 0 0 1-5.876 1.189 15.75 15.75 0 0 0 1.74-3.855zM75.693 36.458c1.83.755 5.835 3.966 8.071 7.9a15.531 15.531 0 0 0-8.738 2.929 15.739 15.739 0 0 0-3.339 3.262c-.264.349-.542.686-.826 1.014-.06-.263-.115-.53-.163-.8-.967-5.552 3.067-12.558 4.995-14.305zM61.126 62.3a1.4 1.4 0 0 1 1.087-1.168 22.348 22.348 0 0 0 12.453-8.322 11.916 11.916 0 0 1 18.051-1.118 11.822 11.822 0 0 1 3.349 8.941 11.953 11.953 0 0 1-4.271 8.511 16.112 16.112 0 0 1-15.451 2.812c-2.309-.759-7.481-3.669-14.565-8.193a1.426 1.426 0 0 1-.651-1.462zm-26.2 66.882 2.374-22.975a29.2 29.2 0 0 0 9.248 16.3c3.761 3.5 9.519 6.266 14.206 7.869a5.066 5.066 0 0 0-.655.977l-.058.113a5.074 5.074 0 0 0-.365.936c-3.024 1.652-8.32 3.723-12.705 2.9-2.175-.409-4.906-2.03-7.548-3.6-1.42-.843-2.935-1.741-4.5-2.511v-.015zM13.462 88.591l19.2 1.983-1.162 11.185a12.859 12.859 0 0 0-19.151-2.428zm7.392 11.258A9.147 9.147 0 1 1 11.707 109a9.158 9.158 0 0 1 9.147-9.151zM3.968 89.471a.964.964 0 0 1 .664-.337l2.537-.2L5.148 108.5 3.737 90.178a.964.964 0 0 1 .231-.707zm5.6 36.813.988-9.56a12.859 12.859 0 0 0 19.244 1.527l-1.035 10.017zm16.4 9.191a1.565 1.565 0 0 1 .247-1.215l2.181.226a6.094 6.094 0 0 0 .623.032 5.9 5.9 0 0 0 1.921-.322 42.761 42.761 0 0 1 4.613 2.449l-5.053 6.344c-2.525-2.678-4.32-5.488-4.529-7.514zM59.6 149.038c-5.787 2.906-14.015 3.8-20.665.431a29.9 29.9 0 0 1-5.725-3.9l5.6-7.022a23.75 23.75 0 0 0 7.011 2.869c5.358 1.006 11.231-.782 15.411-2.823a129.926 129.926 0 0 0-1.628 10.442zm10.274-12.711-.06.117a1.295 1.295 0 0 1-1.741.567l-4.137-2.111a1.295 1.295 0 0 1-.566-1.743l.058-.113a1.286 1.286 0 0 1 .753-.644 1.287 1.287 0 0 1 .988.077l4.141 2.107a1.3 1.3 0 0 1 .568 1.74zm17.361 1.481c-.2.352-.442.791-2.463-.112-.206-.092-.369-.165-.541-.223a10.743 10.743 0 0 0-1.034-.3l-.2-.05a1.867 1.867 0 0 0-2.32 1.5l-.482 2.9a1.867 1.867 0 0 0 .937 1.939 2.713 2.713 0 0 0 .741.466 4.111 4.111 0 0 1 2.6 5.273c-.624 2.31-1.863 3.2-5.1 3.642a1.867 1.867 0 0 0-1.587 1.543l-.173 1.043a.49.49 0 0 1-.3.131.658.658 0 0 1-.133 0 .472.472 0 0 1-.142-.034l.126-.757a1.867 1.867 0 0 0-1.492-2.14 8.506 8.506 0 0 1-3.836-1.506 2.482 2.482 0 0 1-.828-1.318.535.535 0 0 1 .109-.451c.2-.27.3-.4 1.542.272a7.432 7.432 0 0 0 2.717.724 1.867 1.867 0 0 0 2.006-1.538l.765-4.389a1.867 1.867 0 0 0-.923-1.948 5.041 5.041 0 0 1-1.667-1.5 3.807 3.807 0 0 1-.441-3.5c.588-1.748 1.643-2.531 3.891-2.889l.049-.006.145-.018a1.867 1.867 0 0 0 1.581-1.542l.148-.887a.54.54 0 0 1 .429-.132.477.477 0 0 1 .142.034l-.109.653a1.867 1.867 0 0 0 1.442 2.13 27.318 27.318 0 0 1 3.284.9 2.6 2.6 0 0 1 1.342 1.159 1.284 1.284 0 0 1-.227.941zm11.948 1.025a1.3 1.3 0 0 1-1.3 1.295h-4.637a1.3 1.3 0 0 1-1.295-1.295v-.133a1.3 1.3 0 0 1 1.295-1.295h4.646a1.3 1.3 0 0 1 1.3 1.295zm11.5-2.686a1.286 1.286 0 0 1-.721.68l-4.343 1.65a1.3 1.3 0 0 1-1.671-.751l-.046-.12a1.3 1.3 0 0 1 .751-1.671l4.343-1.65a1.3 1.3 0 0 1 1.671.752l.046.12a1.288 1.288 0 0 1-.024.99zm10.976-5.142a1.285 1.285 0 0 1-.628.767l-4.1 2.193a1.3 1.3 0 0 1-1.752-.529l-.061-.115a1.295 1.295 0 0 1 .53-1.753l4.1-2.194a1.295 1.295 0 0 1 1.753.531l.061.113a1.287 1.287 0 0 1 .1.986zm.494-20.194c-2 7.1-4.2 12.091-7.285 16.58a3.116 3.116 0 0 0-.445.6l-.535.286a4.988 4.988 0 0 0-2.325 2.655c-.016-.007-.031-.017-.047-.024a5 5 0 0 0-3.847-.114l-4.343 1.65a4.991 4.991 0 0 0-2.548 2.152 5 5 0 0 0-2.893-.922h-4.64a5 5 0 0 0-2.814.863 6.766 6.766 0 0 0-2.643-2.173 16.278 16.278 0 0 0-2.547-.817 3.512 3.512 0 0 0-.715-1.763 4.009 4.009 0 0 0-2.8-1.509 4.084 4.084 0 0 0-4.381 2.829 7.871 7.871 0 0 0-4.154 2.341A4.994 4.994 0 0 0 71 131.26l-1.437-.731c.064-.218.125-.44.191-.655a3.112 3.112 0 0 0-1.628-3.7l-.728-.351a3.12 3.12 0 0 0-.768-.254c-4.039-.77-11.793-3.846-15.846-7.616a22.841 22.841 0 0 1-7.7-15.493 18.5 18.5 0 0 1 7.274-15.684 13.488 13.488 0 0 0 8.214 8.164c6.625 2.29 13.9-1.039 17.094-7.508l3.523 1.215c-1.347 7.109 3.189 14.521 10.868 17.175 8.367 2.892 17.291-.96 19.933-8.6l-.173-.06a1.865 1.865 0 0 0-1.176-2.3L58.126 77.431a80.055 80.055 0 0 1 4.9-8.476c5.8 3.6 9.886 5.8 12.155 6.544a20.587 20.587 0 0 0 6.438 1.041 19.564 19.564 0 0 0 12.569-4.531c.083-.07.163-.144.245-.215.474.066.947.124 1.411.16.606.048 1.229.074 1.859.074 4.414 0 9.108-1.268 10-4.954l.014-.055a1.56 1.56 0 0 0 .016-.065v-.031l.016-.095c.022-.115.045-.231.057-.34a25.175 25.175 0 0 0 .724-4.624l.359.1a26.442 26.442 0 0 1 6.366 2.74 3.111 3.111 0 0 0 4.232-1.019c.165-.264.3-.476.439-.669 3.268-4.709 11.2-6.877 13.8-6.753 1.034 2.405 1.769 10.58-1.5 15.288a12.7 12.7 0 0 1-4.039 3.882 3.112 3.112 0 0 0-1.413 3.676 26.219 26.219 0 0 1 .328 15.362l-4.925 16.283a.501.501 0 0 0-.017.055zm19.68 14.814a3.1 3.1 0 0 0-.836 5.513 11.732 11.732 0 0 1 4.518 10.848c-.679 4.8-4.907 8.311-7.638 10.114a63.636 63.636 0 0 0-12.78-19.629 4 4 0 0 0 .137-.385 5 5 0 0 0-.381-3.831l-.061-.113a4.989 4.989 0 0 0-1.913-1.969 67.652 67.652 0 0 0 5.255-13.642l4.925-16.284a.882.882 0 0 0 .016-.055 32.429 32.429 0 0 0 .26-16.758 20.2 20.2 0 0 0 4-4.333c.308-.444.582-.9.84-1.366a24.664 24.664 0 0 1-.3 6.7 3.032 3.032 0 0 0 2.287 3.642c.454.119 11.133 3.123 12.393 20.286 1.245 17.026-10.249 21.105-10.716 21.263z"
            transform="translate(0 -1.381)"
            fill="#3c122c"
          />
        </g>
        <path
          data-name="Path 12343"
          d="M245.291 168.375a3.112 3.112 0 0 1-2.291-5.22 13.035 13.035 0 0 1 9.259-4.5 3.124 3.124 0 1 1-.084 6.223h.059a7.119 7.119 0 0 0-4.655 2.493 3.1 3.1 0 0 1-2.29 1z"
          transform="translate(-167.033 -109.853)"
          fill="#fff"
        />
      </g>
    </g>
  </svg>
);

export const SvgReload = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      d="M447.5 224H456c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L397.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L311 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H447.5z"
      fill="currentColor"
    />
  </svg>
);

export const SvgAdd = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
      fill="currentColor"
    />
  </svg>
);

export const SvgListCheck = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 17.465 17.465"
  >
    <g data-name="Group 15853">
      <g data-name="Group 15846">
        <g data-name="Group 15844">
          <path
            data-name="Path 12158"
            d="M8.732 0a8.732 8.732 0 1 0 8.732 8.732A8.742 8.742 0 0 0 8.732 0zm0 0"
            fill="#04506c"
          />
        </g>
        <path
          data-name="Path 12159"
          d="m149.666 166.57-4.73 4.73a.727.727 0 0 1-1.029 0l-2.365-2.365a.728.728 0 1 1 1.029-1.029l1.851 1.851 4.216-4.216a.728.728 0 0 1 1.029 1.029zm0 0"
          transform="translate(-136.507 -159.688)"
          fill="#fafafa"
        />
      </g>
    </g>
  </svg>
);

export const SvgCardVisaElectron = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    className={`fenext_svg fenext_svg_card_visa_electron ${className}`}
    viewBox="0 0 10000 5000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="10000"
      height="5000"
      rx="940"
      fill="var(--fenext-svg-bg,#FFF)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3361.64 2896.68C4121.34 2571.02 5187.47 2275.92 6599.23 2571.44L6614.07 2213.39C5124.47 2050.71 4055.63 2525.13 3361.64 2861.32V2896.68Z"
      fill="var(--fenext-svg-color-1,#E7A83A)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1990 3159.93H2705.98V3375.65H2261.11L2258.14 3574.83H2701.46V3781.56H2256.64L2258.23 3980.74H2696.99V4196.42H1990.25L1990 3159.93ZM2885.8 3072.99H3146.42L3147.33 4196.42H2886.72L2885.8 3072.99ZM4042.97 4111.02C3954.6 4185.89 3819.8 4223.38 3699.92 4223.38C3425.84 4223.38 3301.49 4028.68 3301.49 3835.44C3301.49 3607.76 3472.24 3414.61 3707.4 3414.61C3994.98 3414.61 4084.85 3618.3 4084.85 3877.41H3562.15C3562.15 3935.85 3599.6 4034.66 3743.39 4034.66C3834.76 4034.66 3885.67 4007.7 3956.11 3959.8L4042.97 4111.02ZM3851.23 3724.63C3851.23 3646.76 3813.78 3576.29 3726.92 3576.29C3644.54 3576.29 3581.63 3649.69 3565.16 3724.63H3851.23ZM4875.81 4145.51C4803.92 4190.4 4685.59 4223.38 4598.68 4223.38C4359.05 4223.38 4186.8 4085.57 4186.8 3836.99C4186.8 3582.35 4357.55 3414.61 4615.2 3414.61C4705.06 3414.61 4812.91 3443.03 4871.3 3480.49L4787.45 3651.19C4748.49 3634.77 4706.53 3621.22 4664.6 3621.22C4534.31 3621.22 4447.41 3699.18 4447.41 3823.45C4447.41 3931.37 4531.3 4016.68 4642.16 4016.68C4691.56 4016.68 4741.01 3994.24 4782.93 3973.26L4875.81 4145.51ZM4972.12 3441.53H5089.87L5088.99 3185.34H5340.62L5334.64 3441.53H5548.86L5544.31 3630.29H5330.17C5330.17 3735.13 5322.65 3845.98 5322.65 3910.39C5322.65 3976.26 5339.16 4007.7 5397.59 4007.7C5433.5 4007.7 5463.47 3989.72 5493.44 3971.79L5550.33 4148.56C5473.92 4195 5381.08 4223.42 5292.68 4223.42C5081.46 4223.42 5071.02 4090.13 5071.02 3916.37C5071.02 3823.45 5078.46 3730.65 5078.46 3630.29H4966.14L4972.12 3441.53ZM5682.16 3441.53H5942.82V3547.91H5945.75C5984.7 3483.49 6035.61 3420.55 6137.52 3420.55C6165.94 3420.55 6195.87 3423.55 6222.92 3429.53L6188.47 3687.18C6163.02 3679.66 6134.51 3672.18 6095.55 3672.18C6008.69 3672.18 5941.27 3745.58 5941.27 3760.58L5936.8 4196.46H5676.22L5682.16 3441.53ZM6695.08 3414.57C6973.63 3414.57 7117.46 3591.34 7117.46 3818.93C7117.46 4046.61 6973.63 4223.38 6695.08 4223.38C6416.45 4223.38 6272.62 4046.61 6272.62 3818.93C6272.57 3591.34 6416.45 3414.57 6695.08 3414.57ZM6695.08 4025.63C6819.35 4025.63 6856.8 3917.79 6856.8 3818.93C6856.8 3720.08 6819.35 3612.32 6695.08 3612.32C6570.73 3612.32 6533.27 3720.08 6533.27 3818.93C6533.27 3917.79 6570.73 4025.63 6695.08 4025.63ZM7259.12 3441.53H7519.69V3523.91C7579.63 3465.56 7670.96 3414.61 7763.88 3414.61C7924.14 3414.61 8011 3502.93 8011 3709.67C8011 3863.95 8009.54 4030.19 8008.07 4196.46H7747.41C7748.88 4051.13 7750.42 3904.37 7750.42 3748.58C7750.42 3687.18 7733.91 3639.28 7656.04 3639.28C7614.07 3639.28 7554.14 3675.19 7519.69 3708.17L7518.31 4196.46H7253.06L7259.12 3441.53ZM4133.84 1886.47L4463.21 800.825H4756.98L4427.64 1886.47H4133.84ZM4002.55 801.076L3738.25 1261.28C3670.99 1381.92 3631.62 1442.78 3612.73 1518.93H3608.76C3613.4 1422.38 3599.94 1303.88 3598.68 1236.83L3569.51 801.076H3074.94L3069.8 830.336C3196.87 830.336 3272.23 894.121 3293 1024.7L3389.39 1886.47H3693.77L4309.23 801.076H4002.55ZM6287.29 1886.47L6279.22 1725.05L5912.43 1724.8L5837.4 1886.52H5518.43L6096.68 802.915H6488.22L6586.19 1886.52L6287.29 1886.47ZM6253.64 1246.11C6250.29 1165.86 6247.58 1056.97 6253.05 991.012H6248.71C6230.82 1044.97 6153.99 1206.74 6120.22 1286.36L6010.91 1524.29H6268.56L6253.64 1246.11ZM5065.37 1917.41C4858.01 1917.41 4720.32 1851.57 4622.05 1792.89L4761.95 1579.21C4850.19 1628.57 4919.49 1685.46 5078.83 1685.46C5130.2 1685.46 5179.48 1672.17 5207.49 1623.6C5248.41 1552.96 5198.08 1515.01 5083.39 1450.01L5026.75 1413.14C4856.59 1296.9 4782.93 1186.55 4863.02 993.77C4914.35 870.505 5049.45 777 5272.49 777C5426.22 777 5570.47 843.502 5654.41 908.5L5493.56 1097.18C5411.51 1030.89 5343.59 997.365 5265.8 997.365C5203.85 997.365 5156.74 1021.27 5140.48 1053.54C5109.89 1114.24 5150.35 1155.45 5239.76 1211.04L5307.18 1253.93C5513.71 1384.13 5562.87 1520.73 5511.2 1648.47C5422.09 1868.25 5247.78 1917.41 5065.37 1917.41Z"
      fill="var(--fenext-svg-color-2,#2566AF)"
    />
  </svg>
);

export const SvgCardDinersClub = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    className={`fenext_svg fenext_svg_card_diners_club ${className}`}
    viewBox="0 0 10000 5000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="10000"
      height="5000"
      rx="940"
      fill="var(--fenext-svg-bg,#FFF)"
    />
    <path
      d="M2535.93 3535.32C3101.78 3538.03 3618.25 3073.85 3618.25 2509.16C3618.25 1891.63 3101.78 1464.79 2535.93 1465H2048.95C1476.33 1464.79 1005 1891.76 1005 2509.16C1005 3073.97 1476.33 3538.03 2048.95 3535.32H2535.93Z"
      fill="var(--fenext-svg-color-1,#0079BE)"
    />
    <path
      d="M2051.25 1550.56C1528 1550.72 1104 1974.85 1103.88 2498.31C1104 3021.68 1528 3445.77 2051.25 3445.93C2574.63 3445.77 2998.72 3021.68 2998.79 2498.31C2998.71 1974.85 2574.63 1550.72 2051.25 1550.56ZM1450.74 2498.31C1451.23 2242.52 1610.98 2024.4 1836.25 1937.72V3058.77C1610.98 2972.14 1451.22 2754.14 1450.74 2498.31ZM2266.17 3059.02V1937.68C2491.52 2024.15 2651.52 2242.4 2651.93 2498.31C2651.52 2754.3 2491.52 2972.39 2266.17 3059.02Z"
      fill="var(--fenext-svg-color-2,#FFF)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3859.91 1818.01C3905.63 1818.53 3950.08 1819.03 3950.08 1910.41L3950.08 2438.5C3947 2511.57 3916.17 2514.66 3852.67 2521.05H3852.67L3852.64 2521.05C3851.78 2521.14 3850.92 2521.22 3850.05 2521.31V2549.57L3853.52 2549.5C3901.29 2548.46 3948.11 2547.43 3995.92 2547.43C4020.97 2547.43 4046.03 2547.95 4071.61 2548.47L4071.62 2548.47L4071.62 2548.47C4098.27 2549.02 4125.47 2549.57 4153.78 2549.57C4539.18 2549.57 4602.27 2278.5 4602.27 2170.67C4602.27 1977.86 4448.76 1789.56 4166.89 1789.56C4120.92 1789.56 4080.98 1790.24 4046.66 1790.82C4020.81 1791.26 3998.15 1791.65 3978.51 1791.65C3935.99 1791.65 3892.49 1791.65 3850.05 1789.56V1817.86C3853.33 1817.93 3856.62 1817.97 3859.9 1818.01L3859.91 1818.01ZM4170.05 2514.74C4116.73 2514.74 4056.8 2504.96 4056.8 2421.12L4056.81 1828.83C4062.18 1828.51 4067.62 1828.04 4073.59 1827.53C4089.52 1826.16 4109.25 1824.47 4141.75 1824.47C4351.82 1824.47 4482.49 1971.44 4482.49 2174.99C4482.49 2337.24 4405.26 2514.74 4170.05 2514.74ZM4661.09 2521.32H4640.48V2549.62C4680.69 2548.51 4719.92 2547.45 4759.11 2547.45C4778.93 2547.45 4798.49 2548 4817.79 2548.55C4836.57 2549.09 4855.11 2549.62 4873.39 2549.62V2521.32H4854.9C4824.42 2521.32 4800.47 2521.32 4800.47 2485.29V2067.28C4800.47 2058.53 4798.22 2051.96 4792.83 2051.96C4787.37 2051.96 4780.88 2053.11 4773.2 2057.47C4768.93 2060.75 4707.88 2081.29 4656.74 2096.65V2114.11C4658.32 2114.96 4659.85 2115.78 4661.36 2116.58L4661.44 2116.63L4661.6 2116.71L4661.6 2116.72L4661.63 2116.73C4698.36 2136.38 4713.35 2144.4 4713.35 2190.27V2485.29C4713.35 2521.32 4691.53 2521.32 4661.09 2521.32ZM4703.61 1829.89C4703.61 1858.2 4728.59 1884.32 4756.93 1884.32C4786.26 1884.32 4810.29 1859.3 4810.29 1829.89C4810.29 1800.48 4785.15 1777.52 4756.93 1777.52C4729.74 1777.52 4703.61 1802.61 4703.61 1829.89ZM4913.72 2124.96C4964.77 2145.66 4976.81 2156.5 4976.81 2196.76H4976.8V2485.28C4976.8 2521.31 4955.08 2521.31 4924.6 2521.31H4904.96V2549.62C4944.11 2548.51 4983.38 2547.44 5022.53 2547.44C5042.26 2547.44 5061.73 2547.99 5081.07 2548.54L5081.07 2548.54C5100.13 2549.08 5119.05 2549.62 5137.96 2549.62V2521.31H5118.4C5087.88 2521.31 5063.81 2521.31 5063.81 2485.28V2163.07C5099.87 2139.09 5155.42 2110.78 5190.2 2110.78C5252.36 2110.78 5290.27 2141.22 5290.27 2203.37V2485.29C5290.27 2521.32 5268.62 2521.32 5238.06 2521.32H5218.51V2549.62C5257.65 2548.51 5296.88 2547.45 5336.12 2547.45C5355.78 2547.45 5375.19 2548 5394.48 2548.54L5394.48 2548.54H5394.48H5394.48H5394.49H5394.49H5394.49H5394.49H5394.49H5394.49H5394.49H5394.49H5394.49H5394.5C5413.56 2549.08 5432.52 2549.62 5451.5 2549.62V2521.32H5431.91C5401.39 2521.32 5377.44 2521.32 5377.44 2485.29V2204.4C5377.44 2119.49 5344.78 2051.96 5252.36 2051.96C5179.33 2051.96 5125.97 2089.06 5063.81 2133.67V2062.85C5063.81 2054.18 5060.61 2051.97 5057.36 2051.97C5007.84 2073.68 4965.23 2087.54 4921.11 2101.89L4921.11 2101.89C4918.65 2102.69 4916.19 2103.49 4913.72 2104.3V2124.96ZM5534.28 2312.27C5532.01 2275.22 5532.01 2258.91 5534.28 2249.09H5840.14L5850 2242.56C5851.02 2235.94 5851.02 2229.5 5851.02 2222.88C5850 2107.46 5755.23 2051.96 5666.99 2051.96C5590.83 2051.96 5447.14 2115.13 5447.14 2328.58C5447.14 2398.2 5481.98 2565.92 5655.12 2565.92C5744.34 2565.92 5806.38 2509.32 5856.49 2442.94L5841.29 2427.66C5801.07 2467.92 5754.16 2500.57 5694.23 2500.57C5607.27 2500.57 5540.69 2415.66 5534.28 2312.27ZM5757.37 2187.03C5757.37 2200.05 5754.16 2214.22 5727.01 2214.22H5537.52C5550.58 2135.76 5596.3 2086.83 5662.64 2086.83C5723.64 2086.83 5757.37 2131.48 5757.37 2187.03ZM5905.5 2521.32H5876.09L5876.09 2549.62C5915.28 2548.51 5961.04 2547.44 6005.65 2547.44C6044.49 2547.44 6082.4 2548.17 6128.29 2549.05L6128.42 2549.06L6128.76 2549.06L6128.96 2549.07C6138.28 2549.25 6147.94 2549.43 6158.01 2549.62V2521.31H6097.09C6066.57 2521.31 6044.84 2521.31 6044.84 2485.29V2229.5C6044.84 2164.14 6105.76 2139.08 6124.28 2139.08C6143.85 2139.08 6153.35 2146.02 6162.58 2152.75C6171.29 2159.11 6179.76 2165.29 6196.21 2165.29C6226.69 2165.29 6247.31 2139.08 6247.31 2109.67C6247.31 2070.44 6212.51 2051.96 6185.28 2051.96C6118.94 2051.96 6073.14 2121.71 6045.99 2164.14H6043.68V2066.17C6043.68 2055.24 6040.48 2051.96 6034.03 2051.96C6029.48 2051.96 6017.8 2057.95 5998.77 2067.72L5998.77 2067.72L5998.76 2067.73C5976.43 2079.19 5943.98 2095.85 5901.06 2114.11V2130.37C5904.5 2132.2 5908.99 2133.94 5913.94 2135.85C5932.56 2143.04 5957.67 2152.73 5957.67 2179.38V2485.29C5957.67 2521.32 5935.89 2521.32 5905.5 2521.32ZM6432.44 2531.09C6352.92 2531.09 6309.42 2470.09 6295.24 2398.2L6275.6 2403.72L6287.6 2528.96C6325.67 2550.69 6376.82 2565.93 6420.36 2565.93C6549.92 2565.93 6607.64 2489.65 6607.64 2417.8C6607.64 2326.09 6534.93 2294.91 6467.53 2266C6409.33 2241.04 6355.09 2217.78 6355.09 2158.69C6355.09 2111.9 6396.41 2086.84 6439.96 2086.84C6509.71 2086.84 6547.79 2126.07 6558.63 2194.59H6583.73L6576 2083.63C6533.57 2061.82 6486.79 2051.96 6451.99 2051.96C6332.29 2051.96 6283.24 2130.38 6283.24 2191.38C6283.24 2285.81 6352.11 2317.36 6415.64 2346.47C6470.03 2371.39 6520.51 2394.52 6520.51 2453.78C6520.51 2491.9 6496.52 2531.09 6432.44 2531.09ZM7563.52 1986.64H7590.68L7579.83 1831C7495.99 1801.59 7411.08 1773.16 7322.92 1773.16C7109.57 1773.16 6910.38 1933.28 6910.38 2156.5C6910.38 2401.49 7071.45 2565.92 7326.13 2565.92C7398.06 2565.92 7521.08 2536.55 7566.81 2508.16L7591.78 2349.2L7566.81 2342.71C7545.04 2457.06 7455.69 2531.08 7347.95 2531.08C7180.35 2531.08 7023.47 2373.27 7023.47 2153.17C7023.47 1891.87 7205.28 1808.08 7330.57 1808.08C7452.45 1808.08 7542.82 1859.3 7563.52 1986.64ZM7650.57 2521.32H7629.95H7629.94V2549.62C7670.29 2548.51 7709.48 2547.44 7748.62 2547.44C7768.55 2547.44 7788.18 2548 7807.51 2548.56L7807.52 2548.56H7807.52H7807.52H7807.52H7807.53H7807.53H7807.53H7807.53H7807.53H7807.54H7807.54H7807.54C7826.26 2549.09 7844.7 2549.62 7862.82 2549.62V2521.32H7844.46C7813.93 2521.32 7790.03 2521.32 7790.03 2485.29V1732.99C7790.03 1724.24 7787.85 1717.67 7781.2 1717.67C7778.76 1717.67 7773.1 1720.85 7765.31 1725.23C7762.85 1726.61 7760.18 1728.11 7757.33 1729.66C7734.45 1742.76 7688.73 1762.4 7645.19 1776.53V1793.95C7646.6 1794.36 7647.99 1794.75 7649.34 1795.14C7687.69 1806.13 7702.95 1810.5 7702.95 1878.9V2485.29C7702.95 2521.32 7681.09 2521.32 7650.57 2521.32ZM8359.35 2510.39C8340.87 2510.39 8328.96 2509.32 8328.96 2489.65L8328.95 2087.97C8328.95 2075.94 8328.95 2068.34 8320.13 2068.34C8316.32 2068.34 8306.27 2069.42 8290.56 2071.1L8290.56 2071.1C8261.7 2074.19 8213.75 2079.32 8150.39 2083.58V2103.17C8154.16 2104.23 8158.05 2105.29 8162.01 2106.37C8199.08 2116.5 8241.71 2128.15 8241.71 2147.75V2440.8C8196.03 2478.79 8147.06 2507.1 8110.05 2507.1C8015.41 2507.1 8015.41 2413.48 8015.41 2380.74V2099.9C8015.41 2075.95 8015.41 2068.34 8003.33 2068.34C7997.01 2068.34 7976.31 2069.64 7951.81 2071.17L7951.8 2071.17C7921.23 2073.08 7884.75 2075.35 7862.97 2075.95V2096.65C7923.85 2102.07 7928.16 2129.31 7928.16 2157.61V2436.45C7928.16 2527.84 7989.12 2565.93 8047.9 2565.93C8125.25 2565.93 8175.41 2527.84 8240.63 2474.53V2562.64L8246.1 2565.93C8266.81 2559.44 8356.07 2536.56 8402.93 2532.24V2509.32C8395.68 2509.32 8387.9 2509.6 8380.27 2509.87C8372.95 2510.13 8365.77 2510.39 8359.35 2510.39ZM8707.78 2051.96C8647.85 2051.96 8589.08 2093.36 8545.58 2130.38V2130.37H8545.56V1732.99C8545.56 1724.24 8543.39 1717.67 8536.9 1717.67C8534.39 1717.67 8528.97 1720.7 8521.43 1724.93L8521.39 1724.95C8518.79 1726.4 8515.94 1728 8512.87 1729.66C8489.99 1742.76 8444.39 1762.4 8400.72 1776.53V1793.95L8402.43 1794.44L8404.78 1795.12L8404.92 1795.16C8443.17 1806.13 8458.48 1810.53 8458.48 1878.9V2347.1C8458.48 2413.48 8452.94 2476.66 8443.29 2540.91L8466.08 2552.81L8498.69 2527.84C8502.96 2529.63 8507.54 2531.75 8512.53 2534.05C8540.67 2547.04 8581.58 2565.92 8649.98 2565.92C8805.76 2565.92 8910.22 2423.26 8910.22 2280.64C8910.22 2162.05 8834.1 2051.96 8707.78 2051.96ZM8657.67 2537.67C8584.72 2537.67 8545.58 2467.92 8545.58 2426.51L8545.57 2162.05C8574.94 2136.96 8608.63 2110.79 8649.01 2110.79C8733.96 2110.79 8823.13 2208.76 8823.13 2326.32C8823.13 2423.26 8774.17 2537.67 8657.67 2537.67ZM3983.41 3201.87C3999.42 3202.46 4015.32 3203.05 4029.53 3203.05H4032.16V3180.13H4021.23C3999.74 3179.63 3980.07 3177.91 3979.95 3148.95V2838.56C3980.07 2809.6 3999.75 2807.67 4021.23 2807.26H4032.16V2784.34H4029.53C4015.7 2784.34 4000.06 2784.91 3984.22 2785.48L3984.22 2785.49C3967.97 2786.08 3951.5 2786.68 3936.57 2786.68C3921.31 2786.68 3904.23 2786.03 3888.08 2785.41L3888.07 2785.41H3888.07C3873.58 2784.86 3859.84 2784.34 3848.83 2784.34H3846.28V2807.26H3857.13C3878.61 2807.66 3898.16 2809.6 3898.37 2838.56V3148.95C3898.16 3177.91 3878.61 3179.63 3857.13 3180.13H3846.28V3203.05H3848.83C3859.84 3203.05 3873.43 3202.51 3887.77 3201.95H3887.77H3887.77H3887.77H3887.77H3887.78H3887.78L3887.79 3201.95C3903.76 3201.33 3920.65 3200.66 3935.91 3200.66C3950.77 3200.66 3967.15 3201.27 3983.41 3201.87ZM4470.77 3211.96L4446.33 3211.05L4145.72 2875.98V3113.41C4146.42 3164.92 4154.26 3179.55 4198.88 3180.12H4211.57V3203.04H4208.94C4196.09 3203.04 4183.27 3202.44 4170.49 3201.84H4170.49H4170.48H4170.48H4170.48H4170.48H4170.47H4170.47H4170.47H4170.47H4170.46H4170.46L4170.45 3201.84H4170.45H4170.44H4170.44H4170.44H4170.43H4170.43H4170.43H4170.43H4170.42H4170.42C4157.74 3201.25 4145.11 3200.66 4132.53 3200.66C4119.31 3200.66 4105.92 3201.25 4092.49 3201.85L4092.48 3201.85L4092.47 3201.85C4078.96 3202.44 4065.41 3203.04 4051.94 3203.04H4049.35V3180.12H4060.27C4099.42 3179.92 4110.59 3154.78 4111.05 3107.54V2858.03C4110.96 2826.48 4085.09 2807.34 4059.7 2807.26H4049.34V2784.42H4051.93C4063.29 2784.42 4074.79 2784.99 4086.24 2785.56L4086.25 2785.56H4086.25H4086.26H4086.26H4086.26H4086.27H4086.27H4086.27H4086.28H4086.28H4086.28H4086.28H4086.28H4086.28H4086.29H4086.29H4086.29H4086.29H4086.29H4086.29H4086.3C4097.65 2786.12 4108.94 2786.68 4120 2786.68C4127.24 2786.68 4134.41 2786.3 4141.73 2785.91H4141.73H4141.73H4141.74H4141.74H4141.74H4141.74H4141.74H4141.75H4141.75H4141.75H4141.75C4152.23 2785.35 4163.01 2784.77 4174.75 2785.28L4435.11 3078.38V2860.5C4434.78 2813.34 4403.36 2807.67 4386.1 2807.26H4370.41V2784.42H4373.04C4387.06 2784.42 4400.91 2784.99 4414.72 2785.55L4414.72 2785.55C4428.46 2786.12 4442.17 2786.68 4455.97 2786.68C4467.97 2786.68 4480 2786.12 4492.09 2785.56H4492.09H4492.09H4492.09L4492.1 2785.55L4492.11 2785.55H4492.11H4492.12H4492.12H4492.12H4492.13H4492.13H4492.13H4492.14H4492.14H4492.14H4492.14H4492.14H4492.15H4492.15H4492.15H4492.15H4492.15C4504.34 2784.99 4516.56 2784.42 4528.85 2784.42H4531.43V2807.25H4520.01C4495.57 2807.96 4470.47 2810.09 4469.78 2879.96V3149.56C4469.78 3170.26 4470.39 3190.96 4473.27 3208.91L4473.85 3211.95H4470.77V3211.96ZM4617.58 2816.54H4617.59L4617.59 2819.13H4712.15V3133C4711.4 3178.93 4698.26 3179.34 4665.61 3180.12H4651.84V3203.05H4654.31C4664.71 3203.05 4678.74 3202.57 4694.26 3202.04L4694.26 3202.04H4694.27H4694.27H4694.28H4694.28H4694.28H4694.29C4713.46 3201.39 4734.89 3200.66 4754.5 3200.66C4771.65 3200.66 4791.59 3201.35 4809.99 3201.99C4825.74 3202.54 4840.35 3203.05 4851.12 3203.05L4853.61 3203.04V3180.12H4839.73C4811.51 3179.54 4793.77 3176.46 4793.23 3131.77V2819.12H4887.8C4925.22 2819.12 4927.56 2851.33 4929.12 2873.59L4929.28 2877.04L4950.27 2869.41L4951.92 2868.75V2866.9C4951.92 2850.92 4951.92 2834.9 4953.11 2819.13C4954.83 2803.23 4957.17 2787.21 4959.55 2771.35L4959.93 2768.77L4943.21 2766.13L4940.54 2765.56L4940.29 2768.35C4939.27 2783.84 4927.28 2784.09 4910.76 2784.33H4602.18L4601.89 2784.33C4586.96 2784.09 4576.11 2783.91 4572.07 2769.05L4571.66 2767.21H4552.89V2769.79C4552.89 2786.8 4551.74 2803.23 4549.27 2819.66C4548.07 2831.42 4546.29 2842.85 4544.53 2854.18C4543.7 2859.47 4542.88 2864.75 4542.13 2870.03L4541.8 2873.11H4564.6L4565.04 2871.1C4565.57 2868.71 4566.06 2866.43 4566.54 2864.26C4574.73 2826.52 4576.18 2819.87 4617.58 2819.13V2816.54ZM5225.97 3201.99H5225.96C5195.54 3201.33 5162.34 3200.62 5133.52 3200.62C5103.81 3200.62 5068.81 3201.37 5037.79 3202.04C5013.1 3202.57 4990.93 3203.05 4975.94 3203.05H4973.44V3180.13H4984.24C5005.72 3179.8 5025.2 3177.91 5025.49 3148.95V2838.56C5025.2 2809.64 5005.72 2807.71 4984.24 2807.26H4973.44V2784.42H4975.94C4992.58 2784.42 5014.62 2784.9 5038.41 2785.42L5038.43 2785.42H5038.43H5038.44L5038.45 2785.42C5066.32 2786.03 5096.59 2786.68 5123.37 2786.68C5149.6 2786.68 5179.05 2786.06 5206.94 2785.46C5232.04 2784.93 5255.88 2784.42 5274.99 2784.42H5277.66L5277.53 2787.05C5277.12 2795.97 5276.96 2806.48 5276.96 2817.66C5276.96 2838.15 5277.53 2860.54 5278.73 2877.42L5278.81 2879.56L5276.84 2880.14L5256.01 2885.56L5255.89 2882.52C5252.4 2844.07 5247.27 2816.18 5186.27 2815.61H5106.46L5106.37 2965.58H5174.4C5208.5 2965.25 5214.61 2947.79 5218.64 2915.88L5218.85 2913.54H5241.56L5241.52 2916.2C5240.38 2939.29 5239.63 2962.37 5239.63 2985.46C5239.63 3007.89 5240.38 3030.36 5241.52 3052.91L5241.56 3055.01L5239.43 3055.5L5218.85 3059.6L5218.64 3056.81C5218.45 3055.16 5218.27 3053.53 5218.1 3051.95C5214.46 3018.89 5212.48 3000.84 5174.93 3000.42L5106.45 3000.37V3135.89C5106.5 3171.51 5136.92 3171.66 5175 3171.86L5176.16 3171.87C5247.47 3171.46 5276.07 3168.01 5293.93 3101.46L5294.51 3099.08L5297.02 3099.53L5316 3104.42L5315.42 3106.88C5307.78 3138.27 5300.67 3169.57 5295.37 3200.95L5294.88 3203.05H5292.86C5275.44 3203.05 5251.71 3202.54 5226 3201.99H5225.99H5225.99H5225.98H5225.98H5225.98H5225.97H5225.97H5225.97ZM5715.41 3201.84C5725.09 3202.44 5734.8 3203.04 5744.77 3203.04V3203.05H5747.31V3180.45L5745.14 3180.12C5716.3 3176.43 5705.99 3170.31 5689.43 3145.74L5589.9 2996.72C5635.63 2978.06 5670.99 2944.67 5670.99 2891.15C5670.79 2805.13 5602.03 2784.51 5527.39 2784.34C5512.06 2784.34 5497.46 2784.9 5482.45 2785.46C5466.55 2786.06 5450.19 2786.68 5432 2786.68C5411.15 2786.68 5390.14 2785.9 5372.41 2785.24L5372.4 2785.24H5372.4L5372.39 2785.24L5372.38 2785.24L5372.34 2785.24L5372.31 2785.24L5372.28 2785.24C5359.39 2784.76 5348.26 2784.34 5340.19 2784.34H5337.6V2807.31H5350.83C5351.22 2807.32 5351.61 2807.33 5352 2807.34C5370.1 2807.93 5389.83 2808.56 5390.27 2849.74V3150.75C5390.18 3170.72 5372.19 3180 5350.83 3180.12H5337.6V3203.05H5340.19C5355.25 3203.05 5369.8 3202.44 5384.17 3201.83C5398.18 3201.24 5412.03 3200.66 5426.01 3200.66C5442.79 3200.66 5459.76 3201.26 5476.75 3201.85H5476.75H5476.76H5476.76H5476.77H5476.77H5476.78H5476.78H5476.79L5476.79 3201.85C5493.85 3202.45 5510.93 3203.05 5527.88 3203.05H5530.51V3180.12H5517.24L5515.82 3180.09C5489.22 3179.47 5471.92 3179.06 5471.32 3135.27V3011.13H5506.31C5544.6 3078.82 5583.54 3142.45 5628.98 3202.06C5641.3 3202.64 5653 3202.03 5664.27 3201.44L5664.27 3201.44C5671.89 3201.05 5679.32 3200.66 5686.6 3200.66C5696.29 3200.66 5705.83 3201.25 5715.41 3201.84L5715.41 3201.84ZM5586.5 2894.87C5585.88 2963.72 5556.38 2984.09 5497.73 2984.59H5471.31V2812.93C5473.21 2812.76 5475.1 2812.54 5477.13 2812.31C5483.18 2811.62 5490.41 2810.79 5502.41 2810.79C5554.01 2810.99 5586.17 2843.11 5586.5 2894.87ZM6181.29 3211.91L6156.89 3211.09L5856.25 2875.98V3113.37C5856.95 3164.92 5864.75 3179.54 5909.44 3180.12H5921.97V3203.04H5919.38C5906.54 3203.04 5893.75 3202.43 5881 3201.83L5880.99 3201.82C5868.3 3201.22 5855.64 3200.62 5842.98 3200.62C5829.78 3200.62 5816.35 3201.22 5802.9 3201.83H5802.9H5802.9H5802.89H5802.89H5802.89H5802.89H5802.89C5789.39 3202.43 5775.86 3203.04 5762.5 3203.04H5759.83V3180.12H5770.72C5809.82 3179.96 5821.04 3154.78 5821.41 3107.37V2857.99C5821.37 2826.44 5795.53 2807.3 5770.23 2807.25H5759.83V2784.34H5762.5C5773.83 2784.34 5785.3 2784.92 5796.75 2785.51C5808.12 2786.09 5819.47 2786.67 5830.61 2786.67C5837.85 2786.67 5845.04 2786.27 5852.41 2785.86C5862.77 2785.28 5873.46 2784.68 5885.08 2785.15L6145.48 3078.37V2860.41C6145.31 2813.33 6113.76 2807.5 6096.55 2807.26H6080.9V2784.34H6083.49C6097.54 2784.34 6111.4 2784.93 6125.22 2785.51C6138.96 2786.09 6152.66 2786.67 6166.46 2786.67C6178.51 2786.67 6190.59 2786.09 6202.7 2785.51C6214.87 2784.92 6227.07 2784.34 6239.29 2784.34H6241.88V2807.26H6230.5C6206.06 2807.92 6180.88 2810.09 6180.26 2879.97V3149.56C6180.26 3170.26 6180.8 3190.8 6183.8 3209.04L6184.13 3211.91H6181.29ZM6647.54 3202.92L6650.21 3203.04L6652.93 3203.22V3180.05H6646.89C6627.83 3179.97 6616.95 3173.77 6610.09 3157.95C6603.3 3142.59 6597.03 3123.84 6590.88 3105.42L6590.87 3105.42C6590.02 3102.86 6589.17 3100.31 6588.31 3097.77L6479.21 2787.92C6477.4 2783.11 6475.55 2777.85 6473.87 2772.97C6471.98 2769.84 6468.78 2769.47 6467.34 2769.51C6465.41 2769.51 6463.98 2770.03 6462.65 2770.51C6462.45 2770.58 6462.26 2770.65 6462.07 2770.72C6461.92 2770.77 6461.77 2770.82 6461.62 2770.87C6450.2 2778.1 6426.42 2790.01 6407.85 2796.29C6403.04 2818.43 6393.37 2845.75 6385.78 2867.19C6385.27 2868.63 6384.76 2870.04 6384.28 2871.43L6289.43 3143.32C6280.88 3167.43 6262.48 3179.96 6240.42 3180.04H6234.3V3203.21L6237.05 3203.04L6238.99 3202.93C6259.59 3201.78 6280.29 3200.61 6300.88 3200.61C6324.11 3200.61 6347.89 3201.81 6371.21 3202.98L6371.22 3202.98L6372.4 3203.04L6375.07 3203.21V3180.04H6365.95C6346.31 3180.04 6324.17 3176.51 6323.97 3162.05C6323.95 3155.71 6327 3146.78 6330.8 3135.67L6330.8 3135.67L6330.8 3135.66C6332.79 3129.86 6334.97 3123.46 6337.03 3116.53L6355.43 3056.69H6486.1L6508.65 3123.68C6515.18 3142.53 6520.53 3158.8 6520.36 3165.54C6520.36 3176.92 6499.99 3180.04 6486.27 3180.04H6477.14V3203.21L6479.81 3203.04L6485.26 3202.83L6485.27 3202.83H6485.27H6485.28H6485.28H6485.28H6485.28C6513.68 3201.71 6541.38 3200.61 6568.67 3200.61C6595.95 3200.61 6621.77 3201.77 6647.54 3202.92ZM6472.01 3018.39H6368.33L6420.45 2859.63L6472.01 3018.39ZM6676.41 2819.13V2816.54H6676.41L6676.41 2819.12C6634.97 2819.83 6633.52 2826.48 6625.33 2864.04C6624.84 2866.28 6624.33 2868.63 6623.78 2871.09L6623.33 2873.1H6600.49L6600.86 2870.14C6601.56 2865.41 6602.29 2860.7 6603.03 2855.98C6604.9 2844.03 6606.77 2832.06 6608.01 2819.78C6610.43 2803.22 6611.59 2786.79 6611.59 2769.79V2767.2H6630.31L6630.81 2769.05C6634.93 2783.91 6645.62 2784.08 6660.63 2784.32L6660.92 2784.33L6663.91 2784.41H6969.66C6986.01 2784.08 6997.96 2783.83 6998.99 2768.39L6999.16 2765.56L7001.95 2766.14L7018.75 2768.77L7018.3 2771.35C7015.88 2787.21 7013.62 2803.23 7011.81 2819.13C7010.62 2834.9 7010.62 2850.96 7010.62 2866.9V2868.75L7008.94 2869.41L6987.95 2877.05L6987.83 2873.59C6986.3 2851.33 6983.96 2819.12 6946.54 2819.12H6851.94V3131.77C6852.56 3176.46 6870.26 3179.54 6898.44 3180.12H6912.32V3203.04L6909.78 3203.04C6899.06 3203.04 6884.47 3202.53 6868.74 3201.99H6868.73H6868.73L6868.73 3201.99C6850.33 3201.35 6830.38 3200.66 6813.25 3200.66C6793.68 3200.66 6772.26 3201.39 6753.09 3202.04L6753.08 3202.04C6737.56 3202.56 6723.52 3203.04 6713.14 3203.04H6710.51V3180.12H6724.35C6757 3179.34 6770.11 3178.93 6770.93 3133L6770.85 2819.13H6676.41ZM7172.27 3201.85C7188.27 3202.45 7204.16 3203.05 7218.36 3203.05H7220.87V3180.13H7210.06C7188.42 3179.8 7168.98 3177.95 7168.7 3148.95V2838.56C7168.98 2809.64 7188.41 2807.67 7210.06 2807.26H7220.87V2784.43H7218.36C7204.52 2784.43 7188.85 2784.98 7172.99 2785.53L7172.98 2785.53C7156.69 2786.11 7140.2 2786.69 7125.24 2786.69C7110 2786.69 7092.9 2786.06 7076.75 2785.46L7076.74 2785.46C7062.28 2784.93 7048.58 2784.43 7037.66 2784.43H7035.07V2807.26H7045.96C7067.36 2807.67 7087 2809.64 7087.08 2838.56V3148.95C7087 3177.95 7067.36 3179.8 7045.96 3180.13H7035.07V3203.05H7037.66C7048.57 3203.05 7062.13 3202.51 7076.45 3201.94C7092.48 3201.3 7109.45 3200.62 7124.75 3200.62C7139.63 3200.62 7156.01 3201.24 7172.27 3201.85ZM7454.55 2778.1H7454.56V2775.5C7581.81 2775.59 7683.81 2854.66 7684.06 2982.41C7683.94 3120.14 7584.93 3211.67 7457.64 3211.91C7330.95 3211.66 7233.68 3125.48 7233.44 2996.7H7233.43C7233.68 2872.07 7330.13 2775.67 7454.55 2775.5V2778.1ZM7463.56 3180.78C7576.19 3180.62 7595.7 3081.94 7595.98 2995.56C7595.98 2909.67 7549.73 2806.85 7453.45 2806.72C7442.24 2806.74 7431.9 2807.84 7422.38 2809.91C7373.75 2820.47 7346.35 2856.03 7332.75 2898.51L7332.75 2898.52C7324.86 2923.15 7321.61 2950.11 7321.55 2975.88C7321.63 3081.41 7369.73 3180.53 7463.56 3180.78ZM8090.59 3211.05L8115.11 3211.91V3211.92H8117.93L8117.44 3209.04C8114.56 3190.93 8114.11 3170.27 8114.11 3149.56V2879.97C8114.61 2810.18 8139.82 2807.96 8164.18 2807.26H8175.69V2784.43H8173.14C8160.83 2784.43 8148.62 2785 8136.44 2785.56L8136.43 2785.56C8124.32 2786.13 8112.23 2786.69 8100.1 2786.69C8086.37 2786.69 8072.69 2786.13 8058.97 2785.56L8058.97 2785.56C8045.17 2785 8031.33 2784.43 8017.34 2784.43H8014.67V2807.26H8030.24C8047.57 2807.67 8079.12 2813.35 8079.29 2860.5V3078.38L7819.01 2785.29C7807.2 2784.78 7796.41 2785.35 7785.95 2785.91L7785.94 2785.91C7778.65 2786.3 7771.52 2786.68 7764.3 2786.68C7753.17 2786.68 7741.86 2786.12 7730.51 2785.56C7719.06 2784.99 7707.56 2784.42 7696.15 2784.42H7693.68V2807.26H7703.91C7729.38 2807.3 7755.22 2826.44 7755.3 2857.99V3107.54C7754.81 3154.78 7743.6 3179.92 7704.53 3180.04H7693.68V3203.04H7696.15C7709.65 3203.04 7723.21 3202.44 7736.74 3201.85L7736.75 3201.85C7750.18 3201.25 7763.58 3200.66 7776.83 3200.66C7789.44 3200.66 7802.07 3201.25 7814.75 3201.85H7814.76H7814.76H7814.76H7814.76C7827.54 3202.44 7840.35 3203.04 7853.24 3203.04H7855.83V3180.04H7843.01C7798.52 3179.51 7790.67 3164.92 7790.02 3113.41V2875.98L8090.59 3211.05ZM8577.67 3202.79L8571.78 3202.55C8549.15 3201.61 8526.36 3200.67 8502.37 3200.67C8478.46 3200.67 8454.03 3201.57 8429.18 3202.48L8429.05 3202.49C8423.92 3202.68 8418.76 3202.87 8413.59 3203.05L8410.97 3203.21V3180.13H8419.96C8433.76 3180.13 8454.18 3176.92 8454.22 3165.55C8454.34 3158.8 8449 3142.66 8442.39 3123.69L8419.88 3056.69H8289.13L8270.81 3116.54C8268.75 3123.59 8266.55 3130.08 8264.57 3135.94L8264.57 3135.95C8260.85 3146.94 8257.87 3155.73 8257.95 3161.97C8257.95 3176.51 8280.13 3180.13 8299.73 3180.13H8308.76V3203.21L8306.14 3203.05C8302.65 3202.89 8299.14 3202.73 8295.63 3202.57C8275.31 3201.62 8254.72 3200.67 8234.62 3200.67C8216.78 3200.67 8198.91 3201.59 8180.99 3202.52C8178.96 3202.63 8176.93 3202.73 8174.89 3202.84C8173.51 3202.91 8172.13 3202.98 8170.74 3203.05L8168.15 3203.21V3180.13H8174.11C8196.2 3180.04 8214.69 3167.35 8223.32 3143.32L8318.13 2871.43C8319.1 2868.59 8320.13 2865.62 8321.2 2862.55C8328.36 2841.91 8337.04 2816.87 8341.62 2796.38C8360.23 2789.93 8384.01 2778.1 8395.52 2770.87C8395.72 2770.8 8395.92 2770.72 8396.13 2770.65C8397.5 2770.16 8398.99 2769.63 8401.1 2769.63C8402.67 2769.47 8405.7 2769.84 8407.59 2773.08C8408.3 2774.94 8409 2776.92 8409.71 2778.93C8410.78 2781.95 8411.87 2785.03 8413.05 2787.91L8521.99 3097.77C8523 3100.72 8524 3103.69 8525.01 3106.68L8525.05 3106.79C8531.12 3124.76 8537.27 3142.98 8543.85 3158.07C8550.78 3173.76 8561.59 3179.96 8580.49 3180.13H8586.65V3203.21L8583.94 3203.05C8581.85 3202.97 8579.76 3202.88 8577.67 3202.79ZM8302.15 3018.4H8405.75L8354.24 2859.72L8302.15 3018.4ZM8839.21 3201.85C8865.29 3202.45 8891.4 3203.04 8917.53 3203.04V3203.05H8919.56L8920.05 3201.04C8922.93 3187.51 8925.97 3174.07 8929 3160.65C8933.53 3140.62 8938.06 3120.61 8942.06 3100.31L8942.6 3097.19H8920.29L8919.76 3099.16C8916.23 3112.1 8910.97 3128.37 8901.85 3141.02C8891.66 3155.15 8870.87 3169.08 8846.73 3171.91C8831.44 3173.55 8816.36 3174.25 8801.87 3174.25C8790.44 3174.25 8779.48 3173.8 8769.01 3173.06C8750.52 3170.47 8736.05 3164.52 8735.89 3142.46V2836.71C8736.32 2808.22 8749.36 2807.88 8770.5 2807.34C8771.52 2807.31 8772.55 2807.29 8773.6 2807.26H8790.9V2784.42H8788.47C8773.21 2784.42 8758.16 2784.99 8743.15 2785.56C8728.24 2786.12 8713.37 2786.68 8698.38 2786.68C8682.76 2786.68 8667.25 2786.12 8651.71 2785.55C8636.13 2784.99 8620.51 2784.42 8604.73 2784.42H8602.22V2807.26H8612.99C8634.59 2807.67 8654.76 2809.64 8655.01 2838.44V3143.03C8654.76 3178.15 8634.47 3179.63 8612.99 3180.12H8602.22V3203.04H8604.73C8630.84 3203.04 8656.93 3202.45 8683.01 3201.85C8709.08 3201.26 8735.16 3200.66 8761.24 3200.66C8787.19 3200.66 8813.18 3201.25 8839.21 3201.85ZM8994.64 2832.72C8994.64 2797.56 8967.97 2770.12 8932.28 2770.12C8896.58 2770.12 8869.88 2797.56 8869.88 2832.72C8869.88 2867.72 8896.58 2894.91 8932.28 2894.91C8967.98 2894.91 8994.64 2867.72 8994.64 2832.72ZM8981.62 2832.72C8981.62 2859.46 8960.17 2883.29 8932.28 2883.29C8904.23 2883.29 8882.78 2859.46 8882.78 2832.72C8882.78 2805.82 8904.23 2781.79 8932.28 2781.79C8960.5 2781.79 8981.62 2805.82 8981.62 2832.72ZM8901.22 2862.5V2865.58L8931.37 2865.58V2862.5C8930.63 2862.4 8929.95 2862.31 8929.32 2862.22C8923.42 2861.44 8922.25 2861.28 8922.25 2857.57V2836.83H8929.15C8932.71 2841.92 8935.66 2846.62 8938.2 2850.67C8943.88 2859.72 8947.56 2865.58 8951.58 2865.58H8963.74V2863.57C8960.17 2861.43 8954.78 2855.35 8949.98 2848.86L8939.75 2834.57C8948.33 2831.9 8954.5 2825.04 8954.5 2815.76C8954.5 2804.42 8944.44 2799.2 8933.43 2799.2H8901.51V2802.37C8909.6 2802.04 8910.3 2804.26 8910.3 2810.74V2856.92C8910.3 2861.28 8909.12 2861.44 8903.02 2862.26C8902.46 2862.33 8901.86 2862.41 8901.22 2862.5ZM8929.61 2832.72H8922.25V2803.35H8929.2C8935.6 2803.35 8941.43 2806.84 8941.43 2816.78C8941.43 2826.6 8937.65 2832.72 8929.61 2832.72Z"
      fill="var(--fenext-svg-color-3,#000)"
    />
  </svg>
);

export const SvgCardJCB = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg fenext_svg_card_jcb ${className}`}
    viewBox="0 0 10000 5000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="10000"
      height="5000"
      rx="940"
      fill="var(--fenext-svg-bg,#FFF)"
    />
    <path
      d="M4801.53 1524.61C4380.16 1567.23 4078.34 1683.24 3883.04 1878.57C3788.35 1974.46 3700.76 2139.01 3671.17 2277.51C3648.68 2386.42 3647.5 2610.16 3669.99 2720.26C3738.64 3073.03 4023.89 3325.18 4470.12 3428.18C4512.73 3437.65 4574.27 3451.85 4606.23 3460.14C4719.86 3486.18 5095.07 3499.2 5349.54 3485C5480.93 3477.9 5609.94 3467.24 5635.98 3461.32C5662.02 3455.4 5721.2 3443.57 5766.18 3436.46C5966.21 3402.13 6019.47 3390.29 6043.14 3378.46C6066.82 3365.43 6068 3355.96 6068 3181.94C6068 3078.95 6063.27 2997.27 6056.16 2992.53C6050.25 2988.98 6013.55 3002.01 5974.49 3022.13C5935.43 3041.07 5896.38 3057.64 5888.09 3057.64C5879.8 3057.64 5858.5 3064.75 5841.93 3074.22C5811.16 3089.61 5742.51 3112.1 5618.23 3145.25C5534.19 3167.74 5303.38 3199.7 5222.9 3199.7C5141.23 3199.7 4980.25 3170.11 4896.22 3139.33C4706.84 3069.48 4580.19 2940.45 4515.09 2752.22C4478.4 2642.13 4476.03 2378.14 4511.54 2270.41C4609.78 1973.28 4860.71 1814.65 5230 1814.65C5478.56 1814.65 5753.16 1879.75 6005.27 2000.5C6026.57 2009.97 6049.06 2014.71 6054.98 2009.97C6063.27 2005.24 6068 1936.58 6068 1826.48C6068 1656.02 6066.82 1648.91 6041.96 1632.34C6014.74 1614.58 5976.86 1606.3 5772.1 1573.15C5716.47 1563.68 5658.47 1553.02 5641.9 1549.47C5572.06 1532.9 5215.79 1506.86 5087.96 1508.04C5012.21 1509.22 4883.2 1516.33 4801.53 1524.61ZM2620.12 1574.33C2615.38 1577.88 2611.83 1833.59 2611.83 2141.38C2611.83 2736.83 2605.92 2811.41 2552.65 2930.98C2520.7 3003.19 2424.82 3096.71 2344.34 3134.59C2272.14 3168.92 2137.2 3199.7 2059.08 3199.7C1912.32 3199.7 1601.02 3133.41 1467.27 3074.22C1447.15 3064.75 1424.66 3057.64 1416.38 3057.64C1409.28 3057.64 1370.22 3041.07 1331.16 3022.13C1290.92 3002.01 1250.67 2988.98 1242.39 2991.35C1230.55 2996.09 1227 3039.89 1227 3181.94V3365.43L1267.24 3382.01C1306.3 3398.58 1342.99 3405.68 1576.17 3443.57C1776.2 3475.53 1848.4 3482.63 2067.37 3489.73C2300.54 3498.02 2602.36 3482.63 2700.61 3458.96C2868.68 3418.71 2944.43 3395.03 3014.26 3363.07C3213.11 3270.73 3326.74 3146.43 3396.57 2948.73C3422.61 2875.34 3422.61 2865.87 3422.61 2223.06V1571.96L3024.92 1568.41C2807.13 1567.23 2624.85 1569.6 2620.12 1574.33ZM6367.46 1574.33C6355.62 1579.07 6352.07 1775.58 6352.07 2501.25C6352.07 3418.71 6352.07 3423.44 6375.74 3436.46C6393.5 3445.93 6675.2 3448.3 7343.94 3444.75C8377.24 3440.01 8353.57 3441.2 8505.07 3367.8C8582.01 3329.92 8692.08 3225.74 8726.41 3158.27C8802.16 3011.48 8784.4 2830.35 8681.43 2700.13C8609.23 2607.8 8476.66 2536.77 8299.12 2495.34C8267.16 2488.23 8241.12 2476.39 8243.49 2470.48C8244.67 2464.56 8270.71 2453.9 8300.3 2445.62C8541.76 2384.06 8682.61 2185.18 8649.47 1950.78C8621.07 1749.54 8469.56 1622.87 8204.43 1577.88C8141.7 1567.23 6392.31 1563.68 6367.46 1574.33ZM7752.29 1869.1C7832.78 1910.53 7890.77 2004.05 7890.77 2092.84C7890.77 2189.91 7816.2 2295.27 7728.62 2321.32C7680.09 2335.52 7136.81 2343.81 7123.79 2329.6C7113.14 2320.13 7106.03 1915.27 7115.5 1877.39L7121.42 1850.16H7418.51C7668.25 1850.16 7720.33 1853.71 7752.29 1869.1ZM7805.55 2644.5C7919.18 2695.4 7973.63 2811.41 7947.59 2945.18C7935.75 3004.37 7925.1 3024.5 7880.12 3069.48C7805.55 3144.06 7757.02 3152.35 7410.22 3152.35C7149.83 3152.35 7133.26 3151.17 7121.42 3129.86C7108.4 3105 7104.85 2693.03 7116.69 2645.68L7123.79 2619.64H7437.45C7729.8 2619.64 7753.47 2620.82 7805.55 2644.5Z"
      fill="var(--fenext-svg-color-1,#284D8A)"
    />
  </svg>
);

export const SvgCardVisa = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg fenext_svg_card_visa ${className}`}
    viewBox="0 0 10000 5000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="10000"
      height="5000"
      rx="940"
      fill="var(--fenext-svg-bg,#FFF)"
    />
    <path
      d="M4588.16 3471.5H4082.74L4398.62 1529.7H4904.09L4588.16 3471.5ZM3657.55 1529.7L3175.71 2865.28L3118.69 2577.68L3118.74 2577.78L2948.68 1704.53C2948.68 1704.53 2928.12 1529.7 2708.93 1529.7H1912.35L1903 1562.58C1903 1562.58 2146.6 1613.27 2431.68 1784.52L2870.79 3471.55H3397.39L4201.5 1529.7H3657.55ZM7632.92 3471.5H8097L7692.38 1529.65H7286.09C7098.47 1529.65 7052.78 1674.36 7052.78 1674.36L6298.98 3471.5H6825.85L6931.21 3183.06H7573.72L7632.92 3471.5ZM7076.77 2784.62L7342.33 2057.95L7491.72 2784.62H7076.77ZM6338.5 1996.66L6410.63 1579.67C6410.63 1579.67 6188.07 1495 5956.05 1495C5705.24 1495 5109.62 1604.65 5109.62 2137.83C5109.62 2639.49 5808.68 2645.72 5808.68 2909.23C5808.68 3172.73 5181.65 3125.51 4974.71 2959.35L4899.57 3395.35C4899.57 3395.35 5125.25 3505 5470.05 3505C5814.96 3505 6335.28 3326.37 6335.28 2840.19C6335.28 2335.32 5629.94 2288.31 5629.94 2068.8C5629.99 1849.24 6122.22 1877.45 6338.5 1996.66Z"
      fill="var(--fenext-svg-color,#2566AF)"
    />
  </svg>
);

export const SvgCardAmericanExpress = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    className={`fenext_svg fenext_svg_card_american_express ${className}`}
    viewBox="0 0 10000 5000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="10000"
      height="5000"
      rx="940"
      fill="var(--fenext-svg-bg,#FFF)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3166.02 4287.58H3153.91C3153.91 4281.53 3150.88 4272.43 3150.88 4269.38C3150.88 4266.36 3150.88 4260.32 3141.78 4260.32H3123.58V4287.58H3114.48V4223.92H3141.78C3153.91 4223.92 3162.99 4226.97 3162.99 4239.06C3162.99 4248.16 3159.95 4251.22 3156.94 4254.21C3159.98 4257.26 3162.99 4260.3 3162.99 4266.36V4278.48C3162.99 4281.53 3162.99 4281.53 3166.02 4281.53V4287.58ZM3153.91 4242.12C3153.91 4233.02 3147.84 4233.02 3144.81 4233.02H3123.58V4251.22H3141.78C3147.84 4251.22 3153.91 4248.16 3153.91 4242.12ZM3205.45 4254.23C3205.45 4217.87 3175.14 4187.51 3135.71 4187.51C3099.33 4187.51 3069 4217.87 3069 4254.23C3069 4293.64 3099.33 4324 3135.71 4324C3175.12 4323.98 3205.45 4293.64 3205.45 4254.23ZM3196.35 4254.23C3196.35 4287.6 3169.08 4311.84 3135.71 4311.84C3102.34 4311.84 3078.1 4287.58 3078.1 4254.23C3078.1 4223.92 3102.37 4196.62 3135.71 4196.62C3169.05 4196.62 3196.35 4223.92 3196.35 4254.23ZM6932 3029.16C6932 3120.14 6874.39 3162.54 6771.28 3162.54H6574.23V3071.56H6771.28C6789.48 3071.56 6804.65 3068.55 6810.73 3062.5C6816.78 3056.42 6822.85 3047.32 6822.85 3035.2C6822.85 3023.05 6816.8 3010.94 6810.73 3004.89C6804.65 2998.8 6792.53 2995.79 6774.34 2995.79C6680.37 2992.73 6562.09 2998.8 6562.09 2865.39C6562.09 2804.72 6601.5 2738.01 6707.62 2738.01H6910.77V2828.99H6722.77C6704.61 2828.99 6692.46 2828.99 6683.36 2835.04C6674.26 2844.14 6668.21 2853.24 6668.21 2868.41C6668.21 2883.57 6677.31 2892.67 6689.43 2898.76C6701.58 2901.77 6713.71 2904.81 6728.88 2904.81H6783.44C6841.05 2904.81 6877.44 2916.92 6901.71 2938.18C6919.87 2959.39 6932 2986.71 6932 3029.16ZM6504.46 2938.18C6480.19 2916.92 6443.79 2904.81 6386.18 2904.81H6331.63C6316.48 2904.81 6304.33 2901.75 6292.22 2898.76C6280.06 2892.67 6271.01 2883.57 6271.01 2868.41C6271.01 2853.24 6274.02 2844.14 6286.15 2835.04C6295.25 2828.99 6307.36 2828.99 6325.56 2828.99H6513.56V2738.01H6310.42C6201.24 2738.01 6164.84 2804.72 6164.84 2865.39C6164.84 2998.78 6283.12 2992.73 6377.13 2995.79C6395.28 2995.79 6407.44 2998.8 6413.48 3004.89C6419.53 3010.94 6425.64 3023.05 6425.64 3035.2C6425.64 3047.32 6419.55 3056.42 6413.48 3062.5C6404.38 3068.55 6392.27 3071.56 6374.07 3071.56H6176.98V3162.54H6374.07C6477.14 3162.54 6534.77 3120.12 6534.77 3029.16C6534.77 2986.71 6522.66 2959.39 6504.46 2938.18ZM6116.33 3074.64H5876.83V2989.72H6110.29V2904.85H5876.83V2825.98H6116.33V2738.05H5776.76V3162.57H6116.33V3074.64ZM5667.58 2759.29C5634.22 2741.09 5594.8 2738.03 5543.26 2738.03H5309.81V3162.54H5412.87V3007.9H5522.05C5558.41 3007.9 5579.66 3010.96 5594.83 3026.1C5613.03 3047.32 5613.03 3083.72 5613.03 3111.02V3162.54H5713.06V3080.66C5713.06 3041.25 5710.05 3023.05 5697.91 3001.83C5688.81 2989.68 5670.66 2974.53 5646.39 2965.43C5673.65 2956.38 5719.17 2919.97 5719.17 2853.24C5719.15 2804.75 5700.95 2777.44 5667.58 2759.29ZM5091.48 2738.03H4767.02L4636.64 2877.53L4512.32 2738.03H4102.98V3162.54H4506.27L4636.66 3023.05L4760.98 3162.54H4958.08V3020.06H5085.43C5173.35 3020.06 5261.32 2995.79 5261.32 2877.53C5261.3 2762.3 5170.32 2738.03 5091.48 2738.03ZM5585.7 2913.93C5570.56 2919.97 5555.39 2919.97 5537.19 2919.97L5412.87 2923.03V2825.96H5537.19C5555.39 2825.96 5573.59 2825.96 5585.7 2835.06C5597.86 2841.15 5606.92 2853.26 5606.92 2871.46C5606.92 2889.66 5597.86 2904.83 5585.7 2913.93ZM5091.48 2935.14H4958.06V2825.96H5091.48C5127.88 2825.96 5152.12 2841.15 5152.12 2877.53C5152.12 2913.93 5127.85 2935.14 5091.48 2935.14ZM4700.31 2950.29L4857.98 2783.53V3126.19L4700.31 2950.29ZM4454.71 3074.64H4203.03V2989.72H4427.41V2904.85H4203.03V2825.98H4457.74L4569.93 2950.31L4454.71 3074.64ZM6649.99 2431.76H6504.46L6313.43 2113.35V2431.76H6107.28L6067.82 2337.74H5855.58L5816.17 2431.76H5697.89C5649.38 2431.76 5585.7 2419.62 5549.35 2383.22C5515.98 2346.84 5497.78 2298.33 5497.78 2222.51C5497.78 2158.83 5506.88 2101.22 5552.34 2055.74C5582.65 2022.37 5637.25 2007.22 5706.97 2007.22H5803.99V2098.2H5706.97C5670.61 2098.2 5649.36 2104.27 5628.15 2122.47C5609.95 2140.67 5600.85 2174.02 5600.85 2219.5C5600.85 2264.98 5609.95 2298.35 5628.15 2319.58C5643.29 2334.73 5670.61 2340.8 5697.87 2340.8H5743.37L5888.9 2007.24H6040.52L6210.32 2407.51V2007.22H6368.01L6546.9 2301.36V2007.22H6649.97V2431.76H6649.99ZM5446.24 2007.22H5343.17V2431.76H5446.24V2007.22ZM5230.94 2025.42C5197.58 2007.22 5161.22 2007.22 5109.68 2007.22H4876.18V2431.76H4976.23V2277.09H5085.39C5121.79 2277.09 5146.05 2280.13 5161.2 2295.29C5179.4 2316.53 5176.34 2352.93 5176.34 2377.18V2431.76H5279.41V2346.84C5279.41 2310.46 5276.4 2292.26 5261.25 2271.03C5252.15 2258.89 5233.95 2243.72 5212.74 2234.65C5240 2222.51 5285.52 2189.17 5285.52 2122.45C5285.54 2073.94 5264.29 2046.64 5230.94 2025.42ZM4803.4 2343.83H4566.89V2258.91H4800.37V2170.99H4566.89V2095.17H4803.4V2007.24H4463.81V2431.78H4803.4V2343.83ZM4388 2007.22H4221.23L4096.91 2295.29L3963.49 2007.22H3799.76V2407.49L3626.93 2007.22H3475.33L3293.4 2431.76H3402.55L3441.96 2337.74H3654.2L3693.62 2431.76H3899.81V2098.2L4048.38 2431.76H4136.3L4284.89 2098.2V2431.76H4387.97L4388 2007.22ZM6031.47 2246.78L5961.7 2080L5891.98 2246.78H6031.47ZM5152.12 2180.09C5136.98 2189.19 5121.81 2189.19 5100.58 2189.19H4976.23V2095.19H5100.55C5118.75 2095.19 5139.94 2095.19 5152.1 2101.26C5164.21 2110.36 5170.3 2122.49 5170.3 2140.67C5170.3 2158.85 5164.23 2174 5152.12 2180.09ZM3478.34 2246.78L3548.08 2080L3617.83 2246.78H3478.34ZM6907.76 676H3290.34V2204.33L3414.66 1922.33H3678.45L3714.85 1992.08V1922.33H4024.13L4093.88 2073.94L4160.59 1922.33H5146.05C5191.51 1922.33 5230.92 1931.43 5261.27 1955.67V1922.33H5531.13V1955.67C5576.58 1931.41 5634.19 1922.33 5700.93 1922.33H6092.07L6128.46 1992.08V1922.33H6416.52L6458.98 1992.08V1922.33H6740.95V2516.67H6455.95L6401.39 2425.71V2516.67H6046.61L6007.2 2419.65H5919.23L5879.82 2516.67H5694.88C5622.1 2516.67 5567.5 2498.47 5531.15 2480.29V2516.67H5091.48V2380.21C5091.48 2362.01 5088.44 2358.98 5076.31 2358.98H5061.17V2516.65H4212.13V2440.84L4181.82 2516.65H4002.92L3972.61 2443.87V2516.65H3629.96L3593.58 2419.62H3505.64L3466.23 2516.65H3290.34V4308.81H6907.76V3220.16C6868.34 3238.36 6813.75 3247.46 6759.17 3247.46H6495.36V3211.06C6465.05 3235.35 6410.45 3247.46 6358.93 3247.46H5528.09V3111.02C5528.09 3092.82 5525.08 3092.82 5509.89 3092.82H5494.75V3247.46H5221.84V3086.75C5176.39 3107.96 5124.82 3107.96 5079.34 3107.96H5049.01V3247.46H4715.48L4636.66 3156.48L4548.74 3247.46H4012V2653.14H4557.79L4636.64 2744.08L4721.55 2653.14H5088.44C5130.87 2653.14 5200.63 2659.18 5230.94 2689.49V2653.14H5558.4C5591.77 2653.14 5655.47 2659.18 5697.89 2689.49V2653.14H6192.14V2689.52C6219.44 2665.25 6271.01 2653.16 6316.46 2653.16H6592.38V2689.52C6622.74 2668.3 6665.16 2653.16 6719.76 2653.16H6907.76V676Z"
      fill="var(--fenext-svg-color-1,#0077A6)"
    />
  </svg>
);

export const SvgCardMasterCard = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    className={`fenext_svg fenext_svg_card_mastercard ${className}`}
    viewBox="0 0 10000 5000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="10000"
      height="5000"
      rx="940"
      fill="var(--fenext-svg-bg,#FFF)"
    />
    <path
      d="M5670.39 1296.33H4330.54V3703.67H5670.39V1296.33Z"
      fill="var(--fenext-svg-color-1,#F16022)"
    />
    <path
      d="M4415.61 2500C4415.61 2011.62 4644.32 1576.66 5000.47 1296.33C4740.01 1091.32 4411.36 969 4054.16 969C3208.52 969 2523 1654.45 2523 2500C2523 3345.54 3208.52 4031 4054.16 4031C4411.36 4031 4740.01 3908.68 5000.47 3703.67C4644.32 3423.33 4415.61 2988.38 4415.61 2500Z"
      fill="var(--fenext-svg-color-2,#E91D25)"
    />
    <path
      d="M7477.94 2500C7477.94 3345.54 6792.42 4031 5946.78 4031C5589.58 4031 5260.93 3908.68 5000.47 3703.67C5356.63 3423.33 5585.32 2988.38 5585.32 2500C5585.32 2011.62 5356.63 1576.66 5000.47 1296.33C5260.93 1091.32 5589.58 969 5946.78 969C6792.42 969 7477.94 1654.45 7477.94 2500ZM7331.85 3448.7V3399.41H7351.72V3389.37H7301.1V3399.41H7320.99V3448.7H7331.85ZM7430.13 3448.7V3389.27H7414.61L7396.76 3430.15L7378.91 3389.27H7363.38V3448.7H7374.34V3403.87L7391.08 3442.52H7402.44L7419.18 3403.78V3448.7H7430.13Z"
      fill="var(--fenext-svg-color-3,#F69E1E)"
    />
  </svg>
);

export const SvgCardDiscover = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg fenext_svg_card_discover ${className}`}
    viewBox="0 0 10000 5000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="10000"
      height="5000"
      rx="940"
      fill="var(--fenext-svg-bg,#FFF)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1041 1854.49H1385.29C1449.5 1854.49 1513.66 1860.34 1571.98 1869.1C1875.38 1912.89 2114.63 2073.45 2114.63 2499.6C2114.63 2922.86 1875.38 3086.27 1571.98 3127.13C1513.66 3135.89 1449.45 3138.77 1385.29 3138.77H1041V1854.49ZM8848.16 2050.04C8894.8 2050.04 8929.84 2015.02 8929.84 1962.47C8929.84 1909.96 8894.8 1871.98 8848.16 1871.98C8801.43 1871.98 8766.39 1909.92 8766.39 1962.47C8766.39 2015.02 8801.43 2050.04 8848.16 2050.04ZM8848.16 1851.57C8862.72 1851.57 8877.13 1854.43 8890.58 1860C8904.03 1865.57 8916.25 1873.74 8926.55 1884.04C8936.84 1894.34 8945.01 1906.57 8950.57 1920.02C8956.14 1933.48 8959.01 1947.91 8959 1962.47C8959.01 1977.04 8956.15 1991.47 8950.59 2004.93C8945.02 2018.39 8936.86 2030.62 8926.56 2040.93C8916.27 2051.23 8904.05 2059.4 8890.59 2064.98C8877.14 2070.55 8862.72 2073.42 8848.16 2073.41C8833.6 2073.41 8819.18 2070.54 8805.73 2064.97C8792.28 2059.39 8780.06 2051.22 8769.77 2040.92C8759.47 2030.62 8751.31 2018.4 8745.73 2004.94C8740.16 1991.48 8737.29 1977.06 8737.29 1962.49C8737.29 1947.93 8740.16 1933.5 8745.73 1920.04C8751.31 1906.59 8759.47 1894.36 8769.77 1884.06C8780.06 1873.76 8792.28 1865.59 8805.73 1860.02C8819.18 1854.44 8833.6 1851.57 8848.16 1851.57ZM8848.16 1980L8842.28 1971.24H8827.72V2023.78H8804.31V1898.28H8853.91C8883.07 1898.28 8900.64 1909.96 8900.64 1936.22C8900.64 1956.63 8885.99 1968.31 8865.59 1971.24L8900.64 2023.78H8874.36L8848.16 1980ZM8848.16 1915.81H8851.04C8862.67 1915.81 8874.36 1918.73 8874.36 1933.34C8874.36 1950.87 8862.72 1953.75 8851.04 1953.75H8827.76V1915.81H8848.16ZM8037.09 2400.3C8133.38 2388.62 8212.1 2347.75 8212.1 2225.17C8212.1 2108.43 8133.42 2076.29 8037.09 2061.72H7862.01V2406.19H7943.69C7975.81 2406.19 8007.89 2403.22 8037.09 2400.3ZM8037.09 1857.42C8264.66 1866.18 8474.71 1912.89 8474.71 2204.76C8474.71 2356.56 8378.42 2482.07 8217.98 2502.48C8285.1 2511.24 8325.94 2578.4 8349.26 2636.79L8550.63 3138.77H8270.5L8118.82 2736C8095.5 2677.61 8075.1 2642.55 8037.14 2622.14C8016.74 2610.5 7984.66 2604.61 7943.73 2604.61H7862.05V3138.77H7611.16V1854.49H7882.45C7932.01 1854.49 7987.49 1854.49 8037.09 1857.42ZM5700.18 2239.78C5729.34 2315.66 5743.9 2400.34 5743.9 2496.68C5743.9 2587.16 5729.34 2674.73 5700.18 2753.53C5609.74 3001.54 5390.93 3162.15 5090.49 3162.15C4687.87 3162.15 4431.1 2887.76 4431.1 2496.63C4431.1 2102.54 4693.67 1834.04 5090.49 1834.04C5390.93 1834.04 5609.74 1991.69 5700.18 2239.78ZM5700.18 1968.31L6143.68 3138.77H6237L6730.05 1854.49H6467.44L6204.92 2531.65L5924.87 1854.49H5656.46L5700.18 1968.31ZM6794.26 1854.49H7541.08V2061.72H7048.02V2376.97H7497.27V2575.39H7048.06V2937.39H7544.04V3138.77H6794.3V1854.49H6794.26ZM1571.98 2082.18C1528.21 2067.57 1481.53 2061.72 1434.89 2061.72H1291.93V2937.39H1434.89C1481.58 2937.39 1528.26 2928.62 1571.98 2914.06C1726.62 2858.54 1852.07 2715.55 1852.07 2499.56C1852.11 2283.56 1726.62 2134.68 1571.98 2082.18ZM2213.84 1854.49H2467.64V3138.77H2213.84V1854.49ZM3281.63 2195.99C3194.11 2140.52 3100.79 2085.05 3001.58 2073.41C2911.14 2061.72 2814.86 2087.98 2814.86 2216.4C2814.86 2438.24 3369.19 2344.83 3369.19 2773.94C3369.19 3054.13 3147.47 3191.32 2893.66 3162.15C2756.54 3147.5 2677.77 3106.63 2569.81 3033.72V2770.98C2654.45 2817.72 2779.86 2908.17 2879.06 2925.7C2987.02 2943.23 3103.71 2911.05 3103.71 2794.35C3103.71 2546.26 2552.33 2648.39 2552.33 2225.13C2552.33 1939.1 2768.22 1834 2989.94 1834C3100.83 1834 3197.07 1874.86 3281.67 1950.74L3281.63 2195.99ZM4366.9 3010.35C4302.7 3092.15 4151.01 3138.77 4048.89 3147.54C3655.04 3173.83 3392.47 2954.92 3392.47 2520.01C3392.47 2082.18 3622.96 1825.32 4048.89 1848.69C4133.49 1851.61 4270.62 1880.79 4361.06 1956.67V2201.88C4253.1 2134.77 4142.25 2088.06 4048.89 2085.14C3789.24 2076.37 3655.04 2239.82 3655.04 2502.52C3655.04 2765.26 3780.48 2911.13 4048.89 2899.49C4153.89 2896.61 4311.46 2811.92 4366.9 2765.26V3010.35Z"
      fill="var(--fenext-svg-color-1,#000)"
    />
  </svg>
);

export const SvgCryingUnicorn = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 156 156.351"
  >
    <g data-name="Group 16130">
      <g data-name="unicorn (2)">
        <g data-name="Group 16061">
          <path
            data-name="Path 12354"
            d="M303.483 217.975s11.149-5.231 12.5-14.767-6.194-14.737-6.194-14.737 15.265-4.887 13.711-26.048-15.7-24.583-15.7-24.583 5.775-28.168-22.234-16.576c0 0 7.051-37.946-19.887-25.575l-7.27 67.871z"
            transform="translate(-179.673 -64.746)"
            fill="#96b4eb"
          />
          <path
            data-name="Path 12355"
            d="M336.507 315.125s16.458-4.742 15.115-26.9c-.242-3.985-3.311-9.67-4.276-12.558 1.14 31.634-21.985 42.609-42.17 22.547-1.083-1.077-6.081 9.462-7.52 9.034l31.633 38.568s12.045-5.2 13.64-15.136-6.422-15.555-6.422-15.555z"
            transform="translate(-206.935 -191.486)"
            fill="#8286ea"
          />
          <path
            data-name="Path 12356"
            d="M170.385 203.489c-4.608-12.409-11.882-22.107-20.31-28.458v.073c3.415-4.839 6.078-10.346 8.557-19.126l5.256-17.377a31.25 31.25 0 0 0-.383-18.333 16.817 16.817 0 0 0 5.383-5.125c4.939-7.117 3.08-19.508.864-21.046s-14.475 1.056-19.414 8.173c-.2.281-.377.562-.553.842a31.431 31.431 0 0 0-7.58-3.262l-18.647-5.267a27.757 27.757 0 0 0-4.1-.833 17.627 17.627 0 0 0-.093-5.91c-1.471-8.445-11.4-15.878-14.025-15.42s-9.461 10.807-7.99 19.253a16.606 16.606 0 0 0 2.728 6.883 36.794 36.794 0 0 0-9.642 9.005c-4.776 6.634-8.968 16.335-8.968 16.335-9.218 4.8-14.185 13.524-13.575 22.506a27.676 27.676 0 0 0 9.254 18.709c4.746 4.414 13.464 7.978 18.517 8.943l.776.374c-2.957 9.818-4.85 22.475-4.836 29.061"
            transform="translate(-47.301 -50.29)"
            fill="#fff"
          />
          <path
            data-name="Path 12357"
            d="M204.156 223.441c3.4-4.827 6.052-10.327 8.523-19.077l5.256-17.377a31.253 31.253 0 0 0-.383-18.333 16.816 16.816 0 0 0 5.383-5.125c4.939-7.117 3.08-19.508.864-21.046-1.022-.709-4.183-.537-7.775.55 1.445 2.423 1.214 13.535-3.647 19.792a17.064 17.064 0 0 1-5.234 4.65 33.939 33.939 0 0 1-2.007 17.563l-6.685 16.382a77.563 77.563 0 0 1-6.328 13.078 8.09 8.09 0 0 0 .339 9.111 52.565 52.565 0 0 1 6.906 12.927 7.639 7.639 0 0 1-7.566 10.319l-45.755-1.019a43.346 43.346 0 0 0-.394 6.039h78.781c-4.6-12.394-11.864-22.083-20.279-28.434z"
            transform="translate(-101.35 -98.677)"
            fill="#e1bdfc"
          />
          <path
            data-name="Path 12358"
            d="m277.594 276.932-6.927 4.689c4.638 8.685 18.438 20.4 18.768 33.134.26 5.037 7.969-2.558 9.963-14.134-3.735-11.036-17.693-19.105-21.804-23.689z"
            transform="translate(-188.188 -192.364)"
            fill="#c1e5ef"
          />
          <path
            data-name="Path 12359"
            d="m86.905 259.588 5.175 6.046c-8.8 5.561-14.813 14.1-19.464 25.951l-5.009-14.217c7.276-9.101 13.871-14.868 19.298-17.78z"
            transform="translate(-47.138 -180.317)"
            fill="#c1e5ef"
          />
          <path
            data-name="Path 12360"
            d="M250.754 66.013a3.036 3.036 0 0 0 .064-.421c1.348-5.281 1.09-10.272-1.513-14.841 1.629-5.874 1.415-10.882-1.5-14.671a127.582 127.582 0 0 0-2.347-23.029 1.117 1.117 0 0 0-2.193-.16c-2.35 6.351-4.149 12.363-4.4 17.428a13.83 13.83 0 0 0-2.975 11.79 17.56 17.56 0 0 0-3.11 12.323c-3.1 3.533-2.779 7.686-2.788 9.607.362 6.561 19.452 8.045 20.762 1.974z"
            transform="translate(-159.935 -8.369)"
            fill="#f6e06e"
          />
          <path
            data-name="Path 12361"
            d="M250.755 163.324a3.036 3.036 0 0 0 .064-.421 20.9 20.9 0 0 0 .172-10.764 21.7 21.7 0 0 1-.554 3.065 2.54 2.54 0 0 1-.053.359c-1.106 5.183-17.88 3.773-18.24-1.84 0-.317-.013-.706-.013-1.148-2.389 3.332-2.122 7-2.13 8.775.354 6.559 19.444 8.044 20.754 1.974z"
            transform="translate(-159.936 -105.68)"
            fill="#dda86a"
          />
          <path
            data-name="Path 12362"
            d="M137.885 131.749a21.714 21.714 0 0 0 12.148-8.133 14.68 14.68 0 1 1 21.107 20.129 19.093 19.093 0 0 1-18.355 3.356c-3.353-1.1-10.546-5.479-15.966-8.941a3.532 3.532 0 0 1 1.066-6.411z"
            transform="translate(-94.078 -81.825)"
            fill="#96b4eb"
          />
          <path
            data-name="Path 12363"
            d="M172.28 122.243a14.684 14.684 0 0 0-22.247 1.374 21.714 21.714 0 0 1-12.148 8.133 3.532 3.532 0 0 0-1.067 6.412c5.421 3.462 12.613 7.838 15.966 8.941a19.093 19.093 0 0 0 18.355-3.356 14.68 14.68 0 0 0 1.141-21.504zM169 135.8a13.69 13.69 0 0 1-12.631 4.828c-2.565-.345-8.369-2.525-12.767-4.285a2.568 2.568 0 0 1-.2-4.727 15.3 15.3 0 0 0 7.472-7.424 10.39 10.39 0 0 1 1.784-2.605A10.848 10.848 0 0 1 169 135.8z"
            transform="translate(-94.078 -81.826)"
            fill="#8286ea"
          />
          <path
            data-name="Path 12364"
            d="M194.445 142.223a3.121 3.121 0 0 1-2.3-5.235 13.678 13.678 0 0 1 9.718-4.733 2.954 2.954 0 0 1 3.214 2.856c.2 3.074-3.243 3.386-3.243 3.386a7.757 7.757 0 0 0-5.1 2.718 3.112 3.112 0 0 1-2.289 1.008z"
            transform="translate(-133.075 -91.866)"
            fill="#fff"
          />
          <path
            data-name="Path 12365"
            d="M166.815 300.757c-1.79 0-3.082-2.774-2.553-5.509 1.3-6.7 4.931-11.521 9.223-11.533s7.951 4.792 9.285 11.483c.545 2.732-.733 5.518-2.523 5.523z"
            transform="translate(-114.193 -197.076)"
            fill="#d789b9"
          />
          <path
            data-name="Path 12366"
            d="M179.057 286.726a7.344 7.344 0 0 0-5.572-3.011c-4.292.012-7.925 4.835-9.223 11.533-.53 2.735.763 5.514 2.553 5.509l4.188-.011c.006-.041.013-.082.022-.123-.975-.45-1.6-2.117-1.276-3.766.916-4.727 3.48-8.131 6.509-8.14a4.817 4.817 0 0 1 3.341 1.488c-.152-1.177-.314-2.344-.542-3.479z"
            transform="translate(-114.193 -197.076)"
            fill="#c668b9"
          />
          <path
            data-name="Path 12367"
            d="M72.524 126.886a13.07 13.07 0 0 1-2.692-3.034c-2.823-4.365-2.686-9.473.308-11.409s7.709.033 10.532 4.4a13.2 13.2 0 0 1 1.564 3.352"
            transform="translate(-47.272 -77.589)"
            fill="#c1e5ef"
          />
          <path
            data-name="Path 12368"
            d="M49.733 190.729a8.065 8.065 0 0 1-2.454-.5c-3.011-1.111-4.835-3.685-4.073-5.75s3.82-2.838 6.832-1.728a8.141 8.141 0 0 1 2.014 1.077"
            transform="translate(-30.067 -126.59)"
            fill="#c1e5ef"
          />
          <path
            data-name="Path 12369"
            d="m418.961.764 2.564 7.209a1.155 1.155 0 0 0 .6.677l6.4 2.885a1.278 1.278 0 0 1 0 2.257l-6.4 2.885a1.156 1.156 0 0 0-.6.677l-2.564 7.209a1.04 1.04 0 0 1-2.005 0l-2.564-7.209a1.155 1.155 0 0 0-.6-.677l-6.4-2.885a1.278 1.278 0 0 1 0-2.257l6.4-2.885a1.156 1.156 0 0 0 .6-.677l2.564-7.209a1.04 1.04 0 0 1 2.005 0z"
            transform="translate(-282.686)"
            fill="#fbf2aa"
          />
          <path
            data-name="Path 12370"
            d="m9.664 13.2 1.9 5.347a.858.858 0 0 0 .446.5l4.751 2.14a.948.948 0 0 1 0 1.674l-4.751 2.14a.858.858 0 0 0-.446.5l-1.9 5.347a.771.771 0 0 1-1.487 0l-1.9-5.347a.857.857 0 0 0-.446-.5l-4.751-2.14a.948.948 0 0 1 0-1.674l4.751-2.14a.858.858 0 0 0 .446-.5l1.9-5.347a.771.771 0 0 1 1.487 0z"
            transform="translate(-.575 -8.778)"
            fill="#fbf2aa"
          />
          <g data-name="Group 16060" transform="translate(40.249 10.235)">
            <circle
              data-name="Ellipse 139"
              cx="3.804"
              cy="3.804"
              r="3.804"
              transform="rotate(-5.682 7.587 .376)"
              fill="#f7e16e"
            />
            <path
              data-name="Path 12371"
              d="M497.985 116.559a2.954 2.954 0 1 1-2.954-2.954 2.954 2.954 0 0 1 2.954 2.954z"
              transform="translate(-382.235 -89.148)"
              fill="#f7e16e"
            />
          </g>
        </g>
        <g data-name="Group 16062">
          <path
            data-name="Path 12372"
            d="M165.085 298.366a4.816 4.816 0 0 1-3.888-2.172 10.141 10.141 0 0 1-1.141-8.74c2.017-6.169 5.844-9.859 10.237-9.87h.021c4.385 0 8.222 3.667 10.269 9.815a10.143 10.143 0 0 1-1.094 8.746 4.813 4.813 0 0 1-3.887 2.193l-10.505.028zm5.229-17.038h-.01c-2.657.007-5.22 2.8-6.688 7.289a6.406 6.406 0 0 0 .61 5.374c.138.19.5.63.859.63l10.505-.028c.362 0 .72-.444.857-.635a6.407 6.407 0 0 0 .582-5.377c-1.489-4.475-4.061-7.253-6.715-7.253z"
            transform="translate(-111.006 -192.817)"
            fill="#3c122c"
          />
          <path
            data-name="Path 12373"
            d="M150.912 239.9a1.873 1.873 0 0 1-.707-3.607 9.824 9.824 0 0 0 3.174-1.972 9.308 9.308 0 0 0-2.469-2.379 1.872 1.872 0 0 1 2.12-3.087c1.487 1.02 4.854 3.688 4.016 6.435-.731 2.4-4.34 4.028-5.429 4.472a1.874 1.874 0 0 1-.705.138zm2.528-5.426z"
            transform="translate(-103.701 -158.737)"
            fill="#3c122c"
          />
          <path
            data-name="Path 12374"
            d="M260.749 253.167a1.861 1.861 0 0 1-1-.289c-1.129-.712-4.761-3.27-4.118-6.315.617-2.917 4.77-4.409 5.6-4.678a1.873 1.873 0 0 1 1.161 3.561 6.641 6.641 0 0 0-3.08 1.858 6.747 6.747 0 0 0 2.441 2.409 1.873 1.873 0 0 1-1 3.455z"
            transform="translate(-177.694 -167.955)"
            fill="#3c122c"
          />
          <path
            data-name="Path 12375"
            d="M180.031 122.039c3.731-3.983 7.993-11.263 7.108-23.322-1.291-17.578-10.647-24.156-15.377-26.377.392-3.964.446-11.451-3.778-16.236.057-1.018.058-1.933.035-2.69-.06-2.015-.5-8.754-3.591-10.9s-9.562-.2-11.47.45a31.9 31.9 0 0 0-3.028 1.208c-.451-5.679-2.064-11.636-6.356-14.981-3.229-2.516-7.382-3.189-12.393-2.025a134.133 134.133 0 0 0-2.368-21.688 4.238 4.238 0 0 0-8.246-.659c-2.713 7.346-4.115 12.735-4.483 17.263a16.837 16.837 0 0 0-3.327 9.535 29.723 29.723 0 0 0-4.921-6.1c-1.446-1.379-6.451-5.832-10.137-5.188s-6.893 6.522-7.787 8.309c-1.461 2.92-3.76 8.693-2.74 14.554a22.117 22.117 0 0 0 1.188 4.281 18.779 18.779 0 0 1-4.8 1.9 5.423 5.423 0 0 0-3.312 8.127 106.144 106.144 0 0 0-8.3 15.136c-9.512 5.376-14.956 14.844-14.27 24.956a30.571 30.571 0 0 0 10.242 20.783c4.692 4.364 12.324 7.661 17.58 9.13-2.61 9.78-4.131 21.013-4.118 26.969a3.121 3.121 0 0 0 3.121 3.114h.007a3.121 3.121 0 0 0 3.115-3.128c-.013-6.121 1.743-18.326 4.7-28.155.7-2.175-1.189-3.925-3.179-4.34-4.326-.825-12.632-4.121-16.977-8.162a29.917 29.917 0 0 1-2.627-2.769c5.292-15.942 16.491-22.943 16.625-23.025a1.873 1.873 0 0 0-1.94-3.2c-.488.295-11.295 6.976-17.308 22.446a23.438 23.438 0 0 1-3.015-10.084c-.01-.15-.015-.3-.021-.448 6-9.911 17.423-13.346 17.541-13.38a1.872 1.872 0 0 0-1.042-3.6 38.623 38.623 0 0 0-15.206 9.287 22.2 22.2 0 0 1 10.632-11.387 3.122 3.122 0 0 0 1.424-1.53 105.9 105.9 0 0 1 8.006-14.849c6.257 3.886 10.655 6.261 13.084 7.06a21.823 21.823 0 0 0 6.822 1.1 20.729 20.729 0 0 0 13.317-4.8c.1-.084.2-.173.295-.259a25.057 25.057 0 0 0 3.529.253c4.657 0 9.6-1.329 10.535-5.193.006-.019.009-.037.014-.056s.012-.042.016-.064c0-.016.006-.031.009-.048s0-.021.006-.032c.029-.143.052-.279.067-.409a26.545 26.545 0 0 0 .785-5.135l.537.151a28.374 28.374 0 0 1 6.828 2.938 3.12 3.12 0 0 0 4.244-1.021c.178-.284.328-.512.473-.721 3.606-5.2 12.271-7.493 14.99-7.273 1.157 2.467 2.038 11.39-1.568 16.587a13.725 13.725 0 0 1-4.367 4.194 3.121 3.121 0 0 0-1.417 3.687 28.13 28.13 0 0 1 .352 16.481l-4.276 14.139C142.5 91.587 131.336 85.126 130.8 84.82a1.873 1.873 0 1 0-1.855 3.253c.134.076 12.893 7.457 19.077 19.757a60.176 60.176 0 0 1-5.256 12.765c-3.937-14.084-18.39-31.069-19.076-31.869a1.873 1.873 0 0 0-2.844 2.437c.178.208 17.666 20.761 19.069 34.246a3.068 3.068 0 0 0-.058.47v.073a3.121 3.121 0 0 0 1.744 2.932c8.137 6.3 14.617 15.508 18.761 26.669a3.123 3.123 0 0 0 2.926 2.036c.081 0 .162 0 .243-.011a3.041 3.041 0 0 0 1.809-.255c.518-.243 12.694-6.075 14.262-17.155a18.3 18.3 0 0 0-4.023-14.375 24.578 24.578 0 0 0 4.455-3.755zm-57.8-98.439c.008-.062.015-.123.019-.185v-.042a41.188 41.188 0 0 1 1.671-8.888c.528 3.955.85 7.615.972 11.035l-2.671-1.875v-.046zm-1.852 3.325 4.9 3.438.019.035c.025.049.052.1.079.143s.047.082.073.122.064.1.1.142c.018.025.034.052.053.077 1.576 2.052 1.786 4.691.657 8.884l-6.98-4.866a3.117 3.117 0 0 0-.053-.489 10.4 10.4 0 0 1 1.153-7.486zM98.8 26.616c1.971.74 6.505 4.322 8.93 8.759a16.438 16.438 0 0 0-9.532 3.1 16.656 16.656 0 0 0-3.533 3.451q-.523.691-1.094 1.331c-.091-.372-.175-.75-.244-1.145-1.067-6.13 3.408-13.748 5.473-15.5zm.7 38.15c-2.469-.812-7.989-3.916-15.543-8.74a1.66 1.66 0 0 1 .5-3.013 23.69 23.69 0 0 0 13.2-8.823 12.913 12.913 0 0 1 2.739-2.674 12.806 12.806 0 0 1 20.26 11.084 12.85 12.85 0 0 1-4.592 9.151 17.278 17.278 0 0 1-16.572 3.016zm22.285-3.9a16.659 16.659 0 0 0 1.993-4.4l4.675 3.013c-1.177.853-3.605 1.468-6.676 1.391zm7.947-5.019-5.318-3.428a16.539 16.539 0 0 0-7.514-14.382c.08-.02.162-.039.239-.064l11.1 7.74a1.841 1.841 0 0 0 .381.2 16.866 16.866 0 0 1 1.104 9.938zm12.047-5.8a34.659 34.659 0 0 0-5.821-2.225l-2.961-.836a19.138 19.138 0 0 0-1.364-3.468 3.127 3.127 0 0 0 .146-.371 23.279 23.279 0 0 0 1.291-10.015c2.848-.582 5.084-.261 6.672.975 3.189 2.482 4.055 8.48 4.055 13.932a19.385 19.385 0 0 0-2.026 2.012zm27.592 71.971a3.114 3.114 0 0 0-.837 5.53 12.688 12.688 0 0 1 4.893 11.742c-.75 5.3-5.494 9.141-8.421 11.04a65.484 65.484 0 0 0-17.813-24.957 65.943 65.943 0 0 0 7.339-17.544l5.248-17.35.016-.055a34.354 34.354 0 0 0 .245-17.874 21.235 21.235 0 0 0 4.316-4.652 17.343 17.343 0 0 0 1.174-1.963 26.141 26.141 0 0 1-.253 7.8 3.1 3.1 0 0 0 2.3 3.653c.489.128 11.993 3.347 13.348 21.785 1.342 18.3-11.044 22.677-11.551 22.847z"
            transform="translate(-40.2 -1.269)"
            fill="#3c122c"
          />
          <path
            data-name="Path 12376"
            d="M68.226 124.514a1.864 1.864 0 0 1-1.182-.421 14.883 14.883 0 0 1-3.082-3.468c-3.437-5.314-3.058-11.463.863-14a7.533 7.533 0 0 1 7.068-.319 13.736 13.736 0 0 1 6.053 5.273 15.024 15.024 0 0 1 1.785 3.831 1.873 1.873 0 0 1-3.587 1.077 11.261 11.261 0 0 0-1.343-2.874 10.116 10.116 0 0 0-4.352-3.851 3.971 3.971 0 0 0-3.591.008c-2.085 1.349-1.972 5.388.248 8.82a11.146 11.146 0 0 0 2.3 2.6 1.872 1.872 0 0 1-1.185 3.324z"
            transform="translate(-42.975 -73.344)"
            fill="#3c122c"
          />
          <path
            data-name="Path 12377"
            d="M45.482 188.342h-.078a9.9 9.9 0 0 1-3.025-.616 9.2 9.2 0 0 1-4.331-3.192 5.04 5.04 0 0 1 3.02-8.186 9.206 9.206 0 0 1 5.367.386 9.988 9.988 0 0 1 2.477 1.327 1.873 1.873 0 0 1-2.223 3.014 6.243 6.243 0 0 0-1.55-.827 5.518 5.518 0 0 0-3.152-.269c-.314.079-1.067.325-1.274.887a1.83 1.83 0 0 0 .393 1.5 5.518 5.518 0 0 0 2.572 1.843 6.162 6.162 0 0 0 1.882.388 1.873 1.873 0 0 1-.076 3.744z"
            transform="translate(-25.815 -122.331)"
            fill="#3c122c"
          />
        </g>
      </g>
    </g>
  </svg>
);

export const SvgPix = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M310.399 362.5C315.799 357.1 325.1 357.1 330.5 362.5L407.5 439.5C421.7 453.7 440.6 461.5 460.6 461.5H475.7L378.6 558.6C348.3 588.1 299.099 588.1 268.799 558.6L171.299 461.2H180.6C200.6 461.2 219.499 453.4 233.699 439.2L310.399 362.5ZM330.5 288.899C324.1 294.399 315.899 294.499 310.399 288.899L233.699 212.199C219.499 197.099 200.6 190.199 180.6 190.199H171.299L268.699 92.7595C299.099 62.4135 348.3 62.4135 378.6 92.7595L475.799 189.9H460.6C440.6 189.9 421.7 197.699 407.5 211.899L330.5 288.899ZM180.6 212.699C194.4 212.699 207.099 218.3 217.699 228.1L294.399 304.799C301.599 311.099 310.999 315.6 320.499 315.6C329.899 315.6 339.3 311.099 346.5 304.799L423.5 227.799C433.3 218.099 446.8 212.499 460.6 212.499H498.299L556.6 270.799C586.9 301.099 586.9 350.3 556.6 380.6L498.299 438.9H460.6C446.8 438.9 433.3 433.3 423.5 423.5L346.5 346.5C332.6 332.6 308.299 332.6 294.399 346.6L217.699 423.2C207.099 433 194.4 438.6 180.6 438.6H148.779L90.7595 380.6C60.4135 350.3 60.4135 301.099 90.7595 270.799L148.779 212.699H180.6Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgTwitch = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M459.86 172.47H421.23V282.17H459.86V172.47ZM353.69 172H315.06V281.75H353.69V172ZM189.52 69L93 160.42V489.58H208.83V581L305.36 489.58H382.61L556.38 325V69H189.52ZM517.76 306.75L440.54 379.87H363.3L295.7 443.87V379.87H208.83V105.58H517.76V306.75Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgColor = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 25C50 25.0879 50 25.1758 50 25.2637C49.9609 28.8281 46.7187 31.25 43.1543 31.25H33.5938C31.0059 31.25 28.9062 33.3496 28.9062 35.9375C28.9062 36.2695 28.9453 36.5918 29.0039 36.9043C29.209 37.9004 29.6387 38.8574 30.0586 39.8242C30.6543 41.1719 31.2402 42.5098 31.2402 43.9258C31.2402 47.0312 29.1309 49.8535 26.0254 49.9805C25.6836 49.9902 25.3418 50 24.9902 50C11.1914 50 0 38.8086 0 25C0 11.1914 11.1914 0 25 0C38.8086 0 50 11.1914 50 25ZM12.5 28.125C12.5 26.3965 11.1035 25 9.375 25C7.64648 25 6.25 26.3965 6.25 28.125C6.25 29.8535 7.64648 31.25 9.375 31.25C11.1035 31.25 12.5 29.8535 12.5 28.125ZM12.5 18.75C14.2285 18.75 15.625 17.3535 15.625 15.625C15.625 13.8965 14.2285 12.5 12.5 12.5C10.7715 12.5 9.375 13.8965 9.375 15.625C9.375 17.3535 10.7715 18.75 12.5 18.75ZM28.125 9.375C28.125 7.64648 26.7285 6.25 25 6.25C23.2715 6.25 21.875 7.64648 21.875 9.375C21.875 11.1035 23.2715 12.5 25 12.5C26.7285 12.5 28.125 11.1035 28.125 9.375ZM37.5 18.75C39.2285 18.75 40.625 17.3535 40.625 15.625C40.625 13.8965 39.2285 12.5 37.5 12.5C35.7715 12.5 34.375 13.8965 34.375 15.625C34.375 17.3535 35.7715 18.75 37.5 18.75Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgBancolombia = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M107.001 440.519L90.5491 350.365C89.6591 345.488 92.4766 340.695 97.1708 339.101L302.083 269.508L515.997 227.034C521.012 226.039 525.97 228.986 527.491 233.867L552.144 312.963C553.882 318.541 550.489 324.414 544.789 325.695L334.511 372.938L120.149 448.16C114.35 450.195 108.104 446.565 107.001 440.519Z"
      fill="currentColor"
    />
    <path
      d="M181.776 242.682L153.447 153.742C151.658 148.124 155.093 142.185 160.856 140.935L302.083 110.298L450.781 91.9969C455.495 91.4166 459.967 94.2329 461.481 98.7352L486.516 173.2C488.473 179.018 484.774 185.209 478.723 186.243L335.051 210.809L193.936 249.295C188.766 250.705 183.403 247.789 181.776 242.682Z"
      fill="currentColor"
    />
    <path
      d="M264.456 548.217L239.786 467.717C238.206 462.561 241 457.08 246.101 455.329L372.843 411.832L520.87 379.19C525.859 378.09 530.874 380.926 532.502 385.768L557.536 460.228C559.401 465.774 556.127 471.728 550.445 473.125L413.852 506.714L277.334 554.72C271.973 556.606 266.121 553.65 264.456 548.217Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgSave = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 448 512"
  >
    <path
      d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
      fill="currentColor"
    />
  </svg>
);

export const SvgZelle = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M356.376 17H301.829C292.44 17 284.829 24.6112 284.829 34V77.1738C284.829 86.5626 277.218 94.1738 267.829 94.1738H174.65C165.261 94.1738 157.65 101.785 157.65 111.174V177.909C157.65 187.298 165.261 194.909 174.65 194.909H323.366C337.489 194.909 345.453 211.132 336.817 222.306L148.549 465.889C146.248 468.866 145 472.523 145 476.285V532.704C145 542.093 152.611 549.704 162 549.704H263.385C272.773 549.704 280.385 557.315 280.385 566.704V614.884C280.385 624.318 288.067 631.948 297.501 631.883L363.671 631.432C373.015 631.368 380.556 623.776 380.556 614.433V566.704C380.556 557.315 388.167 549.704 397.556 549.704H488C497.389 549.704 505 542.093 505 532.704V466.651C505 457.262 497.389 449.651 488 449.651H329.333C315.217 449.651 307.25 433.442 315.874 422.266L501.459 181.742C503.755 178.766 505 175.114 505 171.357V111.174C505 101.785 497.389 94.1738 488 94.1738H390.376C380.987 94.1738 373.376 86.5626 373.376 77.1738V34C373.376 24.6112 365.765 17 356.376 17Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgEtsty = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M517 417C515.25 427.75 503.25 527 501.5 549C383.621 544.701 281.605 544.257 133 549V523.5C178.457 514.552 193.627 515.481 194 488.25C195.793 415.928 197.524 244.107 194 166.25C192.971 137.79 181.87 139.485 133 130.25V104.75C206.886 107.108 388.933 113.301 495.999 101C492.499 139.25 488.249 227.5 488.249 227.5H465C453.947 184.665 446.241 137 410.25 137H273.25C263 137 262.5 140.5 262.5 146.75V310.5C320.5 311 351 308 351 308C380.77 307.049 378.56 299.498 391.75 242.749H417.5C413.093 344.1 413.59 304.578 415.75 402.999H390C380.845 362.913 380.935 341.954 350.499 341.499C350.499 341.499 328.999 339.499 262.499 339.499V478.499C262.499 504.499 276.749 516.749 306.749 516.749H396C459.636 516.749 462.564 491.753 494.751 416.999H517V417Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgImgAvatar = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fal"
    data-icon="image-polaroid"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={`fenext_svg ${className}`}
  >
    <path
      fill="currentColor"
      d="M112 192a48 48 0 1 0-48-48 48 48 0 0 0 48 48zm0-64a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm304-96H32A32 32 0 0 0 0 64v384a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32V64a32 32 0 0 0-32-32zm0 416H32v-80h384zM85.2 336l52-69.33 40 53.33-12 16zm120 0l76-101.33 76 101.33zm210.8 0h-18.8L294 198.41c-6.06-8.07-19.56-8.07-25.62 0l-71.19 94.91L150 230.41c-6.06-8.07-19.56-8.07-25.62 0L45.18 336H32V64h384z"
    ></path>
  </svg>
);

export const SvgAmazon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M360.195 225.577C308.57 227.485 180.516 242.011 180.516 350.158C180.516 466.258 327.121 471.029 375.035 395.962C381.926 406.777 412.561 435.722 423.056 445.583L483.267 386.208C483.267 386.208 449.027 359.383 449.027 330.225V174.26C449.027 147.435 423.056 87 329.983 87C236.698 87 187.194 145.315 187.194 197.586L265.108 204.796C282.387 152.313 322.563 152.312 322.563 152.312C365.707 152.206 360.195 183.908 360.195 225.577V225.577ZM360.195 317.608C360.195 402.43 270.938 389.706 270.938 335.845C270.938 285.8 324.471 275.728 360.195 274.561V317.608V317.608ZM504.362 490.962C496.2 501.565 430.158 562 319.383 562C208.607 562 123.803 486.191 97.8315 454.913C90.6231 446.749 98.8915 442.932 103.662 446.113C181.364 493.295 302.74 571.012 498.532 478.239C506.482 474.316 512.63 480.359 504.362 490.962ZM546.552 493.295C539.662 510.047 529.591 521.71 524.079 526.163C518.249 530.934 514.008 529.026 517.189 522.134C520.369 515.242 537.648 472.831 530.651 463.819C523.761 455.019 491.429 459.26 479.769 460.426C468.32 461.487 465.988 462.547 464.928 460.108C462.49 454.065 487.931 443.674 504.68 441.554C521.323 439.645 548.142 440.705 553.442 447.597C557.365 453.004 553.442 476.33 546.552 493.295Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgCams = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="327.136" cy="310.864" r="79.017" fill="currentColor" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M321.798 493.458C435.026 493.458 526.815 396.649 526.815 277.229C526.815 157.809 435.026 61 321.798 61C208.57 61 116.781 157.809 116.781 277.229C116.781 396.649 208.57 493.458 321.798 493.458ZM338.883 138.415C338.883 147.556 331.473 154.966 322.333 154.966C313.192 154.966 305.782 147.556 305.782 138.415C305.782 129.274 313.192 121.864 322.333 121.864C331.473 121.864 338.883 129.274 338.883 138.415ZM445.663 309.263C445.663 375.607 391.88 429.39 325.536 429.39C259.192 429.39 205.409 375.607 205.409 309.263C205.409 242.918 259.192 189.135 325.536 189.135C391.88 189.135 445.663 242.918 445.663 309.263Z"
      fill="currentColor"
    />
    <path
      d="M73 537.856C73 525.659 78.5648 514.128 88.1135 506.54L134.932 469.333C146.443 460.185 162.045 458.09 175.561 463.877L305.301 519.42C315.17 523.645 326.322 523.726 336.251 519.645L473.303 463.311C486.583 457.852 501.77 459.93 513.096 468.755L561.586 506.54C571.313 514.119 577 525.761 577 538.092V544.292C577 567.957 556.567 586.448 533.02 584.093L324.778 563.269C322.085 563 319.373 563.005 316.681 563.283L117.116 583.928C93.5225 586.368 73 567.859 73 544.14V537.856Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgStremate = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="333.184"
      cy="324.538"
      r="242.038"
      stroke="currentColor"
      stroke-width="47"
    />
    <path
      d="M86 349.911C86 349.911 208.774 260.698 222.688 252.513C236.603 244.328 226.781 290.165 189.949 383.472C153.116 476.778 352.829 224.684 361.832 222.228C370.836 219.773 324.182 416.214 329.092 412.937C334.003 409.661 413.397 304.076 449.411 292.619C485.425 281.162 564 404.75 564 404.75"
      stroke="currentColor"
      stroke-width="45"
    />
  </svg>
);

export const SvgDesktop = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path
      d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V288H64V64H512z"
      fill="currentColor"
    />
  </svg>
);
export const SvgDesktopLayer = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 576 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_432_2)">
      <path
        d="M64 0C28.7 0 0 28.7 0 64V352C0 387.3 28.7 416 64 416H240L229.3 448H160C142.3 448 128 462.3 128 480C128 497.7 142.3 512 160 512H416C433.7 512 448 497.7 448 480C448 462.3 433.7 448 416 448H346.7L336 416H512C547.3 416 576 387.3 576 352V64C576 28.7 547.3 0 512 0H64ZM512 64V288H64V64H512Z"
        fill="currentColor"
      />
      <path d="M64 288L512 64V288H64Z" fill="currentColor" fillOpacity="0.5" />
    </g>
    <defs>
      <clipPath id="clip0_432_2">
        <rect width="576" height="512" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const SvgPadlock = ({ className = "" }: { className?: string }) => (
  <svg
    data-name="Group 15802"
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 21.425 26.887"
  >
    <g data-name="Group 27">
      <g data-name="Group 26">
        <path
          data-name="Path 103"
          d="M18.274 9.872H7.14V5.554a3.573 3.573 0 0 1 7.142 0v2.008h2.1V5.554a5.673 5.673 0 0 0-11.343 0v4.318H3.151A3.154 3.154 0 0 0 0 13.023v10.713a3.154 3.154 0 0 0 3.151 3.151h15.123a3.154 3.154 0 0 0 3.151-3.151V13.023a3.154 3.154 0 0 0-3.151-3.151zm1.05 13.863a1.051 1.051 0 0 1-1.05 1.05H3.151a1.051 1.051 0 0 1-1.05-1.05V13.023a1.051 1.051 0 0 1 1.05-1.05h15.123a1.051 1.051 0 0 1 1.05 1.05z"
          fill="currentColor"
        />
      </g>
    </g>
    <g data-name="Group 29">
      <g data-name="Group 28">
        <path
          data-name="Path 104"
          d="M10.713 15.019a1.943 1.943 0 0 0-1.052 3.576V20.9a1.05 1.05 0 0 0 2.1 0v-2.3a1.943 1.943 0 0 0-1.048-3.581z"
          fill="currentColor"
        />
      </g>
    </g>
  </svg>
);

export const SvgEye = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    className={`fenext_svg ${className}`}
  >
    <path
      d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"
      fill="currentColor"
    />
  </svg>
);

export const SvgEyeBar = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    className={`fenext_svg ${className}`}
  >
    <path
      d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c5.2-11.8 8-24.8 8-38.5c0-53-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zm223.1 298L373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5z"
      fill="currentColor"
    />
  </svg>
);

export const SvgCopy = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 23.469 29.309"
  >
    <g data-name="Group 15618">
      <path
        data-name="Path 11662"
        d="M64.592 85.4H50.967a2.318 2.318 0 0 0-2.317 2.317v19.55a2.318 2.318 0 0 0 2.317 2.317h13.625a2.318 2.318 0 0 0 2.317-2.317v-19.55a2.326 2.326 0 0 0-2.317-2.317zm.69 21.861a.7.7 0 0 1-.7.7H50.961a.7.7 0 0 1-.7-.7V87.717a.7.7 0 0 1 .7-.7h13.625a.7.7 0 0 1 .7.7z"
        transform="translate(-48.65 -80.274)"
        fill="currentColor"
      />
      <path
        data-name="Path 11663"
        d="M151.392 0h-13.625a2.318 2.318 0 0 0-2.317 2.317.81.81 0 0 0 1.621 0 .7.7 0 0 1 .7-.7h13.625a.7.7 0 0 1 .7.7v19.55a.7.7 0 0 1-.7.7.81.81 0 1 0 0 1.621 2.318 2.318 0 0 0 2.317-2.317V2.317A2.318 2.318 0 0 0 151.392 0z"
        transform="translate(-130.24)"
        fill="currentColor"
      />
    </g>
  </svg>
);
export const SvgCopyBox = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 624 624"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M100 0C44.7715 0 0 44.7715 0 100V524C0 579.228 44.7715 624 100 624H524C579.228 624 624 579.229 624 524V100C624 44.7715 579.229 0 524 0H100ZM280 392H472C480.8 392 488 384.8 488 376V171.9L420.1 104H280C271.2 104 264 111.2 264 120V376C264 384.8 271.2 392 280 392ZM472 440H280C244.7 440 216 411.3 216 376V120C216 84.7 244.7 56 280 56H420.2C432.9 56 445.1 61.1 454.1 70.1L521.9 138C530.9 147 536 159.2 536 171.9V376C536 411.3 507.3 440 472 440ZM88 248C88 212.7 116.7 184 152 184H184V232H152C143.2 232 136 239.2 136 248V504C136 512.8 143.2 520 152 520H344C352.8 520 360 512.8 360 504V472H408V504C408 539.3 379.3 568 344 568H152C116.7 568 88 539.3 88 504V248Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgCamsoda = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M268.502 477.999C237.001 443 231.5 430 230.5 400.5C229.5 371 243.502 277.499 248.502 258.999C253.502 240.499 282.502 197.999 282.502 197.999C282.502 197.999 325.502 141.499 307.502 153.999"
      stroke="currentColor"
      strokeWidth="15"
    />
    <path
      d="M357 466L351.464 469.863C293.2 510.522 212.929 471.44 209 400.5V400.5V369.255C209 347.151 211.419 325.114 216.214 303.537L218.3 294.151C222.747 274.139 229.838 254.809 239.385 236.668V236.668C244.787 226.404 250.955 216.561 257.835 207.223L279 178.5L314 140.5L325.781 129.318C337.52 118.176 350.942 108.953 365.553 101.989L389.009 90.809C394.27 88.3013 400.024 87 405.853 87H414.508C423.447 87 431.676 91.866 435.984 99.698V99.698C438.588 104.433 439.555 109.896 438.733 115.237L434.015 145.904C430.737 167.211 421.575 187.179 407.56 203.56L390.5 223.5"
      stroke="currentColor"
      strokeWidth="35"
    />
    <path
      d="M398.758 422.194L346.267 451.786C345.44 452.252 344.762 452.945 344.314 453.783L327.923 484.427C325.79 488.414 329.623 492.959 333.913 491.529L365.518 480.994C366.483 480.672 367.327 480.064 367.937 479.25L405.213 429.549C408.46 425.219 403.472 419.536 398.758 422.194Z"
      fill="currentColor"
    />
    <ellipse cx="392.5" cy="221" rx="17.5" ry="18.5" fill="currentColor" />
  </svg>
);

export const SvgDribbble = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M325 77C188.252 77 77 188.252 77 325C77 461.748 188.252 573 325 573C461.748 573 573 461.748 573 325C573 188.252 461.748 77 325 77ZM488.97 191.366C518.473 227.412 536.339 273.323 536.805 323.321C529.821 321.844 459.787 307.639 389.303 316.503C383.551 302.462 378.122 290.11 370.686 274.889C449.007 242.912 484.504 197.407 488.97 191.366V191.366ZM465.421 166.87C461.611 172.297 429.724 215.156 354.4 243.389C319.688 179.613 281.215 127.221 275.36 119.381C342.536 103.188 413.326 120.651 465.421 166.87V166.87ZM234.941 133.62C240.526 141.279 278.379 193.736 313.478 256.129C214.391 282.442 127.118 282.063 117.644 281.938C131.38 216.205 175.678 161.573 234.941 133.62ZM113.17 325.323C113.17 323.157 113.213 321.001 113.278 318.85C122.546 319.04 225.198 320.363 330.984 288.704C337.048 300.572 342.841 312.619 348.158 324.653C271.559 346.228 201.964 408.18 167.627 466.959C133.794 429.405 113.17 379.73 113.17 325.323ZM194.977 492.436C217.104 447.203 277.155 388.814 362.556 359.68C392.296 436.963 404.595 501.733 407.745 520.318C339.633 549.331 257.73 541.371 194.977 492.436V492.436ZM443.357 500.925C441.186 488.039 429.911 426.028 402.205 349.892C468.585 339.266 526.905 356.66 534.152 358.947C524.71 417.888 490.879 468.791 443.357 500.925Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgStripe = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M288.3 223.6C288.3 201.3 306.9 192.7 336.7 192.7C380.1 192.7 435.2 206 478.6 229.4V95.1C431.3 76.2 384.1 69 336.8 69C221.1 69 144 129.4 144 230.4C144 388.3 360.8 362.7 360.8 430.8C360.8 457.2 337.9 465.7 306.1 465.7C258.9 465.7 197.9 446.2 150 420.2V548.7C199.269 569.955 252.342 580.978 306 581.1C424.6 581.1 506.3 530.1 506.3 427.5C506.3 257.3 288.3 287.8 288.3 223.6V223.6Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgCancel = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 14.744 14.744"
  >
    <path
      data-name="Path 11636"
      d="M131.651 131.651a1.493 1.493 0 0 1-2.093 0l-4.851-4.851-4.851 4.851a1.48 1.48 0 0 1-2.093-2.093l4.851-4.851-4.851-4.851a1.48 1.48 0 0 1 2.093-2.093l4.851 4.851 4.851-4.851a1.48 1.48 0 0 1 2.093 2.093l-4.851 4.851 4.851 4.851a1.493 1.493 0 0 1 0 2.093z"
      transform="translate(-117.334 -117.334)"
      fill="currentColor"
    ></path>
  </svg>
);

export const SvgDownload = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 384 512"
  >
    <path
      d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z"
      fill="currentColor"
    />
  </svg>
);

export const SvgCheckSearch = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 16.493 15.689"
  >
    <g data-name="checked (1)">
      <g data-name="Group 14501">
        <path
          data-name="Path 11630"
          d="m16.006 12.309-.083-.083a1.512 1.512 0 0 0-2.18.047l-8.433 9.2-.166.071-.161-.074-2.092-2.445a1.67 1.67 0 0 0-2.447-.095 1.517 1.517 0 0 0-.161 1.954L4.6 26.928a1.306 1.306 0 0 0 1.064.546h.376a2.156 2.156 0 0 0 1.777-.93L16.2 14.438a1.673 1.673 0 0 0-.194-2.129z"
          transform="translate(0 -11.785)"
          fill="currentColor"
        ></path>
      </g>
    </g>
  </svg>
);

export const SvgDate = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={`fenext_svg ${className}`}
    color="#464646"
  >
    <path
      d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM80 256C71.16 256 64 263.2 64 272V336C64 344.8 71.16 352 80 352H368C376.8 352 384 344.8 384 336V272C384 263.2 376.8 256 368 256H80z"
      fill="currentColor"
    ></path>
  </svg>
);

export const SvgBars = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
      fill="currentColor"
    />
  </svg>
);

export const SvgArrowCollapse = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    className={`fenext_svg ${className}`}
  >
    <path
      d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"
      fill="currentColor"
    />
  </svg>
);

export const SvgClicks = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23.779 32.6"
    className={`fenext_svg ${className}`}
  >
    <g data-name="Group 15851">
      <path
        data-name="Path 12151"
        d="M91.042 84.962a2.729 2.729 0 0 0-.983.183 2.741 2.741 0 0 0-3.64-1.767 2.741 2.741 0 0 0-3.469-1.731v-2.9a2.743 2.743 0 0 0-5.487 0v11.862l-1.071-1.59-.025-.031a3.234 3.234 0 0 0-5.2 3.842l4.775 7.527.019.029a6.6 6.6 0 0 0 5.44 2.863h5.359a7.028 7.028 0 0 0 7.02-7.02v-8.523a2.747 2.747 0 0 0-2.738-2.744zm.868 11.266a5.151 5.151 0 0 1-5.145 5.145h-5.359a4.723 4.723 0 0 1-3.885-2.036l-4.774-7.525-.019-.029a1.359 1.359 0 0 1 2.157-1.648l4.454 6.612V78.742a.868.868 0 0 1 1.737 0v9.368h1.874v-3.861a.868.868 0 0 1 1.737 0v3.862h1.875v-2.184a.868.868 0 0 1 1.737 0v2.183h1.875v-.4a.868.868 0 1 1 1.737 0v8.523z"
        transform="translate(-70.307 -70.949)"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth=".6px"
      />

      <path
        data-name="Rectangle 7873"
        transform="translate(8.91 .3)"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth=".6px"
        d="M0 0h1.875v2.594H0z"
      />

      <path
        data-name="Rectangle 7874"
        transform="rotate(-47.655 9.757 -11.91)"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth=".6px"
        d="M0 0h2.594v1.875H0z"
      />
      <path
        data-name="Rectangle 7875"
        transform="rotate(-5.33 68.291 -147.055)"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth=".6px"
        d="M0 0h2.594v1.875H0z"
      />

      <path
        data-name="Rectangle 7876"
        transform="rotate(-42.345 5.704 -4.497)"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth=".6px"
        d="M0 0h1.875v2.594H0z"
      />
      <path
        data-name="Rectangle 7877"
        transform="rotate(-84.67 5.482 2.073)"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth=".6px"
        d="M0 0h1.875v2.594H0z"
      />
    </g>
  </svg>
);

export const SvgVisa = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 47.376 15.301"
  >
    <path
      data-name="visa (1)"
      fill="#1a2adf"
      d="m17.989 173.588-6.2 14.8h-4.05l-3.049-11.81a1.636 1.636 0 0 0-.911-1.3A16.1 16.1 0 0 0 0 174.018l.094-.43h6.512a1.784 1.784 0 0 1 1.765 1.512l1.613 8.565 3.983-10.074h4.022zm15.855 9.965c.018-3.9-5.4-4.116-5.362-5.862.011-.533.516-1.1 1.622-1.24a7.225 7.225 0 0 1 3.775.66l.672-3.137a10.289 10.289 0 0 0-3.58-.655c-3.784 0-6.447 2.012-6.47 4.892-.025 2.129 1.9 3.318 3.352 4.027 1.491.726 1.99 1.189 1.984 1.84-.01.993-1.19 1.427-2.29 1.447a8.011 8.011 0 0 1-3.933-.936l-.693 3.244a11.678 11.678 0 0 0 4.258.787c4.021 0 6.652-1.991 6.665-5.068m9.992 4.834h3.541l-3.09-14.8h-3.27a1.746 1.746 0 0 0-1.63 1.085l-5.741 13.714h4.018l.8-2.21h4.912zm-4.272-5.243 2.016-5.557 1.16 5.557zm-16.1-9.555-3.167 14.8h-3.834l3.168-14.8z"
      transform="translate(0 -173.319)"
    />
  </svg>
);

export const SvgNequi = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_536_73"
      // style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      // maskType='alpha'
      {...({ maskType: "alpha" } as any)}
      x="0"
      y="0"
      width="650"
      height="650"
    >
      <rect width="650" height="650" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_536_73)">
      <path
        d="M571.12 254.446L418.289 71.0466C387.46 34.0521 334.643 24.2837 292.622 47.8048L115.888 146.732C64.9366 175.252 49.1555 241.175 81.6691 289.675L249.883 540.598C285.317 593.455 360.455 600.208 404.747 554.517L566.099 388.067C601.684 351.359 603.849 293.722 571.12 254.446Z"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <path
        d="M502.744 140.873L278.688 58.4599C233.492 41.836 182.867 59.7847 158.237 101.165L54.6434 275.206C24.7784 325.38 44.0733 390.362 96.4809 416.108L367.62 549.306C424.735 577.364 493.183 545.644 508.695 483.929L565.206 259.102C577.669 209.52 550.726 158.522 502.744 140.873Z"
        fill="currentColor"
        fillOpacity="0.5"
      />
    </g>
  </svg>
);

export const SvgStripachat = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M343.214 523.611C486.44 516.728 600 419.245 600 300C600 176.288 477.774 76 327 76C176.226 76 54 176.288 54 300C54 417.994 165.188 514.679 306.285 523.365V524H327H343.214V523.611ZM343.214 523.611V372.557L454 245H195L306.285 372.557V523.365C313.123 523.786 320.031 524 327 524C332.443 524 337.849 523.869 343.214 523.611Z"
      fill="currentColor"
    />
    <path
      d="M175 545.5C129.5 565.5 90 567 90 567C90 567 103 557 127.5 521.5C152 486 147 464 147 464L243.5 512.5C243.5 512.5 220.5 525.5 175 545.5Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="15"
    />
  </svg>
);

export const SvgSnapchat = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M565.587 435.6C562.214 426.424 555.787 421.514 548.475 417.447C547.099 416.641 545.834 415.996 544.755 415.5C542.573 414.372 540.341 413.28 538.121 412.127C515.321 400.037 497.512 384.786 485.162 366.707C481.654 361.618 478.612 356.222 476.073 350.587C475.019 347.574 475.073 345.863 475.825 344.3C476.575 343.096 477.567 342.061 478.739 341.262C482.657 338.671 486.699 336.042 489.439 334.269C494.324 331.107 498.193 328.602 500.685 326.829C510.047 320.282 516.594 313.329 520.685 305.551C523.541 300.18 525.206 294.257 525.569 288.184C525.931 282.112 524.981 276.033 522.785 270.36C516.585 254.042 501.172 243.911 482.498 243.911C478.559 243.908 474.631 244.323 470.78 245.151C469.751 245.375 468.721 245.61 467.717 245.871C467.891 234.711 467.643 222.931 466.651 211.337C463.129 170.579 448.857 149.214 433.977 132.177C424.45 121.501 413.227 112.468 400.761 105.443C378.176 92.547 352.571 86 324.661 86C296.751 86 271.261 92.547 248.661 105.443C236.163 112.47 224.917 121.521 215.38 132.226C200.5 149.264 186.228 170.666 182.707 211.387C181.715 222.981 181.467 234.822 181.628 245.92C180.628 245.66 179.607 245.42 178.577 245.201C174.726 244.373 170.798 243.957 166.86 243.961C148.173 243.961 132.735 254.092 126.56 270.41C124.353 276.085 123.393 282.168 123.746 288.247C124.099 294.325 125.757 300.257 128.606 305.638C132.711 313.412 139.258 320.369 148.62 326.916C151.1 328.652 154.981 331.156 159.866 334.356C162.507 336.067 166.366 338.572 170.146 341.076C171.469 341.932 172.594 343.061 173.446 344.387C174.24 346.011 174.264 347.76 173.086 350.987C170.58 356.504 167.589 361.786 164.146 366.772C152.069 384.441 134.783 399.42 112.712 411.411C101.016 417.608 88.8608 421.75 83.7298 435.7C79.8618 446.228 82.3908 458.206 92.2238 468.3C95.8326 472.067 100.018 475.236 104.624 477.687C114.206 482.953 124.396 487.03 134.966 489.826C137.147 490.389 139.219 491.315 141.092 492.567C144.675 495.704 144.167 500.428 148.941 507.347C151.337 510.923 154.382 514.019 157.918 516.474C167.937 523.393 179.196 523.827 191.125 524.285C201.901 524.695 214.114 525.166 228.064 529.766C233.842 531.676 239.844 535.371 246.8 539.686C263.503 549.951 286.368 564 324.634 564C362.9 564 385.926 549.877 402.752 539.572C409.659 535.332 415.624 531.672 421.241 529.814C435.19 525.201 447.404 524.742 458.18 524.333C470.108 523.874 481.367 523.44 491.386 516.521C495.574 513.601 499.063 509.79 501.604 505.361C505.038 499.521 504.952 495.442 508.176 492.59C509.933 491.398 511.878 490.509 513.929 489.961C524.644 487.155 534.972 483.041 544.681 477.71C549.574 475.085 553.978 471.637 557.7 467.517L557.824 467.368C567.05 457.5 569.369 445.867 565.587 435.6ZM531.574 453.877C510.829 465.335 497.041 464.107 486.315 471.014C477.201 476.879 482.595 489.527 475.973 494.09C467.839 499.707 443.796 493.69 412.734 503.948C387.116 512.417 370.773 536.77 324.696 536.77C278.619 536.77 262.66 512.47 236.62 503.886C205.62 493.631 181.528 499.645 173.381 494.028C166.772 489.465 172.141 476.817 163.04 470.952C152.301 464.045 138.513 465.273 117.78 453.877C104.574 446.586 112.064 442.077 116.466 439.94C191.609 403.559 203.599 347.388 204.132 343.221C204.777 338.175 205.496 334.207 199.941 329.073C194.572 324.113 170.752 309.373 164.141 304.757C153.204 297.119 148.393 289.493 151.941 280.119C154.421 273.634 160.472 271.191 166.82 271.191C168.827 271.197 170.827 271.422 172.785 271.861C184.785 274.461 196.444 280.478 203.177 282.103C203.988 282.311 204.82 282.423 205.657 282.438C209.257 282.438 210.517 280.627 210.269 276.511C209.501 263.379 207.641 237.786 209.711 213.867C212.551 180.958 223.153 164.652 235.751 150.231C241.802 143.299 270.235 113.255 324.608 113.255C378.981 113.255 407.488 143.175 413.539 150.082C426.15 164.503 436.764 180.809 439.579 213.718C441.65 237.637 439.864 263.243 439.021 276.362C438.736 280.689 440.038 282.289 443.634 282.289C444.471 282.275 445.303 282.163 446.114 281.954C452.859 280.33 464.514 274.316 476.514 271.712C478.472 271.273 480.471 271.048 482.478 271.042C488.864 271.042 494.878 273.522 497.358 279.97C500.904 289.344 496.118 296.97 485.169 304.609C478.56 309.221 454.74 323.952 449.369 328.924C443.801 334.058 444.533 338.024 445.178 343.073C445.711 347.301 457.689 403.473 532.844 439.791C537.29 442.011 544.78 446.524 531.574 453.877Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgPaperClip = ({ className = "" }: { className?: string }) => (
  <svg className={`fenext_svg ${className}`} viewBox="0 0 448 512">
    <path
      d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z"
      fill="currentColor"
    />
  </svg>
);

export const SvgNumberIncrease = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 416 416"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M240 32C240 14.3 225.7 0 208 0C190.3 0 176 14.3 176 32V176H32C14.3 176 0 190.3 0 208C0 225.7 14.3 240 32 240H176V384C176 401.7 190.3 416 208 416C225.7 416 240 401.7 240 384V240H384C401.7 240 416 225.7 416 208C416 190.3 401.7 176 384 176H240V32Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgPlane = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={`fenext_svg ${className}`}
  >
    <path
      d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
      fill="currentColor"
    ></path>
  </svg>
);

export const SvgSoundCloud = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M116.4 310.2L122.2 375.2L116.4 443.5C116.1 446 114.2 447.9 112 447.9C109.8 447.9 107.8 446 107.8 443.5L102.2 375.2L107.8 310.2C107.8 308 109.7 306 112 306C114.2 306 116.1 308 116.4 310.2ZM137.8 264.6C135 264.6 133.1 266.8 132.8 269.6L127.8 375.2L132.8 443.5C133.1 446.3 135 448.5 137.8 448.5C140.3 448.5 142.5 446.3 142.5 443.5L148.3 375.2L142.5 269.6C142.5 266.8 140.3 264.6 137.8 264.6ZM163.3 240.5C160.2 240.5 158 242.7 157.7 245.8L153.3 375.8L157.7 443.6C158 446.7 160.2 448.9 163.3 448.9C166.1 448.9 168.6 446.7 168.6 443.6L173.9 375.8L168.6 245.8C168.6 242.7 166.1 240.5 163.3 240.5ZM12.2 337.1C10.8 337.1 10 338.2 9.7 339.6L5 375.2L9.7 410.2C10 411.6 10.8 412.7 12.2 412.7C13.6 412.7 14.4 411.6 14.7 410.2L20.3 375.2L14.7 339.6C14.4 338.2 13.6 337.1 12.2 337.1V337.1ZM35.8 315.2C34.4 315.2 33.3 316.3 33.3 317.7L26.9 375.2L33.3 431.3C33.3 433 34.4 434.1 35.8 434.1C37.2 434.1 38.3 433 38.6 431.6L45.8 375.2L38.6 317.7C38.3 316.3 37.2 315.2 35.8 315.2V315.2ZM61.1 303.8C59.4 303.8 58 305.2 57.8 307.1L52 375.2L57.8 441C58.1 442.7 59.5 444.1 61.1 444.1C62.8 444.1 64.2 442.7 64.2 441L71.1 375.2L64.2 307.1C64.2 305.2 62.8 303.8 61.1 303.8V303.8ZM86.4 301.6C84.5 301.6 82.8 303 82.8 305.2L77 375.2L82.8 443C82.8 445.2 84.5 446.6 86.4 446.6C88.3 446.6 90 445.2 90.3 443L96.7 375.2L90.3 305.2C90 303 88.3 301.6 86.4 301.6ZM327.8 190.7C326.7 189.9 325 189.3 323.6 189.3C321.4 189.3 319.4 190.1 318 191.2C316.1 192.9 314.9 195.4 314.7 197.9V198.7L311.4 375.4L313.1 407.9L314.8 439.6C315.1 444.3 319 448.2 323.7 448.2C328.4 448.2 332.3 444.3 332.3 439.6L336.2 375.4L332.3 197.9C331.9 194.9 330.3 192.1 327.8 190.7V190.7ZM301.1 206C299.7 205.2 298.3 204.6 296.7 204.6C295.1 204.6 293.6 205.2 292.3 206C290.1 207.4 288.7 209.9 288.7 212.7L288.4 214.4L285.6 375.2C285.6 375.2 285.6 375.5 288.7 440.8V441.1C288.7 442.8 289.3 444.4 290.4 445.8C292.1 447.7 294.3 448.9 296.8 448.9C299 448.9 301 447.8 302.4 446.4C304.1 445 304.9 443.1 304.9 440.8L305.2 434.1L308.3 375.5L305 212.7C304.7 209.9 303.3 207.4 301.1 206V206ZM189.7 228.5C186.6 228.5 183.9 231.3 183.9 234.6L179.5 375.2L183.9 442.4C184.2 445.7 186.7 448.2 189.7 448.2C193 448.2 195.5 445.7 195.8 442.4L200.8 375.2L195.8 234.6C195.6 231.3 193.1 228.5 189.7 228.5ZM566.4 291.3C555.6 291.3 545.3 293.5 535.8 297.4C529.4 226.6 470 171 397.5 171C379.7 171 362.5 174.3 347.2 180.4C341.1 182.6 339.4 184.8 339.4 189.6V439.3C339.4 444.3 343.3 447.9 348 448.5H566.3C609.6 448.5 644.9 413.5 644.9 370.2C645 326.6 609.7 291.3 566.4 291.3V291.3ZM269.7 231C265.5 231 262.2 234.3 261.9 238.8L258.6 375.5L261.9 441.1C262.2 445.3 265.5 448.6 269.7 448.6C273.9 448.6 277.2 445.3 277.2 441.1L281.1 375.5L277.2 238.8C276.9 234.3 273.9 231 269.7 231ZM216.1 223.2C212.8 223.2 209.7 226.3 209.7 229.9L205.8 375.2L209.7 442.1C210 445.7 212.8 448.5 216.1 448.5C219.7 448.5 222.5 445.7 222.8 442.1L227.2 375.2L222.8 229.9C222.5 226.3 219.7 223.2 216.1 223.2V223.2ZM242.8 226.6C238.9 226.6 235.9 229.7 235.9 233.5L232 375.2L235.9 441.6C236.2 445.5 239 448.5 242.8 448.5C246.6 448.5 249.7 445.4 249.7 441.6L253.9 375.2L249.7 233.5C249.7 229.6 246.7 226.6 242.8 226.6V226.6Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgSend = ({ className = "" }: { className?: string }) => (
  <svg className={`fenext_svg ${className}`} viewBox="0 0 512 512">
    <path
      d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
      fill="currentColor"
    />
  </svg>
);

export const SvgStack = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 26.002 29.353"
  >
    <g data-name="Group 15818">
      <g data-name="Group 15817">
        <path
          data-name="Path 12152"
          d="M46.959 6.422 37.763.694a5.562 5.562 0 0 0-5.381 0l-9.2 5.728a1.818 1.818 0 0 0 0 3.352l9.2 5.728a5.562 5.562 0 0 0 5.381 0l9.2-5.728a1.818 1.818 0 0 0-.004-3.352zm-10.5 6.383a2.8 2.8 0 0 1-2.744 0L26.308 8.1l7.408-4.687a2.8 2.8 0 0 1 2.744 0L43.868 8.1z"
          transform="translate(-22.072)"
          fill="currentColor"
        />
      </g>
    </g>
    <g data-name="Group 15820">
      <g data-name="Group 15819">
        <path
          data-name="Path 12153"
          d="m46.958 170.808-.192-.119-9.663 6.1-.641.406a2.8 2.8 0 0 1-2.744 0l-7.408-4.7-2.9-1.823-.229.142a1.818 1.818 0 0 0 0 3.352l9.2 5.728a5.562 5.562 0 0 0 5.381 0l9.2-5.728a1.818 1.818 0 0 0-.004-3.358z"
          transform="translate(-22.071 -157.709)"
          fill="currentColor"
        />
      </g>
    </g>
    <g data-name="Group 15822">
      <g data-name="Group 15821">
        <path
          data-name="Path 12154"
          d="m46.959 256.142-.192-.12-9.663 6.1-.641.406a2.8 2.8 0 0 1-2.744 0l-7.408-4.7L23.414 256l-.229.142a1.818 1.818 0 0 0 0 3.352l9.2 5.728a5.562 5.562 0 0 0 5.381 0l9.2-5.728a1.818 1.818 0 0 0-.007-3.352z"
          transform="translate(-22.072 -236.564)"
          fill="currentColor"
        />
      </g>
    </g>
  </svg>
);

export const SvgPaginationNext = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    className={`fenext_svg ${className}`}
  >
    <path
      d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"
      fill="currentColor"
    />
  </svg>
);

export const SvgQr = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 448 448"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 48C0 21.5 21.5 0 48 0H144C170.5 0 192 21.5 192 48V144C192 170.5 170.5 192 144 192H48C21.5 192 0 170.5 0 144V48ZM64 64V128H128V64H64ZM0 304C0 277.5 21.5 256 48 256H144C170.5 256 192 277.5 192 304V400C192 426.5 170.5 448 144 448H48C21.5 448 0 426.5 0 400V304ZM64 320V384H128V320H64ZM304 0H400C426.5 0 448 21.5 448 48V144C448 170.5 426.5 192 400 192H304C277.5 192 256 170.5 256 144V48C256 21.5 277.5 0 304 0ZM384 64H320V128H384V64ZM256 272C256 263.2 263.2 256 272 256H336C344.8 256 352 263.2 352 272C352 280.8 359.2 288 368 288H400C408.8 288 416 280.8 416 272C416 263.2 423.2 256 432 256C440.8 256 448 263.2 448 272V368C448 376.8 440.8 384 432 384H368C359.2 384 352 376.8 352 368C352 359.2 344.8 352 336 352C327.2 352 320 359.2 320 368V432C320 440.8 312.8 448 304 448H272C263.2 448 256 440.8 256 432V272ZM368 448C363.757 448 359.687 446.314 356.686 443.314C353.686 440.313 352 436.243 352 432C352 427.757 353.686 423.687 356.686 420.686C359.687 417.686 363.757 416 368 416C372.243 416 376.313 417.686 379.314 420.686C382.314 423.687 384 427.757 384 432C384 436.243 382.314 440.313 379.314 443.314C376.313 446.314 372.243 448 368 448ZM432 448C427.757 448 423.687 446.314 420.686 443.314C417.686 440.313 416 436.243 416 432C416 427.757 417.686 423.687 420.686 420.686C423.687 417.686 427.757 416 432 416C436.243 416 440.313 417.686 443.314 420.686C446.314 423.687 448 427.757 448 432C448 436.243 446.314 440.313 443.314 443.314C440.313 446.314 436.243 448 432 448Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgPaginationPre = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    className={`fenext_svg ${className}`}
  >
    <path
      d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"
      fill="currentColor"
    />
  </svg>
);

export const SvgMasterCard = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 105 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="105" height="70" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="15"
      >
        <use href="#image0_601_3" transform="scale(0.00952381 0.0153846)" />
      </pattern>
      <image
        id="image0_601_3"
        width="105"
        height="60"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAABBCAMAAADlo3pTAAAAeFBMVEVHcEz3nBf4nhrwQhPzbg/4nhr3nhruSgrrABrrABr3mxfsABnsABbrABj4mhbrABf7dQn4nhnrABnsARnrABfrABnrABn3nhn3nRj3nRn3nhj4nhn3nhnrABv3nhv/XwD+XgD4lBb5hQ/9VgH1MQv9aQP5RgXxHhFMHn2bAAAAHXRSTlMARt0eE/rtCez5cpAyfC9j/o7bu0bJp8Zeu4GfsQc513wAAAKxSURBVFjD3ZnZkqMwDEXZbRZDhx0SMD2Z7vn/PxwCaSYJhlzbVTzMfSZ1IukiW8IwhCJ2zrKU+t0o36dFmUQ2ET0Xm21jea7b973retW5jh1DQnaSpRPkQTQt81eWHTTWjXHXhBtpJsEwJAppJ5LvF4n9GM7J64VymxoJLCrFnBmWsp//G182OBPLCt7mje1wJmVTDp12hzPVrDH3Ayr87p1o6BjmY3k25J22y0US2iHKAq9HdIm3QKUPgbpv/gsiuZY4g07ZgaCBg6heiHIyCRAfQJRnClInA+JwVGtUCIJ+30F8+AQTaD+DEl8SxPkXiGqe+oVDwZCuC4gPHxipPym7YUGhpYoVcsef9AUGZS3NgqTyuZPK39JuWacU0qhPuaBsNKThFYRWyq21qjQJTJ83BwUbbw1Cg+qnoKJONXkS9jtL9SEuEuqJm8ULjZDgRuvGuPP+CEFcoiVFvhYJ7hOjx7XKBB8evQMb4luTFOu8TTKW6E1DsbtKW6I26EGkwPAPI3X/YUzH1anQfJ/wc6M87H1iet2I4z0i1ySBoJ4YET2kl1cSNyO9Mo1XPpJp2Rw9c29jAHpACdOHDhyV6pyhOG+EB9z35skwV3cf6rzmPmoUqukbJO5gc1Do9WhQ9EOzDFCKvQ8O6d/8DveJQcN4krPaoHInfxzeicpdTHJM+8kfeju/DpK5c9vXzR5aqrvVB9R3l9WWT3LLorZhuaMojoIjqmzRgg9GXVGQe9nYMeeoLT5A0HlzmR1lSLEoiysXAHl7m2zC3mewiMYzDdj5NrHGYn5UyuaMmBdvf9kbvP0MQPKdFFK2eImYzXYKrdaGPmzkYSqC0Yw9/Z6YZ9GC3vWawEa/1RBnBfMLFpH1cyuYVwUxMaTkRAlj4SyW5PbWz524DtrTpLatzc3njL+LjJKXN0fWrQAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);

export const SvgBorder = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      d="M0 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-336c0-8.8 7.2-16 16-16l336 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32C35.8 32 0 67.8 0 112L0 448zm160 0c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm192 0c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm-96 0c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm192 0c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm0 32c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32s-14.3-32-32-32zm0-128c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z"
      fill="currentColor"
    />
  </svg>
);

export const SvgBongacams = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 653 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M51.45 410.726L49.8586 457.672C48.6554 493.166 59.5541 528.015 80.766 556.5L85.8617 563.044C88.7885 566.802 93.2856 569 98.0492 569C101.879 569 105.573 567.577 108.413 565.008L108.879 564.585C112.458 561.347 114.5 556.746 114.5 551.92V548.902C114.5 545.668 113.843 542.467 112.569 539.495L109.41 532.124C107.807 528.384 106.571 524.496 105.718 520.517L104 512.5C99.3473 491.563 97 470.179 97 448.732V407.5V381V380.674C97 367.595 98.3886 354.553 101.142 341.767C103.045 332.934 105.593 324.253 108.765 315.793L114.5 300.5L114.921 299.304C120.959 282.144 128.69 265.628 138 250L151.124 230.993C152.034 229.675 153.174 228.532 154.489 227.619L160.732 223.284C165.43 220.021 171.94 222.502 173.275 228.065C173.425 228.686 173.5 229.323 173.5 229.962V254.5V277V279.47C173.5 293.273 170.063 306.858 163.5 319L152.5 344.5L143.5 361L135.025 375.74C133.018 379.23 130.535 382.423 127.648 385.228L118.238 394.369C115.848 396.69 114.5 399.88 114.5 403.211C114.5 405.989 115.438 408.685 117.162 410.863L124 419.5L128.3 425.951C130.718 429.577 134.106 432.451 138.078 434.245C144.076 436.954 150.941 436.994 156.971 434.356L157.95 433.928C161.6 432.331 164.828 429.907 167.378 426.847L169.61 424.167C172.189 421.073 174.291 417.611 175.846 413.896L177.914 408.956C180.953 401.696 185.1 394.952 190.207 388.964L197 381L212.5 365C221.113 355.725 231.136 347.869 242.201 341.722L248 338.5L257.491 333.87C264.214 330.591 272.224 331.479 278.065 336.152C280.004 337.703 281.626 339.612 282.843 341.776L284.081 343.978C287.899 350.764 289.141 358.699 287.581 366.328L285.5 376.5L283.786 383.164C281.946 390.322 278.75 397.06 274.372 403.014C270.486 408.3 265.728 412.885 260.303 416.574L256 419.5L230.5 438.5L202 458.5L173.5 481L147.5 508L135.64 519.103C128.351 525.927 124.878 535.895 126.349 545.771C127.104 550.841 129.129 555.638 132.236 559.715L134.077 562.133C140.015 569.926 149.25 574.5 159.048 574.5C162.001 574.5 164.94 574.083 167.777 573.262L172.834 571.798C179.244 569.943 185.348 567.161 190.953 563.541L196.771 559.784C203.241 555.605 209.277 550.791 214.79 545.412L227 533.5L248 512.5L252.025 508.377C262.977 497.158 272.691 484.795 281 471.5C289.244 457.649 300.262 445.652 313.361 436.26L320 431.5L330.224 425.631C341.216 419.32 353.669 416 366.344 416H369.682C370.893 416 372.101 416.086 373.299 416.257C386.217 418.102 395.674 429.377 395.244 442.419L394.732 457.951C394.578 462.619 393.664 467.231 392.024 471.604L388.5 481L371.5 512.5L360.5 533.5C354.249 544.15 361.272 557.673 373.58 558.685L378.262 559.07C381.694 559.352 385.14 558.73 388.257 557.266L402.58 550.538C411.774 546.22 420.049 540.17 426.954 532.72L435.5 523.5L443.034 515.79C452.316 506.292 460.521 495.799 467.5 484.5L472.366 473.899C478.059 461.495 489.665 452.834 503.175 450.904C505.056 450.635 506.953 450.5 508.853 450.5H522.527C528.49 450.5 534.433 449.823 540.243 448.482C551.606 445.86 562.245 440.748 571.393 433.515L579 427.5C595.268 414.22 609.798 398.941 622.245 382.027L623 381L630.978 369.602C634.975 363.893 638.183 357.672 640.518 351.106C643.484 342.764 645 333.975 645 325.121V300.5L640.5 266L635.814 245.601C633.286 234.597 629.106 224.039 623.417 214.287C617.509 204.159 610.045 195.022 601.299 187.213L600.5 186.5L575.5 166C563.559 158.371 550.605 152.461 537.017 148.442L522 144L521.314 143.851C506.481 140.626 491.345 139 476.165 139C463.414 139 450.689 140.147 438.145 142.428L429.5 144L416.91 146.338C402.026 149.102 387.535 153.675 373.76 159.955C364.934 163.979 356.436 168.688 348.344 174.038L344.343 176.685C334.475 183.21 325.33 190.765 317.06 199.223C310.697 205.73 304.877 212.746 299.659 220.202L293.5 229L292.816 230.197C287.971 238.676 284.544 247.888 282.669 257.471L281.261 264.668C281.087 265.554 281 266.455 281 267.358V267.756C281 273.323 284.434 278.313 289.634 280.301C294.7 282.238 300.433 280.939 304.169 277.007L306.38 274.679C307.125 273.895 307.799 273.045 308.394 272.141L320 254.5L336.5 235L350 220L359.324 210.893C367.403 203.002 376.532 196.265 386.455 190.872C391.811 187.962 397.376 185.454 403.105 183.371L422 176.5L431.376 174.437C441.761 172.153 452.364 171 462.998 171H466.249C477.365 171 488.43 172.504 499.143 175.47C509.997 178.476 520.387 182.955 530.024 188.782L537 193L538.696 194.324C551.145 204.04 561.893 215.759 570.5 229C579.656 245.677 584.5 264.475 584.5 283.5V298.841C584.5 308.54 582.82 318.166 579.535 327.292C576.858 334.727 573.146 341.747 568.508 348.144L566.833 350.454C562.953 355.806 558.572 360.776 553.75 365.297L546.953 371.669C540.349 377.861 532.927 383.118 524.896 387.294L520.508 389.576C514.866 392.51 508.827 394.604 502.58 395.794L494.094 397.411C492.048 397.8 489.949 397.821 487.895 397.472L485.519 397.067C476.098 395.464 467.5 402.722 467.5 412.278C467.5 414.724 466.918 417.135 465.803 419.312L457 436.5L447 458.5L436.72 478.614C435.924 480.171 434.691 481.462 433.173 482.33L424.06 487.537C419.717 490.019 414.671 485.655 416.5 481L422 465L423.659 460.465C427.523 449.904 429.5 438.746 429.5 427.5V424.803C429.5 415.701 427.602 406.699 423.929 398.371L422.973 396.206C422.325 394.737 421.571 393.318 420.717 391.959L419.781 390.47C414.316 381.776 404.768 376.5 394.5 376.5H384.42C375.83 376.5 367.262 377.387 358.854 379.147L351.784 380.627C350.596 380.875 349.428 381.209 348.289 381.627L318.481 392.542C316.548 393.25 314.5 391.819 314.5 389.761C314.5 389.587 314.515 389.414 314.546 389.243L318.641 366.158C319.545 361.063 320 355.897 320 350.722V346.095C320 341.056 319.306 336.04 317.938 331.19C315.676 323.169 311.541 315.682 305.993 309.462C300.773 303.609 294.288 298.86 287.114 295.69C280.115 292.597 272.548 291 264.896 291H247.519C244.546 291 241.613 291.683 238.946 292.998C225.484 299.631 209.912 289.119 211.031 274.153L212.316 256.963C212.438 255.324 212.423 253.678 212.269 252.041L209.328 220.797C208.782 214.992 207.07 209.357 204.296 204.228L198.328 193.197C194.429 185.99 186.895 181.5 178.701 181.5C175.28 181.5 171.904 182.287 168.835 183.8L153.63 191.295C143.296 196.389 133.975 203.32 126.12 211.749L118.632 219.785C104.359 235.103 93.3379 253.154 86.2348 272.849L68.522 321.962C58.2373 350.478 52.477 380.428 51.45 410.726Z"
      fill="currentColor"
    />
    <path
      d="M507.69 231.291L408.169 229.526C391.369 229.228 377.117 241.796 375.311 258.502L375.143 260.048C374.72 263.964 375.2 267.925 376.546 271.626L377.079 273.093C378.015 275.666 379.503 278.003 381.439 279.939C385.853 284.353 392.174 286.279 398.298 285.077L487.692 267.532C492.862 266.518 497.831 264.66 502.398 262.033L510.741 257.237C513.839 255.455 516.316 252.766 517.838 249.533L518.356 248.432C519.109 246.83 519.5 245.082 519.5 243.312C519.5 236.755 514.246 231.407 507.69 231.291Z"
      fill="currentColor"
    />
    <path
      d="M513.14 300.165L424.088 297.652C411.008 297.283 399.802 306.941 398.237 319.931L396.832 331.593C396.338 335.698 398.579 339.646 402.357 341.326C404.079 342.091 405.991 342.322 407.846 341.989L483 328.5L503.3 322.927C506.738 321.984 509.978 320.425 512.861 318.328L517.679 314.824C518.871 313.958 519.803 312.783 520.377 311.427C522.6 306.172 518.844 300.326 513.14 300.165Z"
      fill="currentColor"
    />
    <path
      d="M83 559.5L80.766 556.5M80.766 556.5V556.5C59.5541 528.015 48.6554 493.166 49.8586 457.672L51.45 410.726C52.477 380.428 58.2373 350.478 68.522 321.962L86.2348 272.849C93.3379 253.154 104.359 235.103 118.632 219.785L126.12 211.749C133.975 203.32 143.296 196.389 153.63 191.295L168.835 183.8C171.904 182.287 175.28 181.5 178.701 181.5V181.5C186.895 181.5 194.429 185.99 198.328 193.197L204.296 204.228C207.07 209.357 208.782 214.992 209.328 220.797L212.269 252.041C212.423 253.678 212.438 255.324 212.316 256.963L211.031 274.153C209.912 289.119 225.484 299.631 238.946 292.998V292.998C241.613 291.683 244.546 291 247.519 291H264.896C272.548 291 280.115 292.597 287.114 295.69V295.69C294.288 298.86 300.773 303.609 305.993 309.462V309.462C311.541 315.682 315.676 323.169 317.938 331.19V331.19C319.306 336.04 320 341.056 320 346.095V350.722C320 355.897 319.545 361.063 318.641 366.158L314.546 389.243C314.515 389.414 314.5 389.587 314.5 389.761V389.761C314.5 391.819 316.548 393.25 318.481 392.542L348.289 381.627C349.428 381.209 350.596 380.875 351.784 380.627L358.854 379.147C367.262 377.387 375.83 376.5 384.42 376.5H394.5V376.5C404.768 376.5 414.316 381.776 419.781 390.47L420.717 391.959C421.571 393.318 422.325 394.737 422.973 396.206L423.929 398.371C427.602 406.699 429.5 415.701 429.5 424.803V427.5V427.5C429.5 438.746 427.523 449.904 423.659 460.465L422 465L416.5 481V481C414.671 485.655 419.717 490.019 424.06 487.537L433.173 482.33C434.691 481.462 435.924 480.171 436.72 478.614L447 458.5L457 436.5L465.803 419.312C466.918 417.135 467.5 414.724 467.5 412.278V412.278C467.5 402.722 476.098 395.464 485.519 397.067L487.895 397.472C489.949 397.821 492.048 397.8 494.094 397.411L502.58 395.794C508.827 394.604 514.866 392.51 520.508 389.576L524.896 387.294C532.927 383.118 540.349 377.861 546.953 371.669L553.75 365.297C558.572 360.776 562.953 355.806 566.833 350.454L568.508 348.144C573.146 341.747 576.858 334.727 579.535 327.292V327.292C582.82 318.166 584.5 308.54 584.5 298.841V283.5V283.5C584.5 264.475 579.656 245.677 570.5 229V229V229C561.893 215.759 551.145 204.04 538.696 194.324L537 193L530.024 188.782C520.387 182.955 509.997 178.476 499.143 175.47V175.47C488.43 172.504 477.365 171 466.249 171H462.998C452.364 171 441.761 172.153 431.376 174.437L422 176.5L403.105 183.371C397.376 185.454 391.811 187.962 386.455 190.872V190.872C376.532 196.265 367.403 203.002 359.324 210.893L350 220L336.5 235L320 254.5L308.394 272.141C307.799 273.045 307.125 273.895 306.38 274.679L304.169 277.007C300.433 280.939 294.7 282.238 289.634 280.301V280.301C284.434 278.313 281 273.323 281 267.756V267.358C281 266.455 281.087 265.554 281.261 264.668L282.669 257.471C284.544 247.888 287.971 238.676 292.816 230.197L293.5 229L299.659 220.202C304.877 212.746 310.697 205.73 317.06 199.223V199.223C325.33 190.765 334.475 183.21 344.343 176.685L348.344 174.038C356.436 168.688 364.934 163.979 373.76 159.955V159.955C387.535 153.675 402.026 149.102 416.91 146.338L429.5 144L438.145 142.428C450.689 140.147 463.414 139 476.165 139V139C491.345 139 506.481 140.626 521.314 143.851L522 144L537.017 148.442C550.605 152.461 563.559 158.371 575.5 166V166L600.5 186.5L601.298 187.213C610.045 195.022 617.509 204.159 623.417 214.287V214.287C629.106 224.039 633.286 234.597 635.814 245.601L640.5 266L645 300.5V325.121C645 333.975 643.484 342.764 640.518 351.106V351.106C638.183 357.672 634.975 363.893 630.978 369.602L623 381L622.245 382.027C609.798 398.941 595.268 414.22 579 427.5V427.5L571.393 433.515C562.245 440.748 551.606 445.86 540.243 448.482V448.482C534.433 449.823 528.49 450.5 522.527 450.5H508.853C506.953 450.5 505.056 450.635 503.175 450.904V450.904C489.665 452.834 478.059 461.495 472.366 473.899L467.5 484.5V484.5C460.521 495.799 452.316 506.292 443.034 515.79L435.5 523.5L426.954 532.72C420.049 540.17 411.774 546.22 402.58 550.538L388.257 557.266C385.14 558.73 381.694 559.352 378.262 559.07L373.58 558.685C361.272 557.673 354.249 544.15 360.5 533.5V533.5L371.5 512.5L388.5 481L392.024 471.604C393.664 467.231 394.578 462.619 394.732 457.951L395.244 442.419C395.674 429.377 386.217 418.102 373.299 416.257V416.257C372.101 416.086 370.893 416 369.682 416H366.344C353.669 416 341.216 419.32 330.224 425.631L320 431.5L313.361 436.26C300.262 445.652 289.244 457.649 281 471.5V471.5V471.5C272.691 484.795 262.977 497.158 252.025 508.377L248 512.5L227 533.5L214.79 545.412C209.277 550.791 203.241 555.605 196.771 559.784L190.953 563.541C185.348 567.161 179.244 569.943 172.834 571.798L167.777 573.262C164.94 574.083 162.001 574.5 159.048 574.5V574.5C149.25 574.5 140.015 569.926 134.077 562.133L132.236 559.715C129.129 555.638 127.104 550.841 126.349 545.771V545.771C124.878 535.895 128.351 525.927 135.64 519.103L147.5 508L173.5 481L202 458.5L230.5 438.5L256 419.5L260.303 416.574C265.728 412.885 270.486 408.3 274.372 403.014V403.014C278.75 397.06 281.946 390.322 283.786 383.164L285.5 376.5L287.581 366.328C289.141 358.699 287.899 350.764 284.081 343.978L282.843 341.776C281.626 339.612 280.004 337.703 278.065 336.152V336.152C272.224 331.479 264.214 330.591 257.491 333.87L248 338.5L242.201 341.722C231.136 347.869 221.113 355.725 212.5 365V365L197 381L190.207 388.964C185.1 394.952 180.953 401.696 177.914 408.956L175.846 413.896C174.291 417.611 172.189 421.073 169.61 424.167L167.378 426.847C164.828 429.907 161.6 432.331 157.95 433.928L156.971 434.356C150.941 436.994 144.076 436.954 138.078 434.245V434.245C134.106 432.451 130.718 429.577 128.3 425.951L124 419.5L117.162 410.863C115.438 408.685 114.5 405.989 114.5 403.211V403.211C114.5 399.88 115.848 396.69 118.238 394.369L127.648 385.228C130.535 382.423 133.018 379.23 135.025 375.74L143.5 361L152.5 344.5L163.5 319V319C170.063 306.858 173.5 293.273 173.5 279.47V277V254.5V229.962C173.5 229.323 173.425 228.686 173.275 228.065V228.065C171.94 222.502 165.43 220.021 160.732 223.284L154.489 227.619C153.174 228.532 152.034 229.675 151.124 230.993L138 250V250C128.69 265.628 120.959 282.144 114.921 299.304L114.5 300.5L108.765 315.793C105.593 324.253 103.045 332.934 101.142 341.767V341.767C98.3886 354.553 97 367.595 97 380.674V381V407.5V448.732C97 470.179 99.3473 491.563 104 512.5V512.5L105.718 520.517C106.571 524.496 107.807 528.384 109.41 532.124L112.569 539.495C113.843 542.467 114.5 545.668 114.5 548.902V551.92C114.5 556.746 112.458 561.347 108.879 564.585L108.413 565.008C105.573 567.577 101.879 569 98.0492 569V569C93.2856 569 88.7885 566.802 85.8617 563.044L80.766 556.5ZM483 328.5L503.3 322.927C506.738 321.984 509.978 320.425 512.861 318.328L517.679 314.824C518.871 313.958 519.803 312.783 520.377 311.427V311.427C522.6 306.172 518.844 300.326 513.14 300.165L424.088 297.652C411.008 297.282 399.802 306.941 398.237 319.931L396.832 331.593C396.338 335.698 398.579 339.646 402.357 341.326V341.326C404.079 342.091 405.991 342.322 407.846 341.989L483 328.5ZM376.546 271.626L377.079 273.093C378.015 275.666 379.503 278.003 381.439 279.939V279.939C385.853 284.353 392.174 286.279 398.298 285.077L487.692 267.532C492.862 266.518 497.83 264.66 502.398 262.033L510.741 257.237C513.839 255.455 516.316 252.766 517.838 249.533L518.356 248.432C519.109 246.83 519.5 245.082 519.5 243.312V243.312C519.5 236.755 514.246 231.407 507.69 231.291L408.169 229.526C391.369 229.228 377.117 241.796 375.311 258.502L375.143 260.048C374.72 263.964 375.2 267.925 376.546 271.626Z"
      stroke="currentColor"
      strokeWidth="15"
    />
  </svg>
);

export const SvgFantime = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M129 543L156 469C156 469 181.5 481.5 185 483C188.5 484.5 213 485 221 483C229 481 231.5 479.5 239 469C246.5 458.5 247 448.5 247 448.5V405.5H197.5V330H247V252.5C247 252.5 245.5 233.5 251 221C256.5 208.5 263.5 196 280.5 179C297.5 162 313.5 148.5 339 148.5H387H420L397 118.5L427.5 86L515 195L427.5 290L397 252.5L420 224.5H387C378.5 224.5 374.5 227 365 235.5C355.5 244 351 256.5 351 262V330H434V405.5H351C351 405.5 352 451.5 351 461.5C350 471.5 342.5 490 339 498C335.5 506 311.5 531 303.5 537.5C295.5 544 265 557.5 255.5 560.5C246 563.5 212.5 564.5 203.5 564.5C194.5 564.5 172.5 562 166 560.5C159.5 559 129 543 129 543Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgX = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgXBox = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 624 624"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M100 0C44.7715 0 0 44.7715 0 100V524C0 579.228 44.7715 624 100 624H524C579.228 624 624 579.229 624 524V100C624 44.7715 579.229 0 524 0H100Z"
      fill="var(--color-box,black)"
    />
    <path
      d="M430.474 125H493.65L355.629 282.999L518 498H390.865L291.288 367.603L177.35 498H114.136L261.763 329.002L106 125H236.363L326.371 244.188L430.474 125ZM408.301 460.126H443.308L217.341 160.885H179.775L408.301 460.126Z"
      fill="var(--color-x,white)"
    />
  </svg>
);

export const SvgMercadoLibre = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M411.406 186.729L325.464 378.415C324.853 379.777 324.883 381.34 325.544 382.677L342.507 416.979C343.281 418.544 344.816 419.592 346.556 419.744L422.042 426.308C422.333 426.333 422.626 426.333 422.917 426.307L565.684 413.635C566.606 413.553 567.534 413.729 568.362 414.144L589.022 424.473C591.188 425.557 593.82 424.931 595.268 422.988L622.835 385.98C623.584 384.974 623.928 383.723 623.798 382.476L617.723 324.001C617.418 321.066 614.651 319.032 611.759 319.617L428.762 356.618C425.572 357.263 422.626 354.737 422.776 351.486L427.144 257.391C427.171 256.793 427.307 256.204 427.543 255.654L447.708 208.602C448.496 206.763 450.303 205.571 452.303 205.571H465.013C465.464 205.571 465.913 205.51 466.348 205.39L533.052 186.906C535.218 186.305 536.717 184.334 536.717 182.087V173.776C536.717 171.014 534.479 168.776 531.717 168.776H523.227C519.666 168.776 517.246 165.158 518.606 161.867L522.273 152.989C523.202 150.739 522.376 148.146 520.315 146.849L481.05 122.127C479.075 120.883 476.501 121.171 474.851 122.822L412.433 185.239C412.003 185.67 411.655 186.174 411.406 186.729Z"
      stroke="currentColor"
      strokeWidth="15"
    />
    <path
      d="M237.594 186.729L323.536 378.415C324.147 379.777 324.117 381.34 323.456 382.677L306.493 416.979C305.719 418.544 304.184 419.592 302.444 419.744L226.958 426.308C226.667 426.333 226.374 426.333 226.083 426.307L83.3161 413.635C82.3935 413.553 81.4664 413.729 80.638 414.144L59.9784 424.473C57.8115 425.557 55.1797 424.931 53.7325 422.988L26.165 385.98C25.4158 384.974 25.0719 383.723 25.2015 382.476L31.2769 324.001C31.5818 321.066 34.3488 319.032 37.2411 319.617L220.238 356.618C223.428 357.263 226.374 354.737 226.224 351.486L221.856 257.391C221.829 256.793 221.693 256.204 221.457 255.654L201.292 208.602C200.504 206.763 198.697 205.571 196.697 205.571H183.987C183.536 205.571 183.087 205.51 182.652 205.39L115.948 186.906C113.782 186.305 112.283 184.334 112.283 182.087V173.776C112.283 171.014 114.521 168.776 117.283 168.776H125.773C129.334 168.776 131.754 165.158 130.394 161.867L126.727 152.989C125.798 150.739 126.624 148.146 128.685 146.849L167.95 122.127C169.925 120.883 172.499 121.171 174.149 122.822L236.567 185.239C236.997 185.67 237.345 186.174 237.594 186.729Z"
      stroke="currentColor"
      strokeWidth="15"
    />
    <path
      d="M335.637 138.465C335.637 138.465 240.29 129.517 137.848 187.681C35.4059 245.845 31.8582 321.093 31.8582 321.093"
      stroke="currentColor"
      strokeWidth="15"
    />
    <path
      d="M332.641 138.397C332.641 138.397 426.33 128.984 525.165 190.168C624 251.351 618.021 329.222 618.021 329.222"
      stroke="currentColor"
      strokeWidth="15"
    />
    <path
      d="M332.002 529.547C332.002 529.547 248.539 534.715 158.865 501.125C69.1915 467.535 64.3756 422.066 64.3756 422.066"
      stroke="currentColor"
      strokeWidth="35"
    />
    <path
      d="M329.645 529.586C329.645 529.586 411.025 535.022 498.461 499.688C585.898 464.355 588.926 418.644 588.926 418.644"
      stroke="currentColor"
      strokeWidth="35"
    />
  </svg>
);

export const SvgEarringWatch = ({ className = "" }: { className?: string }) => (
  <svg
    data-name="Group 16126"
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 19.957 19.957"
  >
    <g data-name="Group 16057">
      <g data-name="Group 16056">
        <path
          data-name="Path 12346"
          d="M17.868 14.838a.78.78 0 0 0-1.091.16 8.5 8.5 0 0 1-.45.554.78.78 0 1 0 1.168 1.033c.186-.21.365-.431.532-.656a.779.779 0 0 0-.159-1.091z"
        />
        <path
          data-name="Path 12347"
          d="M19.171 11.182a.78.78 0 0 0-.928.6 8.21 8.21 0 0 1-.181.689.78.78 0 1 0 1.49.46 9.93 9.93 0 0 0 .215-.818.78.78 0 0 0-.596-.931z"
        />
        <path
          data-name="Path 12348"
          d="M14.115 17.334a8.431 8.431 0 0 1-.637.321.78.78 0 1 0 .642 1.421c.256-.116.51-.244.755-.381a.78.78 0 0 0-.76-1.361z"
        />
        <path
          data-name="Path 12349"
          d="M9.198 3.742v5.914l-2.859 2.859a.78.78 0 0 0 1.1 1.1l3.087-3.087a.78.78 0 0 0 .228-.551V3.742a.78.78 0 1 0-1.559 0z"
        />
        <path
          data-name="Path 12350"
          d="M19.177 1.676a.78.78 0 0 0-.78.78V4.62a9.979 9.979 0 1 0-8.419 15.337h.039c.281 0 .565-.012.843-.035a.78.78 0 1 0-.13-1.554c-.236.02-.476.03-.713.03h-.039a8.419 8.419 0 1 1 7.248-12.707h-2.144a.78.78 0 0 0 0 1.559h2.38a2.479 2.479 0 0 0 1.3-.365.778.778 0 0 0 .07-.045 2.494 2.494 0 0 0 1.128-2.085v-2.3a.78.78 0 0 0-.783-.779z"
          fill="currentColor"
        />
      </g>
    </g>
  </svg>
);

export const SvgTrash = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 19.389 23.873"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g data-name="delete (1)">
      <path
        data-name="Path 12121"
        d="M12.993 8.646a.559.559 0 0 0-.559.559v10.567a.559.559 0 0 0 1.118 0V9.208a.559.559 0 0 0-.559-.562zm0 0"
        fill="currentColor"
      />
      <path
        data-name="Path 12122"
        d="M6.396 8.646a.559.559 0 0 0-.559.559v10.567a.559.559 0 0 0 1.118 0V9.208a.559.559 0 0 0-.559-.562zm0 0"
        fill="currentColor"
      />
      <path
        data-name="Path 12123"
        d="M1.588 7.108v13.774a3.085 3.085 0 0 0 .82 2.127 2.753 2.753 0 0 0 2 .864h10.575a2.753 2.753 0 0 0 2-.864 3.085 3.085 0 0 0 .82-2.127V7.108a2.136 2.136 0 0 0-.548-4.2H14.39v-.7A2.2 2.2 0 0 0 12.176.002H7.212a2.2 2.2 0 0 0-2.214 2.207v.7H2.136a2.136 2.136 0 0 0-.548 4.2zm13.4 15.647H4.403a1.771 1.771 0 0 1-1.7-1.873V7.157h13.98v13.725a1.771 1.771 0 0 1-1.7 1.873zM6.116 2.209a1.077 1.077 0 0 1 1.1-1.09h4.964a1.077 1.077 0 0 1 1.1 1.09v.7H6.116zm-3.98 1.817h15.117a1.006 1.006 0 0 1 0 2.013H2.136a1.006 1.006 0 0 1 0-2.013zm0 0"
        fill="currentColor"
      />
      <path
        data-name="Path 12124"
        d="M9.694 8.646a.559.559 0 0 0-.559.559v10.567a.559.559 0 0 0 1.118 0V9.208a.559.559 0 0 0-.559-.562zm0 0"
        fill="currentColor"
      />
    </g>
  </svg>
);

export const SvgGoogle = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 42.552 42.552"
  >
    <path
      fill="#fbbd00"
      d="M9.973 113.162a11.233 11.233 0 0 1 1.59-5.774v-7.173H4.39a21.287 21.287 0 0 0 0 25.894h7.173v-7.173a11.233 11.233 0 0 1-1.59-5.774z"
      transform="translate(0 -91.886)"
    ></path>
    <path
      fill="#0f9d58"
      d="M200.987 374.543L196 379.53l4.987 4.987a21.115 21.115 0 0 0 12.947-4.39v-7.165h-7.165a11.3 11.3 0 0 1-5.782 1.581z"
      transform="translate(-179.711 -341.965)"
    ></path>
    <path
      fill="#31aa52"
      d="M60 325.477l-7.173 7.173a21.6 21.6 0 0 0 1.842 2.1 21.137 21.137 0 0 0 15.044 6.232v-9.973A11.307 11.307 0 0 1 60 325.477z"
      transform="translate(-48.433 -298.427)"
    ></path>
    <path
      fill="#3c79e6"
      d="M277.276 202.2a21.462 21.462 0 0 0-.348-3.854l-.187-1.022H256v9.976h10.094a11.251 11.251 0 0 1-4.312 4.624l7.165 7.165a21.61 21.61 0 0 0 2.1-1.842 21.137 21.137 0 0 0 6.229-15.047z"
      transform="translate(-234.724 -180.925)"
    ></path>
    <path
      fill="#cf2d48"
      d="M208.979 13.283l.881.881 7.052-7.052-.881-.881A21.137 21.137 0 0 0 200.986 0L196 4.987l4.987 4.987a11.229 11.229 0 0 1 7.992 3.309z"
      transform="translate(-179.711 0)"
    ></path>
    <path
      fill="#eb4132"
      d="M69.708 9.973V0a21.137 21.137 0 0 0-15.044 6.231 21.6 21.6 0 0 0-1.842 2.1l7.173 7.169a11.308 11.308 0 0 1 9.713-5.527z"
      transform="translate(-48.432 0)"
    ></path>
  </svg>
);

export const SvgSteam = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M573 325C573 462 461.8 573 324.6 573C210.8 573 115 496.7 85.6 392.6L180.8 431.9C187.2 464 215.7 488.3 249.7 488.3C288.9 488.3 321.6 455.9 319.9 414.8L404.4 354.6C456.5 355.9 500.2 313.7 500.2 261.1C500.2 209.5 458.2 167.6 406.5 167.6C354.8 167.6 312.8 209.6 312.8 261.1V262.3L253.6 348C238.1 347.1 222.9 351.4 210.1 360.1L77 305.1C87.2 177.4 194.1 77 324.6 77C461.8 77 573 188 573 325ZM232.7 453.3L202.2 440.7C207.805 452.338 217.482 461.518 229.4 466.5C256.3 477.7 287.2 464.9 298.4 438.1C303.8 425.1 303.9 410.8 298.5 397.8C293.1 384.8 283 374.6 270 369.2C257.1 363.8 243.3 364 231.1 368.6L262.6 381.6C282.4 389.8 291.8 412.5 283.5 432.3C275.2 452.2 252.5 461.5 232.7 453.3V453.3ZM406.5 323.4C372.1 323.4 344.1 295.4 344.1 261.1C344.1 226.8 372.1 198.8 406.5 198.8C440.9 198.8 468.9 226.8 468.9 261.1C468.9 295.4 441 323.4 406.5 323.4V323.4ZM406.6 307.8C432.5 307.8 453.5 286.8 453.5 261C453.5 235.1 432.5 214.2 406.6 214.2C380.7 214.2 359.7 235.2 359.7 261C359.8 286.8 380.8 307.8 406.6 307.8Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgVideo = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 50 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 5.66667C0 2.54115 2.49132 0 5.55556 0H27.7778C30.842 0 33.3333 2.54115 33.3333 5.66667V28.3333C33.3333 31.4589 30.842 34 27.7778 34H5.55556C2.49132 34 0 31.4589 0 28.3333V5.66667ZM48.533 3.16979C49.4358 3.66563 50 4.62187 50 5.66667V28.3333C50 29.3781 49.4358 30.3344 48.533 30.8302C47.6302 31.326 46.5365 31.2729 45.6771 30.6885L37.3437 25.0219L36.1111 24.1807V22.6667V11.3333V9.81927L37.3437 8.97812L45.6771 3.31146C46.5278 2.73594 47.6215 2.67396 48.533 3.16979V3.16979Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgSize = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 662 662"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.2 618.9C2.7 643.1 23.1 662 48 662H144H464C490.5 662 512 640.5 512 614V518C512 491.5 490.5 470 464 470H416V550C416 558.8 408.8 566 400 566C391.2 566 384 558.8 384 550V470H320V550C320 558.8 312.8 566 304 566C295.2 566 288 558.8 288 550V470H224V550C224 558.8 216.8 566 208 566C199.2 566 192 558.8 192 550V470H112C103.2 470 96 462.8 96 454C96 445.2 103.2 438 112 438H192V374H112C103.2 374 96 366.8 96 358C96 349.2 103.2 342 112 342H192V278H112C103.2 278 96 270.8 96 262C96 253.2 103.2 246 112 246H192V198C192 171.5 170.5 150 144 150H48C21.5 150 0 171.5 0 198V518V614C0 615.7 0.1 617.3 0.2 618.9Z"
      fill="currentColor"
    />
    <rect
      x="234"
      y="17"
      width="411"
      height="411"
      rx="30"
      stroke="currentColor"
      strokeWidth="20"
    />
  </svg>
);

export const SvgFont = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      d="M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32h-1.8l18-48H303.8l18 48H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H390.2L254 52.8zM279.8 304H168.2L224 155.1 279.8 304z"
      fill="currentColor"
    />
  </svg>
);

export const SvgTheme = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 209 172"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M198 0H11C4.92487 0 0 4.92487 0 11V161C0 167.075 4.92487 172 11 172H198C204.075 172 209 167.075 209 161V11C209 4.92487 204.075 0 198 0Z"
      fill="var(--fenext-svg-theme-bg,#404040)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M63 23C67.4183 23 71 26.5817 71 31V164C71 168.08 67.9463 171.446 64 171.938V172H63H31H23V164V142V31C23 26.5817 26.5817 23 31 23H63Z"
      fill="var(--fenext-svg-theme-bar,#161618)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M192 23H78H75H64V34V161V172H75H78H198C204.075 172 209 167.075 209 161V41V34V23H198H192Z"
      fill="var(--fenext-svg-theme-bg-content,#242424)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M87 33H126C130.971 33 135 37.0294 135 42V173C135 177.971 130.971 182 126 182H87C82.0294 182 78 177.971 78 173V42C78 37.0294 82.0294 33 87 33ZM154 33H193C197.971 33 202 37.0294 202 42V173C202 177.971 197.971 182 193 182H154C149.029 182 145 177.971 145 173V42C145 37.0294 149.029 33 154 33Z"
      fill="var(--fenext-svg-theme-col,#313131)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M87 51C87 48.7909 88.7909 47 91 47H121C123.209 47 125 48.7909 125 51V57C125 59.2091 123.209 61 121 61H91C88.7909 61 87 59.2091 87 57V51ZM87 72C87 69.7909 88.7909 68 91 68H121C123.209 68 125 69.7909 125 72V97C125 99.2091 123.209 101 121 101H91C88.7909 101 87 99.2091 87 97V72ZM91 110C88.7909 110 87 111.791 87 114V128C87 130.209 88.7909 132 91 132H121C123.209 132 125 130.209 125 128V114C125 111.791 123.209 110 121 110H91ZM87 145C87 142.791 88.7909 141 91 141H121C123.209 141 125 142.791 125 145V154C125 156.209 123.209 158 121 158H91C88.7909 158 87 156.209 87 154V145ZM154 51C154 48.7909 155.791 47 158 47H188C190.209 47 192 48.7909 192 51V57C192 59.2091 190.209 61 188 61H158C155.791 61 154 59.2091 154 57V51ZM154 72C154 69.7909 155.791 68 158 68H188C190.209 68 192 69.7909 192 72V97C192 99.2091 190.209 101 188 101H158C155.791 101 154 99.2091 154 97V72ZM158 110C155.791 110 154 111.791 154 114V128C154 130.209 155.791 132 158 132H188C190.209 132 192 130.209 192 128V114C192 111.791 190.209 110 188 110H158ZM154 145C154 142.791 155.791 141 158 141H188C190.209 141 192 142.791 192 145V154C192 156.209 190.209 158 188 158H158C155.791 158 154 156.209 154 154V145Z"
      fill="var(--fenext-svg-theme-line,#404040)"
    />
    <rect
      x="25"
      y="131"
      width="37"
      height="9"
      rx="4"
      fill="var(--fenext-svg-theme-active,#122DEA)"
    />
  </svg>
);

export const SvgCheck2 = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.682617 8.87961L1.79422 7.76801L5.34462 11.3188L14.2054 2.45801L15.317 3.56961L5.34462 13.542L0.682617 8.87961Z"
      fill="white"
    />
    <path
      d="M14.2055 2.74089L15.0343 3.56969L5.3451 13.2593L0.965502 8.87969L1.7943 8.05089L5.0619 11.3185L5.3447 11.6013L5.6275 11.3185L14.2055 2.74089ZM14.2055 2.17529L5.3451 11.0361L1.7947 7.48569L0.399902 8.87969L5.3451 13.8249L15.5999 3.56969L14.2055 2.17529Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgPatreon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M581 263.3C581 364.6 498.6 447.1 397.2 447.1C295.5 447.1 212.8 364.7 212.8 263.3C212.8 161.7 295.5 79 397.2 79C498.6 79 581 161.7 581 263.3ZM69 570H159V79H69V570Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgLinkedin = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 448 448"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100.28 447.99H7.4V148.89H100.28V447.99ZM53.79 108.09C24.09 108.09 0 83.49 0 53.79C2.1258e-07 39.524 5.66714 25.8423 15.7547 15.7547C25.8423 5.66714 39.524 0 53.79 0C68.056 0 81.7377 5.66714 91.8253 15.7547C101.913 25.8423 107.58 39.524 107.58 53.79C107.58 83.49 83.48 108.09 53.79 108.09ZM447.9 447.99H355.22V302.39C355.22 267.69 354.52 223.19 306.93 223.19C258.64 223.19 251.24 260.89 251.24 299.89V447.99H158.46V148.89H247.54V189.69H248.84C261.24 166.19 291.53 141.39 336.72 141.39C430.72 141.39 448 203.29 448 283.69V447.99H447.9Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgLinkedinBox = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 624 624"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M100 0C44.7715 0 0 44.7715 0 100V524C0 579.228 44.7715 624 100 624H524C579.228 624 624 579.229 624 524V100C624 44.7715 579.229 0 524 0H100ZM95.4 535.99H188.28V236.89H95.4V535.99ZM88 141.79C88 171.49 112.09 196.09 141.79 196.09C171.48 196.09 195.58 171.49 195.58 141.79C195.58 127.524 189.913 113.842 179.825 103.755C169.738 93.6671 156.056 88 141.79 88C127.524 88 113.842 93.6671 103.755 103.755C93.6671 113.842 88 127.524 88 141.79ZM443.22 390.39V535.99H536V371.69C536 291.29 518.72 229.39 424.72 229.39C379.53 229.39 349.24 254.19 336.84 277.69H335.54V236.89H246.46V535.99H339.24V387.89C339.24 348.89 346.64 311.19 394.93 311.19C442.52 311.19 443.22 355.69 443.22 390.39Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgLink = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
  >
    <path
      d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
      fill="currentColor"
    />
  </svg>
);

export const SvgShare = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={`fenext_svg ${className}`}
  >
    <path
      d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
      fill="currentColor"
    />
  </svg>
);

export const SvgNoConfirm = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 71 71"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M70.042 35.021C70.042 41.9475 67.988 48.7185 64.1398 54.4777C60.2916 60.2369 54.822 64.7257 48.4227 67.3763C42.0234 70.0269 34.9818 70.7204 28.1884 69.369C21.3949 68.0176 15.1548 64.6821 10.2571 59.7842C5.35934 54.8864 2.024 48.6461 0.672817 41.8526C-0.678363 35.0592 0.0152936 28.0176 2.6661 21.6183C5.31691 15.2191 9.80582 9.74965 15.5651 5.90162C21.3244 2.05358 28.0955 -0.000197768 35.022 1.42838e-08C44.3101 1.42838e-08 53.2179 3.6897 59.7856 10.2574C66.3533 16.8251 70.043 25.7329 70.043 35.021H70.042Z"
      fill="#BF2626"
    />
    <path
      d="M70.0444 35.0218C70.0451 43.7875 66.7586 52.2348 60.834 58.6952C54.9093 65.1556 46.7775 69.1594 38.0444 69.9158C29.3116 69.1598 21.1797 65.1565 15.2549 58.6966C9.33001 52.2367 6.04297 43.7898 6.04297 35.0243C6.04297 26.2588 9.33001 17.8119 15.2549 11.352C21.1797 4.8921 29.3116 0.888814 38.0444 0.132812C46.7769 0.888451 54.9084 4.89133 60.833 11.3508C66.7577 17.8103 70.0445 26.2568 70.0444 35.0218V35.0218Z"
      fill="#D64949"
    />
    <path
      opacity="0.8"
      d="M50.0721 50.0721C49.4653 50.6669 48.6496 51 47.7999 51C46.9503 51 46.1345 50.6669 45.5277 50.0721L34.9953 39.5397L24.4628 50.0721C23.8581 50.6647 23.044 50.9947 22.1973 50.9905C21.3507 50.9862 20.5399 50.648 19.9412 50.0493C19.3425 49.4506 19.0043 48.6398 19 47.7932C18.9958 46.9465 19.3258 46.1324 19.9184 45.5277L30.4508 34.9953L19.9184 24.4628C19.3258 23.8581 18.9958 23.044 19 22.1973C19.0043 21.3507 19.3425 20.5399 19.9412 19.9412C20.5399 19.3425 21.3507 19.0043 22.1973 19C23.044 18.9958 23.8581 19.3258 24.4628 19.9184L34.9953 30.4508L45.5277 19.9184C46.1324 19.3258 46.9465 18.9958 47.7932 19C48.6398 19.0043 49.4506 19.3425 50.0493 19.9412C50.648 20.5399 50.9862 21.3507 50.9905 22.1973C50.9947 23.044 50.6647 23.8581 50.0721 24.4628L39.5397 34.9953L50.0721 45.5277C50.6669 46.1345 51 46.9503 51 47.7999C51 48.6496 50.6669 49.4653 50.0721 50.0721V50.0721Z"
      fill="white"
    />
  </svg>
);

export const SvgNumberDecrease = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 416 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32 0H240H384C401.7 0 416 14.3 416 32C416 49.7 401.7 64 384 64H240H32C14.3 64 0 49.7 0 32C0 14.3 14.3 0 32 0Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgEmail = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M117 133C90.5 133 69 154.5 69 181C69 196.1 76.1 210.3 88.2 219.4L305.8 382.6C317.2 391.1 332.8 391.1 344.2 382.6L561.8 219.4C573.9 210.3 581 196.1 581 181C581 154.5 559.5 133 533 133H117ZM69 245V453C69 488.3 97.7 517 133 517H517C552.3 517 581 488.3 581 453V245L363.4 408.2C340.6 425.3 309.4 425.3 286.6 408.2L69 245Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgEmailBox = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 624 624"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M100 0C44.7715 0 0 44.7715 0 100V524C0 579.228 44.7715 624 100 624H524C579.228 624 624 579.229 624 524V100C624 44.7715 579.229 0 524 0H100ZM56 168C56 141.5 77.5 120 104 120H520C546.5 120 568 141.5 568 168C568 183.1 560.9 197.3 548.8 206.4L331.2 369.6C319.8 378.1 304.2 378.1 292.8 369.6L75.2 206.4C63.1 197.3 56 183.1 56 168ZM56 440V232L273.6 395.2C296.4 412.3 327.6 412.3 350.4 395.2L568 232V440C568 475.3 539.3 504 504 504H120C84.7 504 56 475.3 56 440Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgYoutube = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M586.722 193.083C580.441 169.433 561.935 150.807 538.438 144.486C495.848 133 325.067 133 325.067 133C325.067 133 154.287 133 111.696 144.486C88.199 150.808 69.693 169.433 63.412 193.083C52 235.95 52 325.388 52 325.388C52 325.388 52 414.826 63.412 457.693C69.693 481.343 88.199 499.193 111.696 505.514C154.287 517 325.067 517 325.067 517C325.067 517 495.847 517 538.438 505.514C561.935 499.193 580.441 481.343 586.722 457.693C598.134 414.826 598.134 325.388 598.134 325.388C598.134 325.388 598.134 235.95 586.722 193.083V193.083ZM269.212 406.591V244.185L411.951 325.39L269.212 406.591V406.591Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgDaviplata = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25 286.496C25 286.496 106.944 278.319 106.63 317.006C106.316 355.694 40.698 352.234 40.698 352.234V307.256M118.874 352.234C118.874 352.234 141.793 286.496 164.713 286.496C187.632 286.496 208.667 350.662 208.667 350.662M208.667 286.496C208.667 286.496 224.679 353.807 250.11 352.234C275.541 350.662 291.553 286.496 291.553 286.496M309.762 286.496C309.762 286.496 309.762 369.219 309.762 352.234M342.728 302.852V313.546M342.728 372.364V313.546M342.728 313.546C342.728 313.546 355.915 302.852 364.706 302.852C373.496 302.852 384.171 306.941 384.171 320.152C384.171 333.362 384.171 326.442 384.171 333.362C384.171 340.282 374.124 351.291 364.706 350.662C355.287 350.032 339.589 337.766 339.589 337.766M406.148 276.431V352.234M429.695 306.312C429.695 306.312 432.207 300.336 443.824 301.594C455.44 302.852 457.091 304.739 457.952 309.143C458.813 313.546 458.813 324.241 458.813 324.241M460.464 353.178L459.782 341.226M459.782 341.226C459.782 341.226 447.277 353.178 439.114 353.178C430.951 353.178 425.928 349.718 425.928 339.653C425.928 329.588 425.928 325.499 437.544 324.241C449.161 322.982 458.813 324.241 458.813 324.241M459.782 341.226L458.813 324.241M485.894 289.013C485.894 289.013 485.894 343.427 485.894 350.662C485.894 357.896 503.476 350.662 503.476 350.662M476.79 305.054H499.395M500.651 305.054H499.395M499.395 305.054C502.66 305.054 482.964 305.054 472.708 305.054M518.546 306.312C518.546 306.312 523.884 302.852 533.302 301.594C542.721 300.336 546.803 304.739 546.803 309.143C546.803 313.546 547.991 342.484 547.991 342.484M548.373 353.178L547.991 342.484M547.991 342.484C547.991 342.484 537.698 350.662 528.907 353.178C520.116 355.694 514.151 348.46 513.523 339.653C512.895 330.846 513.523 324.241 528.907 324.241C544.291 324.241 546.803 324.241 546.803 324.241M301.285 264.794C301.285 264.794 406.148 161.626 457.952 171.691C509.755 181.756 513.523 195.91 525.767 200.629C538.012 205.347 525.767 188.675 528.907 183.958C532.047 179.241 574.431 175.781 576.629 183.958C578.827 192.135 566.896 221.074 570.35 227.993C573.803 234.912 631.886 259.132 623.095 282.722C614.304 306.312 570.35 296.562 570.35 302.852C570.35 309.143 608.339 368.591 606.455 388.72C604.572 408.85 594.211 434.643 563.757 443.764C533.302 452.884 509.755 441.748 482.755 448.796C455.754 455.843 431.579 443.261 395.474 448.609C395.474 448.609 380.718 453.201 342.728 439.675C304.739 426.149 309.762 375.51 309.762 375.51"
      stroke="currentColor"
      strokeWidth="15"
    />
  </svg>
);

export const SvgImg = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 50 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 6.25C0 2.80273 2.80273 0 6.25 0H43.75C47.1973 0 50 2.80273 50 6.25V37.5C50 40.9473 47.1973 43.75 43.75 43.75H6.25C2.80273 43.75 0 40.9473 0 37.5V6.25ZM31.6211 16.6504C31.1816 16.0059 30.459 15.625 29.6875 15.625C28.916 15.625 28.1836 16.0059 27.7539 16.6504L19.2578 29.1113L16.6699 25.8789C16.2207 25.3223 15.5469 25 14.8438 25C14.1406 25 13.457 25.3223 13.0176 25.8789L6.76758 33.6914C6.20117 34.3945 6.09375 35.3613 6.48438 36.1719C6.875 36.9824 7.69531 37.5 8.59375 37.5H17.9688H21.0938H41.4062C42.2754 37.5 43.0762 37.0215 43.4766 36.25C43.877 35.4785 43.8281 34.5508 43.3398 33.8379L31.6211 16.6504ZM10.9375 15.625C13.5254 15.625 15.625 13.5254 15.625 10.9375C15.625 8.34961 13.5254 6.25 10.9375 6.25C8.34961 6.25 6.25 8.34961 6.25 10.9375C6.25 13.5254 8.34961 15.625 10.9375 15.625Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgArrowGoBack = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 34 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.470267 7.58914L7.19227 0.894135C7.43428 0.652656 7.7623 0.517204 8.10418 0.517579C8.44606 0.517954 8.77379 0.654124 9.01527 0.896134C9.25675 1.13814 9.3922 1.46617 9.39182 1.80805C9.39145 2.14992 9.25528 2.47765 9.01327 2.71913L4.49727 7.21314H31.7583C32.0997 7.21314 32.4272 7.34879 32.6687 7.59024C32.9101 7.83169 33.0458 8.15918 33.0458 8.50064C33.0458 8.84211 32.9101 9.16959 32.6687 9.41104C32.4272 9.6525 32.0997 9.78813 31.7583 9.78813H4.49727L9.01327 14.2821C9.13303 14.4017 9.22808 14.5437 9.29297 14.7C9.35786 14.8563 9.39133 15.0238 9.39147 15.1931C9.39161 15.3623 9.35841 15.5299 9.29378 15.6863C9.22914 15.8427 9.13434 15.9849 9.01477 16.1046C8.8952 16.2244 8.75321 16.3194 8.59691 16.3843C8.44061 16.4492 8.27306 16.4827 8.10383 16.4828C7.93459 16.483 7.76699 16.4498 7.61058 16.3851C7.45418 16.3205 7.31203 16.2257 7.19227 16.1061L0.471267 9.41214C0.351376 9.29258 0.256236 9.15054 0.19129 8.99417C0.126344 8.8378 0.0928665 8.67016 0.0927736 8.50084C0.0926808 8.33152 0.125974 8.16384 0.190748 8.0074C0.255523 7.85096 0.350507 7.70884 0.470267 7.58914Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgChaturbate = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M373 295.5L360.484 285.088C341.075 268.943 311.471 280.068 307.5 305V305V305C303.943 316.659 315.644 327.152 326.849 322.351L360.79 307.804C363.582 306.608 366.186 305.014 368.521 303.071L405.338 272.448C414.097 265.163 422.217 257.142 429.61 248.475L458.124 215.044C460.674 212.054 462.507 208.521 463.482 204.714L464.71 199.919C468.516 185.058 456.5 170.891 441.217 172.22V172.22C439.083 172.406 436.988 172.898 434.995 173.682L407.5 184.5L381.646 194.537C371.612 198.433 365 208.092 365 218.857V218.857C365 226.556 368.401 233.861 374.291 238.818L402.237 262.333C404.741 264.441 407.064 266.755 409.182 269.251V269.251M433 477.5V477.5C415.681 501.681 391.925 520.517 364.433 531.867L363.686 532.176C355.907 535.387 347.89 537.986 339.707 539.95L330.733 542.104C311.843 546.638 291.921 546.605 273.021 542.114V542.114C258.902 538.759 245.328 532.86 233.276 524.776V524.776C218.281 514.719 205.717 501.444 196.499 485.919L195.709 484.589C186.668 469.361 180.877 452.427 178.701 434.851L176.943 420.655C175.986 412.928 176.182 405.101 177.525 397.431L179.016 388.908C183.289 364.491 173.262 339.776 153.186 325.238V325.238C146.134 320.132 140.184 313.657 135.689 306.2L133.202 302.074C124.892 288.286 120.5 272.493 120.5 256.395V246.296C120.5 239.79 121.308 233.31 122.904 227.004L123.507 224.62C128.001 206.87 139.057 191.483 154.446 181.561V181.561C163.694 175.599 174.179 171.824 185.104 170.523L192.766 169.611C204.506 168.214 216.396 168.794 227.943 171.329L251.5 176.5V176.5C275.804 181.617 301.145 176.736 321.811 162.959L339 151.5L370.757 133.55C380.222 128.2 390.26 123.933 400.679 120.83L410.956 117.769C424.811 113.641 439.412 112.653 453.697 114.875L456.436 115.301C469.95 117.403 482.766 122.703 493.819 130.758L494.462 131.227C502.422 137.028 509.264 144.223 514.658 152.463V152.463C521.141 162.369 525.39 173.568 527.108 185.281L527.496 187.93C529.152 199.215 528.732 210.708 526.257 221.842L524.359 230.384C520.813 246.34 514.523 261.559 505.77 275.363L505.284 276.129C497.144 288.965 487.055 300.454 475.379 310.184L468.832 315.64C456.984 325.513 444.033 333.983 430.238 340.881L421.34 345.33C406.504 352.748 390.803 358.291 374.599 361.833L323.5 373L317.014 375.118C306.194 378.651 298.73 388.563 298.324 399.938V399.938C298.114 405.819 299.822 411.61 303.191 416.435L308.913 424.633C313.885 431.754 320.63 437.453 328.482 441.164V441.164C338.538 445.918 349.894 447.172 360.744 444.727L364.483 443.884C374.34 441.663 383.49 437.027 391.111 430.394L395.825 426.291C402.894 420.139 408.906 412.869 413.623 404.771L428.075 379.956C431.21 374.574 436.483 370.777 442.581 369.511V369.511C452.507 367.451 462.552 372.457 466.885 381.622L467.995 383.97C470.878 390.068 471.2 397.067 468.891 403.404L456.345 437.831C452.799 447.564 447.93 456.763 441.878 465.17L433 477.5ZM188.781 214.028L187.945 214.771C183.711 218.535 180.444 223.263 178.42 228.555L170.687 248.781C169.241 252.562 168.5 256.575 168.5 260.623V263.799C168.5 269.114 170.272 274.278 173.535 278.473V278.473C174.839 280.15 176.37 281.653 178.07 282.927V282.927C190.301 292.101 207.924 288.181 214.993 274.625L228.962 247.838C236.781 232.844 229.069 214.433 212.899 209.487L211.519 209.065C205.136 207.112 198.226 207.934 192.48 211.33V211.33C191.163 212.108 189.924 213.012 188.781 214.028Z"
      stroke="currentColor"
      strokeWidth="15"
    />
    <path
      d="M291.501 360.999C316.501 368.499 357 358.999 357 358.999L302.499 376.999L292 409.999C292 409.999 266.501 353.499 291.501 360.999Z"
      fill="currentColor"
    />
    <path
      d="M304.5 304.499L315 305.499L314.5 310.499L304.5 304.499Z"
      fill="black"
    />
  </svg>
);

export const SvgDiscover = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 64.676 10.895"
  >
    <defs>
      <linearGradient
        id="fymcimdnia"
        x1=".288"
        y1=".047"
        x2=".712"
        y2=".953"
        gradientUnits="objectBoundingBox"
      >
        <stop offset=".383" stop-color="#e45e26" />
        <stop offset="1" stop-color="#f8a020" />
      </linearGradient>
      <linearGradient
        id="of602t8tlb"
        x1=".249"
        y1=".067"
        x2=".751"
        y2=".933"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0" stop-color="#80391b" />
        <stop offset=".111" stop-color="#843b1b" stop-opacity=".816" />
        <stop offset=".235" stop-color="#92401d" stop-opacity=".608" />
        <stop offset=".365" stop-color="#a8481f" stop-opacity=".392" />
        <stop offset=".5" stop-color="#c75323" stop-opacity=".169" />
        <stop offset=".601" stop-color="#e45e26" stop-opacity="0" />
        <stop offset="1" stop-color="#f8a020" stop-opacity="0" />
      </linearGradient>
    </defs>
    <g data-name="discover (1)">
      <path
        data-name="Path 12238"
        d="M0 214.1c0-.168.024-.229.215-.227.978.014 1.958-.013 2.935.017a5.552 5.552 0 0 1 3.811 1.48 4.587 4.587 0 0 1 1.377 2.548 5.081 5.081 0 0 1-1.7 5 4.819 4.819 0 0 1-2.9 1.189c-1.2.1-2.4.02-3.606.046-.144 0-.128-.075-.128-.165C0 222.978.006 215.741 0 214.1zm2 8.121c0 .139.028.184.176.182.4-.005.8 0 1.2-.046a3.109 3.109 0 0 0 1.942-.823 3.383 3.383 0 0 0 .982-3.214 3.074 3.074 0 0 0-2.2-2.5 6.461 6.461 0 0 0-1.855-.183c-.178 0-.24.033-.238.228.003 1.053 0 5.292-.007 6.359z"
        transform="translate(0 -213.572)"
        fill="#231f20;fillRule:evenodd"
      />
      <path
        data-name="Path 12239"
        d="m448.021 219.84 3.22 4.306h-.433c-.605 0-1.21-.009-1.815.006a.382.382 0 0 1-.371-.206q-1.258-1.886-2.528-3.763a.311.311 0 0 1-.033-.051c-.051-.125-.161-.117-.258-.1s-.056.123-.056.186c0 1.23-.008 2.461 0 3.691 0 .2-.059.244-.249.24a36.69 36.69 0 0 0-1.591 0c-.134 0-.188-.023-.188-.174q.007-4.966 0-9.932c0-.112.012-.173.151-.17 1.141.024 2.284-.046 3.424.042a3.519 3.519 0 0 1 2.145.815 2.843 2.843 0 0 1 .886 2.433 2.661 2.661 0 0 1-2.159 2.624c-.041.013-.083.03-.145.053zm-2.276-2.784c0 .455.008.909 0 1.364 0 .159.046.191.192.185.3-.012.6-.006.894-.037a1.461 1.461 0 0 0 1.433-1.47 1.341 1.341 0 0 0-.977-1.455 4.52 4.52 0 0 0-1.348-.137c-.148 0-.2.029-.195.188.008.453 0 .906 0 1.362z"
        transform="translate(-387.301 -213.565)"
        fill="#231f20;fillRule:evenodd"
      />
      <path
        data-name="Path 12240"
        d="M388.79 214.091c0-.154.031-.2.2-.2q2.651.01 5.3 0c.138 0 .187.027.184.176q-.015.713 0 1.427c0 .143-.05.163-.174.162-1.094 0-2.189 0-3.283-.007-.186 0-.223.053-.22.227.011.618.01 1.237 0 1.855 0 .154.041.192.193.191 1.053-.007 2.107 0 3.161-.008.166 0 .2.05.2.2q-.015.683 0 1.366c0 .144-.038.178-.179.177-1.047-.006-2.093 0-3.14-.009-.2 0-.231.06-.229.239.009.775.008 1.55 0 2.324 0 .154.031.2.2.2 1.094-.008 2.189 0 3.283-.009.163 0 .2.045.2.2-.01.469-.007.938 0 1.407 0 .112-.026.15-.145.15q-2.692-.006-5.383 0c-.163 0-.15-.079-.15-.186-.014-1.651-.008-8.244-.018-9.882z"
        transform="translate(-339.354 -213.581)"
        fill="#231f20;fillRule:evenodd"
      />
      <path
        data-name="Path 12241"
        d="M96.685 220.074a2.424 2.424 0 0 0 1.152 1.148 2.056 2.056 0 0 0 1.731.072 1.338 1.338 0 0 0 .843-1.24 1.235 1.235 0 0 0-.779-1.2c-.57-.285-1.186-.454-1.769-.707a3.617 3.617 0 0 1-1.5-1.04 2.085 2.085 0 0 1-.42-1.042 2.869 2.869 0 0 1 2.117-3.29 4.26 4.26 0 0 1 3.962.878c.087.069.117.117.034.221q-.451.565-.879 1.148c-.086.118-.124.085-.2 0a2 2 0 0 0-1.168-.689 1.624 1.624 0 0 0-1.593.491.879.879 0 0 0 .182 1.346 6.148 6.148 0 0 0 1.4.638 9.787 9.787 0 0 1 1.306.6 2.553 2.553 0 0 1 1.387 2.194 3.241 3.241 0 0 1-2.43 3.529 4.064 4.064 0 0 1-4.606-1.714c-.047-.069-.052-.109.012-.17.4-.384.804-.776 1.218-1.173z"
        transform="translate(-83.279 -212.46)"
        fill="#231f20;fillRule:evenodd"
      />
      <path
        data-name="Path 12242"
        d="M304.165 213.894h2.029a.209.209 0 0 1 .231.163c.613 1.551 2.379 5.994 2.65 6.679.124-.137 1.888-4.611 2.72-6.686.033-.083.057-.156.178-.155.679.006 1.359 0 2.067 0-.162.388-3.071 7.291-4.366 10.374a.208.208 0 0 1-.235.157c-.258-.01-.517-.009-.774 0a.188.188 0 0 1-.209-.141c-.8-1.936-3.6-8.7-4.2-10.147l-.091-.244z"
        transform="translate(-265.489 -213.583)"
        fill="#231f20;fillRule:evenodd"
      />
      <path
        data-name="Path 12243"
        d="M163.84 215.151a4.4 4.4 0 0 0-1.176-.867 3.263 3.263 0 0 0-4.419 1.868 3.587 3.587 0 0 0 .68 3.852 3.247 3.247 0 0 0 2.583 1.023 3.053 3.053 0 0 0 2.036-.846c.086-.076.168-.154.252-.231.072.04.042.1.043.149v2.019a.2.2 0 0 1-.126.218 5.544 5.544 0 0 1-6.28-1.051 5.24 5.24 0 0 1-1.52-3.682 5.34 5.34 0 0 1 3.8-5.2 5.249 5.249 0 0 1 4.008.314c.07.035.124.065.123.161-.006.742-.004 1.482-.004 2.273z"
        transform="translate(-136.089 -212.063)"
        fill="#231f20;fillRule:evenodd"
      />
      <path
        data-name="Path 12244"
        d="M75.54 223.934c0 .169-.024.235-.217.23a34.11 34.11 0 0 0-1.631 0c-.132 0-.173-.032-.172-.168q.006-4.966 0-9.931c0-.149.049-.179.186-.177.537.007 1.074.011 1.611 0 .178 0 .227.039.226.222-.009 1.64-.008 8.19-.003 9.824z"
        transform="translate(-64.171 -213.577)"
        fill="#231f20;fillRule:evenodd"
      />
      <path
        data-name="Path 12245"
        d="m503.7 216.536.291.389h-.203a.034.034 0 0 1-.033-.019l-.228-.34c0-.011-.014-.011-.023-.009s-.005.011-.005.017v.333c0 .018-.005.022-.022.022h-.144c-.012 0-.017 0-.017-.016v-.9c0-.01 0-.016.014-.015h.309a.317.317 0 0 1 .194.074.257.257 0 0 1 .08.22.24.24 0 0 1-.195.237zm-.206-.251v.123c0 .014 0 .017.017.017h.081a.132.132 0 0 0 .129-.133.121.121 0 0 0-.088-.131.413.413 0 0 0-.122-.012c-.013 0-.018 0-.018.017v.119z"
        transform="translate(-439.313 -215.423)"
        fill="#231f20;fillRule:evenodd"
      />
      <g data-name="Group 16014" transform="translate(28.389)">
        <ellipse
          data-name="Ellipse 130"
          cx="5.428"
          cy="5.448"
          rx="5.428"
          ry="5.448"
          fill="url(#fymcimdnia)"
        />
        <ellipse
          data-name="Ellipse 131"
          cx="5.428"
          cy="5.448"
          rx="5.428"
          ry="5.448"
          fill="url(#of602t8tlb)"
        />
      </g>
    </g>
  </svg>
);

export const SvgUnicorn = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 140.277 151.829"
  >
    <g data-name="Group 16046">
      <path
        data-name="Path 12301"
        d="M268.939 214.917s10.7-6.807 10.7-16.53-8.508-13.856-8.508-13.856 14.976-7.044 10.3-27.98-19.71-22.351-19.71-22.351 1.838-28.977-25.259-13.425c0 0 1.728-38.931-24.156-22.754l2.4 68.878z"
        transform="translate(-154.755 -66.182)"
        fill="#ccf3e2"
      />
      <path
        data-name="Path 12302"
        d="M319.866 305.851s14.976-7.044 10.3-27.98c-.841-3.765-4.64-8.719-6-11.327 5.932 30.007-14.451 44.02-36.782 27.97-1.2-.861-4.353 9.959-5.792 9.77l36.087 31.953s10.7-6.807 10.7-16.53-8.508-13.856-8.508-13.856z"
        transform="translate(-203.494 -187.502)"
        fill="#b1b6e1"
      />
      <path
        data-name="Path 12303"
        d="M154.667 217.661c-3.551-12.925-9.939-26.4-20.074-34.6 1.9-5.4 2.934-11.218 2.934-20.033l.324-17.54a30.2 30.2 0 0 0-5.171-16.948 16.248 16.248 0 0 0 3.66-6.179c2.724-7.915-2.259-18.95-4.724-19.8s-13.183 4.784-15.907 12.7c-.108.313-.2.622-.293.928a30.375 30.375 0 0 0-7.905-1.043H88.787a26.814 26.814 0 0 0-4.032.3 17.043 17.043 0 0 0-1.639-5.472C79.53 102.51 68.349 98.2 66.024 99.321s-5.956 12.535-2.371 20A16.048 16.048 0 0 0 68 125.007a35.556 35.556 0 0 0-6.6 10.907c-2.7 7.423-4.049 17.545-4.049 17.545-7.312 6.883-9.638 16.3-6.713 24.494a26.743 26.743 0 0 0 13.516 14.967c5.573 2.858 14.616 3.883 19.569 3.452-2.752 6.055-4.206 14.77-5.182 21.288h76.127z"
        transform="translate(-40.162 -69.744)"
        fill="#fff"
      />
      <path
        data-name="Path 12304"
        d="M202.651 190.782c1.9-5.4 2.934-11.218 2.934-20.033l.324-17.54a30.2 30.2 0 0 0-5.171-16.948 16.248 16.248 0 0 0 3.66-6.179c2.724-7.915-2.259-18.95-4.724-19.8-1.163-.4-1.5-.149-4.627 1.9a25.161 25.161 0 0 1 2.782 14.217c-.309 3.709-5.105 7.633-6.36 9.083 2.734 4.6 4.827 20.093 4.827 26.065l-.082 4.453c0 6.113-2.622 14.422-4.042 20.118-.828 3.322-1.291 6.306 1.192 8.663a30.146 30.146 0 0 1 8.146 11.83 9.527 9.527 0 0 1-8.869 13.02h-45.114a226.013 226.013 0 0 0-.929 5.754h76.127c-3.551-12.925-9.939-26.4-20.074-34.6z"
        transform="translate(-108.532 -77.466)"
        fill="#e1bdfc"
      />
      <path
        data-name="Path 12305"
        d="M188.707 58.5a2.941 2.941 0 0 0-.055-.407c-.189-5.263-1.789-9.821-5.447-13.346-.091-5.89-1.654-10.474-5.384-13.194a123.293 123.293 0 0 0-8.452-20.71 1.079 1.079 0 0 0-2.077.45c-.448 6.528-.477 12.593.672 17.356a13.365 13.365 0 0 0 .455 11.741 16.97 16.97 0 0 0 .475 12.272c-1.908 4.12-.482 7.883.033 9.666 2.116 5.982 20.219 2.157 19.779-3.828z"
        transform="translate(-122.761 -7.153)"
        fill="#f6e06e"
      />
      <path
        data-name="Path 12306"
        d="M191.335 148.4a2.943 2.943 0 0 0-.055-.407 20.2 20.2 0 0 0-2.774-10.026 20.961 20.961 0 0 1 .321 2.992 2.4 2.4 0 0 1 .049.348c.387 5.106-15.548 8.37-17.411 3.266-.087-.294-.2-.651-.325-1.06-1.307 3.74-.059 7.071.417 8.716 2.115 5.978 20.217 2.152 19.778-3.829z"
        transform="translate(-125.389 -97.051)"
        fill="#dda86a"
      />
      <path
        data-name="Path 12307"
        d="M82.5 144.734a20.982 20.982 0 0 0 9.046-10.85 14.185 14.185 0 1 1 25.054 12.909 18.449 18.449 0 0 1-16.1 8.114c-3.409-.109-11.27-2.206-17.239-3.938a3.414 3.414 0 0 1-.761-6.235z"
        transform="translate(-62.241 -87.734)"
        fill="#ccf3e2"
      />
      <path
        data-name="Path 12308"
        d="M111.8 126.547a14.189 14.189 0 0 0-20.25 7.336 20.981 20.981 0 0 1-9.046 10.85 3.413 3.413 0 0 0 .759 6.235c5.969 1.732 13.83 3.829 17.239 3.938a18.449 18.449 0 0 0 16.1-8.114 14.186 14.186 0 0 0-4.802-20.245zm.654 13.46a13.229 13.229 0 0 1-10.394 7.918c-2.472.379-8.447-.06-13-.493a2.482 2.482 0 0 1-1.473-4.329 14.78 14.78 0 0 0 4.9-8.919 10.036 10.036 0 0 1 .944-2.9 10.483 10.483 0 0 1 19.023 8.724z"
        transform="translate(-62.241 -87.734)"
        fill="#b1b6e1"
      />
      <path
        data-name="Path 12309"
        d="m429.793 53.379 2.477 6.966a1.117 1.117 0 0 0 .581.654l6.189 2.788a1.235 1.235 0 0 1 0 2.181l-6.189 2.788a1.117 1.117 0 0 0-.581.654l-2.477 6.966a1 1 0 0 1-1.938 0l-2.477-6.966a1.117 1.117 0 0 0-.581-.654l-6.189-2.788a1.235 1.235 0 0 1 0-2.181L424.8 61a1.117 1.117 0 0 0 .581-.654l2.477-6.966a1 1 0 0 1 1.938 0z"
        transform="translate(-299.419 -37.03)"
        fill="#fbf2aa"
      />
      <path
        data-name="Path 12310"
        d="m59.115 26.7 1.838 5.167a.83.83 0 0 0 .431.485l4.591 2.068a.916.916 0 0 1 0 1.618L61.383 38.1a.829.829 0 0 0-.431.485l-1.838 5.167a.745.745 0 0 1-1.437 0l-1.837-5.164a.83.83 0 0 0-.431-.485l-4.591-2.068a.916.916 0 0 1 0-1.618l4.591-2.068a.829.829 0 0 0 .431-.485l1.837-5.164a.745.745 0 0 1 1.437 0z"
        transform="translate(-40.813 -18.394)"
        fill="#fbf2aa"
      />
      <g data-name="Group 16045" transform="translate(0 11.127)">
        <circle
          data-name="Ellipse 132"
          cx="3.676"
          cy="3.676"
          r="3.676"
          transform="rotate(-13.3 110.997 12.941)"
          fill="#f7e16e"
        />
        <path
          data-name="Path 12311"
          d="M347.614 40.377a2.855 2.855 0 1 1-2.855-2.855 2.855 2.855 0 0 1 2.855 2.855z"
          transform="translate(-245.922 -37.522)"
          fill="#f7e16e"
        />
      </g>
    </g>
    <g data-name="Group 16048">
      <path
        data-name="Path 12312"
        d="M99.965 236.6a1.809 1.809 0 0 1-1.181-3.181 5.567 5.567 0 0 1 7.228 0 1.81 1.81 0 0 1-2.366 2.739 1.949 1.949 0 0 0-2.5 0 1.8 1.8 0 0 1-1.18.438z"
        transform="translate(-74.455 -163.264)"
        fill="#3c122c"
      />
      <path
        data-name="Path 12313"
        d="M220.03 236.6a1.809 1.809 0 0 1-1.181-3.181 5.567 5.567 0 0 1 7.228 0 1.81 1.81 0 1 1-2.366 2.739 1.95 1.95 0 0 0-2.5 0 1.805 1.805 0 0 1-1.181.442z"
        transform="translate(-158.915 -163.264)"
        fill="#3c122c"
      />
      <path
        data-name="Path 12314"
        d="M131.83 150.535a3.017 3.017 0 0 1-2.7-4.35 13.23 13.23 0 0 1 7.719-7.036 2.8 2.8 0 0 1 3.561 1.8c.873 2.639-1.886 3.991-1.886 3.991a7.5 7.5 0 0 0-3.984 3.909 3.016 3.016 0 0 1-2.707 1.683z"
        transform="translate(-96.024 -97.796)"
        fill="#fff"
      />
      <g data-name="Group 16047">
        <path
          data-name="Path 12315"
          d="M153.88 118.393a24.822 24.822 0 0 0 4.1-4.419c3.245-4.5 6.555-12.355 3.9-24.263-2.629-11.774-8.437-17.842-12.847-20.86a24.159 24.159 0 0 0-6.788-3.264c-.175-4.321-1.339-12.815-7.55-16.68a12.257 12.257 0 0 0-2.771-1.274 28.94 28.94 0 0 0-1.336-7.577c-.585-1.858-2.761-8.011-6.2-9.195s-8.944 2.327-10.548 3.431l-.106.075a16.246 16.246 0 0 0-6.451-7.8c-3.955-2.308-8.743-2.25-14.278.157a12.169 12.169 0 0 0-3.058-4.09 127.454 127.454 0 0 0-8.343-20.23 4.095 4.095 0 0 0-7.834 1.638c-.513 7.55-.344 12.928.549 17.226a16.229 16.229 0 0 0 .918 13.356 3 3 0 0 0 .321.484l-.015.087c-.395-.017-.79-.02-1.184-.008a27.915 27.915 0 0 0-7.072-5.271c-1.707-.9-7.527-3.728-10.789-2.162s-4.7 7.876-5.059 9.772c-.592 3.1-1.213 9.072 1.275 14.254a22.527 22.527 0 0 0 1.148 2.1 17.784 17.784 0 0 1-2.254 1.551 5.233 5.233 0 0 0-.508 8.721c-.278.631-.532 1.26-.758 1.881a99.106 99.106 0 0 0-4.053 17.132c-7.432 7.5-10.008 17.729-6.713 26.953a29.543 29.543 0 0 0 14.983 16.637c4.79 2.457 11.434 3.58 16.554 3.822a115.118 115.118 0 0 0-3.773 17.788 3.016 3.016 0 0 0 5.965.893c1.062-7.087 2.48-15.063 4.945-20.487a3.016 3.016 0 0 0-3.007-4.253c-4.24.369-12.83-.514-17.931-3.131a23.7 23.7 0 0 1-12.056-13.3c-2.44-6.832-.552-14.475 4.914-20.259.348 2.264 1.9 4.92 6.687 6.54a30.961 30.961 0 0 0 9.1 1.36c2.909 0 4.79-3.534 4.79-9s-1.88-9-4.79-9a30.971 30.971 0 0 0-9.1 1.36 12.778 12.778 0 0 0-4.142 2.2 84.922 84.922 0 0 1 3.3-13.184c.168-.462.437-1.143.821-1.975 6.629 1.821 11.2 2.782 13.622 2.859q.346.011.689.011a20.259 20.259 0 0 0 16.973-8.926c.071-.106.137-.216.205-.325.5-.073 1-.156 1.484-.257 4.861-1.019 10.412-3.759 10.2-8.139v-.213a4.596 4.596 0 0 0-.05-.4c-.02-.478-.055-.945-.1-1.409a27.394 27.394 0 0 1 6.561.93 3.016 3.016 0 0 0 3.678-2.065c.09-.308.17-.56.25-.795 1.989-5.78 9.445-10.192 12.03-10.7 1.724 1.991 4.887 10.057 2.9 15.837a13.255 13.255 0 0 1-2.959 5.047 3.016 3.016 0 0 0-.349 3.8 27.183 27.183 0 0 1 4.655 15.234l-.323 17.511v.056c0 7.852-.826 13.544-2.762 19.03a3.015 3.015 0 0 0 .947 3.348c8.277 6.7 15.047 18.438 19.063 33.056a3.011 3.011 0 0 0 5.083 1.286c2.4-1.68 11.528-8.713 11.528-18.694a18.186 18.186 0 0 0-6.271-13.81zM58.5 82.357a27.843 27.843 0 0 1 7.4-1.014c.436.317 1.232 2.195 1.232 5.385s-.8 5.068-1.232 5.385a27.529 27.529 0 0 1-7.4-1.013zm24.921-60.3-2.986-1.01c0-.015-.006-.029-.008-.043-.01-.06-.02-.12-.034-.179 0-.013 0-.026-.007-.039a39.772 39.772 0 0 1-.873-8.695c1.567 3.523 2.863 6.828 3.909 9.966zm-3.801 2.532 5.48 1.852.014.014q.073.078.152.151l.046.044q.107.1.222.179h.006c2.021 1.474 2.934 3.862 3.03 8.057l-7.8-2.609a3 3 0 0 0-.182-.439 10.047 10.047 0 0 1-.968-7.249zm-20.45 8.729c1.585.133 5.087 1.475 8.174 3.721a15.8 15.8 0 0 0-5.144 4.308 16.079 16.079 0 0 0-2.335 4.162 20.377 20.377 0 0 1-1.76 3.558c-2.527-5.42-.385-13.591 1.065-15.749zm25.94 24.733a16.7 16.7 0 0 1-14.541 7.312c-2.511-.08-8.474-1.453-16.792-3.867a1.6 1.6 0 0 1-.358-2.93 22.894 22.894 0 0 0 9.834-11.777 12.381 12.381 0 0 1 17.664-6.4 12.283 12.283 0 0 1 5.957 7.93 12.421 12.421 0 0 1-1.764 9.732zm5.057-2.374a16.088 16.088 0 0 0 .649-4.623l5.155 1.519c-.854 1.107-2.937 2.338-5.805 3.104zm.136-8.546a15.984 15.984 0 0 0-10.884-11.292c.069-.041.139-.08.2-.125l12.4 4.15a1.793 1.793 0 0 0 .407.081 16.3 16.3 0 0 1 3.733 8.914zm14.987-3.308a33.486 33.486 0 0 0-6-.541h-.774a18.7 18.7 0 0 0-3.95-6.372 3.018 3.018 0 0 0 .034-.383 34.932 34.932 0 0 0-.116-3.848c4.08-1.984 7.351-2.3 9.742-.9 2.155 1.256 3.649 3.788 4.674 6.765a21.018 21.018 0 0 0-3.613 5.281zm42.752 99.783c-3.223-10.007-8.781-22.009-18.166-30.376 1.707-5.548 2.448-11.378 2.45-19.023l.323-17.512v-.056a33.2 33.2 0 0 0-4.467-16.686 20.534 20.534 0 0 0 2.792-5.46c.074-.215.141-.431.206-.647.105.057.211.114.313.177 4.386 2.718 4.894 10.887 4.72 13.8a3.016 3.016 0 0 0 2.726 3.193c.128.012 12.9 1.428 17.047 20.009 4.06 18.184-8.138 24.348-8.642 24.594a3.01 3.01 0 0 0-.05 5.434c.278.14 6.826 3.508 6.826 11.151 0 4.805-3.39 8.9-6.079 11.4z"
          transform="translate(-32.255 .001)"
          fill="#3c122c"
        />
        <path
          data-name="Path 12316"
          d="M201.83 262.1a30.969 30.969 0 0 0-9.1 1.36c-5.6 1.893-6.771 5.2-6.771 7.645s1.175 5.751 6.771 7.644a30.96 30.96 0 0 0 9.1 1.36c2.909 0 4.79-3.534 4.79-9s-1.88-9-4.79-9zm-.061 14.389a27.529 27.529 0 0 1-7.392-1.015v-8.741a27.844 27.844 0 0 1 7.392-1.014c.436.317 1.232 2.195 1.232 5.385s-.8 5.069-1.232 5.385z"
          transform="translate(-136.22 -184.377)"
          fill="#3c122c"
        />
        <path
          data-name="Path 12317"
          d="M131.317 346.564c-6.78 0-13.538-.241-15.42-.723a1.809 1.809 0 1 1 .9-3.506c3.14.8 25.782.8 29.189-.008a1.809 1.809 0 1 1 .832 3.522c-2.018.477-8.772.715-15.501.715z"
          transform="translate(-85.978 -240.777)"
          fill="#3c122c"
        />
      </g>
    </g>
  </svg>
);

export const SvgMovil = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
  >
    <path
      d="M16 64C16 28.7 44.7 0 80 0H304c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V64zM224 448c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM304 64H80V384H304V64z"
      fill="currentColor"
    />
  </svg>
);
export const SvgMovilLayer = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 384 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 64C16 28.7 44.7 0 80 0H304C339.3 0 368 28.7 368 64V448C368 483.3 339.3 512 304 512H80C44.7 512 16 483.3 16 448V64ZM224 448C224 430.3 209.7 416 192 416C174.3 416 160 430.3 160 448C160 465.7 174.3 480 192 480C209.7 480 224 465.7 224 448ZM304 64H80V384H304V64Z"
      fill="currentColor"
    />
    <path d="M80 384L304 64V384H80Z" fill="currentColor" fillOpacity="0.5" />
  </svg>
);

export const SvgEbay = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M610.9 258.7L556.1 368.6L501.2 258.7H463.7L474.6 279.3C463.1 260.3 438.7 253.3 411.3 253.3C379.5 253.3 343.4 262 339.8 296.4H373.5C374.9 282.6 389.2 274.6 408.5 274.6C434.5 274.6 449.5 284.2 449.5 307.6V311C436.8 311 421.5 311.1 407.8 311.4C365.4 312.3 338.2 321.4 331.1 345.8C332.1 340.6 332.6 335.2 332.6 329.6C332.6 277.5 292.9 253.4 257.2 253.4C235.9 253.4 214.2 258.9 198.5 277.6V197H166.4V366.5C166.4 376.8 165.8 389.4 165.3 399.6H196.8C197.5 393.3 197.9 386.7 197.9 380.1C211.5 396.7 233.3 405 256.6 405C293.5 405 321.5 383.1 329.9 350.8C329.4 353.6 329.2 356.6 329.2 359.8C329.2 383.9 350.3 404.8 389.8 404.8C416.4 404.8 435.6 399.1 451.7 379.3C451.7 385.9 452 392.6 452.8 399.5H482.6C481.9 391.3 481.6 382 481.6 372.7V307.1C481.6 297.8 479.9 289.9 476.8 283.3L538.3 399.4L509.8 453.5H545.7L644.9 258.7H610.9ZM248.6 383C219 383 198.4 361.5 198.4 329.2C198.4 296.8 219 275.4 248.6 275.4C278.4 275.4 298.8 296.8 298.8 329.2C298.8 361.5 278.4 383 248.6 383ZM449.5 335.7C449.5 365.7 431.6 384.1 397.9 384.1C372.8 384.1 362.9 370.7 362.9 358.3C362.9 339.2 381 333.9 410.1 333C423.2 332.5 437.7 332.4 449.5 332.4V335.7ZM37.6 337.3H166.4V328.8C166.4 277.1 133.3 253.4 88 253.4C31.2 253.4 5 284.2 5 331C5 373.5 30.3 405 87.5 405C118.9 405 155.5 393.3 161.9 358.9H128.8C116.8 394.7 41.1 395.6 37.6 337.3V337.3ZM132.6 315.9H38.2C45.1 259.3 130.3 261.2 132.6 315.9V315.9Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgEstadisticas = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 31.47 31.517"
  >
    <g data-name="Group 15850">
      <g data-name="Layer 2">
        <path
          data-name="Path 12147"
          d="M1 29h30.757v2.05H1z"
          transform="translate(-.7 .166)"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth=".6px"
        />
        <path
          data-name="Path 12148"
          d="M4.076 26.632a3.065 3.065 0 0 0 2.244-5.164l5.248-8.255A2.909 2.909 0 0 0 13.6 13l4.116 4.117a3.025 3.025 0 0 0-.316 1.313 3.076 3.076 0 1 0 5.434-1.956L28.169 7.1a3.1 3.1 0 1 0-1.79-1l-5.307 9.314a3.091 3.091 0 0 0-.593-.06 3.026 3.026 0 0 0-1.317.308l-4.116-4.116a3.025 3.025 0 0 0 .308-1.317 3.076 3.076 0 1 0-6.151 0 3.043 3.043 0 0 0 .648 1.866l-5.36 8.428a3.075 3.075 0 0 0-.415-.042 3.076 3.076 0 1 0 0 6.151zm16.4-7.177A1.025 1.025 0 1 1 21.5 18.43a1.025 1.025 0 0 1-1.02 1.026zm8.2-16.4a1.025 1.025 0 1 1-1.025 1.025 1.025 1.025 0 0 1 1.03-1.028zM12.278 9.2a1.025 1.025 0 1 1-1.025 1.025A1.025 1.025 0 0 1 12.278 9.2zm-8.2 13.328a1.025 1.025 0 1 1-1.028 1.029 1.025 1.025 0 0 1 1.026-1.026z"
          transform="translate(-.7 -.542)"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth=".6px"
        />
      </g>
    </g>
  </svg>
);

export const SvgWechat = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M422.2 236.6C428.6 236.6 434.8 236.9 441 237.7C424.4 159.3 340.3 101 244.7 101C137.5 101 50 173.8 50 266.4C50 319.8 79.3 363.9 127.9 398L108.6 456.6L176.6 422.5C201 427.3 220.4 432.2 244.8 432.2C251 432.2 256.9 431.9 263.1 431.4C259.1 418.5 256.9 404.8 256.9 390.6C256.8 305.7 329.8 236.6 422.2 236.6V236.6ZM317.7 183.7C332.2 183.7 341.9 193.4 341.9 208.1C341.9 222.6 332.2 232.3 317.7 232.3C302.9 232.3 288.4 222.6 288.4 208.1C288.5 193.4 303 183.7 317.7 183.7ZM181.3 232.3C166.8 232.3 152 222.6 152 208.1C152 193.3 166.8 183.7 181.3 183.7C196.1 183.7 205.7 193.4 205.7 208.1C205.7 222.7 196.1 232.3 181.3 232.3ZM600 388.4C600 310.5 522.1 247.1 434.6 247.1C341.9 247.1 269.2 310.5 269.2 388.4C269.2 466.3 342 529.7 434.6 529.7C453.9 529.7 473.5 524.6 493.2 519.8L546.6 549.1L531.8 500.5C571 471.1 600 432.2 600 388.4ZM380.9 363.9C371.2 363.9 361.6 354.2 361.6 344.3C361.6 334.6 371.3 325 380.9 325C395.7 325 405.3 334.7 405.3 344.3C405.3 354.3 395.6 363.9 380.9 363.9ZM488 363.9C478.3 363.9 468.7 354.2 468.7 344.3C468.7 334.6 478.4 325 488 325C502.5 325 512.4 334.7 512.4 344.3C512.5 354.3 502.5 363.9 488 363.9Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgArrowNext = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
      fill="currentColor"
    />
  </svg>
);

export const SvgCrown = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path
      d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"
      fill="currentColor"
    />
  </svg>
);

export const SvgTwitter = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M528.37 220.634C528.695 225.182 528.695 229.731 528.695 234.279C528.695 372.999 423.112 532.837 230.137 532.837C170.685 532.837 115.457 515.618 69 485.731C77.447 486.705 85.568 487.03 94.34 487.03C143.395 487.03 188.553 470.462 224.614 442.198C178.482 441.223 139.822 411.01 126.502 369.426C133 370.4 139.497 371.05 146.32 371.05C155.741 371.05 165.163 369.75 173.934 367.477C125.853 357.73 89.791 315.497 89.791 264.492V263.193C103.76 270.99 120.005 275.863 137.222 276.512C108.958 257.669 90.441 225.507 90.441 189.121C90.441 169.629 95.638 151.761 104.735 136.167C156.39 199.842 234.035 241.425 321.1 245.974C319.476 238.177 318.501 230.056 318.501 221.934C318.501 164.106 365.283 117 423.435 117C453.648 117 480.937 129.67 500.105 150.137C523.82 145.589 546.561 136.817 566.704 124.797C558.906 149.163 542.338 169.63 520.572 182.624C541.689 180.351 562.156 174.502 580.998 166.381C566.706 187.172 548.837 205.689 528.37 220.634V220.634Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgTwitterBox = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 624 624"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M100 0C44.7715 0 0 44.7715 0 100V524C0 579.228 44.7715 624 100 624H524C579.228 624 624 579.229 624 524V100C624 44.7715 579.229 0 524 0H100ZM515.695 221.279C515.695 216.731 515.695 212.182 515.37 207.634C535.837 192.689 553.706 174.172 567.998 153.381C549.156 161.502 528.689 167.351 507.572 169.624C529.338 156.63 545.906 136.163 553.704 111.797C533.561 123.817 510.82 132.589 487.105 137.137C467.937 116.67 440.648 104 410.435 104C352.283 104 305.501 151.106 305.501 208.934C305.501 217.056 306.476 225.177 308.1 232.974C221.035 228.425 143.39 186.842 91.735 123.167C82.638 138.761 77.441 156.629 77.441 176.121C77.441 212.507 95.958 244.669 124.222 263.512C107.005 262.863 90.76 257.99 76.791 250.193V251.492C76.791 302.497 112.853 344.73 160.934 354.477C152.163 356.75 142.741 358.05 133.32 358.05C126.497 358.05 120 357.4 113.502 356.426C126.822 398.01 165.482 428.223 211.614 429.198C175.553 457.462 130.395 474.03 81.34 474.03C72.568 474.03 64.447 473.705 56 472.731C102.457 502.618 157.685 519.837 217.137 519.837C410.112 519.837 515.695 359.999 515.695 221.279Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgSaveCheck = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 16.493 15.689"
  >
    <g data-name="checked (1)">
      <g data-name="Group 14501">
        <path
          data-name="Path 11630"
          d="m16.006 12.309-.083-.083a1.512 1.512 0 0 0-2.18.047l-8.433 9.2-.166.071-.161-.074-2.092-2.445a1.67 1.67 0 0 0-2.447-.095 1.517 1.517 0 0 0-.161 1.954L4.6 26.928a1.306 1.306 0 0 0 1.064.546h.376a2.156 2.156 0 0 0 1.777-.93L16.2 14.438a1.673 1.673 0 0 0-.194-2.129z"
          transform="translate(0 -11.785)"
          fill="currentColor"
        ></path>
      </g>
    </g>
  </svg>
);

export const SvgCheck = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
      fill="currentColor"
    />
  </svg>
);

export const SvgTelegram = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M325 77C188.033 77 77 188.033 77 325C77 461.967 188.033 573 325 573C461.967 573 573 461.967 573 325C573 188.033 461.967 77 325 77ZM439.952 245.66C436.22 284.875 420.071 380.038 411.852 423.96C408.376 442.544 401.53 448.776 394.904 449.385C380.504 450.711 369.566 439.868 355.617 430.724C333.79 416.416 321.459 407.509 300.271 393.547C275.786 377.412 291.659 368.547 305.613 354.047C309.265 350.254 372.72 292.537 373.948 287.301C374.101 286.646 374.248 284.201 372.794 282.917C371.34 281.633 369.204 282.068 367.659 282.417C365.47 282.914 330.601 305.962 263.051 351.559C253.154 358.355 244.19 361.666 236.157 361.493C227.302 361.302 210.269 356.487 197.606 352.37C182.075 347.322 169.731 344.653 170.806 336.079C171.366 331.612 177.516 327.046 189.256 322.379C261.553 290.88 309.763 270.114 333.884 260.079C402.756 231.432 417.067 226.456 426.395 226.29C428.447 226.256 433.034 226.764 436.005 229.175C437.981 230.892 439.241 233.289 439.535 235.891C440.038 239.122 440.178 242.398 439.952 245.66V245.66Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgUserAccount = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 46 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M31.0342 25.1032C35.4718 20.6657 35.4718 13.471 31.0342 9.03351C26.5967 4.59598 19.4021 4.59598 14.9645 9.03351C10.527 13.471 10.527 20.6657 14.9645 25.1032C19.4021 29.5407 26.5967 29.5407 31.0342 25.1032Z"
      stroke="currentColor"
      strokeWidth="4"
      stroke-miterlimit="10"
      stroke-linecap="round"
    ></path>
    <path
      d="M2 48.1602C3.50065 43.7833 6.3313 39.9846 10.0964 37.2953C13.8616 34.6059 18.373 33.1602 23 33.1602C27.627 33.1602 32.1383 34.6059 35.9034 37.2953C39.6686 39.9846 42.4994 43.7833 44 48.1602"
      stroke="currentColor"
      strokeWidth="4"
      stroke-miterlimit="10"
      stroke-linecap="round"
    ></path>
  </svg>
);

export const SvgUserAccount2 = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fal"
    data-icon="user-circle"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 496 512"
    className={`fenext_svg ${className}`}
  >
    <path
      fill="currentColor"
      d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"
      stroke="currentColor"
      strokeWidth="15px"
    ></path>
  </svg>
);
export const SvgUserAccount3 = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 46 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M31.0342 25.1032C35.4718 20.6657 35.4718 13.471 31.0342 9.03351C26.5967 4.59598 19.4021 4.59598 14.9645 9.03351C10.527 13.471 10.527 20.6657 14.9645 25.1032C19.4021 29.5407 26.5967 29.5407 31.0342 25.1032Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M2 48.1602C3.50065 43.7833 6.3313 39.9846 10.0964 37.2953C13.8616 34.6059 18.373 33.1602 23 33.1602C27.627 33.1602 32.1383 34.6059 35.9034 37.2953C39.6686 39.9846 42.4994 43.7833 44 48.1602"
      stroke="currentColor"
      strokeWidth="4"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </svg>
);

export const SvgPaginationUp = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={`fenext_svg ${className}`}
  >
    <path
      d="M77.25 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C175.6 444.9 183.8 448 192 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L77.25 256zM269.3 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C367.6 444.9 375.8 448 384 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L269.3 256z"
      fill="currentColor"
    />
  </svg>
);

export const SvgManageAddresses = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 46 46"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M41.848 32.0758C41.5365 31.9047 41.1698 31.8642 40.8284 31.9634C40.4871 32.0626 40.1992 32.2933 40.028 32.6048C39.8568 32.9163 39.8164 33.2831 39.9156 33.6244C40.0148 33.9657 40.2455 34.2536 40.557 34.4248C42.157 35.3018 43.069 36.2748 43.069 37.0928C43.069 38.0928 41.651 39.6448 37.669 40.9928C32.8746 42.4542 27.8804 43.1534 22.869 43.0648C17.8576 43.1534 12.8634 42.4542 8.069 40.9928C4.089 39.6408 2.669 38.0928 2.669 37.0928C2.669 36.2748 3.585 35.3018 5.181 34.4248C5.47144 34.2441 5.68175 33.9591 5.76885 33.6283C5.85595 33.2975 5.81323 32.9459 5.64945 32.6456C5.48567 32.3453 5.21323 32.1189 4.88796 32.013C4.56269 31.9071 4.20923 31.9296 3.9 32.0758C2.12 33.0538 0 34.7178 0 37.0928C0 38.9138 1.252 41.5088 7.217 43.5358C12.2879 45.0904 17.5719 45.8376 22.875 45.7498C28.1781 45.8376 33.4621 45.0904 38.533 43.5358C44.497 41.5098 45.75 38.9138 45.75 37.0928C45.75 34.7178 43.628 33.0538 41.848 32.0758Z"
      fill="currentColor"
    ></path>
    <path
      d="M12.7555 39.0589C16.0615 39.8989 19.4638 40.2996 22.8745 40.2509C26.2852 40.2997 29.6875 39.8989 32.9935 39.0589C36.3225 38.1189 38.0105 36.7589 38.0105 35.0129C38.0105 33.2669 36.3225 31.9079 32.9935 30.9679C32.2545 30.7589 31.4505 30.5759 30.5935 30.4199C30.1268 31.2199 29.6405 32.0453 29.1345 32.8959C30.0805 33.0379 30.9685 33.2119 31.7745 33.4169C34.2245 34.0409 35.1195 34.7429 35.3035 35.0169C35.1195 35.2869 34.2245 35.9899 31.7745 36.6169C29.0059 37.2594 26.1726 37.5808 23.3305 37.5749C23.1785 37.5859 23.0245 37.5929 22.8705 37.5929C22.7165 37.5929 22.5625 37.5869 22.4105 37.5749C19.5684 37.5809 16.735 37.2594 13.9665 36.6169C11.5165 35.9929 10.6215 35.2909 10.4375 35.0169C10.6215 34.7469 11.5165 34.0449 13.9665 33.4169C14.7725 33.2119 15.6605 33.0379 16.6065 32.8959C16.0978 32.0473 15.6115 31.2219 15.1475 30.4199C14.2935 30.5759 13.4895 30.7589 12.7475 30.9679C9.41847 31.9079 7.73047 33.2679 7.73047 35.0129C7.73047 36.7579 9.42847 38.1189 12.7555 39.0589Z"
      fill="currentColor"
    ></path>
    <path
      d="M22.8731 34.9047C23.4557 34.9071 24.029 34.7587 24.5373 34.4737C25.0455 34.1888 25.4712 33.7771 25.7731 33.2787C30.1341 26.1427 35.3331 16.7387 35.3331 12.4597C35.3036 9.17458 33.978 6.034 31.6446 3.7214C29.3112 1.4088 26.1588 0.111328 22.8736 0.111328C19.5883 0.111328 16.436 1.4088 14.1026 3.7214C11.7692 6.034 10.4435 9.17458 10.4141 12.4597C10.4141 16.7387 15.6141 26.1437 19.9741 33.2787C20.2759 33.7768 20.7015 34.1884 21.2095 34.4733C21.7175 34.7583 22.2906 34.9069 22.8731 34.9047ZM17.8651 11.6047C17.8651 10.6142 18.1588 9.64597 18.7091 8.82241C19.2594 7.99885 20.0415 7.35696 20.9566 6.97792C21.8717 6.59887 22.8786 6.4997 23.8501 6.69293C24.8215 6.88617 25.7139 7.36313 26.4143 8.06351C27.1146 8.7639 27.5916 9.65624 27.7848 10.6277C27.9781 11.5991 27.8789 12.6061 27.4999 13.5212C27.1208 14.4363 26.4789 15.2184 25.6554 15.7687C24.8318 16.319 23.8636 16.6127 22.8731 16.6127C21.5445 16.6111 20.2708 16.0823 19.3319 15.1424C18.3929 14.2025 17.8653 12.9283 17.8651 11.5997V11.6047Z"
      fill="currentColor"
    ></path>
  </svg>
);

export const SvgExit = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 20.578 20.579"
  >
    <g data-name="Group 14698">
      <path
        data-name="exit"
        d="M15.01 15.756v1.608a3.219 3.219 0 0 1-3.215 3.215h-8.08A3.219 3.219 0 0 1 .5 17.364V3.215A3.219 3.219 0 0 1 3.715 0h8.079a3.219 3.219 0 0 1 3.216 3.215v1.608a.8.8 0 1 1-1.608 0V3.215a1.61 1.61 0 0 0-1.608-1.608H3.715a1.61 1.61 0 0 0-1.607 1.608v14.149a1.61 1.61 0 0 0 1.608 1.608h8.079a1.61 1.61 0 0 0 1.605-1.608v-1.608a.8.8 0 0 1 1.608 0zm5.48-6.847-1.8-1.8a.8.8 0 0 0-1.137 1.137l1.28 1.281H9.182a.8.8 0 1 0 0 1.608h9.652l-1.28 1.281a.8.8 0 1 0 1.137 1.137l1.8-1.8a2.012 2.012 0 0 0 0-2.842zm0 0"
        transform="translate(-.5)"
        fill="currentColor"
      />
    </g>
  </svg>
);

export const SvgArrowPre = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
      fill="currentColor"
    />
  </svg>
);

export const SvgWhatsapp = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M504.164 142.545C456.185 94.4516 392.289 68 324.385 68C184.227 68 70.1757 182.051 70.1757 322.21C70.1757 366.983 81.8556 410.725 104.07 449.315L68 581L202.777 545.617C239.878 565.885 281.674 576.534 324.271 576.534H324.385C464.43 576.534 581 462.483 581 322.324C581 254.421 552.144 190.639 504.164 142.545V142.545ZM324.385 533.708C286.369 533.708 249.153 523.517 216.747 504.279L209.075 499.699L129.148 520.654L150.446 442.673L145.408 434.658C124.224 400.992 113.117 362.173 113.117 322.21C113.117 205.754 207.93 110.941 324.5 110.941C380.953 110.941 433.971 132.927 473.82 172.89C513.669 212.854 538.174 265.871 538.059 322.324C538.059 438.894 440.841 533.708 324.385 533.708V533.708ZM440.269 375.456C433.971 372.25 402.71 356.906 396.87 354.845C391.03 352.669 386.793 351.639 382.556 358.051C378.319 364.464 366.181 378.663 362.402 383.014C358.738 387.251 354.959 387.823 348.661 384.617C311.331 365.952 286.827 351.295 262.207 309.041C255.68 297.819 268.734 298.621 280.872 274.345C282.933 270.108 281.903 266.444 280.3 263.238C278.696 260.031 265.986 228.771 260.719 216.06C255.566 203.693 250.298 205.411 246.405 205.182C242.741 204.953 238.504 204.953 234.267 204.953C230.03 204.953 223.16 206.556 217.32 212.854C211.48 219.266 195.105 234.61 195.105 265.871C195.105 297.132 217.892 327.363 220.984 331.6C224.19 335.836 265.757 399.961 329.538 427.558C369.846 444.963 385.648 446.452 405.801 443.475C418.054 441.643 443.36 428.131 448.628 413.244C453.895 398.358 453.895 385.648 452.292 383.014C450.803 380.151 446.567 378.548 440.269 375.456Z"
      fill="currentColor"
    />
  </svg>
);
export const SvgWhatsappBox = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 624 624"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M100 0C44.7715 0 0 44.7715 0 100V524C0 579.228 44.7715 624 100 624H524C579.228 624 624 579.229 624 524V100C624 44.7715 579.229 0 524 0H100ZM312.398 86C372.36 86 428.783 109.358 471.151 151.826C513.519 194.295 539 250.617 539 310.579C539 434.345 436.064 535.056 312.398 535.056H312.298C274.683 535.056 237.775 525.653 205.014 507.755L86 539L117.851 422.717C98.2351 388.64 87.9212 350.014 87.9212 310.478C87.9212 186.712 188.633 86 312.398 86ZM217.35 471.252C245.966 488.24 278.829 497.239 312.398 497.239C415.234 497.239 501.081 413.515 501.081 310.579C501.183 260.728 479.544 213.912 444.356 178.622C409.167 143.333 362.35 123.919 312.5 123.919C209.564 123.919 125.84 207.642 125.84 310.478C125.84 345.767 135.648 380.046 154.354 409.774L158.803 416.852L139.996 485.712L210.575 467.208L217.35 471.252ZM376.406 339.296C381.563 341.116 409.167 354.665 414.729 357.496C415.639 357.943 416.501 358.355 417.311 358.742C421.45 360.72 424.246 362.056 425.346 364.17C426.761 366.496 426.761 377.72 422.11 390.865C417.458 404.01 395.112 415.942 384.292 417.56C366.496 420.189 352.542 418.874 316.949 403.504C264.504 380.812 229.068 330.152 222.152 320.266C221.641 319.535 221.286 319.027 221.091 318.77C221.02 318.673 220.938 318.56 220.845 318.433C217.332 313.645 198.239 287.618 198.239 260.728C198.239 234.939 210.859 221.417 216.724 215.133C217.137 214.691 217.517 214.284 217.856 213.912C223.013 208.351 229.079 206.935 232.821 206.935C236.562 206.935 240.303 206.935 243.539 207.137C243.956 207.162 244.391 207.161 244.841 207.16C248.104 207.155 252.18 207.147 256.179 216.743C257.548 220.046 259.486 224.768 261.575 229.86C266.586 242.069 272.47 256.405 273.47 258.403C274.885 261.234 275.795 264.47 273.975 268.211C269.208 277.745 264.281 282.898 260.786 286.554C256.423 291.118 254.292 293.347 257.493 298.849C279.233 336.161 300.871 349.104 333.835 365.586C339.397 368.417 342.734 367.912 345.969 364.17C349.306 360.328 360.024 347.79 363.766 342.127C367.507 336.465 371.249 337.374 376.406 339.296Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgBolt = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 385 513"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M317.441 44.609C323.341 30.909 318.941 14.909 306.841 6.10905C294.741 -2.69095 278.241 -1.89095 266.941 7.90905L10.9415 231.909C0.941453 240.709 -2.65855 254.809 2.04145 267.209C6.74145 279.609 18.7415 288.009 32.0415 288.009H143.541L66.6414 467.409C60.7414 481.109 65.1414 497.109 77.2414 505.909C89.3414 514.709 105.841 513.909 117.141 504.109L373.141 280.109C383.141 271.309 386.741 257.209 382.041 244.809C377.341 232.409 365.441 224.109 352.041 224.109H240.541L317.441 44.609Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgBrush = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 38 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.75 6.25L15.625 0H12.5L9.375 6.25L6.25 0H4.6875C2.09961 0 0 2.09961 0 4.6875V25H37.5V4.6875C37.5 2.09961 35.4004 0 32.8125 0H21.875L18.75 6.25ZM0 28.125V31.25C0 34.6973 2.80273 37.5 6.25 37.5H12.5V43.75C12.5 47.1973 15.3027 50 18.75 50C22.1973 50 25 47.1973 25 43.75V37.5H31.25C34.6973 37.5 37.5 34.6973 37.5 31.25V28.125H0ZM18.75 45.3125C17.8906 45.3125 17.1875 44.6094 17.1875 43.75C17.1875 42.8906 17.8906 42.1875 18.75 42.1875C19.6094 42.1875 20.3125 42.8906 20.3125 43.75C20.3125 44.6094 19.6094 45.3125 18.75 45.3125Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgViewTableBox = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.9309 20.96C18.5002 22.2239 16.7873 23.1277 14.9367 23.5962C13.0851 24.0649 11.1496 24.0847 9.28925 23.6543C7.4289 23.2236 5.69843 22.3552 4.2414 21.1211C2.78437 19.887 1.64374 18.3228 0.912298 16.5586C0.18183 14.7947 -0.116999 12.8816 0.0412047 10.9788C0.199408 9.07568 0.808783 7.23804 1.8205 5.61841C2.83124 3.99878 4.21503 2.64404 5.85468 1.66675C7.49531 0.689697 9.34589 0.118164 11.2512 0V5.02002C10.7492 5.07275 10.257 5.17944 9.78144 5.33716C9.22968 5.52002 8.70136 5.77148 8.20917 6.08667C7.29218 6.67407 6.5246 7.46753 5.96699 8.40381C5.41035 9.34009 5.08027 10.3933 5.00214 11.4797C4.92402 12.5662 5.10077 13.6558 5.51777 14.6621C5.93476 15.6682 6.58124 16.5632 7.40449 17.2759C8.2287 17.9883 9.20722 18.4988 10.2629 18.7666C10.7883 18.8999 11.3254 18.9712 11.8635 18.9805C12.4074 18.9897 12.9523 18.9358 13.4865 18.8184C13.9435 18.718 14.3879 18.5723 14.8137 18.3843C15.3781 18.1348 15.9084 17.811 16.3908 17.4199L19.9309 20.96ZM23.9709 12.72C23.8176 15.3813 22.7678 17.9121 20.9914 19.8999L17.4514 16.3599C17.9953 15.6882 18.4055 14.9236 18.6643 14.1077C18.8068 13.6584 18.9035 13.1936 18.9514 12.72H23.9709ZM18.9514 11.22H23.9709C23.7902 8.30347 22.55 5.55371 20.4836 3.48755C18.4172 1.42139 15.6672 0.181152 12.7512 0V5.02002C14.3371 5.18921 15.8185 5.89697 16.9465 7.0249C18.0744 8.15308 18.7814 9.63354 18.9514 11.22Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgViewTableList = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 27 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.88 0H3.269C2.40233 0.00105853 1.57146 0.34581 0.958637 0.958637C0.34581 1.57146 0.00105853 2.40233 0 3.269L0 20.7C0.000793892 21.5668 0.345428 22.398 0.958284 23.011C1.57114 23.6241 2.40216 23.9689 3.269 23.97H22.88C23.7468 23.9689 24.5779 23.6241 25.1907 23.011C25.8036 22.398 26.1482 21.5668 26.149 20.7V3.269C26.1479 2.40233 25.8032 1.57146 25.1904 0.958637C24.5775 0.34581 23.7467 0.00105853 22.88 0ZM8.171 7.627H11.984V10.9H8.171V7.627ZM5.992 10.9H2.179V7.627H5.992V10.9ZM14.163 7.631H17.976V10.9H14.164L14.163 7.631ZM20.155 7.631H23.97V10.9H20.156L20.155 7.631ZM2.179 13.074H5.992V16.343H2.179V13.074ZM8.171 13.074H11.984V16.343H8.171V13.074ZM11.984 18.522V21.791H8.171V18.522H11.984ZM14.163 18.522H17.976V21.791H14.164L14.163 18.522ZM14.163 16.343V13.074H17.976V16.343H14.163ZM20.155 13.074H23.97V16.343H20.156L20.155 13.074ZM2.179 20.7V18.522H5.992V21.791H3.269C2.97982 21.7907 2.70258 21.6757 2.49819 21.4711C2.29381 21.2665 2.179 20.9892 2.179 20.7ZM22.879 21.79H20.156V18.522H23.97V20.7C23.97 20.9892 23.8552 21.2665 23.6508 21.4711C23.4464 21.6757 23.1692 21.7907 22.88 21.791L22.879 21.79Z"
      fill="currentColor"
    />
  </svg>
);

export const SvgViewSelectList = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 34 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.45 2.225C4.45 3.45383 3.45383 4.45 2.225 4.45C0.996166 4.45 0 3.45383 0 2.225C0 0.996166 0.996166 0 2.225 0C3.45383 0 4.45 0.996166 4.45 2.225ZM31.546 3.75541H9.34597C8.9065 3.75541 8.48504 3.58083 8.17429 3.27008C7.86354 2.95933 7.68896 2.53787 7.68896 2.09841C7.68896 1.65894 7.86354 1.23748 8.17429 0.92673C8.48504 0.615982 8.9065 0.441406 9.34597 0.441406H31.546C31.9854 0.441406 32.4069 0.615982 32.7176 0.92673C33.0284 1.23748 33.203 1.65894 33.203 2.09841C33.203 2.53787 33.0284 2.95933 32.7176 3.27008C32.4069 3.58083 31.9854 3.75541 31.546 3.75541ZM9.34597 14.1538H31.546C31.9854 14.1538 32.4069 13.9793 32.7176 13.6685C33.0284 13.3578 33.203 12.9363 33.203 12.4968C33.203 12.0574 33.0284 11.6359 32.7176 11.3252C32.4069 11.0144 31.9854 10.8398 31.546 10.8398H9.34597C8.9065 10.8398 8.48504 11.0144 8.17429 11.3252C7.86354 11.6359 7.68896 12.0574 7.68896 12.4968C7.68896 12.9363 7.86354 13.3578 8.17429 13.6685C8.48504 13.9793 8.9065 14.1538 9.34597 14.1538ZM9.34597 24.5523H31.546C31.9854 24.5523 32.4069 24.3777 32.7176 24.067C33.0284 23.7562 33.203 23.3347 33.203 22.8953C33.203 22.4558 33.0284 22.0343 32.7176 21.7236C32.4069 21.4129 31.9854 21.2383 31.546 21.2383H9.34597C8.9065 21.2383 8.48504 21.4129 8.17429 21.7236C7.86354 22.0343 7.68896 22.4558 7.68896 22.8953C7.68896 23.3347 7.86354 23.7562 8.17429 24.067C8.48504 24.3777 8.9065 24.5523 9.34597 24.5523ZM2.225 14.7195C3.45383 14.7195 4.45 13.7234 4.45 12.4945C4.45 11.2657 3.45383 10.2695 2.225 10.2695C0.996166 10.2695 0 11.2657 0 12.4945C0 13.7234 0.996166 14.7195 2.225 14.7195ZM4.45 22.768C4.45 23.9968 3.45383 24.993 2.225 24.993C0.996166 24.993 0 23.9968 0 22.768C0 21.5391 0.996166 20.543 2.225 20.543C3.45383 20.543 4.45 21.5391 4.45 22.768Z"
      fill="currentColor"
    ></path>
  </svg>
);

export const SvgViewSelectNormal = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    className={`fenext_svg ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path
      d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm96 64a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm104 0c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm-72-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM96 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
      fill="currentColor"
    />
  </svg>
);

export const SvgViewSelectBox = ({
  className = "",
}: {
  className?: string;
}) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.13403 0H9.15906C9.51904 0 9.86951 0.09375 10.1799 0.261719C10.3574 0.359375 10.5219 0.480469 10.6674 0.625C10.7617 0.71875 10.8463 0.820312 10.9204 0.929688C11.0131 1.06641 11.0896 1.21094 11.1487 1.36328C11.2429 1.60547 11.2927 1.86719 11.293 2.13281V9.16016C11.2925 9.72656 11.0675 10.2656 10.6674 10.668C10.2673 11.0664 9.72485 11.293 9.15906 11.293H2.13403C1.56824 11.293 1.02576 11.0664 0.62561 10.668C0.225586 10.2656 0.000488281 9.72656 0 9.16016V2.13281C0.000244141 1.84375 0.0596924 1.55859 0.171753 1.29688C0.277832 1.04688 0.43103 0.820312 0.62561 0.625C1.02576 0.226562 1.56824 0 2.13403 0ZM15.835 0H22.8589C23.217 0 23.5658 0.0898438 23.875 0.257812C24.0543 0.355469 24.2205 0.480469 24.3673 0.625C24.4276 0.683594 24.4839 0.746094 24.536 0.8125C24.6969 1.01953 24.8184 1.25 24.8954 1.49609C24.9592 1.69922 24.9927 1.91406 24.9929 2.13281V9.16016C24.9924 9.72656 24.7676 10.2656 24.3677 10.668C24.1823 10.8516 23.9662 11 23.7313 11.1055C23.4598 11.2266 23.1632 11.293 22.86 11.293H15.835C15.2692 11.293 14.7267 11.0664 14.3265 10.668C14.1812 10.5234 14.059 10.3594 13.9622 10.1836C13.7926 9.87109 13.7013 9.51953 13.7009 9.16016V2.13281C13.7014 1.56641 13.9265 1.02734 14.3265 0.625C14.4225 0.53125 14.5265 0.445312 14.6371 0.371094C14.7589 0.289062 14.8887 0.21875 15.0242 0.160156L15.1379 0.117188C15.3601 0.0390625 15.5955 0 15.835 0ZM9.15906 13.6992H2.13403C1.85522 13.6992 1.58203 13.7539 1.32874 13.8594C1.06787 13.9648 0.828247 14.1211 0.625244 14.3242C0.463989 14.4883 0.331177 14.6719 0.230103 14.8711C0.0803223 15.168 0.00012207 15.4961 0 15.8359V22.8594C0.000488281 23.1562 0.0621338 23.4453 0.177979 23.7109C0.283813 23.9531 0.434937 24.1758 0.625977 24.3672C1.026 24.7656 1.56836 24.9922 2.13403 24.9922H9.15906C9.72461 24.9922 10.267 24.7656 10.667 24.3672C10.9166 24.1172 11.0981 23.8125 11.1996 23.4805C11.2607 23.2812 11.2927 23.0742 11.293 22.8594V15.8359C11.2928 15.543 11.2329 15.2578 11.1199 14.9922C11.0139 14.7461 10.8613 14.5195 10.6677 14.3242C10.2676 13.9258 9.72498 13.6992 9.15906 13.6992ZM15.835 13.6992H22.8589C23.4249 13.6992 23.9675 13.9258 24.3677 14.3242C24.7678 14.7266 24.9927 15.2695 24.9929 15.8359V22.8594C24.9922 23.4219 24.7672 23.9648 24.3673 24.3672C23.9674 24.7656 23.4254 24.9922 22.86 24.9922H15.835C15.2693 24.9922 14.7269 24.7656 14.3269 24.3672C13.9269 23.9648 13.7018 23.4258 13.7009 22.8594V15.832C13.7014 15.2656 13.9265 14.7266 14.3265 14.3242C14.7267 13.9258 15.2692 13.6992 15.835 13.6992Z"
      fill="currentColor"
    ></path>
  </svg>
);

export const SvgSearch = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={`fenext_svg ${className}`}
  >
    <path
      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
      fill="currentColor"
    />
  </svg>
);

export const SvgLoader = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`fenext_svg ${className}`}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <g transform="rotate(0 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.5185185185185185s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(24 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.48148148148148145s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(48 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.4444444444444444s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(72 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.4074074074074074s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(96 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.37037037037037035s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(120 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.3333333333333333s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(144 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.2962962962962963s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(168 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.25925925925925924s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(192 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.2222222222222222s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(216 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.18518518518518517s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(240 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.14814814814814814s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(264 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.1111111111111111s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(288 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.07407407407407407s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(312 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="-0.037037037037037035s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
    <g transform="rotate(336 50 50)">
      <rect
        x="47.5"
        y="20.5"
        rx="2.5"
        ry="6.5"
        width="5"
        height="13"
        fill="currentColor"
      >
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="0.5555555555555556s"
          begin="0s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </g>
  </svg>
);

export const SvgCashapp = ({ className = "" }: { className?: string }) => (
  <svg
    className={`fenext_svg ${className}`}
    viewBox="0 0 650 650"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M201.28 548.99H108.4V249.89H201.28V548.99ZM154.79 209.09C125.09 209.09 101 184.49 101 154.79C101 140.524 106.667 126.842 116.755 116.755C126.842 106.667 140.524 101 154.79 101C169.056 101 182.738 106.667 192.825 116.755C202.913 126.842 208.58 140.524 208.58 154.79C208.58 184.49 184.48 209.09 154.79 209.09ZM548.9 548.99H456.22V403.39C456.22 368.69 455.52 324.19 407.93 324.19C359.64 324.19 352.24 361.89 352.24 400.89V548.99H259.46V249.89H348.54V290.69H349.84C362.24 267.19 392.53 242.39 437.72 242.39C531.72 242.39 549 304.29 549 384.69V548.99H548.9Z"
      fill="currentColor"
    />
  </svg>
);

export const FenextImgPlaceholderUrlBase =
  process?.env?.["NEXT_PUBLIC_IMG_PLACEHOLDER"] ??
  "https://fenextjs-img-placeholder.vercel.app";

export const FenextImgUserPlaceholder = `${FenextImgPlaceholderUrlBase}/user.png`;

export const FenextImgPlaceholder = `${FenextImgPlaceholderUrlBase}/placeholder.png`;

export interface ChatProps {
  loader?: boolean;
  useAccountOwner?: boolean;
  onScrollIfNewMessage?: boolean;
  onActionAfterNewMessage?: () => void;

  empty?: ReactNode;
  customBack?: ReactNode;

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
export const Chat = ({
  loader,

  empty = (
    <>
      <Text>There is not messages yet</Text>
      <SvgTelegram />
    </>
  ),
  customBack,

  chatUser,
  loaderChatUser,

  chatMessage,
  loaderChatMessage,

  chatFormSendMessage,
  loaderChatFormSendMessage,

  useBtnLoadMoreMssages = false,
  btnLoadMoreMessages = {
    children: "Load more messages",
  },

  fullPage = true,

  onScrollIfNewMessage = true,
  ...props
}: ChatProps) => {
  const onActionAfterNewMessage = () => {
    setTimeout(() => {
      if (onScrollIfNewMessage) {
        window.scrollTo(0, document.body.scrollHeight);
      }
      props?.onActionAfterNewMessage?.();
    }, 100);
  };

  const [lastMessage, setLastMessage] = useState<ChatMessageProps | undefined>(
    undefined,
  );

  const onLoadLastMessage = useCallback(
    (newMessage: ChatMessageProps) => {
      if (
        !lastMessage ||
        (lastMessage.createdAt?.getTime() ?? 0) <
          (newMessage.createdAt?.getTime() ?? 0)
      ) {
        setLastMessage(newMessage);
        onActionAfterNewMessage();
      }
    },
    [lastMessage],
  );
  useEffect(() => {
    if (chatMessage) {
      onLoadLastMessage(
        [...chatMessage].sort(
          (a, b) =>
            (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0),
        )[0],
      );
    }
  }, [chatMessage]);

  return (
    <>
      <div className={`fenext-chat fenext-chat-${fullPage ? "full-page" : ""}`}>
        <div className="fenext-chat-contentTop">
          {customBack}

          {[chatUser].flat(2).map((e, i) => {
            return (
              <>
                <ChatUser key={i} {...e} />
              </>
            );
          })}
          {(loader || loaderChatUser) &&
            new Array(2).fill(<ChatUser loader={true} />)}
        </div>
        <div className="fenext-chat-contentMessage">
          {loader || loaderChatMessage ? (
            new Array(2).fill(1).map((e, i) => {
              const n = e * i;
              return (
                <>
                  <ChatMessage
                    key={i}
                    id={i}
                    loader={true}
                    right={n % 2 == 0}
                  />
                </>
              );
            })
          ) : (
            <>
              {useBtnLoadMoreMssages && (
                <div className="fenext-chat-contentBtnLoadMore">
                  <Button {...btnLoadMoreMessages} />
                </div>
              )}
            </>
          )}
          {chatMessage.map((e) => {
            return (
              <>
                <ChatMessage key={e.id} {...e} />
              </>
            );
          })}
          {!loader && !loaderChatMessage && chatMessage.length == 0 && (
            <div className="fenext-chat-empty">{empty}</div>
          )}
        </div>
        <div className="fenext-chat-contentForm">
          <ChatFormSendMessage
            loader={loader || loaderChatFormSendMessage}
            {...chatFormSendMessage}
          />
        </div>
      </div>
    </>
  );
};

export interface ChatMessageProps {
  id: string | number;
  loader?: boolean;
  right?: boolean;
  account?: Partial<UserProps>;
  message?: ReactNode;
  file?: FileProps;
  createdAt?: Date;
  view?: boolean;
  imgProps?: Partial<ImgProps>;
}
export const ChatMessage = ({
  message,
  file,
  createdAt,
  account,

  right = false,
  view = false,
  loader,
  imgProps = {
    imgIf404: FenextImgUserPlaceholder,
  },
}: ChatMessageProps) => {
  return (
    <>
      <div
        className={`
                    fenext-chat-message
                    fenext-chat-message-${right ? "right" : ""}
                    fenext-chat-message-${view ? "viewed" : ""}
                `}
      >
        <div className="fenext-chat-message-img">
          <Img loader={loader} src="" {...account?.img} {...imgProps} />
        </div>
        <div className="fenext-chat-message-info">
          <div className="fenext-chat-message-top">
            <Text
              loader={loader}
              nLineLoader={1}
              className="fenext-chat-message-name"
            >
              {account?.name}
            </Text>
            <Text
              loader={loader}
              nLineLoader={1}
              className="fenext-chat-message-createdAt"
            >
              {createdAt && (
                <>
                  {parseDateToText({
                    date: createdAt,
                    type: "date",
                  })}
                  {", "}
                  {parseDateToText({
                    date: createdAt,
                    type: "time",
                  })}
                </>
              )}
            </Text>
          </div>
          <Text loader={loader} className="fenext-chat-message-message">
            {message}
            <br />
          </Text>
          {file && (
            <>
              <div className="fenext-chat-message-file">
                <InputUpload defaultValue={file} disabled={true} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export interface ChatFormSendMessageDataProps {
  message?: string;
  file?: FileProps;
}

export interface ChatFormSendMessageProps extends _TProps {
  onSubmit?: (data: ChatFormSendMessageDataProps) => Promise<void>;
  loader?: boolean;
  useSubmitInEnter?: boolean;
  btnChildren?: ReactNode;
  btnFileChildren?: ReactNode;
  InputFileProps?: Omit<InputFileProps, "onChange">;
  placeholderMessage?: string;
}
export const ChatFormSendMessage = ({
  useSubmitInEnter = true,
  btnChildren = <SvgSend />,
  btnFileChildren = <SvgPaperClip />,
  placeholderMessage = "Message",
  InputFileProps = {},

  ...props
}: ChatFormSendMessageProps) => {
  const { _t } = use_T({ ...props });
  const ref = useRef(null);
  const [__key, set__key] = useState(0);

  const { data, setData, onChangeData, loaderSubmit, onSubmitData } =
    useData<ChatFormSendMessageDataProps>(
      {},
      {
        onSubmitData: async (data) => {
          try {
            await props?.onSubmit?.(data);
          } finally {
            set__key((a) => a + 1);
            setData({});
            const label = (ref?.current as any)?.querySelector?.(
              `.fenext-chat-form-send-message-label`,
            ) as any;
            const chat = document.querySelector(".fenext-chat") as any;

            setTimeout(function () {
              label?.click?.();
            }, 0);
            setTimeout(function () {
              chat?.scrollTo?.(0, chat?.scrollTop + 99990000009);
            }, 10);
          }
        },
      },
    );
  return (
    <>
      <div className="fenext-chat-form-send-message" ref={ref}>
        <InputText
          classNameLabel="fenext-chat-form-send-message-label"
          type="textarea"
          placeholder={_t(placeholderMessage)}
          className="fenext-chat-form-send-message-input-message"
          onChange={onChangeData("message")}
          value={data.message ?? ""}
          onEnter={() => {
            if (!data.message || data.message == "") {
              return;
            }
            if (useSubmitInEnter) {
              onSubmitData();
            }
          }}
          disabled={loaderSubmit || props?.loader}
        />
        <div className="fenext-chat-form-send-message-content-btn">
          <Button
            loader={loaderSubmit || props?.loader}
            disabled={!data.message || data.message == ""}
            _t={_t}
            size="extra-small"
          >
            {btnChildren}
          </Button>
          <InputFile
            {...InputFileProps}
            key={__key}
            onChange={(e) => {
              onSubmitData({
                data: {
                  ...data,
                  file: e,
                },
              });
            }}
          >
            <Button
              loader={loaderSubmit || props?.loader}
              _t={_t}
              size="extra-small"
            >
              {btnFileChildren}
            </Button>
          </InputFile>
        </div>
      </div>
    </>
  );
};

export interface ChatUserProps extends Partial<UserProps> {
  loader?: boolean;
  imgProps?: Partial<ImgProps>;
  extraData?: ReactNode;
}
export const ChatUser = ({
  name,
  img,
  role,

  imgProps = {
    imgIf404: FenextImgUserPlaceholder,
  },
  loader,
  extraData,
}: ChatUserProps) => {
  return (
    <>
      <div className={`fenext-chat-user fenext-chat-user-${role}`}>
        <Img
          loader={loader}
          src=""
          {...img}
          {...imgProps}
          className={`fenext-chat-user-img ${imgProps?.className ?? ""}`}
        />
        <div className="fenext-chat-user-content">
          <Text
            className="fenext-chat-user-text"
            loader={loader}
            nLineLoader={1}
          >
            {name}
          </Text>
          {extraData}
        </div>
      </div>
    </>
  );
};

export type TextTypeProps =
  | "span"
  | "p"
  | "strong"
  | "small"
  | "em"
  | "b"
  | "del"
  | "i"
  | "mark"
  | "ins"
  | "sub"
  | "sup";

/**
 * Properties for the base Text component.
 */
export interface TextBaseProps extends PropsWithChildren, _TProps {
  /**
   * The class name for the component.
   */
  tag?: TextTypeProps;

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
export interface TextProps extends TextBaseProps, TextClassProps {}

export const Text = ({
  className = "",
  tag = "p",
  loader = false,
  children,
  nLineLoader = 3,
  ...props
}: TextProps) => {
  const { _t } = use_T({ ...props });
  const Tag = tag;
  return (
    <>
      <Tag className={`fenext-text fenext-text-${tag} ${className} `}>
        {loader ? (
          <>
            <div className="fenext-text-loader">
              {new Array(nLineLoader).fill(<LoaderLine />)}
            </div>
          </>
        ) : (
          <>{_t(children)}</>
        )}
      </Tag>
    </>
  );
};

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
export interface ContentShowProps
  extends ContentShowBaseProps,
    ContentShowClassProps {}

export const ContentShow = ({
  className = "",
  children,
  show = true,
  ...props
}: ContentShowProps) => {
  const { _t } = use_T({ ...props });
  return (
    <>
      <div
        className={`fenext-content-show fenext-content-show-${
          show ? "show" : "hidden"
        } ${className} `}
      >
        {_t(children)}
      </div>
    </>
  );
};

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

export const Title = ({
  className = "",
  tag = "h1",
  loader = false,
  children,
  ...props
}: TitleProps) => {
  const { _t } = use_T({ ...props });
  const Tag = tag;
  return (
    <>
      <Tag className={`fenext-title fenext-title-${tag} ${className} `}>
        {loader ? <LoaderLine /> : <>{_t(children)}</>}
      </Tag>
    </>
  );
};

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
export interface BreadcrumbProps
  extends BreadcrumbBaseProps,
    BreadcrumbClassProps {}

export const Breadcrumb = ({
  className = "",
  classNameItem = "",
  classNameLink = "",
  links,
  ...props
}: BreadcrumbProps) => {
  const { _t } = use_T({ ...props });
  return (
    <>
      <ul className={`fenext-breadcrumb ${className} `}>
        {links.map((link, i) => {
          return (
            <>
              <li key={i} className={`fenext-breadcrumb-item ${classNameItem}`}>
                <Link
                  href={link.href}
                  className={`fenext-breadcrumb-item-link ${classNameLink}`}
                  onClick={link?.onClick}
                  _t={link?._t ?? _t}
                  useT={link?.useT ?? props?.useT}
                  children={link.children}
                />
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
};

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
export interface SwichViewListProps<T>
  extends SwichViewListBaseProps<T>,
    SwichViewListClassProps {}

export const SwichViewList = <T,>({
  className = "",
  defaultValue,
  onChange,
  list = [],
  name = "fenext-swich-view",
}: SwichViewListProps<T>) => {
  const ITEMS = useMemo<InputRadioItemProps<T>[]>(() => {
    return list.map((e) => {
      return {
        id: `fenext-swich-view-${e.id}`,
        label: (
          <>
            <div className={`fenext-swich-view-item`}>{e.icon}</div>
          </>
        ),
        data: e.id,
      };
    });
  }, [defaultValue, list]);

  return (
    <div className={`fenext-swich-view ${className}`}>
      <InputRadio
        name={name}
        defaultValue={ITEMS.find((e) => e.data == defaultValue)}
        items={ITEMS}
        onChange={(e) => {
          onChange?.(e?.data);
        }}
      />
    </div>
  );
};

export type SwichViewTableType =
  | "fenext-swich-view-table-box"
  | "fenext-swich-view-table-list";

/**
 * Properties for the base SwichViewTable component.
 */
export interface SwichViewTableBaseProps
  extends Omit<SwichViewListBaseProps<SwichViewTableType>, "list" | "name"> {}

/**
 * Properties for the class of the SwichViewTable component.
 */
export interface SwichViewTableClassProps extends SwichViewListClassProps {}

/**
 * Properties for the SwichViewTable component.
 */
export interface SwichViewTableProps
  extends SwichViewTableBaseProps,
    SwichViewTableClassProps {}

export const SwichViewTable = ({
  className = "",
  defaultValue = "fenext-swich-view-table-list",
  ...props
}: SwichViewTableProps) => {
  const ITEMS: SwichViewListBaseItemProps<SwichViewTableType>[] = [
    {
      id: "fenext-swich-view-table-box",
      icon: <SvgViewTableBox />,
    },
    {
      id: "fenext-swich-view-table-list",
      icon: <SvgViewTableList />,
    },
  ];
  return (
    <SwichViewList<SwichViewTableType>
      {...props}
      name="fenext-swich-view-table"
      className={`fenext-swich-view-table ${className}`}
      list={ITEMS}
      defaultValue={defaultValue}
    />
  );
};

export type SwichViewSelectType =
  | "fenext-swich-view-select-box"
  | "fenext-swich-view-select-list"
  | "fenext-swich-view-select-normal";

/**
 * Properties for the base SwichViewSelect component.
 */
export interface SwichViewSelectBaseProps
  extends Omit<SwichViewListBaseProps<SwichViewSelectType>, "list" | "name"> {}

/**
 * Properties for the class of the SwichViewSelect component.
 */
export interface SwichViewSelectClassProps extends SwichViewListClassProps {}

/**
 * Properties for the SwichViewSelect component.
 */
export interface SwichViewSelectProps
  extends SwichViewSelectBaseProps,
    SwichViewSelectClassProps {}

export const SwichViewSelect = ({
  className = "",
  defaultValue = "fenext-swich-view-select-normal",
  ...props
}: SwichViewSelectProps) => {
  const ITEMS: SwichViewListBaseItemProps<SwichViewSelectType>[] = [
    {
      id: "fenext-swich-view-select-box",
      icon: <SvgViewSelectBox />,
    },
    {
      id: "fenext-swich-view-select-list",
      icon: <SvgViewSelectList />,
    },
    {
      id: "fenext-swich-view-select-normal",
      icon: <SvgViewSelectNormal />,
    },
  ];
  return (
    <SwichViewList<SwichViewSelectType>
      {...props}
      name="fenext-swich-view-select"
      className={`fenext-swich-view-select ${className}`}
      list={ITEMS}
      defaultValue={defaultValue}
    />
  );
};

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
export interface TableActionCheckboxProps<T>
  extends TableActionCheckboxBaseProps<T>,
    TableActionCheckboxClassProps {}

export const TableActionCheckbox = <T = any,>({
  className = "",
  actionAllCheckbox,
  actions,
  data,
}: TableActionCheckboxProps<T>) => {
  const ACTIONS = useMemo(() => {
    return actions?.map((a) => {
      return (
        <>
          <div className={`fenext-table-actions-checkbox-action  `}>
            {a(data ?? [])}
          </div>
        </>
      );
    });
  }, [data, actions]);
  return (
    <>
      <div className={`fenext-table-actions-checkbox ${className} `}>
        <div className={`fenext-table-actions-checkbox-select  `}>
          <InputCheckbox {...actionAllCheckbox} />
        </div>
        {ACTIONS}
      </div>
    </>
  );
};

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
  MediaPageProps?: Omit<
    MediaPageProps,
    "onChange" | "multiple" | "defaultValue"
  >;
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
export interface MediaInputProps
  extends MediaInputBaseProps,
    MediaInputClassProps {}

export const MediaInput = ({
  className = "",
  titleView = "Upload Image",
  textView = "Click for select or upload Image.",
  iconView = undefined,
  defaultValue = undefined,
  multiple = false,
  onChange,
  ButtonUploadProps = {
    children: "Upload Image",
    full: true,
  },
  MediaPageProps = {},
  ModalProps = {
    type: "full",
  },
  ...props
}: MediaInputProps) => {
  const { _t } = use_T({ ...props });
  const [modalActive, setModalActive] = useState(false);
  const { data, onChangeData, onDeleteData, setData } = useData<ImgDataProps[]>(
    [defaultValue ?? []].flat(2),
    {
      onChangeDataAfter: (d) => {
        if (multiple) {
          onChange?.(d);
        } else {
          onChange?.(d?.[0]);
        }
      },
    },
  );
  const onOpen = () => {
    setModalActive(true);
  };
  const onClose = () => {
    setModalActive(false);
  };
  const onAddImg = (data: ImgDataProps | ImgDataProps[] | undefined = []) => {
    const d = [data].flat(2).map((e) => ({
      ...e,
      name: `${new Date().getTime()}_${e.name}`,
    }));
    setData(d);
  };
  const onAcepteImg = (data: ImgDataProps | ImgDataProps[]) => {
    onAddImg(data);
    onClose();
  };
  return (
    <>
      <div className={`fenext-media ${className} `}>
        {data == undefined || data.length == 0 ? (
          <div onClick={onOpen} className="fenext-media-element-show-modal">
            <InputUpload
              disabled={true}
              title={titleView}
              text={textView}
              icon={iconView}
              _t={_t}
            />
            <div className="fenext-media-btn-modal"></div>
          </div>
        ) : (
          <></>
        )}
        <GridGallery
          _t={_t}
          items={[data]
            ?.flat(2)
            .splice(0, multiple ? data.length : 1)
            .map((item, i) => {
              return (
                <InputUpload
                  key={`${i}-${JSON.stringify(item ?? {})}`}
                  disabled={data === undefined}
                  title={titleView}
                  text={textView}
                  defaultValue={{
                    fileData: item.src,
                    text: item.name,
                  }}
                  onChange={(e) => {
                    if (e.fileData) {
                      onChangeData(i)({
                        src: e.fileData,
                        name: e.text,
                      });
                    } else {
                      onDeleteData(i);
                    }
                  }}
                  tagPreview="img"
                  _t={_t}
                />
              );
            })}
        />
        {multiple ? (
          <>
            <Button {...ButtonUploadProps} onClick={onOpen} _t={_t} />
          </>
        ) : (
          <></>
        )}
        <ModalBase {...ModalProps} onClose={onClose} active={modalActive}>
          <MediaPage
            {...MediaPageProps}
            key={JSON.stringify(data)}
            multiple={multiple}
            onChange={onAddImg}
            defaultValue={data}
            onAcepte={onAcepteImg}
            isPage={false}
            _t={_t}
          />
        </ModalBase>
      </div>
    </>
  );
};

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
  InputUploadProps?: Omit<
    InputUploadProps,
    | "onChange"
    | "defaultValue"
    | "onChangeProgress"
    | "onUploadFile"
    | "clearAfterUpload"
  >;
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
export interface MediaPageProps
  extends MediaPageBaseProps,
    MediaPageClassProps {}

export const MediaPage = ({
  className = "",
  multiple = false,
  onChange,
  onUploadImg,
  onDeleteImg,
  onAcepte,
  HeaderPage = (
    <>
      <Title tag="h3">Media</Title>
      <Text>Upload or Select Imagen.</Text>
    </>
  ),
  defaultValue,
  images = [],
  loaderImages = false,
  disabledSelectImg = false,
  InputUploadProps = {
    accept: ["png", "jpg", "jpeg", "webp"],
    title: "Upload Imagen",
    text: "Click for select or upload Imagen.",
  },
  ButtonAcceptProps = {
    children: "Acepte",
  },
  ButtonCancelProps = {
    children: "Cancel",
  },
  isPage = true,
  extraContentImgs = undefined,
  onRenderImg = undefined,
  ...props
}: MediaPageProps) => {
  const { _t } = use_T({ ...props });
  const [keyInputUpload, setKeyInputUpload] = useState(0);
  const { data, onConcatData, onDeleteData, setData } = useData<ImgDataProps[]>(
    [defaultValue ?? []].flat(2),
    {
      onChangeDataAfter: (d) => {
        if (multiple) {
          onChange?.(d);
        } else {
          onChange?.(d?.[0]);
        }
      },
    },
  );
  const onSelectImg = (i: number) => () => {
    if (disabledSelectImg) {
      return;
    }
    const selected = images[i];
    const indexDelete = data.findIndex((e) => e.src == selected.src);
    if (indexDelete > -1) {
      onDeleteData(indexDelete);
      return;
    }
    if (multiple) {
      onConcatData([selected]);
    } else {
      setData([selected]);
    }
  };
  const onUploadImgFile = async (v: FileProps) => {
    setKeyInputUpload(new Date().getTime());
    const img = await parseBase64ToImgData({
      base64: v.fileData,
      name: v.text,
      quality: 0.7,
    });
    // console.log(img.srcThumbnail_100);
    env_log(img, {
      name: "Img upload",
    });
    onUploadImg?.(img);
  };
  const onClickAcepte = () => {
    if (multiple) {
      onAcepte?.(data);
    } else {
      onAcepte?.(data?.[0]);
    }
  };
  const onClickCancel = () => {
    setData([]);
  };

  const LISTIMAGES = useMemo(() => {
    return (
      <>
        {images.map((img, i) => {
          const active = data.find((e) => e.src == img.src) !== undefined;
          return (
            <>
              <div
                key={`${i}-${img.src}-${img?.id ?? ""}`}
                className={`fenext-media-page-img fenext-media-page-img-${
                  active ? "active" : ""
                }`}
                onClick={onSelectImg(i)}
              >
                <div className={`fenext-media-page-img-element`}>
                  {(onRenderImg ? onRenderImg(img) : <Img {...img} />) ?? (
                    <Img {...img} />
                  )}
                </div>
                <div className={`fenext-media-page-img-capa`}></div>
                <div className={`fenext-media-page-img-actions`}>
                  <a
                    className={`fenext-media-page-img-action fenext-media-page-img-download`}
                    href={img.src}
                    download={img.name ?? "download.png"}
                    target="_blank"
                  >
                    <SvgSave />
                  </a>
                  <div
                    className={`fenext-media-page-img-action fenext-media-page-img-delete`}
                    onClick={() => {
                      onDeleteImg?.(img);
                    }}
                  >
                    <SvgTrash />
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  }, [images, onRenderImg, onSelectImg, onDeleteImg, _t]);

  return (
    <>
      <div className={`fenext-media-page ${className} `}>
        <div className={`fenext-media-page-top`}>
          <div className={`fenext-media-page-top-header`}>{_t(HeaderPage)}</div>
          <div className={`fenext-media-page-top-btn-acepte`}>
            {data.length != 0 && !isPage && (
              <>
                <Button
                  {...ButtonCancelProps}
                  onClick={onClickCancel}
                  _t={_t}
                />

                <Button
                  {...ButtonAcceptProps}
                  onClick={onClickAcepte}
                  _t={_t}
                />
              </>
            )}
          </div>
        </div>
        <div className={`fenext-media-page-upload`}>
          <InputUpload
            {...InputUploadProps}
            key={keyInputUpload}
            onChange={onUploadImgFile}
            clearAfterUpload={true}
            _t={_t}
          />
        </div>
        <div className={`fenext-media-page-imgs`}>
          {loaderImages ? (
            <>
              <div
                className={`fenext-media-page-img fenext-media-page-img-loader`}
              >
                <LoaderSpinner />
              </div>
            </>
          ) : (
            <></>
          )}
          {LISTIMAGES}
          {extraContentImgs && (
            <div className={`fenext-media-page-extra-content-imgs`}>
              {_t(extraContentImgs)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

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

export const Cols = ({
  className = "",
  children,
  nCols = 2,
  breakInside = true,
  ...props
}: ColsProps) => {
  const { _t } = use_T({ ...props });
  return (
    <>
      <div
        className={`fenext-cols fenext-cols-${
          breakInside ? "break-inside" : ""
        } ${className} `}
        style={
          {
            ["--fenext-cols-columns"]: nCols,
          } as CSSProperties
        }
      >
        {_t(children)}
      </div>
    </>
  );
};

export type ButtonBaseSize =
  | "extra-small"
  | "small"
  | "normal"
  | "strong"
  | "extra-strong";

export type ButtonOnClick = React.MouseEventHandler<HTMLButtonElement> &
  React.MouseEventHandler<HTMLDivElement>;
/**
 * Properties for the base button component.
 */
export interface ButtonBaseProps extends PropsWithChildren, _TProps {
  /**
   * Indicates whether the button is currently in the loading state.
   */
  loader?: boolean;
  invert?: boolean;
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
   * The icon to display in the button.
   */
  iconLoader?: ReactNode;
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
export interface ButtonClassProps {
  /**
   * The class name for the component.
   */
  className?: string;
  /**
   * The class name for the component.
   */
  classNameDisabled?: string;
  /**
   * The class name for the component.
   */
  classNameLoader?: string;
  /**
   * The class name for the component.
   */
  classNameInvert?: string;
  /**
   * The class name for the component.
   */
  classNameContentLoaderElement?: string;
  /**
   * The class name for the component.
   */
  classNameLoaderElement?: string;
}

/**
 * Properties for the button component.
 */
export interface ButtonProps extends ButtonBaseProps, ButtonClassProps {}

export const Button = ({
  className = "",
  classNameLoader = "",
  classNameInvert = "",
  classNameDisabled = "",
  classNameContentLoaderElement = "",
  classNameLoaderElement = "",

  children,
  loader = false,
  invert = false,
  disabled = false,
  onClick = () => {},
  onClickDisabled: onClickDisabledProps,
  icon = "",
  iconLoader = undefined,
  isBtn = true,
  full = false,
  size = "normal",
  ...props
}: ButtonProps) => {
  const { _t } = use_T({ ...props });
  const Tag = isBtn ? "button" : "div";

  const onClickDisabled = (e) => {
    e?.preventDefault?.();
    onClickDisabledProps?.(e);
  };

  return (
    <>
      <Tag
        onClick={disabled ? onClickDisabled : onClick}
        className={`
                    fenext-btn
                    fenext-btn-${loader ? `loader ${classNameLoader}` : ""}
                    fenext-btn-${invert ? `invert ${classNameInvert}` : ""}
                    fenext-btn-${disabled ? `disabled ${classNameDisabled}` : ""}
                    fenext-btn-size-${size}
                    fenext-btn-${icon != "" ? "icon" : ""}
                    ${full ? "fenext-btn-size-full" : ""}
                    ${className}
                `}
        disabled={loader}
      >
        {loader && (
          <>
            <div
              className={`fenext-btn-content-loader-element ${classNameContentLoaderElement}`}
            >
              {iconLoader ?? (
                <Loader
                  classNameLoader={`fenext-btn-loader-element ${classNameLoaderElement}`}
                />
              )}
            </div>
          </>
        )}

        {icon}
        {_t(children)}
      </Tag>
    </>
  );
};

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
   * props for alert hook.
   */
  alert?: AlertComponentProps;
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
export interface LayoutGridMenuLeftProps
  extends LayoutGridMenuLeftBaseProps,
    LayoutGridMenuLeftClassProps {}

export const LayoutGridMenuLeft = ({
  className = "",
  classNameLoader = "",
  classNameChildren = "",
  classNameMenuLeft = "",
  classNameMenuLeftContent = "",

  children,
  menuLeft,
  loader = false,
  menuLeftActive = true,
  menuLeftMovilActive = false,
  useHeaderButtonMenu = false,
  usePageProgress = true,
  useAlertHook = true,
  alertHookProps = {},
  alert = undefined,
  target = "fenext-btn-menu-checkbox",
  ...props
}: LayoutGridMenuLeftProps) => {
  const t = `[name="${target}"]:checked`;
  return (
    <>
      <div
        className={`fenext-layout-grid fenext-layout-grid-ml 
                    ${className} 
                    fenext-layout-grid-ml-${
                      menuLeftActive ? "active" : "inactive"
                    }
                    fenext-layout-grid-ml-movil-${
                      menuLeftMovilActive ? "active" : "inactive"
                    }
                    fenext-layout-grid-ml-${
                      useHeaderButtonMenu ? "use-btn-menu" : ""
                    }
                `}
        data-target={target}
        {...props}
      >
        <div className={`fenext-layout-grid-ml-menu-left ${classNameMenuLeft}`}>
          <div
            className={`fenext-layout-grid-ml-menu-left-content ${classNameMenuLeftContent}`}
          >
            {menuLeft}
          </div>
        </div>
        <div className={`fenext-layout-grid-ml-children ${classNameChildren}`}>
          {usePageProgress && <PageProgress />}
          {alert != undefined && (
            <Alert
              {...alert}
              className={`fenext-layout-grid-alert ${alert?.className ?? ""}`}
            />
          )}
          {useAlertHook && (
            <AlertHook
              {...alertHookProps}
              className={`fenext-layout-grid-alert ${alertHookProps?.className ?? ""}`}
            />
          )}
          {loader ? (
            <Loader
              classNameLoader={`${classNameLoader} fenext-layout-grid-loader`}
            />
          ) : (
            <>{children}</>
          )}
        </div>
        {target != "fenext-btn-menu-checkbox" && (
          <>
            <style>
              {`
                                body:has(${t}) .fenext-layout-grid-ml-use-btn-menu[data-target=${target}] {
                                    @media (min-width: 576px) {
                                        --size-menu : var(--fenext-size-menu-left, auto);
                                    }
                                    @media (max-width: 575px) {
                                        --clip-path: circle(200% at 0% 0%);
                                    }
                                }
                                body:not(:has(${t})) .fenext-layout-grid-ml-use-btn-menu[data-target=${target}] {
                                    @media (min-width: 576px) {
                                        --size-menu : var(--fenext-size-menu-left-close, 0px);
                                    }
                                    @media (max-width: 575px) {
                                        --clip-path: circle(0% at 0% 0%);
                                    }
                                }
                            `}
            </style>
          </>
        )}
      </div>
    </>
  );
};

/**
 * Properties for the base button component.
 */
export interface LayoutGridMenuTopLeftBaseProps
  extends LayoutGridMenuTopBaseProps,
    LayoutGridMenuLeftBaseProps {}

/**
 * Properties for the class of the button component.
 */
export interface LayoutGridMenuTopLeftClassProps
  extends LayoutGridMenuTopClassProps,
    LayoutGridMenuLeftClassProps,
    LoaderClassProps {}

/**
 * Properties for the button component.
 */
export interface LayoutGridMenuTopLeftProps
  extends LayoutGridMenuTopLeftBaseProps,
    LayoutGridMenuTopLeftClassProps {}

export const LayoutGridMenuTopLeft = ({
  className = "",
  classNameLoader = "",
  classNameChildren = "",
  classNameMenuTop = "",
  classNameMenuLeft = "",
  classNameMenuLeftContent = "",

  children,
  menuLeft,
  menuTop,
  loader = false,
  menuLeftActive = true,
  menuLeftMovilActive = false,
  useHeaderButtonMenu = false,
  usePageProgress = true,
  alertHookProps,
  alert = undefined,
  useAlertHook = true,
  target = "fenext-btn-menu-checkbox",
}: LayoutGridMenuTopLeftProps) => {
  return (
    <>
      <LayoutGridMenuTop
        className={`fenext-layout-grid fenext-layout-grid-mtl ${className}`}
        classNameMenuTop={classNameMenuTop}
        menuTop={menuTop}
        usePageProgress={false}
        useAlertHook={false}
      >
        <LayoutGridMenuLeft
          classNameLoader={classNameLoader}
          classNameChildren={classNameChildren}
          classNameMenuLeft={classNameMenuLeft}
          classNameMenuLeftContent={classNameMenuLeftContent}
          menuLeft={menuLeft}
          loader={loader}
          menuLeftActive={menuLeftActive}
          menuLeftMovilActive={menuLeftMovilActive}
          useHeaderButtonMenu={useHeaderButtonMenu}
          usePageProgress={usePageProgress}
          useAlertHook={useAlertHook}
          alertHookProps={alertHookProps}
          target={target}
          alert={alert}
        >
          {children}
        </LayoutGridMenuLeft>
      </LayoutGridMenuTop>
    </>
  );
};

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
   * props for alert hook.
   */
  alert?: AlertComponentProps;
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
export interface LayoutGridMenuTopProps
  extends LayoutGridMenuTopBaseProps,
    LayoutGridMenuTopClassProps {}

export const LayoutGridMenuTop = ({
  className = "",
  classNameLoader = "",
  classNameChildren = "",
  classNameMenuTop = "",

  children,
  menuTop,
  loader = false,
  usePageProgress = true,
  useAlertHook = true,
  alertHookProps = {},
  alert = undefined,
  ...props
}: LayoutGridMenuTopProps) => {
  return (
    <>
      <div
        className={`fenext-layout-grid fenext-layout-grid-mt ${className}`}
        {...props}
      >
        <div className={`fenext-layout-grid-mt-menu-top ${classNameMenuTop}`}>
          {menuTop}
        </div>
        <div className={`fenext-layout-grid-mt-children ${classNameChildren}`}>
          {usePageProgress && <PageProgress />}
          {alert != undefined && (
            <Alert
              {...alert}
              className={`fenext-layout-grid-alert ${alert?.className ?? ""}`}
            />
          )}
          {useAlertHook && (
            <AlertHook
              {...alertHookProps}
              className={`fenext-layout-grid-alert ${alertHookProps?.className ?? ""}`}
            />
          )}
          {loader ? (
            <Loader
              classNameLoader={`${classNameLoader} fenext-layout-grid-loader`}
            />
          ) : (
            <>{children}</>
          )}
        </div>
      </div>
    </>
  );
};

/**
 * Properties for the QueryClientProvider component.
 */
export interface QueryClientProviderProps {
  children?: ReactNode;
}

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProviderTanstack client={queryClient}>
        {children}
      </QueryClientProviderTanstack>
    </>
  );
};

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

export const Container = ({
  className = "",
  customSize = undefined,
  usePaddingInline = true,
  children,
  ...props
}: ContainerProps) => {
  const { _t } = use_T({ ...props });
  return (
    <>
      <div
        className={`fenext-container ${className} ${
          usePaddingInline ? "fenext-container-p" : "fenext-container-notp"
        }`}
        style={
          customSize
            ? ({
                ["--fenext-size-container-custom"]: `${customSize / 16}rem`,
              } as React.CSSProperties)
            : {}
        }
      >
        {_t(children)}
      </div>
    </>
  );
};

/**
 * Properties for the StepsCircleItemProps component.
 */
export interface StepsCircleItemProps {
  children?: ReactNode;
  onClick?: () => void;
}

export interface StepsCircleClassProps {
  /**
   * The class name for the component.
   */
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

/**
 * Properties for the class of the StepsCircle component.
 */
export interface StepsCircleProps extends StepsCircleClassProps, _TProps {
  items?: StepsCircleItemProps[];

  defaultStep?: number;
  valueStep?: number;

  disabled?: boolean;
}

export const StepsCircle = ({
  className = "",
  classNameDisabled = "",
  classNameItem = "",
  classNameItemCircle = "",
  classNameItemContent = "",
  classNameItemActive = "",
  classNameItemActiveCircle = "",
  classNameItemActiveContent = "",
  classNameProgressLine = {},
  defaultStep = undefined,
  valueStep = undefined,
  disabled = false,
  items = [],
  ...props
}: StepsCircleProps) => {
  const { _t } = use_T({ ...props });
  const [step_, setStep] = useState(defaultStep ?? 0);

  const step = useMemo(() => valueStep ?? step_, [step_, valueStep]);

  return (
    <>
      <div
        className={`
                    fenext-steps-circle 
                    fenext-steps-circle-${disabled ? `disabled ${classNameDisabled}` : ""}
                    ${className} 
                `}
        style={
          {
            "--nItems": items?.length,
            "--step": step,
          } as CSSProperties
        }
      >
        {items?.length && items?.length > 1 && (
          <ProgressLine
            p={(100 / (items?.length - 1)) * step}
            showP={false}
            {...classNameProgressLine}
          />
        )}
        {items?.map((item, i) => {
          const active = step >= i;
          return (
            <>
              <div
                className={`
                                    fenext-steps-circle-item
                                    fenext-steps-circle-item-${active ? `active ${classNameItemActive}` : ""}
                                    ${classNameItem}
                                `}
                onClick={() => {
                  if (disabled) {
                    return;
                  }
                  item?.onClick?.();
                  setStep(i);
                }}
              >
                <div
                  className={`fenext-steps-circle-item-circle ${classNameItemCircle} ${active ? `${classNameItemActiveCircle}` : ""}`}
                >
                  {i + 1}
                </div>
                <div
                  className={`fenext-steps-circle-item-content ${classNameItemContent} ${active ? `${classNameItemActiveContent}` : ""}`}
                >
                  {_t(item?.children)}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

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
export interface ButtonMenuProps
  extends ButtonMenuBaseProps,
    ButtonMenuClassProps {}

export const ButtonMenu = ({
  className = "",
  classNameIcon = "",
  classNameIconBarClose = "",
  classNameContent = "",

  loader = false,
  disabled = false,
  defaultActive: defaultActiveProps = undefined,
  children,
  target = "fenext-btn-menu-checkbox",
  ...props
}: ButtonMenuProps) => {
  const { _t } = use_T({ ...props });
  const [defaultActive, setDefaultActive] = useState(true);
  const onLoad = () => {
    if (typeof window == "undefined") {
      setTimeout(onLoad, 100);
    } else {
      setDefaultActive(window.innerWidth > 575);
    }
  };
  useEffect(() => {
    onLoad();
  }, []);
  return (
    <>
      <label className={`fenext-btn-menu ${className}`}>
        <input
          type={"checkbox"}
          className={`fenext-btn-menu-checkbox`}
          disabled={disabled || loader}
          defaultChecked={defaultActiveProps ?? defaultActive}
          key={defaultActiveProps ?? defaultActive ? "0" : "1"}
          name={target}
          id={target}
        />
        {loader ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className={`fenext-btn-menu-icon ${classNameIcon}`}>
              <div
                className={`fenext-btn-menu-icon-bar-close ${classNameIconBarClose}`}
              />
            </div>
            <div className={`fenext-btn-menu-content ${classNameContent}`}>
              {_t(children)}
            </div>
          </>
        )}
      </label>
    </>
  );
};

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
  useRouterCustom?: typeof useRouter;
}

/**
 * Properties for the Menu component.
 */
export interface MenuProps extends MenuBaseProps, MenuClassProps {}

export const Menu = ({
  className = "",

  items = [],

  defaultShowSubMenu = false,
  iconArrow = <SvgArrow />,
  typeCollapse,
  useRouterCustom = useRouter,
  ...props
}: MenuProps) => {
  return (
    <>
      <div className={`fenext-menu ${className}`}>
        {items?.map((item, i) => (
          <ItemMenu
            key={i}
            {...props}
            {...item}
            defaultActive={item.defaultActive ?? defaultShowSubMenu}
            iconArrow={item?.iconArrow ?? iconArrow}
            typeCollapse={item?.typeCollapse ?? typeCollapse}
            useRouterCustom={useRouterCustom}
          />
        ))}
      </div>
    </>
  );
};

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
  useRouterCustom?: typeof useRouter;
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
export interface ItemMenuProps extends ItemMenuBaseProps, ItemMenuClassProps {}

export const ItemMenu = ({
  className = "",
  classNameA = "",
  classNameIcon = "",
  classNameText = "",

  text,
  url,
  icon = <></>,
  subItems = [],
  defaultActive = false,
  iconArrow = <SvgArrow />,
  nameNumber = 1,
  typeCollapse,
  isLink = true,
  onClick,
  useRouterCustom = useRouter,
  ...props
}: ItemMenuProps) => {
  const { _t } = use_T({ ...props });
  const router = useRouterCustom();

  const urlInter = useMemo(() => {
    const nlLink = router?.asPath.split("/");
    const nlUrl = url.split("/");
    const common = nlLink.filter((x) => nlUrl.indexOf(x) !== -1);
    return common.length;
  }, [router?.asPath, url]);

  const urlActive = useCallback(
    (url: Omit<ItemMenuProps, "_t">["url"]) => {
      return (
        router?.asPath?.indexOf?.(url) == 0 &&
        ((router?.asPath != "/" && url != "/") ||
          (url == "/" && router?.asPath == "/"))
      );
    },
    [router?.asPath],
  );

  const subItemsActive = useCallback(
    (sub: Omit<ItemMenuProps, "_t">[]) => {
      return sub?.some((e) => {
        return (
          urlActive(e?.url) || (e?.subItems && subItemsActive(e?.subItems))
        );
      });
    },
    [router?.asPath],
  );

  const contentSubItemAtive = useMemo(
    () => subItemsActive(subItems),
    [subItems, router?.asPath],
  );

  const Tag = isLink ? Link : "div";

  return (
    <>
      <div className={`fenext-menu-item ${className}`}>
        <Collapse
          key={router?.asPath ?? ""}
          name={`fenext-menu-item-${nameNumber}`}
          defaultActive={defaultActive || contentSubItemAtive}
          type={typeCollapse}
          header={
            <>
              <Tag
                href={url}
                className={`fenext-menu-item-a ${classNameA} ${
                  urlActive(url)
                    ? `fenext-menu-item-a-active fenext-menu-item-a-url-inter-${urlInter}`
                    : ""
                }`}
                data-url={url}
                onClick={onClick}
              >
                <div className={`fenext-menu-item-a-icon ${classNameIcon}`}>
                  {icon}
                </div>
                <div className={`fenext-menu-item-a-text ${classNameText}`}>
                  {_t(text)}
                </div>
              </Tag>
            </>
          }
          iconArrow={iconArrow}
        >
          {subItems?.map((sub, i) => (
            <ItemMenu
              key={i}
              {...sub}
              _t={_t}
              iconArrow={sub?.iconArrow ?? iconArrow}
              nameNumber={nameNumber + 1}
            />
          ))}
        </Collapse>
      </div>
    </>
  );
};

/**
 * Properties for the base Box component.
 */
export interface BoxBaseProps extends PropsWithChildren, _TProps {}

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
export interface BoxProps extends BoxBaseProps, BoxClassProps {}

export const Box = ({ className = "", children }: BoxProps) => {
  return (
    <>
      <div className={`fenext-box ${className} `}>{children}</div>
    </>
  );
};

/**
 * Properties for the ContentScrollLeft component.
 */
export interface ContentScrollLeftProps extends PropsWithChildren, _TProps {
  /**
   * The class name for the component.
   */
  className?: string;
  classNameContent?: string;
}

export const ContentScrollLeft = ({
  className = "",
  classNameContent = "",
  children,
  ...props
}: ContentScrollLeftProps) => {
  const { _t } = use_T({ ...props });
  return (
    <>
      <div className={`fenext-content-scroll-left ${className}`}>
        <div
          className={`fenext-content-scroll-left-content ${classNameContent}`}
        >
          {_t(children)}
        </div>
      </div>
    </>
  );
};

/**
 * Props for InputNumber component.
 */
export interface InputNumberProps
  extends Omit<
    InputTextProps,
    "defaultValue" | "onChange" | "onChangeValidate" | "value"
  > {
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

export const InputNumber = ({
  defaultValue = "",
  onChange,
  useBtnIncreaseDecrease = false,
  validator = undefined,
  value,
  disabledScroll = false,
  ...props
}: InputNumberProps) => {
  const [value_, setValue_] = useState<number | "">(defaultValue ?? "");

  const valueInput = useMemo(
    () => value ?? (value_ == "" ? defaultValue : value_),
    [value_, defaultValue, value],
  );

  const setValue = (v: number) => {
    setValue_(v);
    onChange?.(v);
  };

  const minMaxValue = (v: number) => {
    return Math.max(props.min ?? -Infinity, Math.min(props.max ?? Infinity, v));
  };

  const valueToNumber = (v: string) => {
    try {
      v = `${v}`.replace?.(/[^\d-]/g, "");
      return parseFloat(v);
    } catch {
      return 0;
    }
  };

  const addValue = (add: number) => () => {
    if (props?.disabled) {
      return;
    }
    const Value = minMaxValue((valueInput == "" ? 0 : valueInput) + add);
    setValue(Value);
  };
  const { error: errorFenext } = useValidator({
    data:
      valueInput != undefined && valueInput != ""
        ? parseNumber(valueInput)
        : undefined,
    validator: validator ?? FenextjsValidator(),
  });

  return (
    <>
      <InputText
        {...props}
        type="number"
        value={`${valueInput ?? ""}`}
        className={`fenext-input-number ${props?.className}`}
        useLoader={false}
        error={errorFenext}
        onWheel={(e) => {
          if (disabledScroll === true) {
            e.target.blur();

            e.stopPropagation();

            setTimeout(() => {
              e.target.focus();
            }, 0);
          }
          props?.onWheel?.(e);
        }}
        icon={
          <>
            {useBtnIncreaseDecrease ? (
              <>
                <span
                  onClick={addValue(1)}
                  className={`fenext-input-number-icon-arrow fenext-input-number-icon-increase`}
                >
                  <SvgNumberIncrease />
                </span>
                <span
                  onClick={addValue(-1)}
                  className={`fenext-input-number-icon-arrow fenext-input-number-icon-decrease`}
                >
                  <SvgNumberDecrease />
                </span>
              </>
            ) : (
              <>
                <div className="fenext-input-number-icon-arrow">
                  <span
                    onClick={addValue(1)}
                    className={`fenext-input-number-icon-arrow-up`}
                  >
                    <SvgArrow />
                  </span>
                  <span
                    onClick={addValue(-1)}
                    className={`fenext-input-number-icon-arrow-down`}
                  >
                    <SvgArrow />
                  </span>
                </div>
              </>
            )}
          </>
        }
        onChangeValidate={(v: string) => {
          const v2 = minMaxValue(valueToNumber(v));
          const s = props?.onChangeValidate?.(v2) ?? v2;
          return `${s}`;
        }}
        onChange={(v: string) => {
          setValue(minMaxValue(valueToNumber(v)));
        }}
      />
    </>
  );
};

export type InputTextChangeEvent =
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLInputElement>;

/**
 * Interface that defines CSS class properties for a text input component.
 */
export interface InputTextClassProps {
  /**
   * CSS class name for the input component.
   */
  className?: string;
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

  classNameMaxLength?: string;

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
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
    | undefined;
  /**
   * AutoComplete of Input.
   */
  autoComplete?: boolean | string | "off" | "on";

  /**
   * onKeyDown of Input.
   */
  onKeyDown?:
    | (React.KeyboardEventHandler<HTMLTextAreaElement> &
        React.KeyboardEventHandler<HTMLInputElement>)
    | undefined;

  onWheel?:
    | (React.WheelEventHandler<HTMLTextAreaElement> &
        React.WheelEventHandler<HTMLInputElement>)
    | undefined;
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
export interface InputTextProps
  extends InputTextBaseProps,
    InputTextClassProps {}

export const InputText = ({
  id = "",
  datalist = undefined,
  name = "",
  label = "",
  placeholder = "",
  placeholderFocus = undefined,
  defaultValue = undefined,
  value = undefined,
  type = "text",
  className = "",
  classNameLabel = "",
  classNameContentInput = "",
  classNameInput = "",
  classNameIcon = "",
  classNameMaxLength = "",
  classNameLoaderValidate = "",
  classNameError = "",
  iconLoader = <Loader />,
  onChange = () => {},
  onBlur = () => {},
  onEnter = () => {},
  onChangeValidate = async (e: string) => e,
  parseText,
  props = {},
  icon = <></>,
  extraInContentInput = <></>,
  extraInLabel = <></>,
  disabled = false,
  showIcon = true,
  error = undefined,
  errorWithIsChange = true,
  optional = false,
  optionalText = "(optional)",
  required = false,
  requiredText = "*",
  loader = false,
  autoComplete = "off",
  useLoader = true,
  isChange: isChangeProps = undefined,
  onKeyDown,
  onWheel,
  iconPos = "right",
  inputMode,

  validator,
  maxLength = undefined,
  regExp = undefined,
  regExpReplace = "",

  onChangeEvent,

  showFocusInTarget = false,

  ...p
}: InputTextProps) => {
  const { _t } = use_T({ ...p });
  const [isFocus, setIsFocus] = useState(false);
  const [statusInput, setStateInput] = useState("");

  const { dataMemo: dataErrorInput, setData: setErrorInput } = useData<
    ErrorFenextjs | undefined
  >(undefined);
  const errorInput = useMemo(
    () => error ?? dataErrorInput,
    [error, dataErrorInput],
  );

  const { dataMemo: dataLoaderInput, setData: setLoaderInput } =
    useData<boolean>(loader);
  const loaderInput = useMemo(
    () => loader ?? dataLoaderInput,
    [loader, dataLoaderInput],
  );
  const {
    dataMemo: dataValueInput,
    setData: setValueInput,
    isChange: isChangeData,
  } = useData<string>(defaultValue ?? "");
  const valueInput = useMemo(
    () => value ?? dataValueInput,
    [value, dataValueInput],
  );

  const isChange = useMemo(
    () => isChangeProps ?? isChangeData,
    [isChangeData, isChangeProps],
  );

  const ref = useRef(null);

  const validateValue = async (v: string) => {
    setLoaderInput(true);
    try {
      if (onChangeValidate) {
        const n = await onChangeValidate(v);
        v = n ?? v;
      }
    } catch (error: any) {
      env_log(error, {
        name: "error",
        color: "red",
      });
      setStateInput("error");
      setErrorInput(
        new ErrorFenextjs({
          code: ErrorCode.ERROR,
          message: error.message,
        }),
      );
      setLoaderInput(false);
      return v;
    }
    return v;
  };
  const onChangeInput = async (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeEvent?.(e);
    const input = e.target;
    let text = `${input.value ?? ""}`;
    if (maxLength) {
      text = `${text}`?.slice(0, maxLength);
    }
    if (regExp) {
      text = `${text}`?.replace(regExp, regExpReplace);
    }
    if (text === valueInput) {
      return;
    }
    setValueInput(text);
    onChange(text);
    validateValue(text);
  };
  const blurInput = () => {
    validateValue(valueInput);
    onBlur(valueInput);
  };

  const TagInput = type == "textarea" ? "textarea" : "input";

  const ICON = useMemo(() => {
    if (showIcon) {
      return (
        <span className={`fenext-input-content-icon ${classNameIcon}`}>
          {icon}
        </span>
      );
    }
    return <></>;
  }, [
    showIcon,
    icon,
    classNameIcon,
    classNameLoaderValidate,
    iconLoader,
    loader,
  ]);

  const LOADER = useMemo(() => {
    if (!useLoader) {
      return <></>;
    }
    if (loaderInput) {
      return (
        <span
          className={`fenext-input-content-loader ${classNameLoaderValidate}`}
        >
          {iconLoader}
        </span>
      );
    }
    return <></>;
  }, [loaderInput, classNameLoaderValidate, iconLoader, loader, useLoader]);

  const { error: errorFenext } = useValidator({
    data: valueInput,
    validator: validator ?? FenextjsValidator(),
  });

  const FenextInputValidatorStatus = useMemo<"ok" | "error">(() => {
    if (errorWithIsChange && !isChange) {
      return "ok";
    }
    if (errorInput instanceof ErrorFenextjs) {
      return "error";
    }
    if (errorFenext instanceof ErrorFenextjs) {
      return "error";
    }
    if (error instanceof ErrorFenextjs) {
      return "error";
    }
    return "ok";
  }, [errorInput, error, errorFenext, errorWithIsChange, isChange]);

  return (
    <>
      <label
        className={`fenext-input ${className}`}
        style={
          {
            ...(maxLength ? { ["--fenext-max-length"]: maxLength } : {}),
          } as CSSProperties
        }
      >
        <div className={`fenext-input-label ${classNameLabel}`}>
          {_t(label)}
          {optional && (
            <>
              <small className="fenext-input-optional">
                {_t(optionalText)}
              </small>
            </>
          )}
          {required && (
            <>
              <small className="fenext-input-required">
                {_t(requiredText)}
              </small>
            </>
          )}
        </div>
        <div
          className={`fenext-input-content fenext-input-icon-pos-${iconPos} ${classNameContentInput}`}
        >
          <TagInput
            id={id}
            name={name}
            list={datalist}
            type={type}
            ref={ref}
            className={`
                            fenext-input-content-input
                            fenext-input-validator-status-${FenextInputValidatorStatus}
                            fenext-input-content-input-${showFocusInTarget ? "show-focus-target" : ""}
                            ${classNameInput}
                            ${statusInput}
                        `}
            placeholder={_t(
              (isFocus ? placeholderFocus : placeholder) ?? placeholder,
            )}
            value={
              (parseText ? parseText(valueInput) : valueInput) ?? valueInput
            }
            onChange={onChangeInput}
            onBlur={() => {
              blurInput();
              setIsFocus(false);
            }}
            disabled={disabled}
            onKeyUp={(event) => {
              if (event.keyCode === 13) {
                onEnter();
              }
            }}
            onClick={() => {
              setIsFocus(true);
            }}
            onWheel={onWheel}
            autoComplete={
              autoComplete === true
                ? "on"
                : autoComplete === false
                  ? "off"
                  : autoComplete
            }
            onKeyDown={onKeyDown}
            {...props}
            inputMode={inputMode}
          />
          {ICON}
          {LOADER}
          {extraInContentInput}
          {type == "textarea" && maxLength && (
            <>
              <span
                className={`fenext-input-content-input-max-leght ${classNameMaxLength}`}
              >
                ({valueInput?.length ?? 0} / {maxLength})
              </span>
            </>
          )}
        </div>
        {extraInLabel}
        {FenextInputValidatorStatus == "error" && (
          <ErrorComponent
            error={errorFenext ?? errorInput}
            className={`fenext-input-error ${classNameError}`}
            _t={_t}
          />
        )}
      </label>
    </>
  );
};

export interface InputCalendarClassProps {
  className?: string;
  classNameContentCalendar?: string;
  classNameInputText?: InputTextClassProps;
  classNameInputCalendarMonth?: InputCalendarMonthClassProps;
}

/**
 * All props for the InputCalendar component.
 */
export interface InputCalendarProps
  extends Pick<
      InputTextProps,
      | "label"
      | "placeholder"
      | "optional"
      | "optionalText"
      | "required"
      | "requiredText"
      | "icon"
      | "iconPos"
      | "validator"
      | "errorWithIsChange"
    >,
    Pick<InputCalendarMonthProps, "_t" | "type" | "min" | "max">,
    InputCalendarClassProps {
  defaultValue?: Date;
  value?: Date;
  defaultValueRange?: Date[];
  valueRange?: Date[];
  onChange?: (d: Date | undefined) => void;
  onChangeRange?: (d: Date[]) => void;
  nMonthShow?: number;

  collapseProps?: Omit<CollapseProps, "children" | "header">;
}

export const InputCalendar = ({
  nMonthShow = 1,
  icon = <SvgDate />,
  type = "normal",
  defaultValue,
  value,
  defaultValueRange,
  valueRange,
  onChange,
  onChangeRange,
  validator,
  errorWithIsChange = true,
  collapseProps = {},
  className = "",
  classNameContentCalendar = "",
  classNameInputText = {},
  classNameInputCalendarMonth = {},
  ...props
}: InputCalendarProps) => {
  const [isChange, setIsChange] = useState(!errorWithIsChange);
  const { data: dataSelectDate, setData: setSelectDate } = useData<
    Date | undefined
  >(defaultValue, {
    onChangeDataAfter: (e) => {
      setIsChange(true);
      onChange?.(e);
    },
  });
  const selectDate = useMemo(
    () => value ?? dataSelectDate,
    [value, dataSelectDate],
  );

  const [dataNSelect, setDataNSelect] = useState(true);
  const { data: dataSelectDateRange, setDataFunction: setSelectDateRange } =
    useData<Date[]>(defaultValueRange ?? [], {
      onChangeDataAfter: (e) => {
        setIsChange(true);
        onChangeRange?.(e);
      },
    });
  const selectDateRange = useMemo(
    () => valueRange ?? dataSelectDateRange,
    [valueRange, dataSelectDateRange],
  );

  const date = useDate({});

  const onPreMonth = () => {
    date.addMonth(-1);
  };

  const onNextMonth = () => {
    date.addMonth(1);
  };

  const { error: errorFenext } = useValidator({
    data: type == "normal" ? selectDate : selectDateRange,
    validator,
  });

  return (
    <>
      <div className={`fenext-input-calendar ${className}`}>
        <Collapse
          {...collapseProps}
          header={
            <>
              <InputText
                {...props}
                {...classNameInputText}
                icon={icon}
                value={
                  type == "normal"
                    ? `${selectDate ? date.onFormat({}, selectDate) : ""}`
                    : `${
                        selectDateRange && selectDateRange.length == 2
                          ? `${date.onFormat({}, selectDateRange[0])} - ${date.onFormat({}, selectDateRange[1])}`
                          : ""
                      }`
                }
                error={errorFenext}
                errorWithIsChange={!isChange}
              />
            </>
          }
        >
          <div
            className={`fenext-input-calendar-content fenext-input-calendar-content-${nMonthShow > 1 ? "multiple" : ""} ${classNameContentCalendar}`}
          >
            <InputCalendarMonth
              {...classNameInputCalendarMonth}
              _t={props?._t}
              type={type}
              dataNSelect={dataNSelect}
              selectDate={selectDate}
              selectDateRange={selectDateRange}
              setDataNSelect={setDataNSelect}
              setSelectDate={setSelectDate}
              setSelectDateRange={setSelectDateRange}
              date={date}
              onNextMonth={onNextMonth}
              onPreMonth={onPreMonth}
              {...props}
            />
            {nMonthShow > 1 && (
              <>
                {new Array(nMonthShow - 1).fill(1).map((e, i) => {
                  const n = e * i + 1;

                  const d = new Date(date?.date ?? 0);
                  d.setDate(1);
                  d.setMonth(d.getMonth() + n);
                  const dateN = new FenextjsDate({
                    defaultDate: d,
                  });

                  return (
                    <>
                      <InputCalendarMonth
                        key={n}
                        {...classNameInputCalendarMonth}
                        _t={props?._t}
                        type={type}
                        dataNSelect={dataNSelect}
                        selectDate={selectDate}
                        selectDateRange={selectDateRange}
                        setDataNSelect={setDataNSelect}
                        setSelectDate={setSelectDate}
                        setSelectDateRange={setSelectDateRange}
                        date={dateN}
                        onNextMonth={onNextMonth}
                        onPreMonth={onPreMonth}
                        {...props}
                      />
                    </>
                  );
                })}
              </>
            )}
          </div>
        </Collapse>
      </div>
    </>
  );
};

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

export interface InputCalendarMonthProps
  extends InputCalendarMonthClassProps,
    _TProps {
  type?: DateDataTypeProps;

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
export const InputCalendarMonth = ({
  type = "normal",

  onPreMonth,
  onNextMonth,
  date,
  selectDate,
  selectDateRange,
  setSelectDate,
  setSelectDateRange,
  dataNSelect,
  setDataNSelect,
  min,
  max,

  className = "",
  classNameContent = "",
  classNameTop = "",
  classNameTopBtn = "",
  classNameTopBtnPrev = "",
  classNameTopBtnNext = "",
  classNameTopInfo = "",
  classNameDays = "",
  classNameDay = "",
  classNameDate = "",
  classNameDateValid = "",
  classNameDateDisabled = "",
  classNameDateInMonth = "",
  classNameDateOtherMonth = "",
  classNameDateSelect = "",
  classNameDateSelectRange = "",

  ...props
}: InputCalendarMonthProps) => {
  const { _t } = use_T({ ...props });
  return (
    <>
      <div className={`fenext-input-calendar-month ${className}`}>
        <div
          className={`fenext-input-calendar-month-content ${classNameContent}`}
        >
          <div className={`fenext-input-calendar-top ${classNameTop}`}>
            <button
              className={`fenext-input-calendar-btn ${classNameTopBtn} ${classNameTopBtnPrev}`}
              onClick={onPreMonth}
            >
              <SvgPaginationPre />
            </button>
            <div
              className={`fenext-input-calendar-top-info ${classNameTopInfo}`}
            >
              {date?.onFormat({
                month: "long",
                year: "numeric",
              })}
            </div>
            <button
              className={`fenext-input-calendar-btn ${classNameTopBtn} ${classNameTopBtnNext}`}
              onClick={onNextMonth}
            >
              <SvgPaginationNext />
            </button>
          </div>
          <div className={`fenext-input-calendar-days ${classNameDays}`}>
            {[
              DaysEnum.Sunday,
              DaysEnum.Monday,
              DaysEnum.Tuesday,
              DaysEnum.Wednesday,
              DaysEnum.Thursday,
              DaysEnum.Friday,
              DaysEnum.Saturday,
            ].map((day, i) => {
              return (
                <>
                  <div
                    key={i}
                    data-day={day}
                    className={`fenext-input-calendar-day ${classNameDay}`}
                  >
                    {_t(day)[0]}
                  </div>
                </>
              );
            })}
          </div>
          {date?.onGenerateDateByCalendar()?.map((d, i) => {
            const isValid = date?.onValidateMinMax({
              date: d,
              max,
              min,
            });

            const COMPARE_DATE = date.onCompareDate({
              date: selectDate,
              dateCompare: d,
              compare: {
                Date: true,
                Month: true,
                FullYear: true,
              },
            });
            COMPARE_DATE["=="] = selectDate != undefined && COMPARE_DATE["=="];

            const COMPARE_DATE_RANGE_0 = date.onCompareDate({
              date: d,
              dateCompare: selectDateRange[0],
              compare: {
                Date: true,
                Month: true,
                FullYear: true,
              },
            });
            const COMPARE_DATE_RANGE_1 = date.onCompareDate({
              date: d,
              dateCompare: selectDateRange[1],
              compare: {
                Date: true,
                Month: true,
                FullYear: true,
              },
            });
            return (
              <>
                <div
                  key={i}
                  data-date={d.getDate()}
                  data-month={d.getMonth() + 1}
                  data-year={d.getFullYear()}
                  onClick={() => {
                    if (!isValid) {
                      return;
                    }
                    if (type == "normal") {
                      setSelectDate(d);
                    }
                    if (type == "range") {
                      if (dataNSelect) {
                        setSelectDateRange(() => {
                          return [d];
                        });
                      } else {
                        setSelectDateRange((old) => {
                          return [...old, d].sort(
                            (a, b) => a.getTime() - b.getTime(),
                          );
                        });
                      }

                      setDataNSelect((e) => !e);
                    }
                  }}
                  className={`
                                        fenext-input-calendar-date
                                        fenext-input-calendar-date-${isValid ? `valid ${classNameDateValid}` : `disabled ${classNameDateDisabled}`}
                                        fenext-input-calendar-date-${d.getMonth() == date.date.getMonth() ? `in-month ${classNameDateInMonth}` : `other-month ${classNameDateOtherMonth}`}
                                        fenext-input-calendar-date-${type == "normal" && COMPARE_DATE["=="] ? `select ${classNameDateSelect}` : ""}
                                        fenext-input-calendar-date-${type == "range" && COMPARE_DATE_RANGE_0["=="] ? `select ${classNameDateSelect}` : ""}
                                        fenext-input-calendar-date-${type == "range" && COMPARE_DATE_RANGE_0[">"] && COMPARE_DATE_RANGE_1["<"] ? `select-range ${classNameDateSelectRange}` : ""}
                                        fenext-input-calendar-date-${type == "range" && COMPARE_DATE_RANGE_1["=="] ? `select ${classNameDateSelect}` : ""}

                                        ${classNameDate}
                                    `}
                >
                  {d?.getDate()}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export interface InputSelectNumberProps
  extends Omit<
    InputSelectProps,
    "options" | "onChange" | "defaultValue" | "parseText"
  > {
  onChange?: (n?: number) => void;
  defaultValue?: number;
  min?: number;
  max?: number;
  parseText?: (e: number) => string;
}

export const InputSelectNumber = ({
  onChange,
  defaultValue = undefined,
  min = 0,
  max = 100,
  parseText = (e) => `${e}`,
  useTOption = false,
  ...props
}: InputSelectNumberProps) => {
  const parseOption = useCallback(
    (n: number): InputSelectItemOptionBaseProps<number> => {
      return {
        id: `${n}`,
        text: parseText(n),
        data: n,
      };
    },
    [parseText],
  );

  return (
    <>
      <InputSelect<number>
        {...props}
        classNameSelect={`fenext-select-number ${props?.classNameSelect}`}
        defaultValue={
          defaultValue != undefined ? parseOption(defaultValue) : undefined
        }
        nItems={max - min}
        options={new Array(Math.abs(max - min + 1)).fill(1).map((e, i) => {
          const n = e * i + min;
          return parseOption(n);
        })}
        onChangeData={onChange}
        useTOption={useTOption}
      />
    </>
  );
};

/**
 * Properties for the base InputGallery component.
 */
export interface InputGalleryBaseProps
  extends Omit<InputImgBaseProps, "defaultValue" | "onRemove" | "onChange">,
    _TProps {
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
export interface InputGalleryProps
  extends InputGalleryBaseProps,
    InputGalleryClassProps {}

export const InputGallery = ({
  className = "",
  classNameContentButton = "",
  classNameButton = {},

  textBtn = "Add More Images",
  defaultValue = [
    {
      fileData: "",
      text: "",
    },
    {
      fileData: "",
      text: "",
    },
    {
      fileData: "",
      text: "",
    },
    {
      fileData: "",
      text: "",
    },
    {
      fileData: "",
      text: "",
    },
  ],
  value = undefined,
  onChange,

  ...props
}: InputGalleryProps) => {
  const { _t } = use_T({ ...props });
  const [items_, setItems] = useState<FileProps[]>(defaultValue);

  const onChangeItem = (i: number) => (data: FileProps) => {
    setItems((pre) => {
      const n = [...pre];
      n[i] = data;
      onChange?.(n);
      return n;
    });
  };
  const onAddItem = () => {
    setItems((pre) => {
      const n = [
        ...pre,
        {
          fileData: "",
          text: "",
        },
      ];
      onChange?.(n);
      return n;
    });
  };
  const onRemoveItem = (i: number) => () => {
    setItems((pre) => {
      const n = [...pre].filter((e, j) => e && i != j);
      onChange?.(n);
      return n;
    });
  };

  const items = useMemo(() => {
    return (value ?? items_).map((item, i) => {
      return (
        <>
          <InputImg
            {...props}
            defaultValue={item}
            onChange={onChangeItem(i)}
            onRemove={onRemoveItem(i)}
            _t={_t}
          />
        </>
      );
    });
  }, [items_, value, _t]);

  return (
    <>
      <div className={`fenext-input-gallery ${className} `}>
        <GridGallery
          items={[
            ...items,
            <>
              <div
                className={`fenext-input-gallery-content-btn ${classNameContentButton}`}
              >
                <Button
                  {...classNameButton}
                  className={`fenext-input-gallery-btn-add ${classNameButton.className}`}
                  onClick={onAddItem}
                >
                  {_t(textBtn)}
                </Button>
              </div>
            </>,
          ]}
          _t={_t}
        />
      </div>
    </>
  );
};

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
export interface InputUploadProps
  extends InputUploadBaseProps,
    InputUploadClassProps {}

export const InputUpload = ({
  className = "",
  classNameBtn = {},
  classNameContentIcon = "",
  classNameText = {},
  classNamePreview = "",
  classNameTitle = {
    tag: "h2",
  },
  classNameUp = "",
  classNameProgress = "",
  classNameRemove = "",
  btn = "Choose File",
  icon = (
    <>
      <SvgUpload2 />
    </>
  ),
  text = "Drag and drop your file or template here.",
  title = "Drag and drop here",
  titleFile = undefined,
  textFile = undefined,
  iconFile = "",

  textPreview = "Preview File",

  defaultValue = {
    fileData: "",
    text: "",
  },
  parseProgress = (e) => `Uploading . . . ${e.toFixed(0)}%`,
  onChange,

  tagPreview = "embed",
  loader = false,
  iconLoader = <LoaderSpinner />,
  customPreview = undefined,

  ...props
}: InputUploadProps) => {
  const { _t } = use_T({ ...props });
  const { data, setData } = useData<FileProps>(defaultValue, {
    onChangeDataAfter: onChange,
  });

  const [progress, setProgress] = useState(-1);
  const { data: error, setData: setError } = useData<ErrorProps | undefined>(
    undefined,
  );

  const TAGPREVIEW = useMemo(() => {
    if (data.extend) {
      if (["png", "jpeg", "jpg", "gif", "webp"].includes(data.extend)) {
        return "img";
      }
    }
    return tagPreview;
  }, [tagPreview, data]);

  return (
    <>
      <div
        className={`fenext-input-upload ${className} ${
          progress > 0 && progress < 100
            ? "fenext-input-upload-in-progress"
            : ""
        } ${
          data?.fileData && data?.fileData != "" ? "fenext-input-upload-ok" : ""
        } ${error ? "fenext-input-upload-error" : ""}`}
      >
        {data.fileData && data.fileData != "" ? (
          <>
            <div className={`fenext-input-upload-up ${classNameUp}`}>
              <Title
                {...classNameTitle}
                className={`fenext-input-upload-title ${classNameTitle.className}`}
              >
                {_t(titleFile ?? data?.text)}
              </Title>
              {textFile && (
                <Text
                  {...classNameText}
                  className={`fenext-input-upload-text ${classNameText.className}`}
                >
                  {_t(textFile)}
                </Text>
              )}
              <div
                className={`fenext-input-upload-content-icon ${classNameContentIcon}`}
              >
                {loader ? iconLoader : iconFile}
              </div>
              <Collapse
                header={
                  <>
                    <Text
                      {...classNameText}
                      className={`fenext-input-upload-text ${classNameText.className}`}
                    >
                      {_t(textPreview)}
                    </Text>
                  </>
                }
              >
                {customPreview ? (
                  <>{customPreview(data)}</>
                ) : (
                  <TAGPREVIEW
                    src={
                      data?.url && data?.url != "" ? data?.url : data.fileData
                    }
                    className={`fenext-input-upload-preview ${classNamePreview}`}
                  />
                )}
              </Collapse>
              {!props.disabled && (
                <div
                  className={`fenext-input-upload-remove ${classNameRemove}`}
                  onClick={() => {
                    setData({
                      fileData: "",
                      text: "",
                    });
                  }}
                >
                  <SvgClose />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <InputFile
              onChange={setData}
              parseProgress={() => ""}
              onChangeProgress={setProgress}
              onChangeError={setError}
              {...props}
              _t={_t}
            >
              <div className={`fenext-input-upload-up ${classNameUp}`}>
                {progress > 0 && progress < 100 ? (
                  <Title
                    {...classNameTitle}
                    className={`fenext-input-upload-progress ${classNameProgress}`}
                  >
                    {parseProgress(progress)}
                  </Title>
                ) : (
                  <Title
                    {...classNameTitle}
                    className={`fenext-input-upload-title ${classNameTitle.className}`}
                  >
                    {_t(title)}
                  </Title>
                )}
                <div
                  className={`fenext-input-upload-content-icon ${classNameContentIcon}`}
                >
                  {loader ? iconLoader : icon}
                </div>
                <Button
                  {...classNameBtn}
                  className={`fenext-input-upload-btn ${classNameBtn.className}`}
                >
                  {_t(btn)}
                </Button>
                <Text
                  {...classNameText}
                  className={`fenext-input-upload-text ${classNameText.className}`}
                >
                  {_t(text)}
                </Text>
              </div>
            </InputFile>
          </>
        )}
      </div>
    </>
  );
};

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

export const InputScannerQr = ({
  className = "",
  onChange,
  buttonScannerContent = <SvgQr />,
  buttonChangeCameraContent = <SvgCameraChange />,
  buttonToggleFlashContent = <SvgBolt />,
}: InputScannerQrProps) => {
  const uuid = useMemo(() => generateRandomID(), []);
  const ref = useRef<HTMLVideoElement>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [hasFlash, setHasFlash] = useState(false);
  const [nCamera, setNCamera] = useState(0);
  const [listCamera, setListCamera] = useState<QrScanner.Camera[] | undefined>(
    undefined,
  );
  const [qrScanner, setQrScanner] = useState<QrScanner | undefined>(undefined);
  const onStoptScan = useCallback(() => {
    setShowScanner(false);
    qrScanner?.stop();
  }, [qrScanner]);

  const onStartScan = useCallback(() => {
    setShowScanner(true);
    qrScanner?.start();
  }, [qrScanner]);
  const onToggleFlash = useCallback(() => {
    qrScanner?.toggleFlash();
  }, [qrScanner]);
  const onChangeCamera = useCallback(() => {
    setNCamera((p) => {
      let n = p + 1;
      if (n >= (listCamera?.length ?? 0)) {
        n = 0;
      }
      if (listCamera?.[n]?.id) {
        qrScanner?.setCamera(listCamera?.[n]?.id);
      }
      return n;
    });
  }, [qrScanner, listCamera]);

  const onScan = useCallback(
    (v?: string) => {
      if (v) {
        onChange?.(v);
        onStoptScan();
      }
    },
    [qrScanner],
  );

  const { onAction } = useAction<string>({
    name: `input-scanner-qr-${uuid}`,
    onActionExecute: onScan,
  });

  const onLoad = () => {
    if (ref.current) {
      const qrScanner = new QrScanner(ref.current, onAction);
      qrScanner.stop();
      setQrScanner(qrScanner);
      (async () => {
        setListCamera(await QrScanner.listCameras());
        setHasFlash(await QrScanner.hasCamera());
      })();
    } else {
      setTimeout(onStartScan, 500);
    }
  };

  useEffect(onLoad, []);

  return (
    <>
      <div
        className={`
                    fenext-input-scanner-qr
                    fenext-input-scanner-qr-n-camera-${nCamera}
                    fenext-input-scanner-qr-${showScanner ? "show" : "hidden"}
                    ${className ?? ""}
                `}
      >
        <Button
          className="fenext-input-scanner-qr-btn-scanner"
          onClick={onStartScan}
        >
          {buttonScannerContent}
        </Button>
        <Modal active={showScanner} type="full" onClose={onStoptScan}>
          <video ref={ref} className="fenext-input-scanner-qr-video"></video>
          {listCamera && listCamera.length > 1 && (
            <Button
              className="fenext-input-scanner-qr-btn-change-camera"
              onClick={onChangeCamera}
            >
              {buttonChangeCameraContent}
            </Button>
          )}
          {hasFlash && (
            <Button
              className="fenext-input-scanner-qr-btn-flash"
              onClick={onToggleFlash}
            >
              {buttonToggleFlashContent}
            </Button>
          )}
        </Modal>
      </div>
    </>
  );
};

/**
 * Props for InputScannerTextQr component.
 */
export interface InputScannerTextQrProps
  extends InputTextProps,
    InputScannerQrProps {}

export const InputScannerTextQr = ({
  className = "",
  defaultValue = "",
  onChange,
  ...props
}: InputScannerTextQrProps) => {
  const { data, setData } = useData(defaultValue ?? "", {
    onChangeDataAfter: onChange,
  });
  return (
    <>
      <InputText
        {...props}
        className={`
                    fenext-input-scanner-text-qr
                    ${className ?? ""}
                `}
        value={data}
        onChange={setData}
        icon={
          <>
            <InputScannerQr {...props} onChange={setData} />
          </>
        }
      />
    </>
  );
};

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
export interface InputSelectOptionBaseProps<T = any>
  extends PropsWithChildren,
    _TProps {
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
export interface InputSelectOptionProps<T = any>
  extends InputSelectOptionBaseProps<T>,
    InputSelectOptionClassProps {}

export const InputSelectOption = <T = any,>({
  classNameOption = "",
  classNameOptionImg = "",
  classNameOptionDelete = "",

  id,
  text,
  img = undefined,
  imgComponent = undefined,
  icon = undefined,
  children,
  type = "div",
  onClick,
  onDelete,
  disabled = false,
  selected = false,
  hidden = false,
  isBtn = false,
  data,
  iconDelete = <SvgTrash />,
  ...props
}: InputSelectOptionProps<T>) => {
  const { _t } = use_T({ ...props });
  const TAG = type == "option" ? "option" : "div";

  return (
    <>
      <TAG
        key={id}
        id={`${id}`}
        className={`
                    fenext-select-option
                    fenext-select-option-${disabled ? "disabled" : ""}
                    fenext-select-option-${selected ? "selected" : "not-selected"}
                    fenext-select-option-${isBtn ? "btn" : ""}
                    fenext-select-option-type-${type}
                    fenext-select-option-${hidden ? "hidden" : "not-hidden"}
                    ${classNameOption}
                `}
        onClick={() => {
          if (!disabled) {
            onClick?.({
              id,
              text,
              children,
              data,
              img,
              icon,
              imgComponent,
            });
          }
        }}
        disabled={disabled}
        selected={selected}
        value={text}
      >
        {type == "multiple" && (
          <InputCheckbox
            classNameLabel="fenext-select-option-checkbox"
            value={selected}
          />
        )}
        {img ? (
          <>
            <img
              src={img}
              alt={text}
              className={`fenext-select-option-img ${classNameOptionImg}`}
            />
          </>
        ) : (
          <>
            {imgComponent ? (
              <>
                <Img
                  {...imgComponent}
                  className={`fenext-select-option-img ${classNameOptionImg} ${imgComponent.className}`}
                />
              </>
            ) : (
              <></>
            )}
          </>
        )}
        {icon ? (
          <>
            <div className={`fenext-select-option-icon`}>{icon}</div>
          </>
        ) : (
          <></>
        )}
        {_t(TAG == "option" ? text : children ?? text)}
        {type == "multiple" ? (
          <>
            <span
              className={`fenext-select-option-delete ${classNameOptionDelete} `}
              onClick={() => {
                if (!disabled) {
                  onDelete?.({
                    id,
                    text,
                    children,
                    data,
                    img,
                  });
                }
              }}
            >
              {iconDelete}
            </span>
          </>
        ) : (
          <></>
        )}
      </TAG>
    </>
  );
};

export const InputCardNumberIcons: {
  [id in Card_Enum]: ReactNode;
} = {
  AMEX: <SvgCardAmericanExpress />,
  DINERS: <SvgCardDinersClub />,
  DINERS_CARTE_BLANCHE: <SvgCardDinersClub />,
  DISCOVER: <SvgCardDiscover />,
  JCB: <SvgCardJCB />,
  MASTERCARD: <SvgCardMasterCard />,
  OTHER: <></>,
  VISA: <SvgCardVisa />,
  VISA_ELECTRON: <SvgCardVisaElectron />,
};

/**
 * Props for InputCardNumber component.
 */
export interface InputCardNumberProps
  extends Omit<InputTextProps, "onChangeValidate" | "icon" | "type"> {
  /**
   * The max length number card.
   * @default 19
   * @min 15
   */
  maxNumberLength?: number;
}

export const InputCardNumber = ({
  value: valueProps,
  defaultValue = "",
  onChange,
  validator = undefined,
  maxNumberLength = 19,
  ...props
}: InputCardNumberProps) => {
  const { data, setData } = useData<string>(defaultValue ?? "", {
    onChangeDataAfter: onChange,
  });
  const value = useMemo(() => valueProps ?? data, [valueProps, data]);

  const { error: errorFenext } = useValidator({
    data: value,
    validator: validator ?? FenextjsValidator(),
  });

  const numberToTextCard = (e: number | string) => {
    const n = `${e}`.split(" ").join("");
    const first3 = n.slice(0, 4);
    const secud3 = n.slice(4, 8);
    const eighthDigit = n.slice(8, 12);
    const lastNumbers = n.slice(12, Math.max(15, maxNumberLength));
    return `${first3 ?? ""}${secud3 ? " " + secud3 : ""}${
      eighthDigit ? " " + eighthDigit : ""
    }${lastNumbers ? " " + lastNumbers : ""}`;
  };

  const ICON = useMemo(() => InputCardNumberIcons[GetCardType(value)], [value]);

  return (
    <>
      <InputText
        {...props}
        value={numberToTextCard(value)}
        className={`fenext-input-card-number ${props?.className}`}
        useLoader={false}
        error={errorFenext}
        icon={ICON}
        onChange={(v: string) => {
          setData(
            `${v}`
              .replace(/[^0-9]/g, "")
              .slice(0, Math.max(15, maxNumberLength)),
          );
        }}
        inputMode="numeric"
      />
    </>
  );
};

export interface InputCardExpDateDataProps {
  month?: number;
  year?: number;
}

/**
 * Props for InputCardExpDate component.
 */
export interface InputCardExpDateProps
  extends Omit<
    InputTextProps,
    | "onChangeValidate"
    | "icon"
    | "type"
    | "defaultValue"
    | "value"
    | "onChange"
    | "inputMode"
  > {
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

export const InputCardExpDate = ({
  value: valueProps,
  defaultValue = {},
  placeholder = "MM/YY",
  onChange,
  validator = undefined,
  maxExpDateLength = 4,
  ...props
}: InputCardExpDateProps) => {
  const { data, setData } = useData<InputCardExpDateDataProps>(defaultValue, {
    onChangeDataAfter: onChange,
  });
  const value = useMemo(() => valueProps ?? data, [valueProps, data]);

  const { error: errorFenext } = useValidator({
    data: value,
    validator: validator ?? FenextjsValidator(),
  });

  const textToCardExpDateData = (
    e: number | string,
  ): InputCardExpDateDataProps => {
    const n = `${e}`.replace(/[^0-9]/g, "");
    let month: number | undefined = parseInt(n.slice(0, 2));
    if (Number.isNaN(month)) {
      month = undefined;
    }

    if ((month ?? 0) > 12) {
      return textToCardExpDateData(`0${e}`);
    }
    let year: number | undefined = parseInt(
      n.slice(2, Math.min(6, maxExpDateLength)),
    );
    if (Number.isNaN(year)) {
      year = undefined;
    }

    return {
      month,
      year,
    };
  };
  const CardExpDateDataToText = (d?: InputCardExpDateDataProps) => {
    let m: number | string = parseInt(`${d?.month ?? ""}`);
    if (Number.isNaN(m) || m == 0) {
      m = "";
    }
    let y: number | string = parseInt(`${d?.year ?? ""}`);
    if (Number.isNaN(y) || y == 0) {
      y = "";
    } else {
      m = parseNumberCount(m, {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 0,
      });
    }

    const r = `${m}${y != "" ? "/" + y : ""}`;
    return r;
  };

  return (
    <>
      <InputText
        {...props}
        value={CardExpDateDataToText(value)}
        className={`fenext-input-card-exp-date ${props?.className}`}
        error={errorFenext}
        placeholder={placeholder}
        onChange={(v: string) => {
          setData(textToCardExpDateData(v));
        }}
        inputMode="numeric"
      />
    </>
  );
};

/**
 * Props for InputCardCCV component.
 */
export interface InputCardCCVProps
  extends Omit<
    InputTextProps,
    | "onChangeValidate"
    | "icon"
    | "type"
    | "maxLength"
    | "regExpReplace"
    | "regExp"
    | "inputMode"
    | "type"
  > {}

export const InputCardCCV = ({
  placeholder = "XXX",
  ...props
}: InputCardCCVProps) => {
  return (
    <>
      <InputText
        {...props}
        placeholder={placeholder}
        maxLength={4}
        regExpReplace=""
        regExp={/[^0-9]/g}
        inputMode="numeric"
        type="number"
      />
    </>
  );
};

/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectCityProps
  extends Omit<
    InputSelectTProps<CityProps>,
    "options" | "onParse" | "useLoader" | "loader"
  > {
  country?: CountryProps;
  state?: StateProps;
}

export const InputSelectCity = ({
  country = undefined,
  state = undefined,
  ...props
}: InputSelectCityProps) => {
  const [loader, setLoader] = useState(true);
  const [options, setOptions] = useState<CityProps[]>([]);
  const onLoad = async () => {
    const getData = async () => {
      if (country && state) {
        return await getDataCitysByStateAndCountry(country, state);
      }
      if (country) {
        return await getDataCitysByCountry(country);
      }
      return await getDataCitys();
    };
    const r = await getData();
    setOptions(r);
    setLoader(false);
  };
  useEffect(() => {
    onLoad();
  }, [country, state]);

  return (
    <>
      <InputSelectT<CityProps>
        {...props}
        useTOption={false}
        options={options}
        onParse={(e) => {
          const r: InputSelectItemOptionBaseProps<CityProps> = {
            id: e?.id ?? "",
            text: e?.text ?? "",
            data: e,
          };
          return r;
        }}
        loader={loader}
        useLoader={true}
      />
    </>
  );
};

export type InputSelectTypeStyle =
  | "normal"
  | "normal-out"
  | "box"
  | "list"
  | "checkbox";

/**
 * Interface that defines CSS class properties for a select input component.
 */
export interface InputSelectClassProps
  extends InputTextClassProps,
    InputSelectOptionClassProps {
  /**
   * CSS class name for the input select.
   */
  classNameSelect?: string;

  /**
   * CSS class name for the list options.
   */
  classNameList?: string;
}

export interface InputSelectItemOptionBaseProps<T = any>
  extends Omit<InputSelectOptionProps<T>, "type" | "onDelete"> {}

/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectBaseProps<T = any>
  extends Omit<
    InputTextBaseProps,
    | "value"
    | "type"
    | "defaultValue"
    | "value"
    | "onChange"
    | "onBlur"
    | "onEnter"
    | "onChangeValidate"
  > {
  idSelectOptions?: string;
  /**
   * Options of select.
   */
  options: InputSelectItemOptionBaseProps<T>[];
  /**
   * Options of select.
   */
  filterOptions?: (
    data: InputSelectItemOptionBaseProps<T>[],
  ) => InputSelectItemOptionBaseProps<T>[];
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
  onChangeValidate?: (
    e?: InputSelectItemOptionBaseProps<T>,
  ) => Promise<any> | any;
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
  /**
   * Use component to search when user types on text field.
   */
  useSearch?: boolean;
  /**
   *
   */
  useNowrap?: boolean;
}
/**
 * Props interface for the InputSelect component. Extends both InputSelectBaseProps and InputSelectClassProps interfaces.
 */
export interface InputSelectProps<T = any>
  extends InputSelectBaseProps<T>,
    InputSelectClassProps {}

export interface InputSelectValue<T = any> {
  option?: InputSelectItemOptionBaseProps<T>;
  text?: string;
  textSearch?: string;
}

export const InputSelect = <T = any,>({
  classNameSelect = "",
  classNameList = "",
  classNameOption = "",
  idSelectOptions,

  error = undefined,
  options: optionsProps = [],
  showOptions = "focus",
  hiddenOptions = "not-hover",
  defaultValue = undefined,
  typeSelect = "div",
  typeSelectStyle = "normal",
  value = undefined,
  onChange,
  onChangeData,
  onChangeText,
  onChangeValidate,
  icon = <SvgArrow />,
  iconSearch = <SvgSearch />,
  noResult,
  loaderOption,
  selected,
  create,
  onCreate,
  isSelectClearText = false,
  iconCloseMovil = <SvgCancel />,
  filterOptions = undefined,
  clearContent = "Clear",
  isSelectChangeText = true,
  errorWithIsChange = true,
  validator,
  searchById = false,
  useSwichtypeSelectStyle = false,
  changeByFirstOptionInOnBlur = false,
  converterInSearchWithMaxLenght = false,
  nItems = undefined,
  useSearch = true,
  useNowrap = false,

  useItemMaxLengthShowOptions = true,
  maxLengthShowOptions = 20,
  itemMaxLengthShowOptions = {
    id: "fenext-item-max-length-show-options",
    text: "There are more elements ...",
  },
  showOptionIconImg = true,
  validatorData,
  useTOption,
  forceShowOptionOnLoad = false,
  iconDelete = <SvgTrash />,
  ...props
}: InputSelectProps<T>) => {
  const { _t } = use_T({ ...props });
  const { _t: _tValue } = use_T({ ...props, useT: useTOption });
  const options = useMemo(
    () => (filterOptions ? filterOptions(optionsProps) : optionsProps),
    [optionsProps, filterOptions],
  );

  const checkboxClose = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const [dataErrorInput, setErrorInput] = useState<ErrorFenextjs | undefined>(
    undefined,
  );
  const [isChangeTextBlur, setIsChangeTextBlur] = useState(false);
  const { data, setData, isChange } = useData<
    InputSelectValue<T>,
    InputSelectValue<T>
  >(
    {
      option: value ?? defaultValue,
      text: defaultValue?.text ?? "",
      textSearch: "",
    },
    {
      onChangeDataAfter: (d: InputSelectValue<T>) => {
        onChange?.(d.option ?? undefined);
        onChangeData?.(d?.option?.data ?? undefined);
      },
    },
  );

  const dataMemo = useMemo(() => {
    if (value) {
      return {
        option: value,
        text: value?.text,
        textSearch: data?.textSearch,
      };
    }
    return data;
  }, [data, value]);

  const validateOption = async () => {
    if (onChangeValidate) {
      setErrorInput(undefined);
      try {
        await onChangeValidate(dataMemo.option);
      } catch (error: any) {
        setErrorInput(
          new ErrorFenextjs({
            code: ErrorCode.ERROR,
            message: `${error.message}`,
          }),
        );
      }
    }
  };
  useEffect(() => {
    if (isChange) {
      validateOption();
    }
  }, [dataMemo, isChange]);

  const onChangeText_ = (text: string) => {
    if (!isSelectChangeText) {
      return;
    }
    setIsChangeTextBlur(true);
    onChangeText?.(text);
    let option: InputSelectItemOptionBaseProps<T> | undefined = undefined;
    if (typeSelect != "div") {
      option = options.find((o) => o.text == text);
    }
    setData({
      option,
      text: text,
      textSearch: text,
    });
  };
  const onClear = () => {
    setData({
      option: undefined,
      text: "",
      textSearch: "",
    });
  };
  const onChangeOption = (option: InputSelectItemOptionBaseProps<T>) => {
    setData({
      option,
      text: isSelectClearText ? "" : option.text,
      textSearch: "",
    });

    setTimeout(() => {
      checkboxClose?.current?.click?.();
      checkboxClose?.current?.focus?.();
    }, 100);
  };

  const parseTextSearch = (e?: string | number) => {
    return `${e ?? ""}`
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };
  const OPTIONSSEARCH = useMemo<InputSelectItemOptionBaseProps<T>[]>(() => {
    if (!useSearch) {
      return [...options];
    }
    const textSearch = parseTextSearch(dataMemo?.textSearch);

    if (textSearch == "") {
      return [...options];
    }
    return [...options].filter(
      (option) =>
        parseTextSearch(option.text)?.includes(textSearch) ||
        textSearch?.includes(parseTextSearch(option.text)) ||
        (searchById &&
          (parseTextSearch(option.id)?.includes(textSearch) ||
            textSearch?.includes(parseTextSearch(option.id)))),
    );
  }, [options, dataMemo, searchById, useSearch]);
  const { OPTIONS } = useMemo<{
    OPTIONS: InputSelectItemOptionBaseProps<T>[];
    nMax: boolean;
  }>(() => {
    if (props?.disabled) {
      return {
        OPTIONS: [],
        nMax: false,
      };
    }
    let nMax = false;
    let list = [...options];

    if (typeSelect == "div") {
      list = [...OPTIONSSEARCH];
    }
    if (maxLengthShowOptions && useItemMaxLengthShowOptions) {
      nMax =
        list.length > maxLengthShowOptions ||
        (nItems ?? 0) > maxLengthShowOptions;
      list = list.splice(0, maxLengthShowOptions);
      if (nMax && itemMaxLengthShowOptions) {
        list.push({
          ...itemMaxLengthShowOptions,
          classNameOption: `fenext-select-option-item-max-lenght-show-options ${itemMaxLengthShowOptions.classNameOption}`,
          text: `${itemMaxLengthShowOptions.text} (${maxLengthShowOptions ?? 0} / ${nItems})`,
          children: (
            <>
              <div className="fenext-select-option-item-max-lenght-show-options-content">
                {itemMaxLengthShowOptions.children ??
                  itemMaxLengthShowOptions.text}
              </div>
              {nItems && (
                <>
                  <span className="fenext-select-option-item-max-lenght-show-options-maxlegnth-nitems">
                    ({maxLengthShowOptions ?? 0} / {nItems})
                  </span>
                </>
              )}
            </>
          ),
          disabled: true,
        });
      }
    }
    return {
      OPTIONS: list,
      nMax,
      nItems,
    };
  }, [
    typeSelect,
    OPTIONSSEARCH,
    options,
    useItemMaxLengthShowOptions,
    maxLengthShowOptions,
    props?.disabled,
    itemMaxLengthShowOptions,
    nItems,
  ]);

  const onEnter = useCallback(() => {
    const optionSect = OPTIONSSEARCH[0];
    if (optionSect) {
      onChangeOption(optionSect);
    }
  }, [OPTIONSSEARCH]);

  const { error: errorFenextV } = useValidator({
    data: data.option,
    validator,
  });
  const { error: errorFenextVD } = useValidator({
    data: data?.option?.data,
    validator: validatorData,
  });

  const errorFenext = useMemo(
    () => errorFenextV ?? errorFenextVD,
    [errorFenextV, errorFenextVD],
  );

  const errorInput = useMemo<ErrorFenextjs | undefined>(() => {
    if (errorWithIsChange && !isChange) {
      return undefined;
    }
    return error ?? errorFenext ?? dataErrorInput;
  }, [error, errorFenext, dataErrorInput, errorWithIsChange, isChange]);

  const onBlur = () => {
    if (changeByFirstOptionInOnBlur && isChangeTextBlur) {
      const optionSect = OPTIONS[0];
      if (optionSect) {
        onChangeOption(optionSect);
        setIsChangeTextBlur(false);
      }
    }
  };

  const OPTIONSLENGTH = useMemo(
    () =>
      OPTIONS.filter((e) => (e?.selected ?? false) || !(e?.hidden ?? false))
        ?.length,
    [OPTIONS],
  );

  const TAGLIST = useMemo(() => {
    const TAG = typeSelect;
    return (
      <>
        <TAG
          id={props?.datalist}
          className={`fenext-select-list-options fenext-select-list-options-type-${typeSelect} ${useNowrap ? "fenext-select-list-options-use-nowrap" : ""} ${classNameList}`}
          onChange={(e) => {
            onChangeText_(e?.target?.value);
          }}
          key={props.loader ? "loader" : "load"}
        >
          {create && typeSelect == "div" ? (
            <>
              <InputSelectOption
                type={"div"}
                id={create?.id ?? "create"}
                text={create?.text ?? "Create"}
                children={create?.children ?? undefined}
                _t={_t}
                isBtn={true}
                onClick={create?.onClick ?? onCreate}
                classNameOption={`${classNameOption} ${create?.classNameOption}`}
              />
            </>
          ) : (
            <></>
          )}
          {OPTIONSLENGTH != 0 && typeSelect == "select" ? (
            <>
              <InputSelectOption
                type={"option"}
                id={noResult?.id ?? "selected"}
                text={_t(selected?.text ?? props?.placeholder ?? "Select")}
                children={selected?.children ?? undefined}
                _t={_t}
                useT={useTOption}
              />
            </>
          ) : (
            <></>
          )}
          {OPTIONS.map((option, i) => {
            return (
              <InputSelectOption<T>
                key={i}
                selected={
                  data.option?.id != undefined && data.option?.id === option?.id
                }
                {...option}
                classNameOption={`${classNameOption} ${option?.classNameOption}`}
                onClick={(e) => {
                  onChangeOption(e);
                  option?.onClick?.(e);
                }}
                type={typeSelect == "div" ? "div" : "option"}
                _t={_t}
                useT={useTOption}
              />
            );
          })}
          {props.loader ? (
            <>
              <InputSelectOption
                type={typeSelect == "div" ? "div" : "option"}
                id={loaderOption?.id ?? "loader"}
                text={loaderOption?.text ?? "Loading"}
                children={loaderOption?.children ?? undefined}
                classNameOption={`${classNameOption} fenext-select-option-loading`}
                _t={_t}
                useT={useTOption}
                disabled={true}
              />
            </>
          ) : (
            <>
              {OPTIONSLENGTH == 0 ? (
                <>
                  <InputSelectOption
                    type={typeSelect == "div" ? "div" : "option"}
                    id={noResult?.id ?? "notResult"}
                    text={noResult?.text ?? "Not Result"}
                    children={noResult?.children ?? undefined}
                    classNameOption={`${classNameOption} fenext-select-option-not-result`}
                    _t={_t}
                    useT={useTOption}
                    disabled={true}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </TAG>
      </>
    );
  }, [
    typeSelect,
    props?.datalist,
    classNameOption,
    classNameList,
    create,
    onCreate,
    OPTIONSLENGTH,
    noResult,
    selected,
    props?.placeholder,
    OPTIONS,
    data,
    useTOption,
    onChangeOption,

    props.loader,
    loaderOption,
    selectRef,
  ]);

  const [isFocus, setIsFocus] = useState(false);

  const CHILDREN_SELECT = useMemo(() => {
    if (
      typeSelect == "div" &&
      (typeSelectStyle == "normal" || typeSelectStyle == "normal-out")
    ) {
      return (
        <>
          <div className={`fenext-select-content-search`}>
            <InputText
              {...props}
              _t={_t}
              icon={
                <>
                  <div className="fenext-select-content-icon">
                    <div className="fenext-select-content-icon-search">
                      {iconSearch}
                    </div>
                  </div>
                </>
              }
              onBlur={onBlur}
              onChange={onChangeText_}
              value={_tValue(dataMemo?.text ?? "")}
              onEnter={onEnter}
              error={errorInput}
              autoComplete={false}
              errorWithIsChange={errorWithIsChange}
              extraInContentInput={
                <>
                  <button className={`fenext-select-clear`} onClick={onClear}>
                    {_t(clearContent)}
                  </button>
                </>
              }
              validator={undefined}
            />
            <button className={`fenext-select-close`}>{iconCloseMovil}</button>
          </div>
          {TAGLIST}
        </>
      );
    }
    return <></>;
  }, [
    options,
    isFocus,
    forceShowOptionOnLoad,
    typeSelect,
    props?.datalist,
    classNameList,
    create,
    onCreate,
    OPTIONSLENGTH,
    noResult,
    selected,
    props?.placeholder,
    OPTIONS,
    data,
    useTOption,
    onChangeOption,

    props.loader,
    loaderOption,
    selectRef,
  ]);

  const { onLoadPos, onLoadChildren } = useSelectOptionsPos({
    idSelectOptions,
    children: CHILDREN_SELECT,
    target: selectRef?.current?.querySelector?.(
      "input.fenext-input-content-input",
    ),
  });
  useEffect(() => {
    if (isFocus || forceShowOptionOnLoad) {
      onLoadChildren();
      if (forceShowOptionOnLoad) {
        const ele = selectRef.current?.querySelector<HTMLInputElement>(
          ".fenext-input-content-input",
        );

        ele?.click();
        ele?.focus();
      }
    }
  }, [
    isFocus,
    forceShowOptionOnLoad,

    CHILDREN_SELECT,

    options,
    typeSelect,
    props?.datalist,
    classNameList,
    create,
    onCreate,
    OPTIONSLENGTH,
    noResult,
    selected,
    props?.placeholder,
    OPTIONS,
    data,
    useTOption,
    onChangeOption,

    props.loader,
    loaderOption,
    selectRef,
  ]);

  return (
    <>
      <div
        ref={selectRef}
        className={`
                    fenext-select
                    fenext-select-${converterInSearchWithMaxLenght && options.length > maxLengthShowOptions ? "search-nmax" : ""}
                    fenext-select-type-${typeSelect}
                    fenext-select-type-style-${typeSelectStyle}
                    fenext-select-${useSwichtypeSelectStyle ? "use-swich-select-style" : ""}
                    fenext-select-${
                      isSelectChangeText
                        ? "is-change-text"
                        : "is-not-change-text"
                    }
                    ${classNameSelect} ${showOptions}
                    ${hiddenOptions}
                `}
        onMouseLeave={() => {
          setIsFocus(false);
        }}
      >
        <div
          className={`fenext-select-content-search`}
          onClick={() => {
            setIsFocus(true);
            onLoadPos?.();
            if (window?.innerWidth <= 575) {
              const ele = selectRef.current?.querySelector<HTMLInputElement>(
                ".fenext-input-content-input",
              );

              ele?.click();
              ele?.focus();
            }
          }}
          // onMouseEnter={onLoadPos}
        >
          <InputText
            {...props}
            _t={_t}
            icon={
              <>
                <div className="fenext-select-content-icon">
                  <div className="fenext-select-content-icon-arrow">{icon}</div>
                  <div className="fenext-select-content-icon-search">
                    {iconSearch}
                  </div>
                </div>
              </>
            }
            onBlur={onBlur}
            onChange={(e) => {
              onChangeText_(e);
              onLoadChildren();
            }}
            value={
              typeSelectStyle == "normal-out"
                ? undefined
                : _tValue(dataMemo?.text ?? "")
            }
            onEnter={onEnter}
            error={errorInput}
            autoComplete={false}
            errorWithIsChange={errorWithIsChange}
            extraInContentInput={
              <>
                <button className={`fenext-select-clear`} onClick={onClear}>
                  {_t(clearContent)}
                </button>
                {showOptionIconImg && (
                  <>
                    {dataMemo?.option?.img ? (
                      <>
                        <div className="fenext-select-option-selected-img">
                          <img src={dataMemo?.option?.img} />
                        </div>
                      </>
                    ) : (
                      <>
                        {dataMemo?.option?.imgComponent ? (
                          <>
                            <div className="fenext-select-option-selected-img">
                              <Img {...dataMemo?.option?.imgComponent} />
                            </div>
                          </>
                        ) : (
                          <>
                            {dataMemo?.option?.icon && (
                              <>
                                <div className="fenext-select-option-selected-img">
                                  {dataMemo?.option?.icon}
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            }
            validator={undefined}
            extraInLabel={
              <>
                {typeSelectStyle == "normal-out" && dataMemo?.option && (
                  <>
                    <div className={`fenext-select-multiple-list `}>
                      <InputSelectOption
                        {...dataMemo?.option}
                        type={"multiple"}
                        onDelete={() => {
                          onClear();
                        }}
                        iconDelete={iconDelete}
                        disabled={props?.disabled}
                        useT={useTOption}
                        classNameOption={`${classNameOption} ${dataMemo?.option?.classNameOption}`}
                        selected={true}
                      />
                    </div>
                  </>
                )}
                {props?.extraInLabel}
              </>
            }
          />
        </div>
        {typeSelect == "div" &&
        (typeSelectStyle == "normal" || typeSelectStyle == "normal-out") &&
        !useSwichtypeSelectStyle ? (
          <></>
        ) : (
          <>{TAGLIST}</>
        )}
      </div>
    </>
  );
};

export interface useSelectOptionsPosProps {
  idSelectOptions?: string;
  children?: ReactNode;
  target?: HTMLElement | null | undefined;
}

export const useSelectOptionsPos = ({
  idSelectOptions,
  children,
  target,
}: useSelectOptionsPosProps) => {
  const [ref, setRef] = useState<HTMLElement | undefined>(undefined);

  const onLoadRef = () => {
    const ID = `fenext-select${idSelectOptions ? `-${idSelectOptions}` : ""}`;
    let ele = document.getElementById(ID);
    if (!ele) {
      ele = document.createElement("div");
      ele.id = ID;
      ele.classList.value = `
                fenext-use-select-options-pos
            `;
      document.body.append(ele);
    }
    ele = document.getElementById(ID);
    if (ele) {
      setRef(ele);
    }
  };
  useEffect(onLoadRef, []);

  const onLoadPos = useCallback(() => {
    if (ref && target) {
      const bounding = target.getBoundingClientRect();
      ReactDOM.render(<>{children}</>, ref);

      ref.style.setProperty("--element-width", `${target.offsetWidth}px`);
      ref.style.setProperty("--element-top", `${bounding.top}px`);
      ref.style.setProperty("--element-left", `${bounding.left}px`);
      ref.style.setProperty("--element-bottom", `${bounding.bottom}px`);

      ref.setAttribute(
        "fenext-direction-pos",
        bounding.top > window?.innerHeight - bounding.bottom ? "top" : "bottom",
      );
    }
  }, [children, target, ref]);

  const onLoadChildren = useCallback(() => {
    if (ref) {
      ReactDOM.render(<>{children}</>, ref);
    }
  }, [children, ref]);

  return {
    ref,
    onLoadPos,
    onLoadChildren,
  };
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
export const InputColor = ({
  className = "",
  defaultValue,
  value,
  onChange,
  disabled,
}: InputColorProps) => {
  const { data: data_, setData } = useData<string>(defaultValue ?? "", {
    onChangeDataAfter: onChange,
  });

  const data = useMemo(() => value ?? data_, [value, data_]);

  return (
    <label className={`fenext-input-color ${className}`}>
      <input
        type="color"
        className="fenext-input-color-input"
        value={data}
        onChange={(e) => {
          setData(e.target.value);
        }}
        disabled={disabled}
      />
    </label>
  );
};

/**
 * Interface that defines CSS class properties for a SelectTimeZone input component.
 */
export interface InputSelectTimeZoneClassProps extends InputSelectClassProps {}

/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectTimeZoneBaseProps
  extends Omit<InputSelectTProps<TimeZoneProps>, "options" | "onParse"> {}
/**
 * Props interface for the InputSelectTimeZone component. Extends both InputSelectTimeZoneBaseProps and InputSelectTimeZoneClassProps interfaces.
 */
export interface InputSelectTimeZoneProps
  extends InputSelectTimeZoneBaseProps,
    InputSelectTimeZoneClassProps {}

export const InputSelectTimeZone = ({
  useTOption = false,
  ...props
}: InputSelectTimeZoneProps) => {
  return (
    <>
      <InputSelectT<TimeZoneProps>
        {...props}
        options={TimeZoneList}
        onParse={(e) => {
          const r: InputSelectItemOptionBaseProps<TimeZoneProps> = {
            id: e?.time ?? "",
            text: `${e?.time ?? ""}`,
            data: e,
          };
          return r;
        }}
        useTOption={useTOption}
      />
    </>
  );
};

export const TimeZoneList: TimeZoneProps[] = [
  {
    zone: "Dateline Standard Time",
    time: "(GMT-12:00) International Date Line West",
  },
  {
    zone: "Samoa Standard Time",
    time: "(GMT-11:00) Midway Island, Samoa",
  },
  {
    zone: "Hawaiian Standard Time",
    time: "(GMT-10:00) Hawaii",
  },
  {
    zone: "Alaskan Standard Time",
    time: "(GMT-09:00) Alaska",
  },
  {
    zone: "Pacific Standard Time",
    time: "(GMT-08:00) Pacific Time (US and Canada)",
  },
  {
    zone: "Mountain Standard Time",
    time: "(GMT-07:00) Mountain Time (US and Canada)",
  },
  {
    zone: "Mexico Standard Time 2",
    time: "(GMT-07:00) Chihuahua, La Paz, Mazatlan",
  },
  {
    zone: "U.S. Mountain Standard Time",
    time: "(GMT-07:00) Arizona",
  },
  {
    zone: "Central Standard Time",
    time: "(GMT-06:00) Central Time (US and Canada)",
  },
  {
    zone: "Canada Central Standard Time",
    time: "(GMT-06:00) Saskatchewan",
  },
  {
    zone: "Mexico Standard Time",
    time: "(GMT-06:00) Guadalajara, Mexico City, Monterrey",
  },
  {
    zone: "Central America Standard Time",
    time: "(GMT-06:00) Central America",
  },
  {
    zone: "Eastern Standard Time",
    time: "(GMT-05:00) Eastern Time (US and Canada)",
  },
  {
    zone: "U.S. Eastern Standard Time",
    time: "(GMT-05:00) Indiana (East)",
  },
  {
    zone: "S.A. Pacific Standard Time",
    time: "(GMT-05:00) Bogota, Lima, Quito",
  },
  {
    zone: "Atlantic Standard Time",
    time: "(GMT-04:00) Atlantic Time (Canada)",
  },
  {
    zone: "S.A. Western Standard Time",
    time: "(GMT-04:00) Caracas, La Paz",
  },
  {
    zone: "Pacific S.A. Standard Time",
    time: "(GMT-04:00) Santiago",
  },
  {
    zone: "Newfoundland and Labrador Standard Time",
    time: "(GMT-03:30) Newfoundland and Labrador",
  },
  {
    zone: "E. South America Standard Time",
    time: "(GMT-03:00) Brasilia",
  },
  {
    zone: "S.A. Eastern Standard Time",
    time: "(GMT-03:00) Buenos Aires, Georgetown",
  },
  {
    zone: "Greenland Standard Time",
    time: "(GMT-03:00) Greenland",
  },
  {
    zone: "Mid-Atlantic Standard Time",
    time: "(GMT-02:00) Mid-Atlantic",
  },
  {
    zone: "Azores Standard Time",
    time: "(GMT-01:00) Azores",
  },
  {
    zone: "Cape Verde Standard Time",
    time: "(GMT-01:00) Cape Verde Islands",
  },
  {
    zone: "GMT Standard Time",
    time: "(GMT) Greenwich Mean Time: Dublin, Edinburgh, Lisbon, London",
  },
  {
    zone: "Greenwich Standard Time",
    time: "(GMT) Casablanca, Monrovia",
  },
  {
    zone: "Central Europe Standard Time",
    time: "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
  },
  {
    zone: "Central European Standard Time",
    time: "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb",
  },
  {
    zone: "Romance Standard Time",
    time: "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris",
  },
  {
    zone: "W. Europe Standard Time",
    time: "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
  },
  {
    zone: "W. Central Africa Standard Time",
    time: "(GMT+01:00) West Central Africa",
  },
  {
    zone: "E. Europe Standard Time",
    time: "(GMT+02:00) Bucharest",
  },
  {
    zone: "Egypt Standard Time",
    time: "(GMT+02:00) Cairo",
  },
  {
    zone: "FLE Standard Time",
    time: "(GMT+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius",
  },
  {
    zone: "GTB Standard Time",
    time: "(GMT+02:00) Athens, Istanbul, Minsk",
  },
  {
    zone: "Israel Standard Time",
    time: "(GMT+02:00) Jerusalem",
  },
  {
    zone: "South Africa Standard Time",
    time: "(GMT+02:00) Harare, Pretoria",
  },
  {
    zone: "Russian Standard Time",
    time: "(GMT+03:00) Moscow, St. Petersburg, Volgograd",
  },
  {
    zone: "Arab Standard Time",
    time: "(GMT+03:00) Kuwait, Riyadh",
  },
  {
    zone: "E. Africa Standard Time",
    time: "(GMT+03:00) Nairobi",
  },
  {
    zone: "Arabic Standard Time",
    time: "(GMT+03:00) Baghdad",
  },
  {
    zone: "Iran Standard Time",
    time: "(GMT+03:30) Tehran",
  },
  {
    zone: "Arabian Standard Time",
    time: "(GMT+04:00) Abu Dhabi, Muscat",
  },
  {
    zone: "Caucasus Standard Time",
    time: "(GMT+04:00) Baku, Tbilisi, Yerevan",
  },
  {
    zone: "Transitional Islamic State of Afghanistan Standard Time",
    time: "(GMT+04:30) Kabul",
  },
  {
    zone: "Ekaterinburg Standard Time",
    time: "(GMT+05:00) Ekaterinburg",
  },
  {
    zone: "West Asia Standard Time",
    time: "(GMT+05:00) Islamabad, Karachi, Tashkent",
  },
  {
    zone: "India Standard Time",
    time: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",
  },
  {
    zone: "Nepal Standard Time",
    time: "(GMT+05:45) Kathmandu",
  },
  {
    zone: "Central Asia Standard Time",
    time: "(GMT+06:00) Astana, Dhaka",
  },
  {
    zone: "Sri Lanka Standard Time",
    time: "(GMT+06:00) Sri Jayawardenepura",
  },
  {
    zone: "N. Central Asia Standard Time",
    time: "(GMT+06:00) Almaty, Novosibirsk",
  },
  {
    zone: "Myanmar Standard Time",
    time: "(GMT+06:30) Yangon Rangoon",
  },
  {
    zone: "S.E. Asia Standard Time",
    time: "(GMT+07:00) Bangkok, Hanoi, Jakarta",
  },
  {
    zone: "North Asia Standard Time",
    time: "(GMT+07:00) Krasnoyarsk",
  },
  {
    zone: "China Standard Time",
    time: "(GMT+08:00) Beijing, Chongqing, Hong Kong SAR, Urumqi",
  },
  {
    zone: "Singapore Standard Time",
    time: "(GMT+08:00) Kuala Lumpur, Singapore",
  },
  {
    zone: "Taipei Standard Time",
    time: "(GMT+08:00) Taipei",
  },
  {
    zone: "W. Australia Standard Time",
    time: "(GMT+08:00) Perth",
  },
  {
    zone: "North Asia East Standard Time",
    time: "(GMT+08:00) Irkutsk, Ulaanbaatar",
  },
  {
    zone: "Korea Standard Time",
    time: "(GMT+09:00) Seoul",
  },
  {
    zone: "Tokyo Standard Time",
    time: "(GMT+09:00) Osaka, Sapporo, Tokyo",
  },
  {
    zone: "Yakutsk Standard Time",
    time: "(GMT+09:00) Yakutsk",
  },
  {
    zone: "A.U.S. Central Standard Time",
    time: "(GMT+09:30) Darwin",
  },
  {
    zone: "Cen. Australia Standard Time",
    time: "(GMT+09:30) Adelaide",
  },
  {
    zone: "A.U.S. Eastern Standard Time",
    time: "(GMT+10:00) Canberra, Melbourne, Sydney",
  },
  {
    zone: "E. Australia Standard Time",
    time: "(GMT+10:00) Brisbane",
  },
  {
    zone: "Tasmania Standard Time",
    time: "(GMT+10:00) Hobart",
  },
  {
    zone: "Vladivostok Standard Time",
    time: "(GMT+10:00) Vladivostok",
  },
  {
    zone: "West Pacific Standard Time",
    time: "(GMT+10:00) Guam, Port Moresby",
  },
  {
    zone: "Central Pacific Standard Time",
    time: "(GMT+11:00) Magadan, Solomon Islands, New Caledonia",
  },
  {
    zone: "Fiji Islands Standard Time",
    time: "(GMT+12:00) Fiji Islands, Kamchatka, Marshall Islands",
  },
  {
    zone: "New Zealand Standard Time",
    time: "(GMT+12:00) Auckland, Wellington",
  },
  {
    zone: "Tonga Standard Time",
    time: "(GMT+13:00) Nuku'alofa",
  },
];

/**
 * Interface that defines CSS class properties for a text input component.
 */
export interface InputNumberCountClassProps extends InputTextClassProps {}
/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputNumberCountBaseProps
  extends Omit<
    InputTextBaseProps,
    | "type"
    | "defaultValue"
    | "onChange"
    | "onChangeValidate"
    | "value"
    | "validator"
  > {
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
  /**
   * optionsParseNumber used for input validation.
   */
  optionsParseNumberDefault?: Intl.NumberFormatOptions;
}
/**
 * Props interface for the InputNumberCount component. Extends both InputNumberCountBaseProps and InputNumberCountClassProps interfaces.
 */
export interface InputNumberCountProps
  extends InputNumberCountBaseProps,
    InputNumberCountClassProps {}

export const InputNumberCount = ({
  onChange,
  value: valueProps = undefined,
  defaultValue,

  symbolInit = "$",
  symbolFinal = "",

  validator: validatorProps = undefined,
  min = -Infinity,
  max = Infinity,
  minError,
  maxError,
  optionsParseNumberDefault,
  optionsParseNumber,
  aplyMax = true,
  aplyMin = false,

  ...props
}: InputNumberCountProps) => {
  const { data, setDataFunction, isChange } = useData<string>(
    `${parseNumberCount(defaultValue ?? "", optionsParseNumberDefault ?? optionsParseNumber)}`,
    {
      onChangeDataAfter: (e) => {
        if (e == "") {
          onChange?.("");
          return;
        }
        onChange?.(parseNumber(e));
      },
    },
  );
  const value = useMemo(() => valueProps ?? data, [valueProps, data]);

  const validator = useMemo(() => {
    const v = validatorProps ?? FenextjsValidator().isNumber();
    if (!validatorProps) {
      v.isMinOrEqual(min, minError).isMaxOrEqual(max, maxError);
    }
    return v;
  }, [validatorProps, min, max]);

  const { error: errorFenext } = useValidator({
    data: value != undefined && value != "" ? parseNumber(value) : undefined,
    validator: validator,
  });

  const parseNumberCountForInputNumberCount = useCallback(
    (d: string | number, old: string | number, keyDown?: string) => {
      let n = parseNumberCount(d, optionsParseNumber);
      if (keyDown == "-" && n == "0") {
        return "-0";
      }
      if (`${old}`.includes(".")) {
        const decimales = (`${old}`.split(".")?.[1] ?? "")
          .slice(0, optionsParseNumber?.maximumFractionDigits ?? 3)
          .replace(/[^0-9]/g, "");
        n = parseNumberCount(`${parseInt(`${parseNumber(n)}`)}`);
        if (!n.includes(".")) {
          n += ".";
        }
        n += decimales;
      }
      return n;
    },
    [optionsParseNumber],
  );

  const dataText = useMemo(() => {
    const d = `${value}`;
    if (d == "") {
      return "";
    }
    const n = parseNumberCountForInputNumberCount(d, d);
    return `${symbolInit}${n}${d.at(-1) == "." ? "" : symbolFinal}`;
  }, [symbolInit, symbolFinal, value, optionsParseNumber]);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    props?.onKeyDown?.(event);
    const keyNew = event?.key;

    setDataFunction((old) => {
      let oldN = `${old}${keyNew}`.replace(/[^0-9.-]/g, "");

      let n = `${oldN}`;
      if (keyNew == "Backspace") {
        n = n.slice(0, n.length - 1);
        oldN = oldN.slice(0, oldN.length - 1);
      }
      if (keyNew == "ArrowUp") {
        n = `${parseNumber(n) + 1}`;
      }
      if (keyNew == "ArrowDown") {
        n = `${parseNumber(n) - 1}`;
      }
      if (aplyMax && max != undefined) {
        n = `${Math.min(max, parseNumber(n))}`;
      }
      if (aplyMin && min != undefined) {
        n = `${Math.max(min, parseNumber(n))}`;
      }
      if (keyNew == "." && !n.includes(".")) {
        n += ".";
      }
      n = parseNumberCountForInputNumberCount(n, oldN, keyNew);
      return n;
    });
  };

  return (
    <>
      <InputText
        {...props}
        className={`fenext-input-number-count ${props?.className ?? ""}`}
        // onChange={onChangeNumber}
        type="text"
        value={dataText}
        isChange={isChange}
        onKeyDown={onKeyDown as any}
        validator={undefined}
        error={errorFenext}
        inputMode="numeric"
      />
    </>
  );
};

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
export interface InputRateProps
  extends InputRateBaseProps,
    InputRateClassProps {}

export const InputRate = ({
  className = "",
  classNameContentStar = "",
  classNameStar = "",
  classNameStarActive = "",
  classNameNumber = "",

  defaultValue = 0,
  value = undefined,
  onChange,
}: InputRateProps) => {
  const [data, setData] = useState(defaultValue);
  const start = useMemo(
    () => Math.max(0, Math.min(value ?? data ?? 0, 5)),
    [value, data],
  );

  // const elemento = e.currentTarget;
  // const posX = e.nativeEvent.offsetX;
  // const porcentajeX = (posX / elemento.offsetWidth) * 100;

  const onSelectStar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    onChange?.(v);
    setData(v);
  };

  return (
    <>
      <div
        className={`fenext-input-rate ${className} `}
        style={
          {
            ["--start"]: start,
            ["--startP"]: `${start * 20}%`,
          } as React.CSSProperties
        }
      >
        <div
          className={`fenext-input-rate-content-start ${classNameContentStar} `}
        >
          <SvgStart className={`fenext-input-rate-start ${classNameStar}`} />
          <SvgStart className={`fenext-input-rate-start ${classNameStar}`} />
          <SvgStart className={`fenext-input-rate-start ${classNameStar}`} />
          <SvgStart className={`fenext-input-rate-start ${classNameStar}`} />
          <SvgStart className={`fenext-input-rate-start ${classNameStar}`} />
        </div>
        <div
          className={`fenext-input-rate-content-start fenext-input-rate-content-start-active ${classNameContentStar} `}
        >
          <SvgStart
            className={`fenext-input-rate-start fenext-input-rate-start-active ${classNameStar} ${classNameStarActive}`}
          />
          <SvgStart
            className={`fenext-input-rate-start fenext-input-rate-start-active ${classNameStar} ${classNameStarActive}`}
          />
          <SvgStart
            className={`fenext-input-rate-start fenext-input-rate-start-active ${classNameStar} ${classNameStarActive}`}
          />
          <SvgStart
            className={`fenext-input-rate-start fenext-input-rate-start-active ${classNameStar} ${classNameStarActive}`}
          />
          <SvgStart
            className={`fenext-input-rate-start fenext-input-rate-start-active ${classNameStar} ${classNameStarActive}`}
          />
        </div>
        <div
          className={`fenext-input-rate-content-start fenext-input-rate-cap`}
        >
          <input
            type="range"
            onChange={onSelectStar}
            min={0}
            max={5}
            step={0.1}
            value={start}
            className={`fenext-input-rate-cap-input`}
          />
        </div>
        <div className={`fenext-input-rate-number ${classNameNumber}`}>
          {start}
        </div>
      </div>
    </>
  );
};

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
export interface InputPhoneBaseProps
  extends Omit<
    InputTextBaseProps,
    "type" | "value" | "onChange" | "defaultValue" | "datalist" | "validator"
  > {
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

  parseCountrys?: (data: CountryProps[]) => CountryProps[];
  /**
   * Default Value =
   */
  defaultValue?: Partial<PhoneProps>;
  /**
   * Value
   */
  value?: Partial<PhoneProps>;
  /**
   * onChange
   */
  onChange?: (data: Partial<PhoneProps>) => void;

  maxLengthShowOptionsCodes?: number;
}

/**
 * Interface that defines all properties for a checkbox input component.
 * Extends InputPhoneBaseProps and InputPhoneClassProps.
 */
export interface InputPhoneProps
  extends InputPhoneBaseProps,
    InputPhoneClassProps {}

/**
 * Component that renders a checkbox input.
 * Takes an InputPhoneProps object as props.
 */
export const InputPhone = ({
  classNameInputNumber = {},
  classNameSelectCode = {},
  classNamePhone = "",
  classNamePhoneCode = "",
  classNamePhoneLabel = "",
  classNamePhoneNumber = "",
  classNameError = "",

  disabledSelectCode = false,
  disabled,
  label,
  loader,

  placeholderCode = "+57",
  placeholder = "xxx-xx-xx-xxxx",
  validator = undefined,
  optional = false,
  optionalText = "(optional)",
  required = false,
  requiredText = "*",
  maxLengthShowOptionsCodes,

  defaultValue = {
    code: "+57",
  },
  value = undefined,
  onChange: onChangeProps,
  parseCountrys,
  ...props
}: InputPhoneProps) => {
  const { _t } = use_T({ ...props });

  const onChange = (v: Partial<PhoneProps>) => {
    onChangeProps?.({
      ...v,
      tel: `${v.code ?? ""} ${v.number ?? ""}`,
    });
  };

  const [loadPhoneCodes, setlLoadPhoneCodes] = useState(false);
  const {
    dataMemo: data,
    onChangeData,
    onConcatData,
    isChange,
  } = useData<Partial<PhoneProps>, Partial<PhoneProps>>(
    value ?? defaultValue ?? {},
    {
      memoDependencies: [value],
      onMemo: (d: Partial<PhoneProps>) => {
        const v = value ?? d;
        return {
          ...v,
          tel: `${v.code ?? ""} ${v.number ?? ""}`,
        };
      },
    },
  );

  const [phones, setPhones] = useState<CountryProps[]>([]);
  const loadPhones = async () => {
    let countrys: CountryProps[] = await getDataCountrys();
    if (parseCountrys) {
      countrys = parseCountrys(countrys);
    }
    setPhones(countrys);
    setlLoadPhoneCodes(true);
  };
  useEffect(() => {
    loadPhones();
  }, [parseCountrys]);

  const { error: errorFenext } = useValidator({
    data: data,
    validator: validator ?? FenextjsValidator(),
  });

  const getCountryPhone = (d: Partial<PhoneProps> | undefined) => {
    return (
      d?.country ??
      (d?.code_country
        ? phones.find((e) => e.code == d?.code_country)
        : undefined) ??
      (d?.code ? phones.find((e) => e.code_phone == d?.code) : undefined)
    );
  };

  return (
    <>
      <div className={`fenext-input-phone ${classNamePhone}`}>
        <div
          className={`fenext-input-phone-label fenext-input-label ${classNamePhoneLabel} `}
        >
          {_t(label)}
          {optional && (
            <>
              <small className="fenext-input-optional">
                {_t(optionalText)}
              </small>
            </>
          )}
          {required && (
            <>
              <small className="fenext-input-required">
                {_t(requiredText)}
              </small>
            </>
          )}
        </div>
        <div className={`fenext-input-phone-code ${classNamePhoneCode}`}>
          <InputSelectT<CountryProps>
            {...classNameSelectCode}
            classNameList={`fenext-input-phone-select-code ${classNameSelectCode?.classNameList ?? ""}`}
            key={`${defaultValue?.code_country}-${defaultValue?.code}-${value?.code}-${phones.length}`}
            placeholder={placeholderCode}
            _t={_t}
            useNowrap={true}
            options={phones}
            onParse={(e) => {
              return {
                id: e?.code_phone ?? "",
                text: `${e?.code_phone ?? ""}`,
                data: e,
                children: (
                  <>
                    <div className="fenext-input-phone-option-country">
                      <span className="fenext-input-phone-option-country-code">
                        {e?.code_phone}
                      </span>
                      <span className="fenext-input-phone-option-country-text">
                        {e?.text}
                      </span>
                    </div>
                  </>
                ),
                img: e ? `${getRuteCountryImg(e)}` : undefined,
              };
            }}
            disabled={!loadPhoneCodes || disabled || disabledSelectCode}
            defaultValue={getCountryPhone(defaultValue)}
            value={getCountryPhone(value)}
            onChange={(e) => {
              if (e?.code_phone) {
                const v = {
                  code: e?.code_phone,
                  country: e,
                  code_country: e?.code,
                  img: e ? `${getRuteCountryImg(e)}` : undefined,
                };
                onConcatData({
                  ...v,
                });
                onChange?.({
                  ...data,
                  ...v,
                });
              }
            }}
            regExp={/[^0-9+-]/g}
            regExpReplace=""
            icon={<></>}
            // changeByFirstOptionInOnBlur={true}
            optional={false}
            showOptionIconImg={true}
            itemMaxLengthShowOptions={{
              id: "fenext-item-max-length-show-options",
              text: "...",
            }}
            maxLengthShowOptions={maxLengthShowOptionsCodes}
            useTOption={false}
          />
        </div>
        <div className={`fenext-input-phone-text ${classNamePhoneNumber}`}>
          <InputText
            {...classNameInputNumber}
            {...props}
            type="text"
            onChange={(n) => {
              onChangeData("number")(n);
              onChange?.({
                ...data,
                number: n,
              });
            }}
            loader={!loadPhoneCodes || loader}
            disabled={!loadPhoneCodes || disabled}
            placeholder={placeholder}
            defaultValue={data?.number}
            value={data?.number}
            _t={_t}
            validator={validator?.getObjectValidator?.()?.number}
            inputMode="numeric"
            regExpReplace=""
            regExp={/[^0-9]/g}
            optional={false}
            error={undefined}
          />
        </div>
        {(props?.error || (errorFenext && isChange)) && (
          <ErrorComponent
            error={errorFenext ?? props?.error}
            className={`fenext-input-error ${classNameError}`}
            _t={_t}
          />
        )}
      </div>
    </>
  );
};

/**
 * Props for the InputDateValueType
 */
export type InputDateValueType = Date | undefined;
/**
 * Props for the base InputDate component
 */
export interface InputDateBaseProps
  extends Omit<
    InputTextBaseProps,
    "type" | "value" | "onChange" | "defaultValue"
  > {
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
export interface InputDateProps
  extends InputDateBaseProps,
    InputDateClassProps {}

export const InputDate = ({
  classNameInputDate = "",

  type = "date",
  defaultValue = undefined,
  value = undefined,
  min = undefined,
  max = undefined,
  onChange,
  icon = <SvgDate />,
  iconPos = "left",
  validator,
  ...props
}: InputDateProps) => {
  const uuid = useMemo(() => new Date().getTime(), []);
  const { data, setData, isChange } = useData<Date | undefined>(defaultValue);
  const d = useMemo(
    () =>
      `${defaultValue ? parseDateToText({ date: defaultValue, type }) : ""}`,
    [defaultValue],
  );
  const [valueString, setValueString] = useState(d);

  const changeInput = (e: any) => {
    const text = e.target.value;
    if (text == "") {
      setValueString("");
      onChange?.(undefined);
      return;
    }

    const nDate = parseTextToDate({
      text,
      type,
    });
    setData(nDate);
    const nText = parseDateToText({ date: nDate, type });

    setValueString(nText);
    onChange?.(nDate);
  };

  const MIN = useMemo(() => {
    if (!min) {
      return undefined;
    }
    if (type == "month") {
      return getMonthValue(min);
    }
    if (type == "week") {
      return getWeekValue(min);
    }
    if (type == "time") {
      return getTimeValue(min);
    }
    return min?.toISOString?.().split?.("T")?.[0];
  }, [min, type]);
  const MAX = useMemo(() => {
    if (!max) {
      return undefined;
    }
    if (type == "month") {
      return getMonthValue(max);
    }
    if (type == "week") {
      return getWeekValue(max);
    }
    if (type == "time") {
      return getTimeValue(max);
    }
    return max?.toISOString?.().split?.("T")?.[0];
  }, [max, type]);
  const DATALIST = useMemo(() => {
    if (type == "time") {
      return (
        <>
          <datalist id={`input-date-${uuid}`}>
            {new Array(24).fill(1).map((e, i) => {
              const h = parseNumberCount(e * i, {
                minimumIntegerDigits: 2,
              });
              return (
                <>
                  {new Array(6).fill(1).map((l, j) => {
                    const m = parseNumberCount(l * j * 10, {
                      minimumIntegerDigits: 2,
                    });
                    return (
                      <>
                        <option value={`${h}:${m}`} />
                      </>
                    );
                  })}
                </>
              );
            })}
          </datalist>
        </>
      );
    }
    return <></>;
  }, [uuid, type]);

  const { error: errorFenext } = useValidator({
    data: data,
    validator: validator ?? FenextjsValidator(),
  });

  return (
    <InputText
      {...props}
      defaultValue={""}
      value={value ? parseDateToText({ date: value, type }) : valueString}
      onChange={() => 1}
      extraInContentInput={
        <>
          {props?.disabled != true && (
            <>
              <input
                type={type}
                onChange={changeInput}
                className={`fenext-input-date ${classNameInputDate}`}
                min={MIN}
                max={MAX}
                list={`input-date-${uuid}`}
              />
              {DATALIST}
            </>
          )}
        </>
      }
      iconPos={iconPos}
      icon={<span className={`fenext-input-date-icon `}>{icon}</span>}
      validator={undefined}
      error={errorFenext}
      isChange={isChange}
    />
  );
};

/**
 * Interface that defines CSS class properties for a select-multiple input component.
 */
export interface InputSelectButtonsGroupClassProps
  extends Pick<
    InputSelectMultipleTProps<any>,
    "classNameLabel" | "classNameError"
  > {
  /**
   * CSS class name for the input select-multiple.
   */
  classNameSelectButtonsGroup?: string;

  /**
   * CSS class name for the list options.
   */
  classNameSelectButtonsGroupList?: string;
}

/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectButtonsGroupBaseProps<T = any>
  extends Pick<
    InputSelectMultipleTProps<T>,
    | "onParse"
    | "onChange"
    | "value"
    | "defaultValue"
    | "options"
    | "validator"
    | "CustomOptionsSelected"
    | "useTOption"
    | "label"
    | "optional"
    | "optionalText"
    | "required"
    | "disabled"
    | "requiredText"
    | "_t"
    | "useT"
  > {
  isMultiple?: boolean;
}
/**
 * Props interface for the InputSelectButtonsGroup component. Extends both InputSelectButtonsGroupBaseProps and InputSelectButtonsGroupClassProps interfaces.
 */
export interface InputSelectButtonsGroupProps<T = any>
  extends InputSelectButtonsGroupBaseProps<T>,
    InputSelectButtonsGroupClassProps {}

export const InputSelectButtonsGroup = <T = any,>({
  classNameSelectButtonsGroup = "",
  classNameSelectButtonsGroupList = "",
  onChange,
  value = undefined,
  defaultValue = [],
  options = [],
  CustomOptionsSelected = undefined,
  validator,
  useTOption,
  classNameLabel,
  classNameError,
  label,
  disabled,
  optional = false,
  optionalText = "(optional)",
  required = false,
  requiredText = "*",
  isMultiple = false,
  _t: _tProps,
  useT,
  onParse,
}: InputSelectButtonsGroupProps<T>) => {
  const { _t } = use_T({ _t: _tProps, useT });
  const { data, setData, setDataFunction } = useData<
    InputSelectItemOptionBaseProps<T>[]
  >(defaultValue?.map(onParse), {
    onChangeDataAfter: (e) => {
      onChange?.(e?.map((e) => e.data as T));
    },
  });

  const dataMemo = useMemo(
    () => (value ? value?.map(onParse) : data),
    [data, value],
  );

  const onAddItemSelect = useCallback(
    (newItem: InputSelectItemOptionBaseProps<T> | undefined) => {
      if (newItem) {
        if (isMultiple == false) {
          setData([newItem]);
          return;
        }
        setDataFunction(() => {
          const old = [...dataMemo];
          if (old.find((e) => e.id == newItem.id)) {
            return old.filter((e) => e.id != newItem.id);
          }
          return [...old, newItem];
        });
      }
    },
    [dataMemo],
  );

  const { error } = useValidator({
    data: dataMemo?.map((e) => e.data),
    validator: validator as any,
  });

  return (
    <>
      <div
        className={`
                    fenext-select-buttons-group
                    fenext-select-multiple
                    fenext-select-multiple-checkbox
                    ${classNameSelectButtonsGroup}
                `}
      >
        <div className={`fenext-input-label ${classNameLabel}`}>
          {_t(label)}
          {optional && (
            <>
              <small className="fenext-input-optional">
                {_t(optionalText)}
              </small>
            </>
          )}
          {required && (
            <>
              <small className="fenext-input-required">
                {_t(requiredText)}
              </small>
            </>
          )}
        </div>
        <div
          className={`fenext-select-multiple-list ${classNameSelectButtonsGroupList} `}
        >
          {options.map((o) => {
            const option = onParse(o);
            const OptionTag = CustomOptionsSelected ?? InputSelectOption<T>;
            return (
              <OptionTag
                {...option}
                type={"multiple"}
                selected={
                  dataMemo?.find((e) => e.id == option.id) !== undefined
                }
                onClick={onAddItemSelect}
                disabled={disabled ?? option?.disabled}
                useT={useTOption}
                _t={_t}
              />
            );
          })}
        </div>
        {error && (
          <ErrorComponent
            error={error}
            className={`fenext-input-error ${classNameError}`}
            _t={_t}
          />
        )}
      </div>
    </>
  );
};

/**
 * Interface that defines CSS class properties for a select input component.
 */
export interface InputSelectCSCClassProps extends InputSelectClassProps {
  /**
   * CSS class name for the input select.
   */
  classNameSelectCSC?: string;
}

type InputCSCProps = Pick<
  InputSelectProps,
  | "id"
  | "label"
  | "placeholder"
  | "placeholderFocus"
  | "disabled"
  | "classNameSelect"
  | "validator"
  | "validatorData"
  | "filterOptions"
  | "optional"
  | "optionalText"
  | "required"
  | "requiredText"
  | "forceShowOptionOnLoad"
  | "maxLengthShowOptions"
>;

/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectCSCBaseProps
  extends useCSCProps,
    Omit<
      InputSelectBaseProps,
      | "options"
      | "defaultValue"
      | "value"
      | "isSelectClearText"
      | "onChange"
      | "onChangeValidate"
      | "validator"
      | "validatorData"
      | "filterOptions"
    > {
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
export interface InputSelectCSCProps
  extends InputSelectCSCBaseProps,
    InputSelectCSCClassProps {}

export const InputSelectCSC = ({
  classNameSelectCSC = "",
  useContainer = true,
  country = {
    label: "Country",
    placeholder: "Country",
  },
  state = {
    label: "State",
    placeholder: "State",
  },
  city = {
    label: "City",
    placeholder: "City",
  },

  defaultValue: defaultValueProps,
  value: valueProps,
  onChange: onChangeProps,
  defaultValueJsonString,
  valueJsonString,
  onChangeJsonString,
  parseJson_to_String,
  parseString_to_Json,
  ...props
}: InputSelectCSCProps) => {
  const {
    countrys,
    states,
    citys,
    onChangeCSC,
    value,
    loadCitys,
    loadCountrys,
    loadStates,
  } = useCSC({
    defaultValue: defaultValueProps,
    value: valueProps,
    onChange: onChangeProps,
    defaultValueJsonString,
    valueJsonString,
    onChangeJsonString,
    parseJson_to_String: parseJson_to_String ?? parseCSC_to_CSCString,
    parseString_to_Json: parseString_to_Json ?? parseCSCString_to_CSC,
  });

  const CONTENT = useMemo(() => {
    let C = (
      <>
        <InputSelectT<CountryProps>
          {...props}
          {...country}
          useTOption={true}
          options={countrys}
          nItems={countrys.length}
          onChange={onChangeCSC("country")}
          defaultValue={value?.country}
          loader={!loadCountrys}
          onParse={(e) => {
            return {
              ...e,
              id: e?.id ?? "",
              text: e?.text ?? "",
              data: e,
            };
          }}
        />
        <InputSelectT<StateProps>
          {...props}
          {...state}
          useTOption={false}
          key={`state-${value?.country?.id}`}
          options={states}
          nItems={states.length}
          onChange={onChangeCSC("state")}
          value={value?.state}
          loader={!loadStates}
          onParse={(e) => {
            return {
              ...e,
              id: e?.id ?? "",
              text: e?.text ?? "",
              data: e,
            };
          }}
        />
        <InputSelectT<CityProps>
          {...props}
          {...city}
          useTOption={false}
          key={`city-${value?.state?.id}`}
          options={citys}
          nItems={citys.length}
          onChange={onChangeCSC("city")}
          value={value?.city}
          loader={!loadCitys}
          onParse={(e) => {
            return {
              ...e,
              id: e?.id ?? "",
              text: e?.text ?? "",
              data: e,
            };
          }}
        />
      </>
    );

    if (useContainer) {
      C = (
        <>
          <div className={`fenext-select-csc ${classNameSelectCSC}`}>{C}</div>
        </>
      );
    }

    return C;
  }, [
    value,
    value?.country?.id,
    value?.state?.id,
    value?.city?.id,
    countrys,
    states,
    citys,
    useContainer,
    country,
    state,
    city,
    loadCitys,
    loadCountrys,
    loadStates,
  ]);
  return <>{CONTENT}</>;
};

export interface InputSelectCountryMultipleProps
  extends Omit<
    InputSelectMultipleTProps<CountryProps>,
    "options" | "useLoader" | "loader" | "onParse"
  > {}

export const InputSelectCountryMultiple = ({
  ...props
}: InputSelectCountryMultipleProps) => {
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState<CountryProps[]>([]);
  const onLoad = async () => {
    const countrys = await getDataCountrys();
    setOptions(
      countrys.map((e) => {
        return {
          ...e,
          img: `${getRuteCountryImg(e)}`,
        };
      }),
    );
    setLoader(false);
  };
  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      <InputSelectMultipleT<CountryProps>
        {...props}
        useTOption={true}
        options={options}
        loader={loader}
        useLoader={true}
        onParse={(e) => ({
          ...e,
          text: e?.text ?? "",
          id: e?.id ?? "",
          data: e,
        })}
      />
    </>
  );
};

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
export interface InputFileStatusProps
  extends Omit<InputFileBaseProps, "onUploadFile"> {
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

export const InputFileStatus = ({
  className = "",
  btn = "Choose File",
  icon = (
    <>
      <SvgUpload2 />
    </>
  ),
  text = "Drag and drop your file or template here.",
  title = "Drag and drop here",

  defaultValue = {
    fileData: "",
    text: "",
  },
  onChange,

  iconLoader = <LoaderSpinner />,

  onUploadFile,
  contentByStatus: contentByStatusProps = {},
  ...props
}: InputFileStatusProps) => {
  const { _t } = use_T({ ...props });
  const contentByStatus = useMemo(
    () => ({
      APPROVED: {
        title: "Approved!",
        tag: "Accepted",
        icon: <SvgCheck />,
      },
      REFUSED: {
        title: "Refused! go up again",
        tag: "Denied",
        icon: <SvgUpload2 />,
      },
      PENDING: {
        title: "Pending",
        tag: "Pending",
        icon: <SvgUpload2 />,
      },
      ...contentByStatusProps,
    }),
    [contentByStatusProps],
  );

  const { data, setData, dataError, onSubmitData, loaderSubmit } = useData<
    FileProps,
    any,
    FileProps
  >(defaultValue, {
    onChangeDataAfter: onChange,
    onSubmitData: onUploadFile,
  });

  return (
    <>
      <div
        className={`fenext-input-file-status fenext-input-file-status-${data?.status ?? "NONE"} ${className}`}
      >
        {!dataError &&
        !loaderSubmit &&
        data?.fileData &&
        data?.fileData != "" ? (
          <>
            <div className={`fenext-input-file-status-up `}>
              <Title className={`fenext-input-file-status-title `}>
                {_t(contentByStatus?.[data?.status ?? "NONE"]?.title ?? title)}
              </Title>
              <div className={`fenext-input-file-status-content-icon`}>
                {contentByStatus?.[data?.status ?? "NONE"]?.icon ?? icon}
              </div>
              <div className={`fenext-input-file-status-tag`}>
                <Text>
                  {_t(contentByStatus?.[data?.status ?? "NONE"]?.tag)}
                </Text>
              </div>
              <Link
                href={data?.url ?? data?.base64 ?? data?.fileData}
                target="_blank"
                className={`fenext-input-file-status-link `}
              >
                {data.text}
              </Link>
              {!props.disabled && (
                <div
                  className={`fenext-input-file-status-remove `}
                  onClick={() => {
                    setData({
                      fileData: "",
                      text: "",
                    });
                  }}
                >
                  <SvgClose />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <InputFile
              onChange={(e) => {
                onSubmitData({
                  data: e,
                  onSaveData: ({ result }) => {
                    return result;
                  },
                });
              }}
              parseProgress={() => ""}
              {...props}
              _t={_t}
            >
              <div className={`fenext-input-file-status-up `}>
                <Title className={`fenext-input-file-status-title `}>
                  {_t(title)}
                </Title>
                <div className={`fenext-input-file-status-content-icon`}>
                  {loaderSubmit ? iconLoader : icon}
                </div>
                <Button className={`fenext-input-file-status-btn `}>
                  {_t(btn)}
                </Button>
                <Text className={`fenext-input-file-status-text `}>
                  {_t(text)}
                </Text>
                {dataError && <ErrorComponent error={dataError} />}
              </div>
            </InputFile>
          </>
        )}
      </div>
    </>
  );
};

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
export interface InputRangeProps
  extends InputRangeBaseProps,
    InputRangeClassProps {}

export const InputRange = ({
  className = "",
  classNameContentValue = "",
  classNameValue = "",
  classNameValueMax = "",
  classNameValueMin = "",
  classNameContentRange = "",
  classNameCurrent = "",
  classNameMax = "",
  classNameMin = "",
  classNameContentCircle = "",
  classNameCircle = "",
  classNameLine = "",

  min = -100,
  max = 100,
  defaultValue = 0,
  defaultValueMin = -100,
  defaultValueMax = 100,
  value = undefined,
  valueMin = undefined,
  valueMax = undefined,
  onChange,
  onChangeRange,
  useRange = false,
  step = 1,
  showNumber = "top",
}: InputRangeProps) => {
  const onParceData = (d: InputRangeConfigProps): InputRangeConfigProps => {
    const _max = valueMax ?? d.max;
    const _min = valueMin ?? d.min;
    const _value = value ?? d.value;
    return {
      ...d,
      center: (_max - _min) / 2 + _min,
      value: _value,
      min: Math.min(_min, _max - step),
      max: Math.max(_min + step, _max),
    };
  };

  const { dataMemo: _data, onChangeData } = useData<
    InputRangeConfigProps,
    InputRangeConfigProps
  >(
    {
      min: defaultValueMin,
      max: defaultValueMax,
      value: defaultValue,
      center: (defaultValueMax - defaultValueMin) / 2 + defaultValueMin,
    },
    {
      onChangeDataMemoAfter: (d: InputRangeConfigProps) => {
        onChange?.(d.value);
        onChangeRange?.([d.min, d.max]);
      },
      onMemo: onParceData,
    },
  );
  const data = useMemo(
    () => onParceData(_data),
    [_data, value, valueMax, valueMin, step],
  );
  const onChangeItem =
    (id: keyof InputRangeConfigProps) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeData(id)(parseFloat(event.target.value));
    };
  return (
    <>
      <div
        className={`fenext-input-range ${className} ${useRange ? "range" : ""} 
                fenext-input-range-show-number-${showNumber}
                `}
        style={
          {
            ["--line"]: max - min,
            ["--min"]: min,
            ["--max"]: max,
            ["--minValue"]: data.min,
            ["--maxValue"]: data.max,
            ["--value"]: data.value,
            ["--center"]: data.center,
            ["--step"]: step,
            ["--minP"]: `${((data.min - min) / (max - min)) * 100}%`,
            ["--maxP"]: `${((max - data.max) / (max - min)) * 100}%`,
            ["--valueP"]: `${((data.value - min) / (max - min)) * 100}%`,
            ["--centerP"]: `${((data.center - min) / (max - min)) * 100}%`,
          } as React.CSSProperties
        }
      >
        <div
          className={`fenext-input-range-content-value ${classNameContentValue}    `}
        >
          <div
            className={`fenext-input-range-value fenext-input-range-value-min ${classNameValueMin}    `}
          >
            {data.min}
          </div>
          <div
            className={`fenext-input-range-value-arrow fenext-input-range-value-min ${classNameValueMin}    `}
          ></div>
          <div
            className={`fenext-input-range-value fenext-input-range-value-current ${classNameValue}    `}
          >
            {data.value}
          </div>
          <div
            className={`fenext-input-range-value-arrow fenext-input-range-value-current ${classNameValue}    `}
          ></div>
          <div
            className={`fenext-input-range-value fenext-input-range-value-max ${classNameValueMax}    `}
          >
            {data.max}
          </div>
          <div
            className={`fenext-input-range-value-arrow fenext-input-range-value-max ${classNameValueMax}    `}
          ></div>
        </div>
        <div
          className={`fenext-input-range-content-circle ${classNameContentCircle}    `}
        >
          <div className={`fenext-input-range-line ${classNameLine}    `}></div>
          <div
            className={`fenext-input-range-circle fenext-input-range-circle-min ${classNameCircle}    `}
          ></div>
          <div
            className={`fenext-input-range-circle fenext-input-range-circle-current ${classNameCircle}    `}
          ></div>
          <div
            className={`fenext-input-range-circle fenext-input-range-circle-max ${classNameCircle}    `}
          ></div>
        </div>
        <div
          className={`fenext-input-range-content-range ${classNameContentRange}    `}
        >
          <input
            type="range"
            className={`fenext-input-range-item fenext-input-range-min ${classNameMin} `}
            min={min}
            max={max - step}
            value={data.min}
            onChange={onChangeItem("min")}
            step={step}
          />
          <input
            type="range"
            className={`fenext-input-range-item fenext-input-range-current ${classNameCurrent} `}
            min={min}
            max={max}
            value={data.value}
            onChange={onChangeItem("value")}
            step={step}
          />
          <input
            type="range"
            className={`fenext-input-range-item fenext-input-range-max ${classNameMax} `}
            min={min + step}
            max={max}
            value={data.max}
            onChange={onChangeItem("max")}
            step={step}
          />
        </div>
      </div>
    </>
  );
};

/**
 * Properties for the base InputGoogleLoadScript component.
 */
export interface InputGoogleLoadScriptBaseProps
  extends Omit<LoadScriptProps, "googleMapsApiKey" | "id">,
    _TProps {
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
export interface InputGoogleLoadScriptProps
  extends InputGoogleLoadScriptBaseProps,
    InputGoogleLoadScriptClassProps {}

export const InputGoogleLoadScript = ({
  googleMapsApiKey = process.env["NEXT_PUBLIC_GOOGLE_KEY"],
  children,
  className = "",
  _t,
  useT,
  ...props
}: InputGoogleLoadScriptProps) => {
  const [error, setError] = useState<ErrorFenextjs | undefined>(undefined);

  return (
    <div className={`fenext-input-google-load-script ${className}`}>
      <LoadScript
        {...props}
        googleMapsApiKey={googleMapsApiKey ?? ""}
        libraries={["places", "geometry", "marker"]}
        onError={() => {
          setError(new ErrorGoogleKeyInvalid());
        }}
      >
        {children}
      </LoadScript>
      {error && <ErrorComponent error={error} _t={_t} useT={useT} />}
    </div>
  );
};

/**
 * Properties for the base InputGoogleMaps component.
 */
export interface InputGoogleMapsBaseProps
  extends Omit<GoogleMapProps, "onBoundsChanged"> {
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
export interface InputGoogleMapsClassProps {}

/**
 * Properties for the InputGoogleMaps component.
 */
export interface InputGoogleMapsProps
  extends InputGoogleMapsBaseProps,
    InputGoogleMapsClassProps {}

export const InputGoogleMaps = ({
  mapContainerStyle = {
    width: "100%",
    height: "100dvh",
  },
  markers = undefined,
  useLoadCenterWithMarker = true,
  useLoadFitBoundsWithMarker = true,
  useLoadDirectionsWithMarker = false,
  showDirectionsWaypoints = false,
  center = {
    lat: 0,
    lng: 0,
  },
  ...props
}: InputGoogleMapsProps) => {
  // const google = eval("google")
  const [directionsResult, setDirectionsResult] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);
  const [map, setMap] = useState<google.maps.Map | undefined>(undefined);
  const [centerMarker, setCenterMarker] =
    useState<GoogleMapProps["center"]>(undefined);

  const onGetBounds = () => {
    const f_LatLngBounds = (google ?? {})?.maps?.LatLngBounds;
    if (!f_LatLngBounds) {
      return undefined;
    }
    const bounds = new f_LatLngBounds();
    markers?.forEach((e) => {
      bounds.extend(e.position);
    });
    return bounds;
  };
  const onLoadCenterMarker = () => {
    if (!(useLoadCenterWithMarker && markers && markers?.length > 0)) {
      return;
    }
    const bounds = onGetBounds();
    setCenterMarker(bounds?.getCenter?.());
  };

  const onLoadFitBounds = () => {
    if (!(useLoadFitBoundsWithMarker && markers && markers?.length > 0)) {
      return;
    }
    const bounds = onGetBounds();
    if (bounds) {
      map?.fitBounds?.(bounds);
    }
  };

  const onLoadDirectionsList = async () => {
    if (!(useLoadDirectionsWithMarker && markers && markers?.length > 0)) {
      return;
    }

    const f_DirectionsService = window?.google?.maps?.DirectionsService;

    if (!f_DirectionsService) {
      return undefined;
    }
    const directionsService = new f_DirectionsService();

    const origin = markers[0];
    const destination = markers[markers.length - 1];
    const resultDirections = await directionsService.route({
      origin: origin.position,
      destination: destination.position,
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: [...markers].splice(1, markers.length - 2).map((e) => {
        return {
          location: e.position,
        };
      }),
    });
    setDirectionsResult(resultDirections);
  };

  const onLoadMap = () => {
    if (typeof window == "undefined") {
      setTimeout(onLoadMap, 250);
      return;
    }
    onLoadCenterMarker();
    onLoadFitBounds();
    onLoadDirectionsList();
  };

  useEffect(onLoadMap, [map]);

  return (
    <div className={`fenext-input-google-maps `}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={centerMarker ?? center}
        {...props}
        onLoad={(e) => {
          setMap(e);
          props?.onLoad?.(e);
        }}
        onBoundsChanged={() => {
          props?.onBoundsChanged?.(map?.getBounds?.());
        }}
      >
        {markers && !showDirectionsWaypoints && (
          <>
            <MarkerClusterer>
              {() => (
                <>
                  {markers.map((e, i) => (
                    <Marker key={i} {...e} />
                  ))}
                </>
              )}
            </MarkerClusterer>
          </>
        )}

        {directionsResult && (
          <DirectionsRenderer
            directions={directionsResult}
            options={{
              markerOptions: {
                opacity: showDirectionsWaypoints ? 1 : 0,
              },
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

/**
 * Properties for the base InputGoogleAutocomplete component.
 */
export interface InputGoogleAutocompleteBaseProps
  extends Omit<GoogleAutocompleteProps, "children">,
    Omit<
      InputTextBaseProps,
      "defaultValue" | "onChange" | "onChangeValidate" | "value" | "validator"
    > {
  /**
   * FenextjsValidatorClass used for input validation.
   */
  validator?: FenextjsValidatorClass<AddressGoogle | undefined>;
  /**
   * Default Value =
   */
  defaultValue?: AddressGoogle;
  /**
   * Value
   */
  value?: AddressGoogle;
  /**
   * onChange
   */
  onChange?: (data?: AddressGoogle) => void;
}

/**
 * Properties for the class of the InputGoogleAutocomplete component.
 */
export interface InputGoogleAutocompleteClassProps
  extends InputTextClassProps {}

/**
 * Properties for the InputGoogleAutocomplete component.
 */
export interface InputGoogleAutocompleteProps
  extends InputGoogleAutocompleteBaseProps,
    InputGoogleAutocompleteClassProps {}

export const InputGoogleAutocomplete = ({
  defaultValue = undefined,
  value = undefined,
  onChange,

  className = "",
  validator,
  ...props
}: InputGoogleAutocompleteProps) => {
  const [valueText, setValueText] = useState(
    value?.formatted_address ?? defaultValue?.formatted_address ?? "",
  );

  const [error, setError] = useState<ErrorFenextjs | undefined>(undefined);

  const { setData, isValidData } = useData<AddressGoogle | undefined>(
    defaultValue,
    {
      onChangeDataAfter: (d) => {
        onChange?.(d);
        if (d) {
          setValueText(d?.formatted_address ?? "");
        }
      },
      validator,
    },
  );

  const [autocompleteValue, setAutocompleteValue] = useState<
    AutocompleteGoogle | undefined
  >(undefined);

  const onPlaceChanged = () => {
    if (autocompleteValue) {
      const place = autocompleteValue?.getPlace?.();
      if (place == undefined) {
        setError(new ErrorGoogleKeyInvalid());
        return;
      }
      setData({
        ...place,
        lat: place?.geometry?.location?.lat?.(),
        lng: place?.geometry?.location?.lng?.(),
      });
    } else {
      setData(undefined);
    }
  };

  return (
    <div className={`fenext-input-google-autocomplete ${className}`}>
      <div className={`fenext-input-google-autocomplete-content`}>
        <div className={`fenext-input-google-autocomplete-content-input`}>
          <GoogleAutocomplete
            {...props}
            onLoad={setAutocompleteValue}
            onPlaceChanged={onPlaceChanged}
          >
            <InputText
              {...props}
              validator={undefined}
              value={valueText}
              onChange={(e) => {
                setValueText(e);
                setData(undefined);
              }}
              error={
                error ??
                (isValidData instanceof ErrorFenextjs ? isValidData : undefined)
              }
            />
          </GoogleAutocomplete>
        </div>
        <span className={`fenext-input-google-autocomplete-close`}>
          <SvgClose />
        </span>
      </div>
    </div>
  );
};

export interface InputSelectTProps<T>
  extends Omit<
    InputSelectProps<T>,
    "defaultValue" | "value" | "options" | "onChange" | "onChangeData"
  > {
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

export const InputSelectT = <T,>({
  defaultValue,
  value,
  options,
  onChange,
  onParse,
  ...props
}: InputSelectTProps<T>) => {
  return (
    <>
      <InputSelect
        {...props}
        defaultValue={defaultValue ? onParse(defaultValue) : undefined}
        value={value ? onParse(value) : undefined}
        options={options.map(onParse)}
        onChangeData={onChange}
      />
    </>
  );
};

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
export interface InputSelectMultipleBaseProps<T = any>
  extends Omit<
    InputSelectBaseProps<T>,
    | "defaultValue"
    | "value"
    | "onChange"
    | "onChangeData"
    | "onChangeValidate"
    | "validator"
    | "validatorData"
  > {
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
   * iconDelete custom of option.
   * @default <Trash />
   */
  iconDelete?: ReactNode;

  typeSelectMultipleStyle?: "normal" | "checkbox";

  CustomOptionsSelected?: typeof InputSelectOption<T>;
  /**
   * FenextjsValidatorClass used for input validation.
   */
  validator?: FenextjsValidatorClass<(typeof InputSelectOption<T>)[]>;
  /**
   * FenextjsValidatorClass used for input validation.
   */
  validatorData?: FenextjsValidatorClass<(T | undefined)[]>;
}
/**
 * Props interface for the InputSelectMultiple component. Extends both InputSelectMultipleBaseProps and InputSelectMultipleClassProps interfaces.
 */
export interface InputSelectMultipleProps<T = any>
  extends InputSelectMultipleBaseProps<T>,
    InputSelectMultipleClassProps {}

export const InputSelectMultiple = <T = any,>({
  classNameSelectMultiple = "",
  classNameSelectMultipleList = "",
  onChange,
  onChangeData,
  value = undefined,
  defaultValue = [],
  options = [],
  iconDelete = <SvgTrash />,
  typeSelectMultipleStyle = "normal",
  CustomOptionsSelected = undefined,
  validatorData,
  validator,
  useTOption,
  ...props
}: InputSelectMultipleProps<T>) => {
  const { data, setData, setDataFunction } = useData<
    InputSelectItemOptionBaseProps<T>[]
  >(defaultValue, {
    onChangeDataAfter: (e) => {
      onChange?.(e);
      onChangeData?.(e?.map((e) => e.data as T));
    },
  });

  const dataMemo = useMemo(() => value ?? data, [data, value]);

  const onAddItemSelect = useCallback(
    (newItem: InputSelectItemOptionBaseProps<T> | undefined) => {
      if (newItem) {
        setDataFunction(() => {
          const old = [...dataMemo];
          if (old.find((e) => e.id == newItem.id)) {
            return old.filter((e) => e.id != newItem.id);
          }
          return [...old, newItem];
        });
      }
    },
    [dataMemo],
  );

  const onRemoveItemSelect = (deleteItem: InputSelectItemOptionBaseProps) => {
    setData(dataMemo.filter((option) => option.id != deleteItem.id));
  };

  const OPTIONS = useMemo(() => {
    return options.map((option) => {
      const isSelect = dataMemo.find((e) => e.id == option.id) != undefined;
      return {
        ...option,
        hidden: isSelect,
        selected: isSelect,
      };
    });
  }, [options, dataMemo]);

  const { error: errorFenextVD } = useValidator({
    data: dataMemo?.map((e) => e?.data),
    validator: validatorData,
  });
  const { error } = useValidator({
    data: dataMemo,
    validator: validator as any,
  });

  return (
    <>
      <div
        className={`
                    fenext-select-multiple
                    fenext-select-multiple-${typeSelectMultipleStyle}
                    ${classNameSelectMultiple}
                `}
      >
        <InputSelect<T>
          {...props}
          onChange={onAddItemSelect}
          options={OPTIONS}
          error={props?.error ?? errorFenextVD ?? error}
          isSelectClearText={true}
          showOptionIconImg={false}
          useTOption={useTOption}
          isChange={true}
          extraInLabel={
            <>
              <div
                className={`fenext-select-multiple-list ${classNameSelectMultipleList} `}
              >
                {dataMemo.map((option) => {
                  const OptionTag =
                    CustomOptionsSelected ?? InputSelectOption<T>;
                  return (
                    <OptionTag
                      {...option}
                      type={"multiple"}
                      onDelete={onRemoveItemSelect}
                      iconDelete={option?.iconDelete ?? iconDelete}
                      disabled={props?.disabled ?? option?.disabled}
                      useT={useTOption}
                      selected={true}
                    />
                  );
                })}
              </div>
            </>
          }
        />
      </div>
    </>
  );
};

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
   * A callback function to execute when the radio is toggled.
   * Receives a boolean value indicating whether the radio is checked or not.
   */
  onChangeData?: (e: T) => void;

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
export interface InputRadioProps<T>
  extends InputRadioBaseProps<T>,
    InputRadioClassProps {}

/**
 * Component that renders a radio input.
 * Takes an InputRadioProps object as props.
 */
export const InputRadio = <T = any,>({
  classNameContent = "",
  classNameLabel = "",
  classNameLabelActive = "",
  classNameLabelInactive = "",
  classNameText = "",

  classNameContentRadio = "",
  classNameContentRadioActive = "",
  classNameContentRadioInactive = "",

  classNameRadio = "",
  classNameRadioActive = "",
  classNameRadioInactive = "",

  labelPosition = "right",
  name = "",
  onChange = (e) => {
    env_log(e, {
      name: "input radio onchange",
    });
  },
  onChangeData,
  defaultValue = undefined,
  value = undefined,
  disabled = false,
  icon = <SvgCheck />,

  items = [],
  ...props
}: InputRadioProps<T>) => {
  const { _t } = use_T({ ...props });
  const [checked, setChecked] = useState(defaultValue);

  const onChecked = (i: InputRadioItemProps<T>) => () => {
    if (disabled) {
      return;
    }
    setChecked(i);
    onChange(i);
    onChangeData?.(i?.data as T);
  };

  return (
    <div className={`fenext-content-radio ${classNameContent}`}>
      {items.map((item, i) => {
        const isCheck = (value?.id ?? checked?.id) == item.id;
        return (
          <label
            key={i}
            className={`fenext-input-radio ${labelPosition} ${classNameLabel}  ${
              isCheck ? classNameLabelActive : classNameLabelInactive
            }`}
            onClick={onChecked(item)}
          >
            <input
              type="radio"
              name={name}
              defaultChecked={item?.id == defaultValue?.id}
              className={`fenext-input-radio-input fenext-input-radio-input-id-${item.id}`}
            />
            <span
              className={`fenext-input-radio-box ${classNameContentRadio} ${
                isCheck
                  ? classNameContentRadioActive
                  : classNameContentRadioInactive
              }`}
            >
              <span
                className={`
                                fenext-input-radio-box-icon
                                ${classNameRadio} ${
                                  isCheck
                                    ? classNameRadioActive
                                    : classNameRadioInactive
                                }`}
              >
                {isCheck && icon}
              </span>
            </span>
            <span className={`fenext-input-radio-text ${classNameText}`}>
              {_t(item.label)}
            </span>
          </label>
        );
      })}
    </div>
  );
};

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
export interface InputImgProps extends InputImgBaseProps, InputImgClassProps {}

export const InputImg = ({
  className = "",
  classNameContentIcon = "",
  classNameText = {},
  classNameTitle = {
    tag: "h2",
  },
  classNameUp = "",
  classNameProgress = "",
  classNameRemove = "",
  classNameImg = "",
  icon = (
    <>
      <SvgImg />
    </>
  ),
  text = "Drag Image",
  title = "Add Image",

  defaultValue = {
    fileData: "",
    text: "",
  },
  parseProgress = (e) => `Imging . . . ${e.toFixed(0)}%`,
  onChange,
  onRemove,

  ...props
}: InputImgProps) => {
  const { _t } = use_T({ ...props });
  const { data, setData } = useData<FileProps>(defaultValue, {
    onChangeDataAfter: onChange,
  });

  const [progress, setProgress] = useState(-1);
  const { data: error, setData: setError } = useData<ErrorProps | undefined>(
    undefined,
  );
  return (
    <>
      <div
        className={`fenext-input-img ${className} ${
          progress > 0 && progress < 100 ? "fenext-input-img-in-progress" : ""
        } ${
          data?.fileData && data?.fileData != "" ? "fenext-input-img-ok" : ""
        } ${error ? "fenext-input-img-error" : ""}`}
      >
        {data.fileData && data.fileData != "" ? (
          <>
            <div className={`fenext-input-img-up ${classNameUp}`}>
              <img
                src={data.fileData}
                className={`fenext-input-img-img ${classNameImg}`}
              />
              <div
                className={`fenext-input-img-remove ${classNameRemove}`}
                onClick={() => {
                  setData({
                    fileData: "",
                    text: "",
                  });
                  onRemove?.();
                }}
              >
                <SvgClose />
              </div>
            </div>
          </>
        ) : (
          <>
            <InputFile
              onChange={setData}
              parseProgress={() => ""}
              onChangeProgress={setProgress}
              onChangeError={setError}
              accept={["jpg", "jpeg", "png", "gif", "svg", "bmp", "webp"]}
              {...props}
              _t={_t}
            >
              <div className={`fenext-input-img-up ${classNameUp}`}>
                <div
                  className={`fenext-input-img-content-icon ${classNameContentIcon}`}
                >
                  {icon}
                </div>
                {progress > 0 && progress < 100 ? (
                  <Title
                    {...classNameTitle}
                    className={`fenext-input-img-progress ${classNameProgress}`}
                  >
                    {parseProgress(progress)}
                  </Title>
                ) : (
                  <Title
                    {...classNameTitle}
                    className={`fenext-input-img-title ${classNameTitle.className}`}
                  >
                    {_t(title)}
                  </Title>
                )}
                <Text
                  {...classNameText}
                  className={`fenext-input-img-text ${classNameText.className}`}
                >
                  {_t(text)}
                </Text>
              </div>
            </InputFile>
          </>
        )}
      </div>
    </>
  );
};

/**
 * Interface that defines CSS class properties for a text input component.
 */
export interface InputCodeClassProps extends InputTextClassProps {}
/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputCodeBaseProps
  extends Omit<InputTextBaseProps, "type" | "maxLength"> {
  /**
   * maxLength of Input.
   */
  maxLength: number;
}
/**
 * Props interface for the InputCode component. Extends both InputCodeBaseProps and InputCodeClassProps interfaces.
 */
export interface InputCodeProps
  extends InputCodeBaseProps,
    InputCodeClassProps {}

export const InputCode = ({ ...props }: InputCodeProps) => {
  const { data, setData } = useData(props?.defaultValue ?? "", {
    onChangeDataAfter: props?.onChange,
  });
  return (
    <>
      <InputText
        {...props}
        onChange={setData}
        className={`${props?.className} fenext-input-code`}
        onKeyDown={({ target }) => {
          const end = target.value.length;

          target.setSelectionRange(end, end);
          target.focus();
        }}
        extraInContentInput={
          <>
            <div className="fenext-input-code-content-items">
              {new Array(props?.maxLength ?? 1)?.fill(1).map((e, i) => {
                return (
                  <>
                    <div
                      key={i * e}
                      className={`fenext-input-code-item fenext-input-code-item-${
                        data.length == i ? "current" : ""
                      }`}
                    >
                      {!data || data == "" ? props?.placeholder?.[i] ?? "" : ""}
                      {data?.[i] ?? ""}
                    </div>
                  </>
                );
              })}
            </div>
          </>
        }
      />
    </>
  );
};

export interface TextSelectProps {
  text?: string;
  select?: InputSelectItemOptionBaseProps;
}

/**
 * Interface that defines CSS class properties for a checkbox input component.
 */
export interface InputTextSelectClassProps
  extends InputTextClassProps,
    InputSelectClassProps {}

/**
 * Interface that defines base properties for a checkbox input component.
 */
export interface InputTextSelectBaseProps
  extends Omit<
      InputTextBaseProps,
      | "type"
      | "value"
      | "onChange"
      | "defaultValue"
      | "datalist"
      | "onChangeValidate"
      | "label"
      | "placeholder"
      | "icon"
    >,
    Omit<
      InputSelectBaseProps,
      | "value"
      | "onChange"
      | "defaultValue"
      | "onChangeValidate"
      | "label"
      | "placeholder"
      | "icon"
    > {
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
export interface InputTextSelectProps
  extends InputTextSelectBaseProps,
    InputTextSelectClassProps {}

/**
 * Component that renders a checkbox input.
 * Takes an InputTextSelectProps object as props.
 */
export const InputTextSelect = ({
  label,
  placeholderSelect,
  placeholderText,
  defaultValue = {},
  value: valueProps = undefined,
  onChange,
  validator = undefined,
  posSelect = "left",
  errorWithIsChange = false,
  error,
  classNameError = "",
  ...props
}: InputTextSelectProps) => {
  const { _t } = use_T({ ...props });
  const { data, onChangeData, isChange } = useData<
    Partial<TextSelectProps>,
    Partial<TextSelectProps>
  >(defaultValue, {
    onChangeDataAfter: onChange,
  });
  const value = useMemo(() => valueProps ?? data, [valueProps, data]);

  const { error: errorFenext } = useValidator({
    data: data,
    validator: validator ?? FenextjsValidator(),
  });

  const errorInput = useMemo<ErrorFenextjs | undefined>(() => {
    if (errorWithIsChange && !isChange) {
      return undefined;
    }
    return error ?? errorFenext;
  }, [error, errorFenext, errorWithIsChange, isChange]);

  return (
    <>
      <div
        className={`fenext-input-text-select fenext-input-text-select-${posSelect}`}
      >
        <div className={`fenext-input-text-select-label fenext-input-label  `}>
          {_t(label)}
        </div>
        <div className={`fenext-input-text-select-select `}>
          <InputSelect
            {...props}
            placeholder={placeholderSelect}
            onChange={onChangeData("select")}
            validator={undefined}
            value={value.select}
            _t={_t}
            parseText={(e) => e}
          />
        </div>
        <div className={`fenext-input-text-select-text `}>
          <InputText
            {...props}
            placeholder={placeholderText}
            onChange={onChangeData("text")}
            validator={undefined}
            value={value.text}
            _t={_t}
          />
        </div>
        {errorInput && (
          <ErrorComponent
            error={errorInput}
            className={`fenext-input-error ${classNameError}`}
            _t={_t}
          />
        )}
      </div>
    </>
  );
};

/**
 * Interface for the base props of an input password component.
 */
export interface InputPasswordBaseProps
  extends Omit<InputTextBaseProps, "type" | "icon"> {
  iconEye?: React.ReactNode;
  iconEyeBar?: React.ReactNode;
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
export interface InputPasswordProps
  extends InputPasswordBaseProps,
    InputPasswordClassProps {}

export const InputPassword = ({
  classNameContentEye = "",
  iconEye,
  iconEyeBar,
  ...props
}: InputPasswordProps) => {
  const [type, setType] = useState<"text" | "password">("password");
  const toggleTypePassword = () => {
    setType(type == "password" ? "text" : "password");
  };
  const ICON = useMemo(() => {
    return (
      <span
        onClick={toggleTypePassword}
        className={`fenext-input-password-icon ${classNameContentEye}`}
      >
        {type == "password"
          ? iconEye ?? <SvgEye />
          : iconEyeBar ?? <SvgEyeBar />}
      </span>
    );
  }, [type]);
  return (
    <>
      <InputText {...props} icon={ICON} type={type} />
    </>
  );
};

export interface InputSelectMultipleTProps<T>
  extends Omit<
    InputSelectMultipleProps<T>,
    | "defaultValue"
    | "value"
    | "options"
    | "onChange"
    | "validator"
    | "validatorData"
  > {
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
  /**
   * FenextjsValidatorClass used for input validation.
   */
  validator?: InputSelectMultipleProps<T>["validatorData"];
}

export const InputSelectMultipleT = <T,>({
  defaultValue,
  value,
  options,
  onChange,
  onParse,
  validator,
  ...props
}: InputSelectMultipleTProps<T>) => {
  return (
    <>
      <InputSelectMultiple<T>
        {...props}
        defaultValue={defaultValue ? defaultValue.map(onParse) : undefined}
        value={value ? value.map(onParse) : undefined}
        options={options.map(onParse)}
        onChangeData={onChange}
        validatorData={validator}
      />
    </>
  );
};

/**
 * Interface that defines CSS class properties for a SelectCountry input component.
 */
export interface InputSelectCountryClassProps extends InputSelectClassProps {}

/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectCountryBaseProps
  extends Omit<
    InputSelectTProps<CountryProps>,
    "options" | "onParse" | "useLoader" | "loader"
  > {}
/**
 * Props interface for the InputSelectCountry component. Extends both InputSelectCountryBaseProps and InputSelectCountryClassProps interfaces.
 */
export interface InputSelectCountryProps
  extends InputSelectCountryBaseProps,
    InputSelectCountryClassProps {}

export const InputSelectCountry = ({ ...props }: InputSelectCountryProps) => {
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState<CountryProps[]>([]);
  const onLoad = async () => {
    const countrys: CountryProps[] = await getDataCountrys();
    setOptions(countrys);
    setLoader(false);
  };
  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      <InputSelectT<CountryProps>
        {...props}
        useTOption={true}
        options={options}
        onParse={(e) => {
          const r: InputSelectItemOptionBaseProps<CountryProps> = {
            id: e?.id ?? "",
            text: e?.text ?? "",
            img: e ? `${getRuteCountryImg(e)}` : undefined,
            data: e,
          };
          return r;
        }}
        loader={loader}
        useLoader={true}
        maxLengthShowOptions={50}
      />
    </>
  );
};

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

  capture?: React.InputHTMLAttributes<HTMLInputElement>["capture"];
}

/**
 * Properties for the input file component, combining the base properties and styling properties
 */
export interface InputFileProps
  extends InputFileBaseProps,
    InputFileClassProps,
    PropsWithChildren {}

export const InputFile = ({
  defaultValue = {
    fileData: "",
    text: "",
  },
  className = "",
  classNameLabel = "",
  classNameContent = "",
  classNameInput = "",
  classNameError = "",
  onChange = (v: FileProps) => {
    env_log(v, {
      name: "onChange File",
    });
  },
  accept = [],
  children,
  clearAfterUpload = false,
  MAX_SIZE_FILE = 5000000,
  parseProgress = (e) => e,
  onChangeProgress,
  onChangeError,
  disabled = false,
  textMaxSizeFile = "File max size",
  capture,
  ...props
}: InputFileProps) => {
  const { _t } = use_T({ ...props });
  const onUploadFile = async (
    data: InputFileUploadDataProps,
  ): Promise<FileProps> => {
    if (props?.onUploadFile) {
      const r = await props?.onUploadFile(data);
      if (r) {
        return r;
      }
    }
    const fileData = await parseFile(data.file, {
      updateProgress: data.setProgress,
    });
    return {
      file: data?.file,
      fileData,
      base64: `${fileData ?? ""}`,
      text: data.nameFile,
      extend: data.extend,
    };
  };
  const { data: error, setData: setError } = useData<ErrorProps | undefined>(
    undefined,
    {
      onChangeDataAfter: onChangeError,
    },
  );
  const ref = useRef<any>(null);

  const { setData } = useData<FileProps>(defaultValue, {
    onChangeDataAfter: onChange,
  });

  const { data: progress, setData: setProgress } = useData<number>(-1, {
    onChangeDataAfter: onChangeProgress,
  });

  const validateAccept = (nameFile: string) => {
    const extend = nameFile.split(".").pop()?.toLowerCase();
    if (
      accept.length != 0 &&
      extend &&
      !accept.map((e) => e.toLowerCase()).includes(extend)
    ) {
      throw "File Invalid";
    }
    return extend;
  };
  const uploadFile = async (e: any) => {
    try {
      setError(undefined);
      const file = e.target.files[0] as File;
      if (!file) {
        setProgress(-2);
        setData({
          fileData: "",
          text: "",
        });
        return;
      }

      if (file?.size > MAX_SIZE_FILE) {
        throw `${_t(textMaxSizeFile)} ${MAX_SIZE_FILE / 1000000}mb`;
      }

      const nameFile = e.target.value.split("\\").pop();

      env_log(nameFile, {
        name: "nameFile",
      });
      const extend = validateAccept(nameFile);

      const result = await onUploadFile({
        file,
        setFileData: setData,
        nameFile,
        setProgress,
        extend: extend ?? "",
      });
      setData(result);

      if (clearAfterUpload) {
        e.target.value = null;
        e.target.type = "text";

        setTimeout(() => {
          e.target.type = "file";
        }, 100);
        if (ref?.current) {
          ref.current.value = null;
        }
      }
    } catch (e) {
      setError({
        message: `${e}`,
        data: e,
      });
      setProgress(-2);
      setData({
        fileData: "",
        text: "",
      });
      env_log(e, {
        name: "error upload file",
        color: "red",
      });
    }
  };

  return (
    <>
      <div className={`fenext-input-file ${className}`}>
        <label className={`fenext-input-file-label ${classNameLabel}`}>
          <div className={`fenext-input-file-content ${classNameContent}`}>
            {children}
          </div>
          <input
            ref={ref}
            type="file"
            className={`fenext-input-file-input ${classNameInput}`}
            onChange={uploadFile}
            accept={accept.map((e: string) => `.${e}`).join(",")}
            disabled={disabled}
            capture={capture}
          />
        </label>
        {progress > 0 && progress < 100 && parseProgress(progress)}
        {error && (
          <div className={`fenext-error ${classNameError}`}>
            {_t(error.message)}
          </div>
        )}
      </div>
    </>
  );
};

/**
 * Props for the InputDateValueType
 */
export type InputDateRangeValueType =
  | [InputDateValueType, InputDateValueType]
  | undefined;
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
export interface InputDateRangeElementBaseProps
  extends Omit<InputDateBaseProps, "value" | "onChange" | "defaultValue"> {}

/**
 * Props for the base InputDateRange component
 */
export interface InputDateRangeBaseProps
  extends InputDateRangeElementBaseProps {
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
export interface InputDateRangeProps
  extends InputDateRangeBaseProps,
    InputDateRangeClassProps {}

export const InputDateRange = ({
  classNameInputDateRange = "",
  classNameInputDateRangeContentInputDate = "",
  classNameLabel = "",

  label,
  min,
  max,

  defaultValue = undefined,
  value = undefined,
  onChange,
  optional = false,
  optionalText = "(optional)",
  required = false,
  requiredText = "*",

  propsStart = {},
  propsEnd = {},

  ...props
}: InputDateRangeProps) => {
  const { _t } = use_T({ ...props });
  const { dataMemo: data, onChangeData } = useData<
    InputDateRangeDataProps,
    InputDateRangeDataProps
  >(
    {
      valueMin: value?.[0] ?? defaultValue?.[0],
      valueMax: value?.[1] ?? defaultValue?.[1],
    },
    {
      onMemo: (d) => {
        return {
          valueMin: value?.[0] ?? d.valueMin,
          valueMax: value?.[1] ?? d.valueMax,
        };
      },
      onChangeDataAfter: (d) => {
        if (d) {
          onChange?.([d?.valueMin, d?.valueMax]);
        }
      },
    },
  );
  return (
    <>
      <div className={`fenext-input-date-range ${classNameInputDateRange}`}>
        <div className={`fenext-input-label ${classNameLabel}`}>
          {_t(label)}
          {optional && (
            <>
              <small className="fenext-input-optional">
                {_t(optionalText)}
              </small>
            </>
          )}
          {required && (
            <>
              <small className="fenext-input-required">
                {_t(requiredText)}
              </small>
            </>
          )}
        </div>
        <div
          className={`fenext-input-date-range-content-input-date ${classNameInputDateRangeContentInputDate}`}
        >
          <InputDate
            {...props}
            {...propsStart}
            _t={_t}
            min={min}
            max={data?.valueMax ?? max}
            onChange={onChangeData("valueMin")}
            value={data.valueMin}
          />
        </div>
        <div
          className={`fenext-input-date-range-content-input-date ${classNameInputDateRangeContentInputDate}`}
        >
          <InputDate
            {...props}
            {...propsEnd}
            _t={_t}
            max={max}
            min={data?.valueMin ?? min}
            onChange={onChangeData("valueMax")}
            value={data.valueMax}
          />
        </div>
      </div>
    </>
  );
};

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
export interface InputCheckboxProps<VT = any, VF = any>
  extends InputCheckboxBaseProps<VT, VF>,
    InputCheckboxClassProps {}

/**
 * Component that renders a checkbox input.
 * Takes an InputCheckboxProps object as props.
 */
export const InputCheckbox = <VT = any, VF = any>({
  classNameLabel = "",
  classNameLabelActive = "",
  classNameLabelInactive = "",
  classNameText = "",

  classNameContentCheckbox = "",
  classNameContentCheckboxActive = "",
  classNameContentCheckboxInactive = "",

  classNameCheckbox = "",
  classNameCheckboxActive = "",
  classNameCheckboxInactive = "",

  label = "",
  labelPosition = "right",
  name = "",
  onChange = (e) => {
    env_log(e, {
      name: "input checkbox onchange",
    });
  },
  defaultValue = false,
  value = undefined,
  disabled = false,
  icon = <SvgCheck />,
  onValidateCheck = async () => {},
  optional = false,
  optionalText = "(optional)",
  required = false,
  requiredText = "*",

  onActive,
  onActiveValue,
  onInactive,
  onInactiveValue,
  valueActive,
  valueInactive,

  ...props
}: InputCheckboxProps<VT, VF>) => {
  const { _t } = use_T({ ...props });
  const [checked_, setChecked] = useState(defaultValue === true);
  const checked = useMemo(() => value ?? checked_, [value, checked_]);

  const onChecked = async () => {
    if (disabled) {
      return;
    }
    const v = !checked;
    if (v) {
      await onValidateCheck();
    }
    setChecked(v);
    onChange(v);
    if (v) {
      onActive?.();
      onActiveValue?.(valueActive);
    } else {
      onInactive?.();
      onInactiveValue?.(valueInactive);
    }
  };

  return (
    <label
      className={`fenext-input-checkbox ${labelPosition} ${classNameLabel}  ${
        checked ? classNameLabelActive : classNameLabelInactive
      }`}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChecked}
        className="fenext-input-checkbox-input"
      />
      <span
        className={`fenext-input-checkbox-box ${classNameContentCheckbox} ${
          checked
            ? classNameContentCheckboxActive
            : classNameContentCheckboxInactive
        }`}
      >
        <span
          className={`
                    fenext-input-checkbox-box-icon
                    ${classNameCheckbox} ${
                      checked
                        ? classNameCheckboxActive
                        : classNameCheckboxInactive
                    }`}
        >
          {checked && icon}
        </span>
      </span>
      <span className={`fenext-input-checkbox-text ${classNameText}`}>
        {_t(label)}
        {optional && (
          <>
            <small className="fenext-input-optional">{_t(optionalText)}</small>
          </>
        )}
        {required && (
          <>
            <small className="fenext-input-required">{_t(requiredText)}</small>
          </>
        )}
      </span>
    </label>
  );
};

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
export interface InputSwichProps
  extends InputSwichBaseProps,
    InputSwichClassProps {}

/**
 * Component that renders a swich input.
 * Takes an InputSwichProps object as props.
 */
export const InputSwich = ({
  className = "",
  classNameActive = "",
  classNameInactive = "",
  classNameCicle = "",

  name = "",
  onChange,
  defaultValue = false,
  value = undefined,
  disabled = false,
  onValidateCheck = async () => {},
}: InputSwichProps) => {
  const [checked_, setChecked] = useState(defaultValue === true);
  const checked = useMemo(() => value ?? checked_, [value, checked_]);

  const onChecked = async () => {
    try {
      if (disabled) {
        return;
      }
      const r = await onValidateCheck(checked);
      if (r === false) {
        throw new Error("1");
      }
      setChecked(!checked);
      onChange?.(!checked);
    } catch {
      return;
    }
  };

  return (
    <label
      className={`fenext-input-swich ${className}  ${
        checked ? classNameActive : classNameInactive
      }`}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChecked}
        className="fenext-input-swich-input"
      />
      <span className={`fenext-input-swich-circle ${classNameCicle}`}></span>
    </label>
  );
};

/**
 * Properties for the base InputSearch component.
 */

export interface InputSearchTabFilterProps
  extends Omit<
    InputSelectOptionProps,
    | "type"
    | "disabled"
    | "selected"
    | "onClick"
    | "onDelete"
    | "_t"
    | "isBtn"
    | "data"
    | "iconDelete"
  > {}

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
  onSearch?: (
    v: string,
    tabFilter?: InputSearchTabFilterProps[],
  ) => Promise<InputSearchResultProps[]>;
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
export interface InputSearchProps
  extends InputSearchBaseProps,
    InputSearchClassProps {}

export const InputSearch = ({
  classNameSearch = "",
  classNameSearchBg = "",
  classNameSearchContentResult = "",
  classNameSearchResult = "",

  placeholder = "Search",
  icon = <SvgSearch />,
  iconClear = <SvgClose />,
  loader = false,

  onSearch,
  onChange,
  onClickSearch,
  onEnterSearch,
  onClearSearch: onClearSearchProps,
  useLoseFocusInEnter = true,
  defaultValue = undefined,
  value = undefined,
  useResult = false,
  useLoadMore = true,
  ButtonLoadMoreProps = {
    children: "Load More",
  },
  onLoadMore: onLoadMore_,
  useSearchFixed = false,
  useTabFilter = false,
  resultList = undefined,

  resultEmpty = (
    <>
      <Title tag="h4">Not Results</Title>
    </>
  ),
  resultPreSearch = (
    <>
      <Title tag="h4">Search</Title>
    </>
  ),

  listTabFilter = [],
  defaultTabFilterSelected = [],
  onChangeTabFilterSelected,
  selectMultipleTabFilter = false,
  iconPos = "left",

  ...props
}: InputSearchProps) => {
  const { _t } = use_T({ ...props });
  const SEARCH = useRef<HTMLInputElement>(null);
  const BG = useRef<HTMLInputElement>(null);
  const {
    data: listTabFilterSelected,
    onDeleteData: onDeleteTabFilter,
    onConcatData: onAddTabFilter,
    setData: setTabFilter,
  } = useData<InputSearchTabFilterProps[]>(defaultTabFilterSelected, {
    onChangeDataAfter: (d) => {
      onChangeTabFilterSelected?.(d);
    },
  });
  const [searchText, setSearchText] = useState<string | undefined>(
    defaultValue ?? "",
  );
  const [loaderSearch, setLoaderSearch] = useState(false);
  const { dataMemo: resultSearch, setData: setResultSearch } = useData<
    InputSearchResultProps[],
    InputSearchResultProps[]
  >(resultList ?? [], {
    data: resultList,
    onMemo: (d) => {
      return resultList ?? d ?? [];
    },
  });

  const onSearchFetch = async (
    v: string,
    l: InputSearchTabFilterProps[] | undefined = undefined,
  ) => {
    if (onSearch) {
      const r = await onSearch(v, l ?? listTabFilterSelected);
      setResultSearch(r);
    }
  };

  const onSearch_ = async (
    v: string,
    l: InputSearchTabFilterProps[] | undefined = undefined,
  ) => {
    onChange?.(v);
    setSearchText(v);
    if (onSearch) {
      setLoaderSearch(true);
      try {
        await onSearchFetch(v, l);
      } finally {
        setLoaderSearch(false);
      }
    }
  };

  const onSearchTabFilter = async (
    l: InputSearchTabFilterProps[] | undefined = undefined,
  ) => {
    setResultSearch([]);
    await onSearch_("", l);
  };

  const onFocusClickSearch = () => {
    if (SEARCH) {
      const input = SEARCH.current?.querySelector(
        ".fenext-input-content-input",
      ) as HTMLElement;

      input?.click();
      input?.focus();
    }
  };

  const onClickTabFilter = (tab: InputSearchTabFilterProps) => () => {
    if (selectMultipleTabFilter) {
      onAddTabFilter([tab]);
      onSearchTabFilter([...listTabFilterSelected, tab]);
    } else {
      setTabFilter([tab]);
      onSearchTabFilter([tab]);
    }
    onFocusClickSearch();
  };

  const onClickDeleteTabFilter = (i: number) => () => {
    const n = [...listTabFilterSelected];
    onDeleteTabFilter(i);
    onSearchTabFilter(n.filter((e, j) => e && j != i));
    onFocusClickSearch();
  };

  const onClearSearch = () => {
    setTabFilter([]);
    setSearchText("");
    onSearchTabFilter([]);
    onFocusClickSearch();
    onClearSearchProps?.();
  };
  const onLoadMore = () => {
    onLoadMore_?.();
    onFocusClickSearch();
  };

  return (
    <>
      <div
        ref={SEARCH}
        className={`fenext-input-search ${classNameSearch} ${
          useResult
            ? "fenext-input-search-use-result"
            : "fenext-input-search-not-use-result"
        } 
                    ${
                      selectMultipleTabFilter
                        ? "fenext-input-search-multiple-tabs"
                        : "fenext-input-search-single-tabs"
                    }
                
                    ${useSearchFixed ? "fenext-input-search-fixed-focus" : ""}
                `}
      >
        <input
          type="checkbox"
          ref={BG}
          className="fenext-input-search-checkbox"
        />
        <div className={`fenext-input-search-bg ${classNameSearchBg} `} />
        <InputText
          {...props}
          _t={_t}
          placeholder={placeholder}
          iconPos={iconPos}
          icon={icon}
          onChange={onSearch_}
          loader={loaderSearch || loader}
          value={value ?? searchText}
          onEnter={() => {
            onEnterSearch?.(searchText ?? "");
            if (useLoseFocusInEnter) {
              BG?.current?.click?.();
              BG?.current?.focus?.();
            }
            props?.onEnter?.();
          }}
          extraInContentInput={
            <>
              <div className="fenext-input-search-content-tabs fenext-input-search-content-tabs-selected">
                {listTabFilterSelected.map((item, i) => {
                  if (!item) {
                    return <></>;
                  }
                  return (
                    <InputSelectOption
                      key={`${i}_item_selected_${item.id}`}
                      onDelete={onClickDeleteTabFilter(i)}
                      onClick={onFocusClickSearch}
                      type="multiple"
                      iconDelete={<SvgClose />}
                      {...item}
                      _t={_t}
                    />
                  );
                })}
              </div>
              <div
                className="fenext-input-search-clear"
                onClick={onClearSearch}
              >
                {iconClear}
              </div>
            </>
          }
        />
        {useResult && (
          <>
            <div
              className={`fenext-input-search-content-result ${classNameSearchContentResult} `}
            >
              {useTabFilter ? (
                <div className="fenext-input-search-content-tabs">
                  {listTabFilter.map((item, i) => {
                    const existTab =
                      listTabFilterSelected.find(
                        (e) => e && e?.id == item?.id,
                      ) != undefined;
                    if (existTab) {
                      return <></>;
                    }
                    return (
                      <InputSelectOption
                        key={`${i}_item_${item.id}`}
                        onClick={onClickTabFilter(item)}
                        {...item}
                        _t={_t}
                      />
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
              {resultSearch.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`fenext-input-search-result ${classNameSearchResult} `}
                    onClick={() => {
                      onClickSearch?.(item);
                      setSearchText(item.text);
                    }}
                  >
                    {_t(item?.content ?? item?.text)}
                  </div>
                );
              })}
              {resultSearch.length == 0 ? (
                <>
                  {searchText === undefined || loader || loaderSearch ? (
                    <>
                      <div
                        className={`fenext-input-search-content-result-pre-search `}
                      >
                        {_t(resultPreSearch)}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`fenext-input-search-content-result-empty `}
                      >
                        {_t(resultEmpty)}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {useLoadMore ? (
                    <>
                      <div className="fenext-input-search-content-load-more ">
                        <Button
                          {...ButtonLoadMoreProps}
                          onClick={onLoadMore}
                          _t={_t}
                          className={`fenext-input-search-load-more ${
                            ButtonLoadMoreProps?.className ?? ""
                          }`}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

/**
 * Interface that defines the base properties for a text input component.
 */
export interface InputSelectStateProps
  extends Omit<
    InputSelectTProps<StateProps>,
    "options" | "onParse" | "useLoader" | "loader"
  > {
  country?: CountryProps;
}

export const InputSelectState = ({
  country = undefined,
  ...props
}: InputSelectStateProps) => {
  const [loader, setLoader] = useState(true);
  const [options, setOptions] = useState<StateProps[]>([]);
  const onLoad = async () => {
    const getData = async () => {
      if (country) {
        return await getDataStatesByCountry(country);
      }
      return await getDataStates();
    };
    const r = await getData();
    setOptions(r);
    setLoader(false);
  };
  useEffect(() => {
    onLoad();
  }, [country]);

  return (
    <>
      <InputSelectT<StateProps>
        {...props}
        options={options}
        onParse={(e) => {
          const r: InputSelectItemOptionBaseProps<StateProps> = {
            id: e?.id ?? "",
            text: e?.text ?? "",
            data: e,
          };
          return r;
        }}
        loader={loader}
        useLoader={true}
        useTOption={false}
      />
    </>
  );
};

export interface InputUnitVolumenValue {
  value?: number | "";
  unit?: Unit_All;
}

/**
 * Interface that defines CSS class properties for a checkbox input component.
 */
export interface InputUnitVolumenClassProps extends InputUnitBaseClassProps {}

/**
 * Interface that defines base properties for a checkbox input component.
 */
export interface InputUnitVolumenBaseProps
  extends Omit<
    InputUnitBaseBaseProps,
    "value" | "onChange" | "defaultValue" | "options"
  > {
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
export interface InputUnitVolumenProps
  extends InputUnitVolumenBaseProps,
    InputUnitVolumenClassProps {}

/**
 * Component that renders a checkbox input.
 * Takes an InputUnitVolumenProps object as props.
 */
export const InputUnitVolumen = ({
  options = Object.keys(Unit_Volumen).map((e) => Unit_Volumen[e]),
  ...props
}: InputUnitVolumenProps) => {
  return (
    <>
      <InputUnitBase {...props} options={options} />
    </>
  );
};

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
export interface InputUnitBaseClassProps extends InputTextSelectClassProps {}

/**
 * Interface that defines base properties for a checkbox input component.
 */
export interface InputUnitBaseBaseProps
  extends Omit<
    InputTextSelectBaseProps,
    "value" | "onChange" | "defaultValue" | "options"
  > {
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
export interface InputUnitBaseProps
  extends InputUnitBaseBaseProps,
    InputUnitBaseClassProps {}

/**
 * Component that renders a checkbox input.
 * Takes an InputUnitBaseProps object as props.
 */
export const InputUnitBase = ({
  defaultValue = {},
  value: valueProps = undefined,
  onChange,
  options,
  ...props
}: InputUnitBaseProps) => {
  const { data, setData } = useData<Partial<InputUnitValueText>>(
    {
      unit: defaultValue?.unit,
      value: defaultValue?.value ? `${defaultValue?.value}` : undefined,
    },
    {
      onChangeDataAfter: (e) => {
        onChange?.({
          unit: e.unit,
          value: e.value ? parseNumber(e.value) : undefined,
        });
      },
    },
  );
  const value = useMemo(() => valueProps ?? data, [valueProps, data]);

  const parseValue = (va: string | number) => {
    const v = `${va}`.replace(/[^0-9.]/g, "");
    const nm = v.split(".");
    const first = `${nm[0]}`;
    let n_ = `${first}`;
    if (nm.length > 1) {
      nm[0] = "";
      n_ += `.${nm.join("")}`;
    }
    if (va[0] == "-") {
      n_ = "-" + n_;
    }
    return n_;
  };

  return (
    <>
      <InputTextSelect
        {...props}
        value={{
          text: value.value ? parseValue(`${value.value}`) : undefined,
          select: value.unit
            ? {
                id: value.unit,
                text: parseUnitToText(value.unit),
              }
            : undefined,
        }}
        options={options.map((o) => {
          return {
            id: o,
            text: parseUnitToText(o),
          };
        })}
        onChange={(e) => {
          setData({
            unit: e.select?.id as Unit_All,
            value: e.text,
          });
        }}
      />
    </>
  );
};

export interface InputUnitDistanceValue {
  value?: number | "";
  unit?: Unit_All;
}

/**
 * Interface that defines CSS class properties for a checkbox input component.
 */
export interface InputUnitDistanceClassProps extends InputUnitBaseClassProps {}

/**
 * Interface that defines base properties for a checkbox input component.
 */
export interface InputUnitDistanceBaseProps
  extends Omit<
    InputUnitBaseBaseProps,
    "value" | "onChange" | "defaultValue" | "options"
  > {
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
export interface InputUnitDistanceProps
  extends InputUnitDistanceBaseProps,
    InputUnitDistanceClassProps {}

/**
 * Component that renders a checkbox input.
 * Takes an InputUnitDistanceProps object as props.
 */
export const InputUnitDistance = ({
  options = Object.keys(Unit_Distance).map((e) => Unit_Distance[e]),
  ...props
}: InputUnitDistanceProps) => {
  return (
    <>
      <InputUnitBase {...props} options={options} />
    </>
  );
};

export interface InputUnitWeightValue {
  value?: number | "";
  unit?: Unit_All;
}

/**
 * Interface that defines CSS class properties for a checkbox input component.
 */
export interface InputUnitWeightClassProps extends InputUnitBaseClassProps {}

/**
 * Interface that defines base properties for a checkbox input component.
 */
export interface InputUnitWeightBaseProps
  extends Omit<
    InputUnitBaseBaseProps,
    "value" | "onChange" | "defaultValue" | "options"
  > {
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
export interface InputUnitWeightProps
  extends InputUnitWeightBaseProps,
    InputUnitWeightClassProps {}

/**
 * Component that renders a checkbox input.
 * Takes an InputUnitWeightProps object as props.
 */
export const InputUnitWeight = ({
  options = Object.keys(Unit_Weight).map((e) => Unit_Weight[e]),
  ...props
}: InputUnitWeightProps) => {
  return (
    <>
      <InputUnitBase {...props} options={options} />
    </>
  );
};

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

export const Counter = ({
  className = "",
  classNameNumber = "",
  classNameText = "",

  number = 0,
  text = undefined,
  time = 1000,
  decimal = 2,
  parseNumber = parseNumberCount,
  ...props
}: CounterProps) => {
  const { _t } = use_T({ ...props });
  const [numberShow, setNumberShow] = useState(0);
  const onIncrementeNumber = async () => {
    const dis = number - numberShow;
    const inc = dis / (time / 50);
    for (let i = 0; i < Math.abs(dis); i += Math.abs(inc)) {
      setNumberShow((pre) => pre + inc);
      await sleep(50);
    }
    setNumberShow(number);
  };
  useEffect(() => {
    onIncrementeNumber();
  }, [number]);

  const formatNumber = (n: number) => {
    if (n % 1 === 0) {
      return n;
    }
    return parseFloat(n.toFixed(decimal));
  };

  return (
    <>
      <div className={`fenext-counter ${className} `}>
        {text && (
          <div className={`fenext-counter-text ${classNameText} `}>
            {_t(text)}
          </div>
        )}
        <div className={`fenext-counter-number ${classNameNumber} `}>
          <span className={`fenext-counter-number-rel `}>
            {parseNumber(formatNumber(number))}
          </span>
          <span className={`fenext-counter-number-abs `}>
            {parseNumber(formatNumber(numberShow))}
          </span>
        </div>
      </div>
    </>
  );
};

// } from "./a";
/**
 * Properties for the base NotificationPop component.
 */
export interface NotificationPopBaseProps
  extends useNotificationProps,
    _TProps {
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
export interface NotificationPopProps
  extends NotificationPopBaseProps,
    NotificationPopClassProps {}

export const NotificationPop = ({
  classNamePop = "",
  className = "",
  typePop = "down",
  time = 4000,
  ...props
}: NotificationPopProps) => {
  const { notification, reset } = useNotification({ time });
  useEffect(() => {
    setTimeout(() => {
      reset();
    }, time);
  }, []);

  return (
    <>
      <div
        className={`
                        fenext-notification-pop
                        fenext-notification-pop-${typePop}
                        ${classNamePop}
                    `}
        style={
          {
            ["--time"]: `${time}ms`,
          } as CSSProperties
        }
      >
        {(notification ?? []).map((e, i) => {
          return (
            <>
              <Notification
                key={i}
                {...props}
                className={className}
                type={e?.type}
                children={e?.message}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

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
export interface NotificationProps
  extends NotificationBaseProps,
    NotificationClassProps {}

export const Notification = ({
  className = "",
  type = RequestResultTypeProps.NORMAL,
  children,
  ...props
}: NotificationProps) => {
  const { _t } = use_T({ ...props });
  const { reset } = useNotification({});
  return (
    <>
      <div
        className={`fenext-notification fenext-notification-${type.toUpperCase()} ${className} `}
      >
        {_t(children)}
        <div className="fenext-notification-close" onClick={reset}>
          <SvgClose />
        </div>
      </div>
    </>
  );
};

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
export interface CopyProps extends CopyBaseProps, CopyClassProps {}

export const Copy = ({
  className = "",

  children,
  text = "",
  onClickForCopy,
  notification = {
    message: "Copy",
    type: RequestResultTypeProps.OK,
  },
  ...props
}: CopyProps) => {
  const { _t } = use_T({ ...props });
  const { pop } = useNotification({});

  const onCopy = () => {
    navigator.clipboard.writeText(text);
    onClickForCopy?.(text);
    if (notification) {
      pop(notification);
    }
  };

  return (
    <>
      <div className={`fenext-copy ${className} `} onClick={onCopy}>
        {_t(children)}
      </div>
    </>
  );
};

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
export interface SliderProps extends SliderBaseProps, SliderClassProps {}

export const Slider = ({
  className = "",
  classNameContent = "",
  classNameItem = "",
  classNameDogs = "",
  classNameDog = "",
  classNameArrows = "",
  classNameArrowPre = "",
  classNameArrowNext = "",

  items = [],
  nItemsDesktop = 3,
  nItemsTable = 2,
  nItemsPhone = 1,
  timeDelay = 4000,
  timeAnimation = 500,
  loop = true,
  separationItems = 16,
  ...props
}: SliderProps) => {
  const { _t } = use_T({ ...props });
  const SliderRef = useRef<HTMLDivElement>(null);
  const [currentDog, setCurrentDog] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const getIsHover = () =>
    SliderRef.current?.classList.value.includes("fenext-slider-content-hover");

  const getNItems = () => {
    let nItems = nItemsDesktop;
    if (window.innerWidth <= 991) {
      nItems = nItemsTable;
    }
    if (window.innerWidth <= 575) {
      nItems = nItemsPhone;
    }
    return nItems;
  };

  const getSizeElement = () => {
    return (SliderRef.current?.clientWidth ?? 0) / getNItems();
  };

  const onSetCurrentDog = (f: (pre: number) => number) => (pre: number) => {
    const max = items.length - getNItems();
    const min = 0;
    const m = f(pre);

    let n = Math.max(min, Math.min(m, max));
    if (loop) {
      if (m > max) {
        n = 0;
      }
      if (m < 0) {
        n = max;
      }
    }
    SliderRef.current?.scrollTo?.(n * getSizeElement(), 0);
    return n;
  };

  const onScrollAdd = (add: number) => {
    setCurrentDog(onSetCurrentDog((pre) => pre + add));
  };
  const onScrollTo = (to: number) => {
    setCurrentDog(onSetCurrentDog(() => to));
  };

  const onScroll = (m: number) => () => {
    onScrollTo(m);
  };
  const onScrollToNext = () => {
    onScrollAdd(1);
  };
  const onScrollToPre = () => {
    onScrollAdd(-1);
  };
  const onLoop = async () => {
    if (loop) {
      await new Promise((r) => setTimeout(r, timeDelay));
      if (!getIsHover()) {
        onScrollToNext();
      }
      onLoop();
    }
  };
  const onLoadLoop = () => {
    onLoop();
  };
  const onLoadSlider = () => {
    if (SliderRef.current) {
      // onLoadTouchScroll(SliderRef.current);
      onLoadLoop();
    } else {
      setTimeout(onLoadSlider, 100);
    }
  };

  useEffect(onLoadSlider, []);

  return (
    <>
      <div
        className={`fenext-slider ${className} ${
          loop ? "fenext-slider-loop" : ""
        }`}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        style={
          {
            ["--nItems"]: items.length,
            ["--nItemsDesktop"]: nItemsDesktop,
            ["--nItemsTable"]: nItemsTable,
            ["--nItemsPhone"]: nItemsPhone,
            ["--timeDelay"]: timeDelay,
            ["--timeAnimation"]: timeAnimation,
            ["--separationItems"]: `${separationItems / 16}rem`,
          } as React.CSSProperties
        }
      >
        <div
          ref={SliderRef}
          className={`fenext-slider-content fenext-slider-content-${
            isHover ? "hover" : ""
          } ${classNameContent}`}
        >
          {items?.map?.((item, i) => {
            return (
              <div
                key={i}
                className={`fenext-slider-item ${classNameItem}`}
                style={
                  {
                    ["--i"]: i + 1,
                  } as React.CSSProperties
                }
              >
                {_t(item)}
              </div>
            );
          })}
        </div>
        <div className={`fenext-slider-dogs ${classNameDogs}`}>
          {new Array(Math.max(1, Math.ceil(items.length - getNItems() + 1)))
            .fill(1)
            .map((e, i) => {
              const n = e * i;
              return (
                <>
                  <div
                    onClick={onScroll(n)}
                    className={`fenext-slider-dog ${classNameDog} ${
                      currentDog == i ? "active" : ""
                    }`}
                  ></div>
                </>
              );
            })}
        </div>
        <div
          onClick={onScrollToPre}
          className={`fenext-slider-arrow fenext-slider-arrow-pre ${classNameArrows} ${classNameArrowPre}`}
        >
          <SvgPaginationPre />
        </div>
        <div
          onClick={onScrollToNext}
          className={`fenext-slider-arrow fenext-slider-arrow-next ${classNameArrows} ${classNameArrowNext}`}
        >
          <SvgPaginationNext />
        </div>
      </div>
    </>
  );
};

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
export interface ImgGalleryProps
  extends ImgGalleryBaseProps,
    ImgGalleryClassProps {}

export const ImgGallery = ({
  className = "",
  imgs,
  buttonShowMoreImg = {
    children: "Show more pictures",
  },
  buttonHiddenMoreImg = {
    children: "Hidden pictures",
  },
  loader = false,
  nLoader = 5,
  ...props
}: ImgGalleryProps) => {
  const [showAllImg, setShowAllImg] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [steps, setSteps] = useState(0);

  const onClickImg = (i: number) => () => {
    setActiveModal(true);
    setSteps(i);
  };

  const onClose = () => {
    setActiveModal(false);
  };
  return (
    <>
      <div className={`fenext-img-gallery ${className} `}>
        <ModalBase active={activeModal} onClose={onClose} type="full">
          <ImgSlider imgs={imgs} step={steps} setStep={setSteps} {...props} />
        </ModalBase>
        {loader ? (
          <GridGallery
            items={new Array(nLoader).fill(1).map((e, i) => {
              return <Img key={i * e} src="" loader={true} />;
            })}
            {...props}
          />
        ) : (
          <>
            <GridGallery
              {...props}
              items={[...imgs]
                .splice(0, showAllImg ? imgs.length + 1 : 5)
                .map((e, i) => {
                  return <Img key={i} {...e} onClick={onClickImg(i)} />;
                })}
            />
            {imgs.length > 5 && !showAllImg ? (
              <>
                <div className={`fenext-img-gallery-content-btn`}>
                  <Button
                    {...buttonShowMoreImg}
                    onClick={() => {
                      setShowAllImg(true);
                    }}
                    {...props}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            {showAllImg && (
              <div className={`fenext-img-gallery-content-btn`}>
                <Button
                  {...buttonHiddenMoreImg}
                  {...props}
                  onClick={() => {
                    setShowAllImg(false);
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

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
export interface ImgSliderClassProps
  extends Omit<StepsClassProps, "className"> {
  /**
   * The class name for the component.
   */
  className?: string;
  /**
   * The class name for the component.
   */
  classNameSteps?: string;
  /**
   * The class name for the component.
   */
  classNamePictureImg?: string;
  classNameImg?: string;
}

/**
 * Properties for the ImgSlider component.
 */
export interface ImgSliderProps
  extends ImgSliderBaseProps,
    ImgSliderClassProps {}

export const ImgSlider = ({
  className = "",
  classNameStep = "",
  classNamePictureImg = "",
  classNameImg = "",
  imgs,

  defaultStep = 0,
  setStep: setStepProps,
  step: stepProps,

  ...props
}: ImgSliderProps) => {
  const [step__, setStep__] = useState(defaultStep);

  const setStep = (e: number) => {
    setStep__(e);
    setStepProps?.(e);
  };

  const step = useMemo(() => stepProps ?? step__, [stepProps, step__]);
  return (
    <>
      <div className={`fenext-img-slider ${className} `}>
        <Steps
          className={classNameStep}
          items={imgs.map((e, i) => {
            return {
              label: e.name ?? "",
              content: (
                <Img
                  key={i}
                  {...e}
                  className={classNamePictureImg}
                  classNameImg={classNameImg}
                />
              ),
            };
          })}
          stepPos="top"
          step={step}
          onSetStep={setStep}
          btnNext={
            <>
              <SvgPaginationNext />
            </>
          }
          btnPrev={
            <>
              <SvgPaginationPre />
            </>
          }
          useDogs={true}
          {...props}
        />
      </div>
    </>
  );
};

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
    up?: ReactNode;

    /**
     * Custom icon for the previous button.
     */
    pre?: ReactNode;

    /**
     * Custom icon for the next button.
     */
    next?: ReactNode;

    /**
     * Custom icon for the "Go Down" button.
     */
    down?: ReactNode;
  };
}
/**
 * The base props for the pagination component
 */
export interface PaginationItemPageBaseProps extends _TProps {
  paginationName?: string;
  /**
   * The total number of items to paginate
   */
  nItems: number;
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
  onChange?: (page: number) => void;
}
/**
 * Props for PaginationItemPage component
 */
export interface PaginationItemPageProps
  extends PaginationItemPageClassProps,
    PaginationItemPageBaseProps {}

export const PaginationItemPage = ({
  classNameContent = "",
  classNameUp = "",
  classNamePre = "",
  classNameCurrent = "",
  classNameCurrentItem = "",
  classNameNext = "",
  classNameDown = "",
  paginationName,

  icons = {
    up: <SvgPaginationUp />,
    pre: <SvgPaginationPre />,
    next: <SvgPaginationNext />,
    down: <SvgPaginationDown />,
  },

  nItems,

  disabled = false,
  onChange,
  hiddenIfNItemsSmallerThanOrEqualNItemsPage = true,
}: PaginationItemPageProps) => {
  const {
    onChangeData,
    data: { page = 0, npage: nItemsPage = 10 },
  } = usePagination({
    name: paginationName,
    onChage: (e) => {
      onChange?.(e?.page ?? 0);
    },
  });

  const maxPage = useMemo(
    () => (nItemsPage == 0 ? 0 : Math.ceil(nItems / nItemsPage) - 1),
    [nItems, nItemsPage],
  );

  const minMaxValue = (v: number) => {
    return Math.max(0, Math.min(maxPage, v));
  };
  const setPage = (v: number) => {
    if (disabled) {
      return;
    }
    const Value = minMaxValue(v);
    onChangeData("page")(Value);
  };
  const onSetPage = (e: number) => () => setPage(e);

  const addPage = (add: number) => () => {
    setPage(page + add);
  };

  return (
    <div
      className={`fenext-pagination-item-page ${
        hiddenIfNItemsSmallerThanOrEqualNItemsPage && nItems <= nItemsPage
          ? "fenext-pagination-item-page-hidden"
          : ""
      } ${classNameContent} `}
    >
      {page > 0 && (
        <>
          <div
            key={`fenext-pagination-item-page-up`}
            className={`fenext-pagination-item-page-current-item fenext-pagination-item-page-up ${classNameUp}`}
            onClick={onSetPage(0)}
          >
            {icons.up}
          </div>
          <div
            key={`fenext-pagination-item-page-pre`}
            className={`fenext-pagination-item-page-current-item fenext-pagination-item-page-pre ${classNamePre}`}
            onClick={addPage(-1)}
          >
            {icons.pre}
          </div>
        </>
      )}
      <div
        className={`fenext-pagination-item-page-current ${classNameCurrent}`}
      >
        {page > 2 ? (
          <>
            <div
              key={`fenext-pagination-item-page-current-item-init`}
              className={`fenext-pagination-item-page-current-item fenext-pagination-item-page-current-item-init ${classNameCurrentItem}`}
              onClick={onSetPage(0)}
            >
              {1}
            </div>
            <div
              key={`fenext-pagination-item-page-current-item-init-dog`}
              className={`fenext-pagination-item-page-current-item fenext-pagination-item-page-current-item-dog ${classNameCurrentItem}`}
            >
              ...
            </div>
          </>
        ) : (
          <></>
        )}
        {new Array(5).fill(1).map((e, i) => {
          const n = e * i - 2 + page;
          if (n < 0 || n > maxPage) {
            return <></>;
          }
          return (
            <>
              <div
                key={`fenext-pagination-item-page-current-item-${i}`}
                className={`fenext-pagination-item-page-current-item ${
                  n == page
                    ? "fenext-pagination-item-page-current-item-active"
                    : ""
                } ${classNameCurrentItem}`}
                onClick={onSetPage(n)}
              >
                {n + 1}
              </div>
            </>
          );
        })}
        {page < maxPage - 2 ? (
          <>
            <div
              key={`fenext-pagination-item-page-current-item-final-dog`}
              className={`fenext-pagination-item-page-current-item fenext-pagination-item-page-current-item-dog ${classNameCurrentItem}`}
            >
              ...
            </div>
            <div
              key={`fenext-pagination-item-page-current-item-final`}
              className={`fenext-pagination-item-page-current-item  fenext-pagination-item-page-current-item-final ${classNameCurrentItem}`}
              onClick={onSetPage(maxPage)}
            >
              {maxPage + 1}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {page < maxPage && (
        <>
          <div
            key={`fenext-pagination-item-page-next`}
            className={`fenext-pagination-item-page-current-item fenext-pagination-item-page-next ${classNameNext}`}
            onClick={addPage(1)}
          >
            {icons.next}
          </div>
          <div
            key={`fenext-pagination-item-page-down`}
            className={`fenext-pagination-item-page-current-item fenext-pagination-item-page-down ${classNameDown}`}
            onClick={onSetPage(maxPage)}
          >
            {icons.down}
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Class properties to customize the style of the pagination.
 */
export interface PaginationClassProps {
  /**
   * CSS class for the main container of the pagination.
   */
  className?: string;
}
/**
 * The base props for the pagination component
 */
export interface PaginationBaseProps extends _TProps {
  showItemPage?: boolean;
  showNPage?: boolean;
  disabled?: boolean;

  PaginationItemPageProps: Omit<PaginationItemPageProps, "paginationName">;
  PaginationNPageProps?: Omit<PaginationNPageProps, "paginationName">;
  paginationName?: string;
}
/**
 * Props for Pagination component
 */
export interface PaginationProps
  extends PaginationClassProps,
    PaginationBaseProps {}

export const Pagination = ({
  className = "",
  PaginationItemPageProps,
  PaginationNPageProps = {},
  showItemPage = true,
  showNPage = true,
  disabled = false,
  paginationName,
  ...props
}: PaginationProps) => {
  const { _t } = use_T({ ...props });
  const minPage = useMemo(() => {
    let m = Infinity;
    (PaginationNPageProps?.options ?? PaginationNPageDefaultOptions)?.forEach(
      (e) => {
        const n = parseInt(`${e ?? ""}`);
        if (n && !Number.isNaN(n)) {
          m = Math.min(m, n);
        }
      },
    );
    return m;
  }, [PaginationNPageProps?.options]);

  return (
    <div className={`fenext-pagination ${className}`}>
      <div className={`fenext-pagination-content-item-page ${className}`}>
        {showItemPage && (
          <PaginationItemPage
            {...PaginationItemPageProps}
            _t={_t}
            disabled={disabled}
            paginationName={paginationName}
          />
        )}
      </div>
      <div className={`fenext-pagination-content-n-page ${className}`}>
        {showNPage &&
          minPage < (PaginationItemPageProps?.nItems ?? minPage + 1) && (
            <PaginationNPage
              {...PaginationNPageProps}
              {...props}
              _t={_t}
              disabled={disabled}
              paginationName={paginationName}
            />
          )}
      </div>
    </div>
  );
};

export const PaginationNPageDefaultOptions = [10, 20, 50, 100];

/**
 * Class properties to customize the style of the pagination.
 */
export interface PaginationNPageClassProps extends InputSelectClassProps {
  /**
   * CSS class for the main container of the pagination.
   */
  className?: string;
}
/**
 * The base props for the pagination component
 */
export interface PaginationNPageBaseProps extends _TProps {
  /**
   * List NPage for select.
   */
  options?: number[];
  /**
   * onChange of nPage.
   */
  onChange?: (npage: number) => void;

  paginationName?: string;

  disabled?: boolean;
}
/**
 * Props for PaginationNPage component
 */
export interface PaginationNPageProps
  extends PaginationNPageClassProps,
    PaginationNPageBaseProps {}

export const PaginationNPage = ({
  className = "",
  options = PaginationNPageDefaultOptions,
  onChange,
  paginationName,
  disabled,
  ...props
}: PaginationNPageProps) => {
  const {
    setData,
    data: { npage = 10 },
  } = usePagination({
    name: paginationName,
    onChage: (e) => {
      onChange?.(e?.npage ?? 10);
    },
  });
  return (
    <InputSelectT<number>
      {...props}
      className={`fenext-pagination-npage ${className}`}
      useItemMaxLengthShowOptions={false}
      options={options}
      onChange={(e) => {
        setData({
          page: 0,
          npage: e,
        });
      }}
      isSelectChangeText={false}
      value={npage}
      onParse={(e) => {
        return {
          id: e ?? "",
          text: `${e}`,
          data: e,
        };
      }}
      disabled={disabled}
    />
  );
};

/**
 * Properties for the AlertHook component.
 */
export interface AlertHookProps extends _TProps {
  className?: string;

  configHook?: useAlertProps;
}

export const AlertHook = ({
  className = "",
  configHook = {},
  ...props
}: AlertHookProps) => {
  const { alert, onClearAlert } = useAlert(configHook);
  return (
    <>
      {alert && (
        <div className={`fenext-alert-hook ${className}`}>
          <Alert {...props} {...alert} onClose={onClearAlert} />
        </div>
      )}
    </>
  );
};

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
  classNameTdLabelCollapse?: string;

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
  parse?: (data: T, i?: number) => any;
  /**
   * The columnOptions for table.
   */
  columnOptions?: {
    orderBy?: boolean;
    // showHidden?: boolean;
  };
  /**
   * The label to display in the header column.
   */
  defaultShowHidden?: "show" | "hidden";
  /**
   * The column width : 100% in new tr;
   */
  colNewTr?: boolean;

  isCollapse?: boolean;
  collapseProps?: Omit<CollapseProps, "children">;
  /**
   * The className of de column;
   */
  className?: string;
  hidden?: boolean;
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
  nItems?: number;
  error?: ErrorFenextjs;

  /**
   * The header configuration for the table.
   */
  header: TableHeader<T>;

  /**
   * Optional pagination properties for the table.
   */
  pagination?: Omit<PaginationProps, "nItems">;

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
  onOrderBy?: (order: { id: keyof T; order: "ASC" | "DESC" }) => void;

  // /**
  //  * onShowHidden table.
  //  */
  // onShowHidden?: (showHidden: {
  //     id: keyof T;
  //     showHidden: "SHOW" | "HIDDEN";
  // }) => void;
  /**
   * notResult the table.
   */
  notResult?: ReactNode;

  /**
   * If use checkbox in table.
   */
  showPagination?: boolean;

  actionsCheckbox?: Omit<
    TableActionCheckboxProps<T>,
    "actionAllCheckbox" | "data"
  >;
  actionsCheckboxSelectAll?: ReactNode;

  restartPaginationInRenderTable?: boolean;
}
/**
 * Represents the properties that can be passed to a table component.
 *
 * @template T The type of data that the table contains.
 */
export interface TableProps<T> extends TableClassProps, TableBaseProps<T> {}

export const Table = <T,>({
  classNameContent = "",

  classNameContentTable = "",
  classNameTable = "",
  classNameTHead = "",
  classNameTBody = "",
  classNameThr = "",
  classNameTr = "",
  classNameTh = "",
  classNameTd = "",
  classNameTdLabelCollapse = "",

  classNameContentPagination = "",

  classNameLoader = "",

  name,
  items,
  header,
  error,
  nItems,

  pagination,
  showPagination = true,
  loader = false,
  typeLoader = "line",
  useCheckbox = true,
  onOrderBy,

  restartPaginationInRenderTable = true,

  // onShowHidden,
  onChecked,
  notResult = <div>There is not results</div>,
  actionsCheckbox,
  actionsCheckboxSelectAll = "Select All",
  ...props
}: TableProps<T>) => {
  const { _t } = use_T({ ...props });
  const { setData } = usePagination({
    name: pagination?.paginationName,
  });
  useEffect(() => {
    if (restartPaginationInRenderTable) {
      setData({
        npage: 10,
        page: 0,
      });
    }
  }, [restartPaginationInRenderTable]);

  const checkboxItems = useMemo(
    () => items.map((item: T) => ({ ...item, __checkbox: false })),
    [items],
  );
  const [checkbox, setCheckbox] =
    useState<(T & { __checkbox: boolean })[]>(checkboxItems);

  const onCheckedAll = (v: boolean) => {
    const itemsChange = items.map((item: T) => ({
      ...item,
      __checkbox: v,
    }));
    setCheckbox(itemsChange);
    onChecked?.(itemsChange?.filter((e) => e.__checkbox));
  };
  const onCheckedItem = (i: number) => (__checkbox: boolean) => {
    setCheckbox((pre) => {
      const itemsChange = pre.map((e, j) => {
        return {
          ...e,
          ...(i == j
            ? {
                __checkbox,
              }
            : {}),
        };
      });
      onChecked?.(itemsChange?.filter((e) => e.__checkbox));
      return itemsChange;
    });
  };

  useEffect(() => {
    setCheckbox(checkboxItems);
  }, [checkboxItems]);

  const headerNotTr = useMemo(
    () =>
      header.filter(
        (e) => (e.colNewTr !== true || e?.isCollapse) && e.hidden != true,
      ),
    [header],
  );
  const headerTr = useMemo(
    () =>
      header.filter(
        (e) => (e.colNewTr === true || e?.isCollapse) && e.hidden != true,
      ),
    [header],
  );

  const CONTENT = useMemo(() => {
    if (error) {
      return (
        <tr className={`fenext-table-content-table-tr ${classNameTr}`}>
          <td
            className={`fenext-table-content-table-td fenext-table-error ${classNameTd}`}
            colSpan={999}
          >
            <ErrorComponent error={error} />
          </td>
        </tr>
      );
    }
    if (loader) {
      if (typeLoader == "spinner") {
        return (
          <tr className={`fenext-table-content-table-tr ${classNameTr}`}>
            <td
              className={`fenext-table-content-table-td ${classNameTd}`}
              colSpan={999}
            >
              <div className={`${classNameLoader}`}>
                <Loader />
              </div>
            </td>
          </tr>
        );
      }
      return new Array(10).fill(1).map((item, i) => (
        <tr
          key={i * item}
          className={`fenext-table-content-table-tr ${classNameTr}`}
        >
          {useCheckbox && (
            <td
              key={`${i}-checkbox`}
              className={`fenext-table-content-table-td ${classNameTd}`}
            >
              <InputCheckbox
                value={false}
                classNameLabel="fenext-table-content-table-checkbox"
              />
            </td>
          )}
          {headerNotTr.map((h, j) => (
            <td
              key={`${i}-${j}`}
              className={`fenext-table-content-table-td ${classNameTd}`}
              style={
                {
                  ["--fenext-table-head-th"]: `"${h?.thText ?? h?.th}"`,
                } as React.CSSProperties
              }
              data-col-id={h?.id}
              data-col-text={h?.thText ?? h?.th}
            >
              <LoaderLine />
            </td>
          ))}
        </tr>
      ));
    }
    if (items.length == 0) {
      return (
        <tr className={`fenext-table-content-table-tr ${classNameTr}`}>
          <td
            className={`fenext-table-content-table-td fenext-table-not-result ${classNameTd}`}
            colSpan={999}
          >
            {_t(notResult)}
          </td>
        </tr>
      );
    }
    return items.map((item, i) => {
      return (
        <>
          <tr
            key={i}
            className={`fenext-table-content-table-tr ${classNameTr}`}
          >
            {useCheckbox && (
              <td
                key={`${i}-checkbox`}
                className={`fenext-table-content-table-td ${classNameTd}`}
              >
                <InputCheckbox
                  onChange={onCheckedItem(i)}
                  value={checkbox[i]?.__checkbox ?? false}
                  classNameLabel="fenext-table-content-table-checkbox"
                />
              </td>
            )}
            {headerNotTr.map((h, j) => (
              <td
                key={`${i}-${j}`}
                className={`
                                    fenext-table-content-table-td 
                                    fenext-table-content-table-td-${h.isCollapse ? "is-label-collapse" : ""}
                                    ${classNameTd} 
                                    ${h?.className ?? ""}
                                `}
                style={
                  {
                    ["--fenext-table-head-th"]: `"${h?.thText ?? h?.th}"`,
                  } as React.CSSProperties
                }
                data-col-id={h?.id}
                data-col-text={h?.thText ?? h?.th}
              >
                {h.isCollapse ? (
                  <>
                    <label
                      htmlFor={`table-${name}-${h?.id?.toString()}-${i}`}
                      className={`fenext-table-content-table-td-label-collapse ${classNameTdLabelCollapse}`}
                    >
                      {h?.collapseProps?.header}
                    </label>
                  </>
                ) : (
                  <>{h?.parse?.(item, i) ?? item[h.id] ?? ""}</>
                )}
              </td>
            ))}
          </tr>
          {headerTr.map((new_tr, j) => {
            return (
              <>
                <tr
                  key={`${i}_tr_${j}`}
                  className={`
                                        fenext-table-content-table-tr
                                        fenext-table-content-table-tr-col-new-tr
                                        fenext-table-content-table-tr-${new_tr.isCollapse ? "is-collapse" : ""}
                                        ${classNameTr} 
                                        ${new_tr?.className ?? ""}
                                    `}
                >
                  <td
                    key={`${i}-${j}`}
                    className={`
                                            fenext-table-content-table-td 
                                            fenext-table-content-table-td-col-new-tr
                                            fenext-table-content-table-td-${new_tr.isCollapse ? "is-collapse" : ""}
                                            ${classNameTd}
                                        `}
                    style={
                      {
                        ["--fenext-table-head-th"]: `"${new_tr?.thText ?? new_tr?.th}"`,
                      } as React.CSSProperties
                    }
                    colSpan={100}
                    data-col-id={new_tr?.id}
                    data-col-text={new_tr?.thText ?? new_tr?.th}
                  >
                    {new_tr.isCollapse ? (
                      <>
                        <Collapse
                          {...new_tr.collapseProps}
                          header=""
                          id={`table-${name}-${new_tr?.id?.toString()}-${i}`}
                          name={`table-${name}-${new_tr?.id?.toString()}-${i}`}
                          className={`
                                                            ${new_tr.collapseProps?.className ?? ""}
                                                            fenext-table-content-table-td-collapse
                                                        `}
                        >
                          {new_tr?.parse?.(item, i) ?? item[new_tr.id] ?? ""}
                        </Collapse>
                      </>
                    ) : (
                      <>{new_tr?.parse?.(item, i) ?? item[new_tr.id] ?? ""}</>
                    )}
                  </td>
                </tr>
              </>
            );
          })}
        </>
      );
    });
  }, [
    items,
    header,
    headerNotTr,
    loader,
    classNameTr,
    classNameTd,
    useCheckbox,
    checkbox,
    typeLoader,
    notResult,
    headerTr,
    error,
  ]);

  return (
    <>
      <div
        className={`fenext-table ${classNameContent}`}
        style={
          {
            ["--fenext-table-name"]: `"${name}"`,
          } as React.CSSProperties
        }
      >
        {useCheckbox &&
          checkbox.some((e) => e.__checkbox) &&
          actionsCheckbox && (
            <div className={`fenext-table-content-actions`}>
              <TableActionCheckbox
                {...actionsCheckbox}
                actionAllCheckbox={{
                  label: actionsCheckboxSelectAll,
                  onChange: onCheckedAll,
                  value: checkbox.every((e) => e?.__checkbox ?? false),
                }}
                data={checkbox.filter((e) => e.__checkbox)}
              />
            </div>
          )}
        <div className={`fenext-table-content ${classNameContentTable}`}>
          <table className={`fenext-table-content-table ${classNameTable}`}>
            <thead
              className={`fenext-table-content-table-thead ${classNameTHead}`}
            >
              <tr className={`fenext-table-content-table-thr ${classNameThr}`}>
                {useCheckbox && (
                  <th
                    className={`fenext-table-content-table-th ${classNameTh}`}
                  >
                    <InputCheckbox
                      onChange={onCheckedAll}
                      value={checkbox.every((e) => e?.__checkbox ?? false)}
                      _t={_t}
                      classNameLabel="fenext-table-content-table-checkbox"
                    />
                  </th>
                )}
                {headerNotTr.map((h, i) => (
                  <th
                    key={i}
                    className={`fenext-table-content-table-th ${classNameTh} ${h?.className ?? ""}`}
                    data-col-id={h?.id}
                    data-col-text={h?.th}
                  >
                    {Object.values(h?.columnOptions ?? {}).some(
                      (e) => e == true,
                    ) ? (
                      <DropDown
                        header={<>{_t(h.th)}</>}
                        classNameBody={`
                                                      fenext-table-content-table-th-dropdown-body  
                                                    `}
                      >
                        {h?.columnOptions?.orderBy ? (
                          <>
                            <div
                              onClick={() => {
                                onOrderBy?.({
                                  id: h.id,
                                  order: "ASC",
                                });
                              }}
                              className={`fenext-table-content-table-th-popup-item fenext-table-content-table-th-order-by`}
                            >
                              {_t("Order ASC")}
                            </div>
                            <div
                              onClick={() => {
                                onOrderBy?.({
                                  id: h.id,
                                  order: "DESC",
                                });
                              }}
                              className={`fenext-table-content-table-th-popup-item fenext-table-content-table-th-order-by`}
                            >
                              {_t("Order DESC")}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        {/* {h?.columnOptions?.showHidden ? (
                                                        <>
                                                            <InputRadio
                                                                name={`${h.th}-${i}-show-hidden`}
                                                                _t={_t}
                                                                items={[
                                                                    {
                                                                        id: "show",
                                                                        label: "Show",
                                                                    },
                                                                    {
                                                                        id: "hidden",
                                                                        label: "Hidden",
                                                                    },
                                                                ]}
                                                                defaultValue={{
                                                                    id: "show",
                                                                    label: "Show",
                                                                }}
                                                                labelPosition="right"
                                                                onChange={(e) => {
                                                                    onShowHidden?.({
                                                                        id: h.id,
                                                                        showHidden:
                                                                            e?.id ==
                                                                            "show"
                                                                                ? "SHOW"
                                                                                : "HIDDEN",
                                                                    });
                                                                }}
                                                            />
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )} */}
                      </DropDown>
                    ) : (
                      <>{_t(h.th)}</>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              className={`fenext-table-content-table-tbody ${classNameTBody}`}
            >
              {CONTENT}
            </tbody>
          </table>
        </div>
        {(nItems != undefined || pagination) && showPagination && (
          <div
            className={`fenext-table-content-pagination ${classNameContentPagination}`}
          >
            <Pagination
              {...pagination}
              PaginationItemPageProps={{
                nItems: nItems ?? 10,
                ...pagination,
              }}
              disabled={loader}
              _t={_t}
            />
          </div>
        )}
      </div>
    </>
  );
};

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

export const Alert = ({
  className = "",
  message,
  iconClose = <SvgClose />,
  type,
  data,
  onClose,
  ...props
}: AlertComponentProps) => {
  const { _t } = use_T({ ...props });
  const [active, setActive] = useState(true);
  return (
    <>
      <div
        className={`
                    fenext-alert 
                    fenext-alert-${type} 
                    fenext-alert-${active ? "active" : "inactive"} 
                    ${className}
                `}
        data-type={type}
        meta-data={data}
      >
        <div className={`fenext-alert-content`}>{_t(message)}</div>
        <div
          className={`fenext-alert-close`}
          onClick={() => {
            onClose?.();
            setActive(false);
          }}
        >
          {iconClose}
        </div>
      </div>
    </>
  );
};

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
export interface CollapseProps extends CollapseBaseProps, CollapseClassProps {}

export const Collapse = ({
  className = "",
  classNameHeader = "",
  classNameHeaderContent = "",
  classNameHeaderIcon = "",
  classNameBody = "",

  children,
  loader = false,
  header,
  disabled = false,
  defaultActive = false,
  active: activeProps = undefined,
  id,
  name = "",
  type = "checkbox",
  show = "checked",
  status = "none",
  onChange,
  iconArrow = <SvgArrow />,
  rotateIcon = true,
  useActiveForShowChildren = false,
}: CollapseProps) => {
  const [active_, setActive_] = useState(defaultActive);

  const active = useMemo(() => activeProps ?? active_, [activeProps, active_]);

  const { onAction } = useAction({
    name: `fenext-collapse-${name}`,
    onActionExecute: () => {
      if (type == "radio") {
        setActive_(false);
        onChange?.(false);
      }
    },
  });

  const setActive = async (e: boolean) => {
    onAction();
    if (type == "radio") {
      await sleep(50);
    }
    setActive_(e);
    onChange?.(e);
  };
  return (
    <>
      <div
        className={`
                    fenext-collapse
                    fenext-collapse-status-${status}
                    fenext-collapse-rotate-icon-${rotateIcon ? "yes" : "no"}
                    fenext-collapse-${show}
                    fenext-collapse-${useActiveForShowChildren ? "active-for-show-children" : ""}
                    ${className}
                `}
      >
        <label className={`fenext-collapse-header ${classNameHeader}`}>
          <input
            type={type}
            className={`fenext-collapse-header-checkbox`}
            id={id}
            name={name}
            disabled={disabled || loader}
            defaultChecked={defaultActive}
            {...(active !== undefined
              ? {
                  checked: active,
                }
              : {})}
            onChange={(e) => {
              setActive?.(e.target.checked);
            }}
          />
          <div
            className={`fenext-collapse-header-content ${classNameHeaderContent}`}
          >
            {header}
            {type == "radio" && !disabled ? (
              <>
                <input
                  type={type}
                  className={`fenext-collapse-header-uncheck`}
                  name={name}
                  disabled={loader}
                  onChange={() => {
                    setActive?.(false);
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={`fenext-collapse-header-icon ${classNameHeaderIcon}`}>
            {loader ? (
              <>
                <Loader />
              </>
            ) : (
              <>{iconArrow}</>
            )}
          </div>
        </label>
        <div className={`fenext-collapse-body ${classNameBody}`}>
          {useActiveForShowChildren ? (
            <>{active && <>{children}</>}</>
          ) : (
            <>{children}</>
          )}
        </div>
      </div>
    </>
  );
};

/**
 * Properties for the base CollapseMultiple component.
 */
export interface CollapseMultipleBaseProps
  extends Pick<
    CollapseBaseProps,
    "name" | "type" | "useActiveForShowChildren"
  > {
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
export interface CollapseMultipleProps
  extends CollapseMultipleBaseProps,
    CollapseMultipleClassProps {}

export const CollapseMultiple = ({
  classNameMultiple = "",
  name = "",
  items = [],
  type = "checkbox",
  defaultActive = [],

  ...props
}: CollapseMultipleProps) => {
  return (
    <>
      <div className={`fenext-collapse-multiple ${classNameMultiple}`}>
        {items.map((item, i) => (
          <Collapse
            key={i}
            name={name}
            type={type}
            defaultActive={[defaultActive].flat(2).includes(i)}
            {...props}
            {...item}
          />
        ))}
      </div>
    </>
  );
};

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

export type LavaLampStylesElement = Pick<
  CSSProperties,
  | "borderRadius"
  | "aspectRatio"
  | "width"
  | "background"
  | "animationTimingFunction"
>;

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
export interface LavaLampProps extends LavaLampBaseProps, LavaLampClassProps {}

export const LavaLamp = ({
  className = "",
  nItems = 20,
  styles = {
    width: "100%",
    height: "500px",
    background: `linear-gradient(45deg,var(--fenext-color-primary) 0%,var(--fenext-color-success) 100%)`,
  },
  stylesElement = [
    {
      width: "150px",
      aspectRatio: "2/1.5",
      borderRadius: "30% 70% 70% 30% / 68% 30% 70% 32% ",
      background: `linear-gradient(45deg,var(--fenext-color-primary) 0%,var(--fenext-color-success) 100%)`,
      animationTimingFunction: "ease",
    },
    {
      width: "100px",
      aspectRatio: "1 / 1",
      borderRadius: "30% 70% 44% 56% / 23% 46% 54% 77% ",
      background: `linear-gradient(75deg,var(--fenext-color-primary) 0%,var(--fenext-color-secondary) 100%)`,
      animationTimingFunction: "ease-out",
    },
    {
      width: "100px",
      aspectRatio: "1 / 1",
      borderRadius: "87% 13% 65% 35% / 46% 46% 54% 54% ",
      background: `linear-gradient(135deg,var(--fenext-color-primary) 0%,var(--fenext-color-secondary) 100%)`,
      animationTimingFunction: "linear",
    },
  ],
  ranges = {},
}: LavaLampProps) => {
  const getNumberRandom = ({ min, max }: LavaLampGetNumberRandomProps) => {
    return Math.trunc(Math.random() * (max - min) + min);
  };
  const getPosRandom = () => {
    const pos: Pick<CSSProperties, "top" | "left"> = {
      top: `${getNumberRandom(ranges?.top ?? { min: 20, max: 80 })}%`,
      left: `${getNumberRandom(ranges?.left ?? { min: 20, max: 80 })}%`,
    };
    return pos;
  };
  const getVarRandom = () => {
    return {
      ["--scale"]: getNumberRandom(ranges?.scale ?? { min: 50, max: 100 }) / 10,
      ["--move-X"]: `${getNumberRandom(
        ranges?.moveX ?? { min: -300, max: 300 },
      )}%`,
      ["--move-Y"]: `${getNumberRandom(
        ranges?.moveY ?? { min: -300, max: 300 },
      )}%`,
      ["--time"]: `${
        getNumberRandom(ranges?.time ?? { min: 30, max: 50 }) / 10
      }s`,
    } as CSSProperties;
  };
  return (
    <>
      <div className={`fenext-lava-lamp ${className} `} style={styles}>
        {new Array(nItems).fill(1).map((e, i) => {
          return (
            <>
              <div
                key={e * i}
                className="fenext-lava-lamp-item"
                style={{
                  ...stylesElement[Math.trunc(i % stylesElement.length)],
                  ...getPosRandom(),
                  ...getVarRandom(),
                }}
              ></div>
            </>
          );
        })}
      </div>
    </>
  );
};

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
export interface ErrorComponentProps
  extends ErrorComponentBaseProps,
    ErrorComponentClassProps {}

export const ErrorComponent = ({
  error,
  children,
  className = "",
  useDataError = true,
  useErrorInput = true,
  ...props
}: ErrorComponentProps) => {
  const { _t } = use_T({ ...props });

  const dataError = useMemo(() => {
    const err = useDataError ? error?.data : undefined;
    return err ? JSON.stringify(error) : undefined;
  }, [useDataError, error]);

  return (
    <div
      className={`fenext-error ${className} fenext-error-${error?.code}`}
      data-error={dataError}
    >
      {error ? (
        <>
          {error?.content ?? (
            <>
              {_t(error?.msg ?? "")}
              {useErrorInput && error?.input && (
                <>
                  {" "}
                  <span className="fenext-error-input">
                    {_t(`[${error?.input ?? ""}]`)}
                  </span>
                </>
              )}
            </>
          )}
        </>
      ) : (
        _t(children)
      )}
    </div>
  );
};

export interface FormProps extends PropsWithChildren {
  /**
   * The ID of the form
   */
  id?: string;

  /**
   * The function to handle the form submission
   */
  onSubmit?: () => Promise<void>;

  /**
   * Whether the form is disabled
   */
  disabled?: boolean;

  /**
   * The className to apply to the form element
   */
  className?: string;
}

export const Form = ({
  id = "",
  disabled = true,
  children,
  className = "",
  onSubmit = async () => {},
}: FormProps) => {
  const { push } = useDataLayer({});

  const onSendForm = async (e: any) => {
    e.preventDefault();
    if (disabled) {
      return;
    }
    try {
      await onSubmit?.();
      if (id != "") {
        push({
          event: `form-${id}`,
        });
      }
    } catch (error) {
      error;
    }
  };

  return (
    <>
      <form className={`fenext-form ${className}`} onSubmit={onSendForm}>
        {children}
      </form>
    </>
  );
};

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
   * The class name for the component.
   */
  classNameChildren?: string;
  /**
   * The class name for the component.
   */
  classNameContent?: string;
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

export const Tooltip = ({
  className = "",
  classNameChildren = "",
  classNameContent = "",
  children,
  tooltip,
  positionX = "center",
  positionY = "top",
  ...props
}: TooltipProps) => {
  const { _t } = use_T({ ...props });
  const ref = useRef<HTMLDivElement>(null);
  const refTooltipContent = useRef<HTMLDivElement>(null);

  type configTooltipType = {
    "--element-width"?: string;
    "--element-height"?: string;
    "--element-top"?: string;
    "--element-left"?: string;
    "--element-right"?: string;
    "--element-bottom"?: string;
    "--element-center-x"?: string;
    "--element-center-y"?: string;
  };

  const [configTooltip, setConfigTooltip] = useState<
    configTooltipType | undefined
  >(undefined);

  const onShowTooltip = () => {
    const target = ref?.current as HTMLElement;
    const tooltipElement = refTooltipContent?.current;
    if (tooltipElement) {
      const bounding = target.getBoundingClientRect();
      setConfigTooltip({
        "--element-width": `${tooltipElement.offsetWidth}px`,
        "--element-height": `${tooltipElement.offsetHeight}px`,
        "--element-top": `${bounding.top}px`,
        "--element-left": `${bounding.left}px`,
        "--element-right": `${bounding.right}px`,
        "--element-bottom": `${bounding.bottom}px`,
        "--element-center-x": `${(bounding.right - bounding.left) / 2 + bounding.left}px`,
        "--element-center-y": `${(bounding.bottom - bounding.top) / 2 + bounding.top}px`,
      });
    }
  };

  return (
    <>
      <Portal>
        <div
          ref={refTooltipContent}
          className={`
                        fenext-tooltip-content 
                        fenext-tooltip-content-x-${positionX} 
                        fenext-tooltip-content-y-${positionY} 
                        fenext-tooltip-content-${configTooltip ? "active" : "inactive"}

                        ${classNameContent}
                    `}
          onMouseEnter={onShowTooltip}
          onMouseLeave={() => {
            setConfigTooltip(undefined);
          }}
          style={configTooltip as any}
        >
          {tooltip}
        </div>
      </Portal>
      <div
        ref={ref}
        className={`fenext-tooltip ${className} `}
        onMouseEnter={onShowTooltip}
        onClick={onShowTooltip}
        onMouseLeave={() => {
          setConfigTooltip(undefined);
        }}
      >
        <div className={`fenext-tooltip-children ${classNameChildren}`}>
          {_t(children)}
        </div>
      </div>
    </>
  );
};

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
export const TwoColSticky = ({
  className = "",
  classNameChildren = "",
  classNameColSticky = "",
  children,
  colSticky,
  posCol = "left",
  ...props
}: TwoColStickyProps) => {
  const { _t } = use_T({ ...props });
  return (
    <>
      {/* The wrapper div for the TwoColSticky component */}
      <div
        className={`fenext-two-col-sticky fenext-two-col-sticky-pos-${posCol} ${className} `}
      >
        {/* The sticky column */}
        <div
          className={`fenext-two-col-sticky-col-sticky ${classNameColSticky} `}
        >
          {_t(colSticky)}
        </div>
        {/* The scrollable children column */}
        <div className={`fenext-two-col-sticky-children ${classNameChildren} `}>
          {_t(children)}
        </div>
      </div>
    </>
  );
};

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
export interface TabProps<T = string> extends TabBaseProps<T>, TabClassProps {}

export const parseTabCount = <T,>(
  d: TabItemProps<T>,
  _t: ReturnType<typeof use_T>["_t"],
): TabItemProps<T> => {
  if (!d.useCount) {
    return d;
  }
  return {
    ...d,
    head: (
      <>
        {_t(((d.count ?? 0) > 1 ? d.plural : d.singular) ?? d.head) ?? ""} (
        {parseNumberCount(d.count ?? 0)})
      </>
    ),
  };
};

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
export const Tab = <T = string,>({
  className = "",
  classNameContentHead = "",
  classNameHead = "",
  classNameHeadItem = "",
  classNameHeadItemActive = "",
  classNameBody = "",
  classNameBodyItem = "",
  classNameContentAfterHead = "",
  classNameContentBeforeHead = "",

  items = [],
  defaultTab = 0,
  activeTab = undefined,
  afterTabs = undefined,
  beforeTabs = undefined,
  onChange,
  tabScrollActive = false,
  validataTabOneHiddenHeader = true,

  useCount = false,
  ...props
}: TabProps<T>) => {
  const { _t } = use_T({ ...props });
  const [_tabSelect, setTabSelect] = useState(
    Math.max(0, Math.min(defaultTab, items?.length - 1)),
  );
  const tabSelect = useMemo(
    () => activeTab ?? _tabSelect,
    [activeTab, _tabSelect],
  );

  const CHead = useMemo(() => {
    return items?.map((item, i) => {
      const ITEM = parseTabCount<T>(
        {
          ...item,
          useCount: item?.useCount ?? useCount ?? false,
        },
        _t,
      );
      return (
        <div
          key={i}
          className={`fenext-tab-head-item ${classNameHeadItem} ${
            i == tabSelect
              ? `fenext-tab-head-item-active ${classNameHeadItemActive}`
              : ""
          } fenext-tab-head-item-id-${item?.id}`}
          onClick={() => {
            setTabSelect(i);
            onChange?.(ITEM);
          }}
        >
          {_t(ITEM?.head) ?? ""}
        </div>
      );
    });
  }, [tabSelect, items, useCount, _t]);

  const CBody = useMemo(() => {
    if (tabScrollActive) {
      return (
        <>
          {items?.map((item, i) => {
            return (
              <>
                <div
                  className={`fenext-tab-body-item fenext-tab-body-item-${
                    i == tabSelect ? "active" : ""
                  } ${classNameBodyItem}`}
                >
                  {item?.body ?? ""}
                </div>
              </>
            );
          })}
        </>
      );
    }
    const item = items?.[tabSelect];
    return (
      <div className={`fenext-tab-body-item ${classNameBodyItem}`}>
        {item?.body ?? ""}
      </div>
    );
  }, [tabSelect, items, tabScrollActive]);

  const BEFORETAB = useMemo(() => {
    let b = beforeTabs;
    const item = items?.[tabSelect];
    if (item?.beforeTab) {
      b = item?.beforeTab;
    }
    return (
      <>
        {b && (
          <div
            className={`fenext-tab-content-head-before ${classNameContentBeforeHead}`}
          >
            {_t(b)}
          </div>
        )}
      </>
    );
  }, [beforeTabs, classNameContentBeforeHead, tabSelect, items, _t]);

  const AFTERTAB = useMemo(() => {
    let a = afterTabs;
    const item = items?.[tabSelect];
    if (item?.beforeTab) {
      a = item?.afterTab;
    }
    return (
      <>
        {a && (
          <div
            className={`fenext-tab-content-head-after ${classNameContentAfterHead}`}
          >
            {_t(a)}
          </div>
        )}
      </>
    );
  }, [afterTabs, classNameContentAfterHead, tabSelect, items, _t]);
  return (
    <>
      <div
        className={`fenext-tab fenext-tab-${
          tabScrollActive ? "scroll-active" : ""
        } 
                fenext-tab-${
                  validataTabOneHiddenHeader ? "validate-one-tab" : ""
                }
                
                ${className}`}
      >
        <div className={`fenext-tab-content-head ${classNameContentHead}`}>
          {BEFORETAB}
          <div className={`fenext-tab-head ${classNameHead}`}>{CHead}</div>
          {AFTERTAB}
        </div>
        <div className={`fenext-tab-body ${classNameBody}`}>{CBody}</div>
      </div>
    </>
  );
};

/**
 * Properties for the DropDown component.
 */
export interface DropDownClassProps {
  /**
   * The class name for the component.
   */
  className?: string;
  classNameContentHeader?: string;
  classNameContentIcon?: string;
  classNameBody?: string;
}

/**
 * Properties for the DropDown component.
 */
export interface DropDownProps extends DropDownClassProps {
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
   * The name for the component.
   */
  name?: string;
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
   * type of show content collapse.
   */
  type?: "checked" | "focus";
}

export const DropDown = ({
  className = "",
  classNameBody = "",
  classNameContentHeader = "",
  classNameContentIcon = "",

  header,
  active: activeProps,
  defaultActive,
  disabled,
  loader,
  onChange: onChangeProps,
  iconArrow = <SvgArrow />,
  rotateIcon = true,
  name,
  children,
  type = "focus",
}: DropDownProps) => {
  const [tlrb, settlrb] = useState<{
    top: string;
    left: string;
    right: string;
    bottom: string;
    spaceY: string;
  }>({
    top: "inherit",
    left: "inherit",
    right: "inherit",
    bottom: "inherit",
    spaceY: "0",
  });
  const refDropDownHeader = useRef<HTMLDivElement>(null);
  const refDropDownBody = useRef<HTMLDivElement>(null);
  const [isChange, setIsChange] = useState(false);
  const [active_, setActive] = useState(defaultActive);

  const active = useMemo(() => activeProps ?? active_, [activeProps, active_]);

  const onChange = (b?: boolean) => {
    if (disabled) {
      return;
    }
    setActive(b ?? !active);
    onChangeProps?.(b ?? !active);
    setIsChange(true);
  };
  useActionDropDown({
    name,
    onChange: (e) => {
      setTimeout(() => {
        onChange(e);
      }, 50);
    },
  });

  const onClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (disabled) {
      return;
    }
    onChange();

    const element = refDropDownHeader?.current as HTMLDivElement;

    const selectRect = element?.getBoundingClientRect?.();
    const { top, left, right, bottom } = selectRect;

    const swForTop = top > window.innerHeight - bottom;
    const swForLeft = left > window.innerWidth - right;

    settlrb({
      top: swForTop ? "inherit" : `${bottom}px`,
      bottom: !swForTop ? "inherit" : `${window.innerHeight - top}px`,
      left: swForLeft ? "inherit" : `${left}px`,
      right: !swForLeft ? "inherit" : `${window.innerWidth - right}px`,
      spaceY: swForTop ? `${window.innerHeight - top}px` : `${bottom}px`,
    });
  };

  const onClickClose = useCallback<
    (this: GlobalEventHandlers, ev: MouseEvent) => any
  >(
    (ev) => {
      if (active) {
        const element = ev.target as HTMLDivElement;
        if (
          refDropDownHeader.current?.contains(element) ||
          refDropDownBody.current?.contains(element)
        ) {
          return;
        }
        onChange();
      }
    },
    [active, refDropDownBody, refDropDownHeader],
  );

  useEffect(() => {
    if (type == "focus") {
      window.addEventListener("click", onClickClose);
      return () => {
        window.removeEventListener("click", onClickClose);
      };
    }
    return;
  }, [type, active, refDropDownBody, refDropDownHeader]);

  return (
    <>
      <div
        ref={refDropDownHeader}
        data-component={"fenext-dropdown"}
        className={`
                    fenext-dropdown 
                    fenext-dropdown-${active ? "active" : "inactive"}
                    fenext-dropdown-rotate-icon-${rotateIcon ? "yes" : "no"}
                    ${className}
                `}
        onClick={onClick}
      >
        <div
          className={`fenext-dropdown-header-content ${classNameContentHeader}`}
        >
          {header}
        </div>
        <div className={`fenext-dropdown-header-icon ${classNameContentIcon}`}>
          {loader ? (
            <>
              <Loader />
            </>
          ) : (
            <>{iconArrow}</>
          )}
        </div>
      </div>
      <Portal>
        <div
          ref={refDropDownBody}
          data-component={"fenext-dropdown-body"}
          className={`
                        fenext-dropdown-body
                        fenext-dropdown-body-${isChange ? "change" : "no-change"}
                        fenext-dropdown-body-${active ? "active" : "inactive"}
                        ${classNameBody}
                    `}
          style={
            {
              ["--fenext-dropdown-top"]: tlrb.top,
              ["--fenext-dropdown-left"]: tlrb.left,
              ["--fenext-dropdown-right"]: tlrb.right,
              ["--fenext-dropdown-bottom"]: tlrb.bottom,
              ["--fenext-dropdown-space-y"]: tlrb.spaceY,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </Portal>
    </>
  );
};

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
export interface PrintIframeProps<T>
  extends PrintIframeBaseProps<T>,
    PrintIframeClassProps {}

export const PrintIframe = <T,>({
  className = "",
  onComponent,
  ...props
}: PrintIframeProps<T>) => {
  const { loader, onPrint } = usePrintIframe<T>(props);
  const COMPONENT = useMemo(() => onComponent?.({ loader }), [loader]);
  return (
    <>
      <div className={`fenext-print-iframe ${className} `} onClick={onPrint}>
        {COMPONENT}
      </div>
    </>
  );
};

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
export interface PrintPageProps<T>
  extends PrintPageBaseProps<T>,
    PrintPageClassProps {}

export const PrintPage = <T,>({
  className = "",
  onComponent,
  ...props
}: PrintPageProps<T>) => {
  const { data, load } = usePrintData<T>(props);
  const COMPONENT = useMemo(() => onComponent?.({ data, load }), [data, load]);
  return (
    <>
      <div className={`fenext-print-page ${className} `}>{COMPONENT}</div>
    </>
  );
};

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

  onPrevDisabled?: () => void;
  onNextDisabled?: () => void;
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

  classNameBtnDisabled?: string;
  /**
   * The class name for the btn next.
   */
  classNameBtnNext?: string;
  classNameBtnNextDisabled?: string;
  /**
   * The class name for the btn prev.
   */
  classNameBtnPrev?: string;
  classNameBtnPrevDisabled?: string;

  forceShowBtnPrev?: boolean;

  forceShowBtnNext?: boolean;

  /**
   * The class name for the content btn next and prev.
   */
  classNameContentDog?: string;
  /**
   * The class name for the btn next and prev.
   */
  classNameDog?: string;

  classNameDogCurrent?: string;
}

/**
 * Properties for the Steps component.
 */
export interface StepsProps extends StepsBaseProps, StepsClassProps {}

export const Steps = ({
  className = "",
  classNameContentItems = "",
  classNameContentSteps = "",
  classNameListSteps = "",
  classNameItem = "",
  classNameItemActive = "",
  classNameStep = "",
  classNameStepActive = "",
  classNameStepCircle = "",
  classNameStepLabel = "",
  classNameContentBtn = "",
  classNameBtn = "",
  classNameBtnDisabled = "",
  classNameBtnNext = "",
  classNameBtnNextDisabled = "",
  classNameBtnPrev = "",
  classNameBtnPrevDisabled = "",
  classNameContentDog = "",
  classNameDog = "",
  classNameDogCurrent = "",

  defaultStep = 0,
  step = undefined,
  items = [],
  btnNext = "Next",
  btnPrev = "Previous",
  disabledBtnNext = false,
  disabledBtnPrev = false,
  onNext,
  onPrev,
  onNextDisabled,
  onPrevDisabled,
  stepPos = "left",
  showCurrentStepNStep = false,
  useArrowKey = false,
  useDogs = false,
  onSetStep,
  forceShowBtnPrev = false,
  forceShowBtnNext = false,
  ...props
}: StepsProps) => {
  const { _t } = use_T({ ...props });
  const ref = useRef<HTMLDivElement>(null);
  const [loader, setLoader] = useState(false);
  const parseCurrentStep = useCallback(
    (n: number) => {
      return Math.max(0, Math.min(n, items.length - 1));
    },
    [items.length],
  );
  const [currentStep___, setCurrentStep__] = useState(defaultStep);

  const setCurrentStep = (e: number) => {
    setCurrentStep__(e);
    onSetStep?.(e);
  };

  const currentStep = useMemo(
    () => parseCurrentStep(step ?? currentStep___),
    [currentStep___, step, items.length],
  );

  const getNumberSum = useCallback(
    (a: number) => {
      return parseCurrentStep(currentStep + a);
    },
    [currentStep, items.length],
  );

  const onMoveStep = async (add: number, fn?: (n: number) => any) => {
    if (
      ref &&
      ref?.current &&
      ref?.current?.classList?.contains("fenext-steps-not-loader")
    ) {
      setLoader(true);
      try {
        const n = getNumberSum(add);
        if (fn) {
          await fn(n);
        }
        setCurrentStep(n);
      } finally {
        setLoader(false);
      }
      setLoader(false);
    }
  };

  const onNext_ = async () => {
    if (disabledBtnNext) {
      return;
    }
    await onMoveStep(1, onNext);
  };

  const onPrev_ = async () => {
    if (disabledBtnPrev) {
      return;
    }
    await onMoveStep(-1, onPrev);
  };

  const keydown: TypeListenerFunctions<"keydown"> = useCallback(
    (e) => {
      if (!useArrowKey) {
        return;
      }
      if (e.keyCode == 37) {
        onPrev_();
      }
      if (e.keyCode == 39) {
        onNext_();
      }
    },
    [currentStep, useArrowKey, disabledBtnNext, disabledBtnPrev, items.length],
  );

  useDocumentEvent({
    keydown,
  });

  return (
    <>
      <div
        ref={ref}
        className={`
                    fenext-steps
                    fenext-steps-${loader ? "loader" : "not-loader"}
                    fenext-steps-pos-${stepPos}
                    fenext-steps-pos-${stepPos}
                    ${className} 
                    `}
      >
        <div className={`fenext-steps-content-steps ${classNameContentSteps} `}>
          <div className={`fenext-steps-list-steps ${classNameListSteps} `}>
            {items.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`fenext-steps-step ${classNameStep} ${
                    currentStep == i
                      ? `fenext-steps-step-active ${classNameStepActive}`
                      : ""
                  }
                                        fenext-steps-step-status-${
                                          item?.status ?? "none"
                                        } 
                                    `}
                >
                  <div
                    className={`fenext-steps-step-circle ${classNameStepCircle} `}
                  >
                    {item.icon ?? i + 1}
                  </div>
                  <div
                    className={`fenext-steps-step-label ${classNameStepLabel} `}
                  >
                    {_t(item.label)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={`fenext-steps-content-items ${classNameContentItems} `}>
          {items.map((item, i) => {
            return (
              <div
                key={i}
                className={`fenext-steps-item ${classNameItem} ${
                  currentStep == i
                    ? `fenext-steps-item-active ${classNameItemActive}`
                    : ""
                } `}
              >
                {_t(item.content)}
              </div>
            );
          })}
        </div>
        <div className={`fenext-steps-content-btn ${classNameContentBtn} `}>
          {(currentStep != 0 || forceShowBtnPrev) && (
            <Button
              className={`fenext-steps-btn fenext-steps-btn-prev ${classNameBtn} ${classNameBtnPrev}`}
              classNameDisabled={`${classNameBtnDisabled} ${classNameBtnPrevDisabled}`}
              disabled={disabledBtnPrev || currentStep == 0}
              onClick={onPrev_}
              onClickDisabled={onPrevDisabled}
              loader={loader}
              _t={_t}
            >
              {btnPrev}
            </Button>
          )}
          {showCurrentStepNStep && items.length > 1 && (
            <>
              <div className="fenext-steps-current-step">
                {currentStep + 1} / {items.length}
              </div>
            </>
          )}
          {useDogs && items.length > 1 && (
            <>
              <div
                className={`fenext-steps-content-dog ${classNameContentDog}`}
              >
                {new Array(items.length).fill(1).map((e, i) => {
                  return (
                    <>
                      <div
                        key={e * i}
                        onClick={() => {
                          setCurrentStep(i);
                        }}
                        className={`
                                                    fenext-steps-dog
                                                    ${classNameDog}
                                                ${
                                                  currentStep == i
                                                    ? `fenext-steps-dog-current ${classNameDogCurrent}`
                                                    : ""
                                                }    

                                                `}
                      ></div>
                    </>
                  );
                })}
              </div>
            </>
          )}
          {(currentStep != items.length - 1 || forceShowBtnNext) && (
            <Button
              className={`fenext-steps-btn fenext-steps-btn-next ${classNameBtn} ${classNameBtnNext}`}
              classNameDisabled={`${classNameBtnDisabled} ${classNameBtnNextDisabled}`}
              disabled={disabledBtnNext || currentStep === items.length - 1}
              onClick={onNext_}
              onClickDisabled={onNextDisabled}
              loader={loader}
              _t={_t}
            >
              {btnNext}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export type BackTypeOnBack =
  | "fenextjs-history"
  | "history"
  | "router"
  | "link"
  | "none";
/**
 * Properties for the base Back component.
 */
export interface BackBaseProps extends _TProps, useHistoryOnBackProps {
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

  useRouterCustom?: typeof useRouter;
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
export interface BackProps extends BackBaseProps, BackClassProps {}

export const Back = ({
  className = "",
  classNameLoader = "",
  classNameDisabled = "",
  classNameIcon = "",
  classNameContent = "",

  children = "Back",
  loader = false,
  disabled = false,
  onClick = undefined,
  icon = <SvgPaginationPre />,
  typeOnBack = "history",
  link = "",
  minLenght = 2,
  useHistoryMinLenght = false,
  onValidateRuteBack,
  useRouterCustom = useRouter,
  ...props
}: BackProps) => {
  const { onBack: onBackHistory } = useHistory({
    useRouterCustom,
  });
  const { _t } = use_T({ ...props });
  const router = useRouterCustom();
  const onBack = () => {
    if (loader || disabled) {
      return;
    }
    onClick?.();
    const actions: {
      [id in BackTypeOnBack]: () => void;
    } = {
      "fenextjs-history": () => {
        onBackHistory({
          onValidateRuteBack,
        });
      },
      history: () => {
        history.back();
      },
      router: () => {
        router.back();
      },
      link: () => {
        router.push(link);
      },
      none: () => 1,
    };
    actions[typeOnBack]();
  };

  if (useHistoryMinLenght && typeof window != "undefined" && window) {
    if (window.history.length < minLenght) {
      return <></>;
    }
  }

  return (
    <>
      <div
        onClick={onBack}
        className={`fenext-back ${className} ${
          disabled ? `${classNameDisabled} fenext-back-disabled` : ""
        }`}
      >
        <div className={`fenext-back-icon ${classNameIcon}`}>
          {loader ? <Loader classNameLoader={classNameLoader} /> : <>{icon}</>}
        </div>
        <div className={`fenext-back-content ${classNameContent}`}>
          {_t(children)}
        </div>
      </div>
    </>
  );
};

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

export const Theme = ({ className = "", classNameItem = "" }: ThemeProps) => {
  const { setTheme, theme } = useTheme({});
  return (
    <>
      <div
        className={`fenext-theme fenext-theme-current-${theme} ${className} `}
      >
        {ThemeConst.map((t, i) => {
          return (
            <div
              key={i}
              className={`fenext-theme-item fenext-theme-item-${t} fenext-theme-item-${
                t == theme ? "active" : ""
              } ${classNameItem} `}
              onClick={() => {
                setTheme(t);
              }}
            >
              <SvgTheme />
            </div>
          );
        })}
      </div>
    </>
  );
};

export type LinkTypeOnLink = "history" | "router" | "link" | "none";

/**
 * Properties for the base Link component.
 */
export interface LinkBaseProps
  extends PropsWithChildren,
    Partial<AnchorHTMLAttributes<HTMLAnchorElement>>,
    _TProps {}

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
export interface LinkProps extends LinkBaseProps, LinkClassProps {}

export const Link = ({
  className = "",

  children = "",

  ...props
}: LinkProps) => {
  const { _t } = use_T({ ...props });
  return (
    <>
      <a {...props} className={`fenext-link ${className}`}>
        <>{_t(children)}</>
      </a>
    </>
  );
};

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
export interface ShareProps extends ShareBaseProps, ShareClassProps {}

export const Share = ({
  className = "",

  share = "",

  ButtonProps = {
    children: "Share",
  },
  TitleProps = {
    children: "Share",
    tag: "h2",
  },
  shareList = ["whatsapp", "facebook", "x", "email", "copy"],
  showShareCopy = false,
  ...props
}: ShareProps) => {
  const { _t } = use_T({ ...props });
  const LISTSHARE: {
    [id in ShareListType]: {
      urlShare: string;
      icon: ReactNode;
    };
  } = {
    whatsapp: {
      urlShare: "https://web.whatsapp.com/share?url=",
      icon: <SvgWhatsappBox />,
    },
    facebook: {
      urlShare: "https://www.facebook.com/sharer/sharer.php?u=",
      icon: <SvgFacebookBox />,
    },
    x: {
      urlShare: "https://x.com/share?text=",
      icon: <SvgXBox />,
    },
    email: {
      urlShare: "mailto:?body=",
      icon: <SvgEmailBox />,
    },
    copy: {
      urlShare: "",
      icon: <SvgCopyBox />,
    },
  };

  return (
    <>
      <div className={`fenext-share ${className} `}>
        <Modal
          ElementActionModalActive={
            <>
              <Button {...ButtonProps} />
            </>
          }
        >
          <Title {...TitleProps} _t={_t} />

          <div className="fenext-share-items">
            {shareList.map((e, i) => {
              const key = e as ShareListType;
              const item = LISTSHARE[key];

              if (key === "copy") {
                return (
                  <>
                    <Copy
                      key={i}
                      className={`fenext-share-item fenext-share-item-${key}`}
                      text={share}
                      _t={_t}
                    >
                      {item.icon}
                    </Copy>
                  </>
                );
              }

              return (
                <a
                  href={`${item.urlShare}${share}`}
                  key={i}
                  className={`fenext-share-item fenext-share-item-${key}`}
                  target="_blank"
                >
                  {_t(item.icon)}
                </a>
              );
            })}
          </div>
          {showShareCopy && (
            <div className="fenext-share-copy">
              <Copy className={`fenext-share-copy`} text={share} _t={_t}>
                {share}
              </Copy>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

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
export interface ContentLoadingProps
  extends ContentLoadingBaseProps,
    ContentLoadingClassProps {}

export const ContentLoading = ({
  className = "",
  children,
  componentLoader = <LoaderSpinner />,
  loader = false,
  isPage = false,
  ...props
}: ContentLoadingProps) => {
  const { _t } = use_T({ ...props });
  return (
    <>
      <div
        className={`fenext-content-loading fenext-content-loading-${
          loader ? "loader" : ""
        } fenext-content-loading-${isPage ? "page" : ""} ${className} `}
      >
        {loader ? componentLoader : _t(children)}
      </div>
    </>
  );
};

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

export const GridGallery = ({
  className = "",
  classNameItem = "",
  items,
  ...props
}: GridGalleryProps) => {
  const { _t } = use_T({ ...props });
  return (
    <>
      <div className={`fenext-grid-gallery ${className} `}>
        {items.map((item, i) => {
          return (
            <div
              key={i}
              className={`fenext-grid-gallery-item ${classNameItem} `}
            >
              {_t(item)}
            </div>
          );
        })}
      </div>
    </>
  );
};

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
  parseDateYYYYMMDD?: (date: Date) => ReactNode;
  /**
   * Function for parse hours, minutes and seconds
   */
  parseDateHHMMSS?: (date: Date) => ReactNode;
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
export interface ChronologicalListProps
  extends ChronologicalListBaseProps,
    ChronologicalListClassProps {}

export const ChronologicalList = ({
  className = "",
  items,
  market = undefined,
  parseDateHHMMSS: parseDateHHMMSSProps,
  parseDateYYYYMMDD: parseDateYYYYMMDDProps,
  ...props
}: ChronologicalListProps) => {
  const { _t } = use_T({ ...props });
  const ITEMS = useMemo(() => {
    const i_: {
      [id: string]: {
        [id: string]: ChronologicalListItemsProps[];
      };
    } = {};
    items.forEach((element) => {
      const date = parseDateYYYYMMDD(element?.date);
      const time = getTimeToText(element?.date, {
        days: false,
      });

      i_[date] ??= {};
      i_[date][time] ??= [];
      i_[date][time].push(element);
    });
    return i_;
  }, [items]);

  return (
    <>
      <div className={`fenext-chronological-list ${className} `}>
        {Object.keys(ITEMS).map((key_Day, i) => {
          const items_day = ITEMS[key_Day];
          return (
            <>
              <div className={`fenext-chronological-list-group`} key={i}>
                <div className={`fenext-chronological-list-group-day`}>
                  {parseDateYYYYMMDDProps
                    ? parseDateYYYYMMDDProps(new Date(key_Day))
                    : key_Day}
                </div>
                <div className={`fenext-chronological-list-group-list`}>
                  {Object.keys(items_day).map((key_time, j) => {
                    const itemsList = items_day[key_time];
                    return (
                      <>
                        {itemsList?.map((item, k) => {
                          return (
                            <>
                              <div
                                key={`${j}-${k}`}
                                className={`fenext-chronological-list-item ${item?.className ?? ""}`}
                              >
                                <div
                                  className={`fenext-chronological-list-item-market`}
                                >
                                  {item?.market ?? market ?? (
                                    <div
                                      className={`fenext-chronological-list-item-market-default`}
                                    />
                                  )}
                                </div>

                                <div
                                  className={`fenext-chronological-list-item-children`}
                                >
                                  {_t(item?.children)}
                                </div>
                                <div
                                  className={`fenext-chronological-list-item-time`}
                                >
                                  {parseDateHHMMSSProps
                                    ? parseDateHHMMSSProps(item.date)
                                    : key_time}
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

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
   * The class name for email the component.
   */
  classNameEmail?: string;
  /**
   * The class name for Loader the component.
   */
  classNameLoader?: LoaderUserClassProps;
}

export const User = ({
  className = "",
  classNameEmail = "",
  classNamePicture = "",
  classNameImg = "",
  classNameName = "",
  classNameLoader = {},
  user,
  loader = false,
}: UserComponentProps) => {
  if (loader) {
    return (
      <>
        <LoaderUser {...classNameLoader} />
      </>
    );
  }
  return (
    <>
      <div className={`fenext-user ${className} `}>
        <Img
          {...user?.img}
          src={user?.img?.src ?? FenextImgUserPlaceholder}
          className={`fenext-user-picture ${classNamePicture}`}
          classNameImg={`fenext-user-img ${classNameImg}`}
          imgIf404={FenextImgUserPlaceholder}
        />
        <div className={`fenext-user-name ${classNameName} `}>{user?.name}</div>
        <div className={`fenext-user-email ${classNameEmail} `}>
          {user?.email}
        </div>
      </div>
    </>
  );
};

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
  layers?: Pick<
    React.CSSProperties,
    "background" | "mixBlendMode" | "filter" | "opacity"
  >[];
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

  /**
   * executes when image loads
   */
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
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
export interface ImgProps extends ImgBaseProps, ImgClassProps {}

export const Img = ({
  className = "",
  classNameImg = "",
  id,
  name = "",
  alt,
  src,
  srcMin1920 = undefined,
  srcMin1680 = undefined,
  srcMin1440 = undefined,
  srcMin1024 = undefined,
  srcMin992 = undefined,
  srcMin768 = undefined,
  srcMin575 = undefined,
  imgIf404 = FenextImgPlaceholder,
  layers = [],
  onErrorImg: onErrorImg_,
  onClick,
  loader = false,
  onLoad,
}: ImgProps) => {
  const onErrorImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const img: any = e.target;
    if (imgIf404) {
      img.src = imgIf404;
    }
    onErrorImg_?.(e);
  };

  return (
    <>
      <picture
        className={`fenext-picture ${className} id-${id}`}
        onClick={onClick}
      >
        {srcMin1920 ? (
          <>
            <source srcSet={`${srcMin1920}`} media="(min-width: 1920px)" />
          </>
        ) : (
          <></>
        )}
        {srcMin1680 ? (
          <>
            <source srcSet={`${srcMin1680}`} media="(min-width: 1680px)" />
          </>
        ) : (
          <></>
        )}
        {srcMin1440 ? (
          <>
            <source srcSet={`${srcMin1440}`} media="(min-width: 1440px)" />
          </>
        ) : (
          <></>
        )}
        {srcMin1024 ? (
          <>
            <source srcSet={`${srcMin1024}`} media="(min-width: 1024px)" />
          </>
        ) : (
          <></>
        )}
        {srcMin992 ? (
          <>
            <source srcSet={`${srcMin992}`} media="(min-width: 992px)" />
          </>
        ) : (
          <></>
        )}
        {srcMin768 ? (
          <>
            <source srcSet={`${srcMin768}`} media="(min-width: 768px)" />
          </>
        ) : (
          <></>
        )}
        {srcMin575 ? (
          <>
            <source srcSet={`${srcMin575}`} media="(min-width: 575px)" />
          </>
        ) : (
          <></>
        )}
        {loader && <LoaderLine />}
        <img
          src={`${src}`}
          alt={alt ?? name}
          data-src={`${src}`}
          data-name={name}
          data-alt={alt}
          className={`fenext-img ${classNameImg}`}
          onError={onErrorImg}
          onLoad={onLoad}
        />
        {layers?.map((e, i) => (
          <div key={i} className="fenext-img-layer" style={e} />
        ))}
      </picture>
    </>
  );
};

/**
 * Properties for the base DesignTypography component.
 */
export interface DesignTypographyValueProps
  extends Partial<DesignTypographyValue> {}

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

export const DesignTypography = ({
  className = "",

  textTypography = "Typography",
  textExample = "Example",
  textExampleValue = "Lorem ipsum dolor sit",
  textColor = "Color",
  textSize = "Size",
  textAlign = "Alignment",
  textWeight = "Weight",
  textTransform = "Transform",
  textStyle = "Style",
  textDecoration = "Decoration",
  textLineHeight = "Line Height",
  textLetterSpacing = "Letter Spacing",
  textWordSpacing = "Word Spacing",

  defaultValue = {
    fontSize: 20,
    fontSizeUnit: "px",
    textAlign: "left",
    weight: 400,
    transform: "none",
    style: "normal",
    decoration: "normal",
    lineHeight: 1.2,
    lineHeightUnit: "normal",
    letterSpacing: 0,
    letterSpacingUnit: "px",
    wordSpacing: 0,
    wordSpacingUnit: "px",
  },
  value,
  onChange,
  onChangeStyles,

  collapseName,
  collapseType,
  collapseUseActiveForShowChildren = true,
  ...props
}: DesignTypographyProps) => {
  const { _t } = use_T({ ...props });
  const {
    data: data_,
    onChangeData,
    dataMemo,
  } = useData<DesignTypographyValueProps, CSSProperties>(defaultValue, {
    onChangeDataAfter: onChange,
    onChangeDataMemoAfter: onChangeStyles,
    onMemo: parseDesignTypographyValueProps_to_CSSProperties,
  });

  const data = useMemo(() => value ?? data_, [value, data_]);

  const _p = (e) => ({ id: `${e}`, text: `${e}`, data: e });

  return (
    <>
      <div className={`fenext-design-typography ${className} `}>
        <Collapse
          header={<>{_t(textTypography)}</>}
          iconArrow={
            <>
              <SvgEdit />
            </>
          }
          rotateIcon={false}
          name={collapseName}
          type={collapseType}
          useActiveForShowChildren={collapseUseActiveForShowChildren}
        >
          <div className={`fenext-design-typography-content `}>
            <div
              className={`fenext-design-typography-item fenext-design-typography-item-2`}
            >
              <Text>{_t(textExample)}</Text>
              <div className={`fenext-design-typography-content-example `}>
                <Text>
                  <div style={dataMemo}>{_t(textExampleValue)}</div>
                </Text>
              </div>
            </div>
            <div className={`fenext-design-typography-item `}>
              <Text>{_t(textColor)}</Text>
              <InputColor
                defaultValue={data.color}
                onChange={onChangeData("color")}
              />
            </div>
            <div
              className={`fenext-design-typography-item fenext-design-typography-item-3`}
            >
              <Text>{_t(textSize)}</Text>
              <InputNumberCount
                symbolInit=""
                symbolFinal={data.fontSizeUnit}
                defaultValue={data.fontSize}
                min={0}
                aplyMin={true}
                onChange={onChangeData("fontSize")}
              />
              <InputSelectT<DesignTypographyValue["fontSizeUnit"]>
                onParse={_p}
                options={[...ConstDesignTypographyFontSizeUnit]}
                defaultValue={data.fontSizeUnit}
                onChange={onChangeData("fontSizeUnit")}
              />
            </div>
            <div className={`fenext-design-typography-item `}>
              <Text>{_t(textAlign)}</Text>
              <InputSelectT<DesignTypographyValue["textAlign"]>
                onParse={_p}
                options={[...ConstDesignTypographyTextAlignUnit]}
                defaultValue={data.textAlign}
                onChange={onChangeData("textAlign")}
              />
            </div>
            <div className={`fenext-design-typography-item `}>
              <Text>{_t(textWeight)}</Text>
              <InputSelectT<DesignTypographyValue["weight"]>
                onParse={_p}
                options={[...ConstDesignTypographyWeightUnit]}
                defaultValue={data.weight}
                onChange={onChangeData("weight")}
              />
            </div>
            <div className={`fenext-design-typography-item `}>
              <Text>{_t(textTransform)}</Text>
              <InputSelectT<DesignTypographyValue["transform"]>
                onParse={_p}
                options={[...ConstDesignTypographyTransformUnit]}
                defaultValue={data.transform}
                onChange={onChangeData("transform")}
              />
            </div>
            <div className={`fenext-design-typography-item `}>
              <Text>{_t(textStyle)}</Text>
              <InputSelectT<DesignTypographyValue["style"]>
                onParse={_p}
                options={[...ConstDesignTypographyStyleUnit]}
                defaultValue={data.style}
                onChange={onChangeData("style")}
              />
            </div>
            <div className={`fenext-design-typography-item `}>
              <Text>{_t(textDecoration)}</Text>
              <InputSelectT<DesignTypographyValue["decoration"]>
                onParse={_p}
                options={[...ConstDesignTypographyDecorationUnit]}
                defaultValue={data.decoration}
                onChange={onChangeData("decoration")}
              />
            </div>
            <div
              className={`fenext-design-typography-item fenext-design-typography-item-3`}
            >
              <Text>{_t(textLineHeight)}</Text>
              <InputNumberCount
                symbolInit=""
                symbolFinal={
                  data.lineHeightUnit == "normal" ? "" : data.lineHeightUnit
                }
                defaultValue={data.lineHeight}
                onChange={onChangeData("lineHeight")}
              />
              <InputSelectT<DesignTypographyValue["lineHeightUnit"]>
                onParse={_p}
                options={[...ConstDesignTypographyLineHeightUnit]}
                defaultValue={data.lineHeightUnit}
                onChange={onChangeData("lineHeightUnit")}
              />
            </div>
            <div
              className={`fenext-design-typography-item fenext-design-typography-item-3`}
            >
              <Text>{_t(textLetterSpacing)}</Text>
              <InputNumberCount
                symbolInit=""
                symbolFinal={data.letterSpacingUnit}
                defaultValue={data.letterSpacing}
                onChange={onChangeData("letterSpacing")}
              />
              <InputSelectT<DesignTypographyValue["letterSpacingUnit"]>
                onParse={_p}
                options={[...ConstDesignTypographyLetterSpacingUnit]}
                defaultValue={data.letterSpacingUnit}
                onChange={onChangeData("letterSpacingUnit")}
              />
            </div>
            <div
              className={`fenext-design-typography-item fenext-design-typography-item-3`}
            >
              <Text>{_t(textWordSpacing)}</Text>
              <InputNumberCount
                symbolInit=""
                symbolFinal={data.wordSpacingUnit}
                defaultValue={data.wordSpacing}
                onChange={onChangeData("wordSpacing")}
              />
              <InputSelectT<DesignTypographyValue["wordSpacingUnit"]>
                onParse={_p}
                options={[...ConstDesignTypographyWordSpacingUnit]}
                defaultValue={data.wordSpacingUnit}
                onChange={onChangeData("wordSpacingUnit")}
              />
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export const parseDesignTypographyValueProps_to_CSSProperties = (
  d: Partial<DesignTypographyValue>,
): CSSProperties => {
  return {
    fontSize: `${d.fontSize}${d.fontSizeUnit}`,
    textAlign: d.textAlign,
    fontWeight: d.weight,
    textTransform: d.transform,
    fontStyle: d.style,
    textDecoration: d.decoration,
    lineHeight: `${d.lineHeight}${d.lineHeightUnit == "normal" ? "" : d.lineHeightUnit}`,
    letterSpacing: `${d.letterSpacing}${d.letterSpacingUnit}`,
    wordSpacing: `${d.wordSpacing}${d.wordSpacingUnit}`,
    color: d.color,
  };
};

export const ConstDesignTypographyFontSizeUnit = ["px", "em", "rem"] as const;
export type DesignTypographyFontSizeUnit =
  (typeof ConstDesignTypographyFontSizeUnit)[number];

export const ConstDesignTypographyTextAlignUnit = [
  "center",
  "justify",
  "left",
  "right",
] as const;
export type DesignTypographyTextAlignUnit =
  (typeof ConstDesignTypographyTextAlignUnit)[number];

export const ConstDesignTypographyWeightUnit = [
  100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;
export type DesignTypographyWeightUnit =
  (typeof ConstDesignTypographyWeightUnit)[number];

export const ConstDesignTypographyTransformUnit = [
  "none",
  "uppercase",
  "lowercase",
  "capitalize",
] as const;
export type DesignTypographyTransformUnit =
  (typeof ConstDesignTypographyTransformUnit)[number];

export const ConstDesignTypographyStyleUnit = [
  "normal",
  "italic",
  "oblique",
] as const;
export type DesignTypographyStyleUnit =
  (typeof ConstDesignTypographyStyleUnit)[number];

export const ConstDesignTypographyDecorationUnit = [
  "normal",
  "underline",
  "overline",
  "line-through",
] as const;
export type DesignTypographyDecorationUnit =
  (typeof ConstDesignTypographyDecorationUnit)[number];

export const ConstDesignTypographyLineHeightUnit = [
  "normal",
  "px",
  "em",
  "rem",
] as const;
export type DesignTypographyLineHeightUnit =
  (typeof ConstDesignTypographyLineHeightUnit)[number];

export const ConstDesignTypographyLetterSpacingUnit = [
  "px",
  "em",
  "rem",
] as const;
export type DesignTypographyLetterSpacingUnit =
  (typeof ConstDesignTypographyLetterSpacingUnit)[number];

export const ConstDesignTypographyWordSpacingUnit = [
  "px",
  "em",
  "rem",
] as const;
export type DesignTypographyWordSpacingUnit =
  (typeof ConstDesignTypographyWordSpacingUnit)[number];

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

export interface DesignBoxTextProps
  extends DesignBoxPaddingProps,
    DesignBoxMarginProps,
    DesignBoxBorderProps,
    DesignBoxBorderRadiusProps,
    DesignBoxBorderColorProps,
    DesignBoxBackgroundProps,
    DesignBoxWidthProps,
    DesignBoxHeightProps,
    DesignBoxGapProps,
    DesignBoxAlignProps,
    DesignBoxBorderStyleProps {}

/**
 * Properties for the base DesignBox component.
 */
export interface DesignBoxProps
  extends Omit<
    DesignBoxTextProps,
    "setDataFunction" | "data" | "onChangeData"
  > {
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

export const DesignBox = ({
  className = "",

  textBox = "Box",

  textBackground = "Background",

  textPadding = "Padding",
  textPaddingBottom = "Bottom",
  textPaddingLeft = "Left",
  textPaddingRight = "Right",
  textPaddingTop = "Top",

  textMargin = "Margin",
  textMarginBottom = "Bottom",
  textMarginLeft = "Left",
  textMarginRight = "Right",
  textMarginTop = "Top",

  textBorder = "Border",
  textBorderBottom = "Bottom",
  textBorderLeft = "Left",
  textBorderRight = "Right",
  textBorderTop = "Top",

  textBorderRadius = "Border Radius",
  textBorderRadiusTopLeft = "Top Left",
  textBorderRadiusTopRight = "Top Right",
  textBorderRadiusBottomLeft = "Bottom Left",
  textBorderRadiusBottomRight = "Bottom Right",

  textBorderStyle = "Border Style",
  textBorderStyleTop = "Top",
  textBorderStyleLeft = "Left",
  textBorderStyleRight = "Right",
  textBorderStyleBottom = "Bottom",

  textBorderColor = "Border Color",

  textWidth = "Width",
  textMinWidth = "Min Width",
  textMaxWidth = "Max Width",

  textHeight = "Height",
  textMinHeight = "Min Height",
  textMaxHeight = "Max Height",

  textAlignItems = "Align Vertical",
  textJustifyContent = "Align Horizontal",

  textGap = "Gap",
  textGapRow = "Gap Row",
  textGapColumn = "Gap Column",

  defaultValue = {
    widthUnit: "auto",
    minWidthUnit: "auto",
    maxWidthUnit: "auto",
    heightUnit: "auto",
    minHeightUnit: "auto",
    maxHeightUnit: "auto",
    paddingUnit: "px",
    marginUnit: "px",
    borderUnit: "px",
    borderUnitRadius: "px",
    gapUnit: "px",
    borderTopStyle: "hidden",
    borderLeftStyle: "hidden",
    borderRightStyle: "hidden",
    borderBottomStyle: "hidden",

    justifyContent: "stretch",
    alignItems: "start",
  },
  value,
  onChange,
  onChangeStyles,

  collapseName,
  collapseType,
  collapseUseActiveForShowChildren = true,
  ...props
}: DesignBoxProps) => {
  const { _t } = use_T({ ...props });
  const {
    onChangeData,
    data: data_,
    setDataFunction,
  } = useData<DesignBoxValueProps, CSSProperties>(defaultValue, {
    onChangeDataAfter: onChange,
    onChangeDataMemoAfter: onChangeStyles,
    onMemo: parseDesignBoxValueProps_to_CSSProperties,
  });

  const data = useMemo(() => value ?? data_, [value, data_]);

  return (
    <>
      <div className={`fenext-design-box ${className} `}>
        <Collapse
          header={<>{_t(textBox)}</>}
          iconArrow={
            <>
              <SvgEdit />
            </>
          }
          rotateIcon={false}
          name={collapseName}
          type={collapseType}
          useActiveForShowChildren={collapseUseActiveForShowChildren}
        >
          <div className={`fenext-design-box-content `}>
            <DesignBoxBackground
              data={data}
              onChangeData={onChangeData}
              setDataFunction={setDataFunction}
              textBackground={textBackground}
              _t={_t}
            />
            <DesignBoxPadding
              data={data}
              onChangeData={onChangeData}
              setDataFunction={setDataFunction}
              textPadding={textPadding}
              textPaddingBottom={textPaddingBottom}
              textPaddingLeft={textPaddingLeft}
              textPaddingRight={textPaddingRight}
              textPaddingTop={textPaddingTop}
              _t={_t}
            />
            <DesignBoxMargin
              data={data}
              onChangeData={onChangeData}
              setDataFunction={setDataFunction}
              textMargin={textMargin}
              textMarginBottom={textMarginBottom}
              textMarginLeft={textMarginLeft}
              textMarginRight={textMarginRight}
              textMarginTop={textMarginTop}
              _t={_t}
            />
            <DesignBoxBorder
              data={data}
              onChangeData={onChangeData}
              setDataFunction={setDataFunction}
              textBorder={textBorder}
              textBorderBottom={textBorderBottom}
              textBorderLeft={textBorderLeft}
              textBorderRight={textBorderRight}
              textBorderTop={textBorderTop}
              _t={_t}
            />
            <DesignBoxBorderRadius
              data={data}
              onChangeData={onChangeData}
              setDataFunction={setDataFunction}
              textBorderRadius={textBorderRadius}
              textBorderRadiusBottomLeft={textBorderRadiusBottomLeft}
              textBorderRadiusBottomRight={textBorderRadiusBottomRight}
              textBorderRadiusTopLeft={textBorderRadiusTopLeft}
              textBorderRadiusTopRight={textBorderRadiusTopRight}
              _t={_t}
            />
            <DesignBoxBorderStyle
              data={data}
              onChangeData={onChangeData}
              setDataFunction={setDataFunction}
              textBorderStyle={textBorderStyle}
              textBorderStyleBottom={textBorderStyleBottom}
              textBorderStyleLeft={textBorderStyleLeft}
              textBorderStyleRight={textBorderStyleRight}
              textBorderStyleTop={textBorderStyleTop}
              _t={_t}
            />
            <DesignBoxBorderColor
              data={data}
              onChangeData={onChangeData}
              setDataFunction={setDataFunction}
              textBorderColor={textBorderColor}
              _t={_t}
            />
            <DesignBoxWidth
              data={data}
              onChangeData={onChangeData}
              setDataFunction={setDataFunction}
              textWidth={textWidth}
              textMaxWidth={textMaxWidth}
              textMinWidth={textMinWidth}
              _t={_t}
            />
            <DesignBoxHeight
              data={data}
              onChangeData={onChangeData}
              setDataFunction={setDataFunction}
              textHeight={textHeight}
              textMaxHeight={textMaxHeight}
              textMinHeight={textMinHeight}
              _t={_t}
            />
            <DesignBoxAlign
              data={data}
              onChangeData={onChangeData}
              setDataFunction={setDataFunction}
              textAlignItems={textAlignItems}
              textJustifyContent={textJustifyContent}
              _t={_t}
            />
            <DesignBoxGap
              data={data}
              onChangeData={onChangeData}
              setDataFunction={setDataFunction}
              textGap={textGap}
              textGapRow={textGapRow}
              textGapColumn={textGapColumn}
              _t={_t}
            />
          </div>
        </Collapse>
      </div>
    </>
  );
};

/**
 * Properties for the base DesignBoxWidth component.
 */
export interface DesignBoxWidthProps extends DesignBoxUseDataProps {
  textWidth?: string;
  textMinWidth?: string;
  textMaxWidth?: string;
}

export const DesignBoxWidth = ({
  textWidth = "Width",
  textMinWidth = "Min Width",
  textMaxWidth = "Max Width",

  data,
  onChangeData,
  ...props
}: DesignBoxWidthProps) => {
  const { _t } = use_T({ ...props });
  const _p = (e) => ({ id: `${e}`, text: `${e}`, data: e });

  return (
    <>
      <div className={` fenext-design-box-item fenext-design-box-item-2-2`}>
        <Text>{_t(textWidth)}</Text>
        <InputNumberCount
          defaultValue={data.width}
          onChange={onChangeData("width")}
          symbolInit=""
          symbolFinal={data.widthUnit}
          placeholder="Width"
        />
        <InputSelectT<DesignBoxValue["widthUnit"]>
          onParse={_p}
          options={[...ConstDesignBoxWidthUnit]}
          defaultValue={data.widthUnit}
          onChange={onChangeData("widthUnit")}
          placeholder="Width"
        />
      </div>
      <div className={`fenext-design-box-item fenext-design-box-item-2-2`}>
        <Text>{_t(textMaxWidth)}</Text>
        <InputNumberCount
          defaultValue={data.maxWidth}
          onChange={onChangeData("maxWidth")}
          symbolInit=""
          symbolFinal={data.maxWidthUnit}
          placeholder="Max Width"
        />
        <InputSelectT<DesignBoxValue["maxWidthUnit"]>
          onParse={_p}
          options={[...ConstDesignBoxWidthUnit]}
          defaultValue={data.maxWidthUnit}
          onChange={onChangeData("maxWidthUnit")}
          placeholder="Max Width"
        />
      </div>
      <div className={`fenext-design-box-item fenext-design-box-item-2-2`}>
        <Text>{_t(textMinWidth)}</Text>
        <InputNumberCount
          defaultValue={data.minWidth}
          onChange={onChangeData("minWidth")}
          symbolInit=""
          symbolFinal={data.minWidthUnit}
          placeholder="Min Width"
        />
        <InputSelectT<DesignBoxValue["minWidthUnit"]>
          onParse={_p}
          options={[...ConstDesignBoxWidthUnit]}
          defaultValue={data.minWidthUnit}
          onChange={onChangeData("minWidthUnit")}
          placeholder="Min Width"
        />
      </div>
    </>
  );
};

export const parseDesignBoxValueProps_to_CSSProperties = (
  d: Partial<DesignBoxValue>,
): CSSProperties => {
  return {
    display: "grid",

    background: `${d.background ?? "initial"}`,

    paddingTop: `${d.paddingTop ?? 0}${d.paddingUnit ?? "px"}`,
    paddingLeft: `${d.paddingLeft ?? 0}${d.paddingUnit ?? "px"}`,
    paddingRight: `${d.paddingRight ?? 0}${d.paddingUnit ?? "px"}`,
    paddingBottom: `${d.paddingBottom ?? 0}${d.paddingUnit ?? "px"}`,

    marginTop: `${d.marginTop ?? 0}${d.marginUnit ?? "px"}`,
    marginLeft: `${d.marginLeft ?? 0}${d.marginUnit ?? "px"}`,
    marginRight: `${d.marginRight ?? 0}${d.marginUnit ?? "px"}`,
    marginBottom: `${d.marginBottom ?? 0}${d.marginUnit ?? "px"}`,

    borderTopWidth: `${d.borderTop ?? 0}${d.borderUnit ?? "px"}`,
    borderLeftWidth: `${d.borderLeft ?? 0}${d.borderUnit ?? "px"}`,
    borderRightWidth: `${d.borderRight ?? 0}${d.borderUnit ?? "px"}`,
    borderBottomWidth: `${d.borderBottom ?? 0}${d.borderUnit ?? "px"}`,

    borderTopStyle: `${d.borderTopStyle ?? "hidden"}`,
    borderLeftStyle: `${d.borderLeftStyle ?? "hidden"}`,
    borderRightStyle: `${d.borderRightStyle ?? "hidden"}`,
    borderBottomStyle: `${d.borderBottomStyle ?? "hidden"}`,

    borderTopLeftRadius: `${d.borderTopLeftRadius ?? 0}${d.borderUnitRadius ?? "px"}`,
    borderTopRightRadius: `${d.borderTopRightRadius ?? 0}${d.borderUnitRadius ?? "px"}`,
    borderBottomLeftRadius: `${d.borderBottomLeftRadius ?? 0}${d.borderUnitRadius ?? "px"}`,
    borderBottomRightRadius: `${d.borderBottomRightRadius ?? 0}${d.borderUnitRadius ?? "px"}`,

    borderColor: `${d.borderColor ?? "initial"}`,

    width: `${d.widthUnit == "auto" ? "auto" : `${d.width ?? 0}${d.widthUnit ?? "px"}`}`,
    minWidth: `${d.minWidthUnit == "auto" ? "auto" : `${d.minWidth ?? 0}${d.minWidthUnit ?? "px"}`}`,
    maxWidth: `${d.maxWidthUnit == "auto" ? "auto" : `${d.maxWidth ?? 0}${d.maxWidthUnit ?? "px"}`}`,

    height: `${d.heightUnit == "auto" ? "auto" : `${d.height ?? 0}${d.heightUnit ?? "px"}`}`,
    minHeight: `${d.minHeightUnit == "auto" ? "auto" : `${d.minHeight ?? 0}${d.minHeightUnit ?? "px"}`}`,
    maxHeight: `${d.maxHeightUnit == "auto" ? "auto" : `${d.maxHeight ?? 0}${d.maxHeightUnit ?? "px"}`}`,

    justifyContent: `${d.justifyContent ?? "start"}`,
    alignItems: `${d.alignItems ?? "start"}`,

    rowGap: `${d.gapRow ?? 0}${d.gapUnit ?? "px"}`,
    columnGap: `${d.gapColumn ?? 0}${d.gapUnit ?? "px"}`,
  };
};

/**
 * Properties for the base DesignBoxBorderColor component.
 */
export interface DesignBoxBorderColorProps extends DesignBoxUseDataProps {
  textBorderColor?: string;
}

export const DesignBoxBorderColor = ({
  textBorderColor = "Border Color",

  data,
  onChangeData,
  ...props
}: DesignBoxBorderColorProps) => {
  const { _t } = use_T({ ...props });
  return (
    <>
      <div className={`fenext-design-box-item fenext-design-box-item-1-2`}>
        <Text>{_t(textBorderColor)}</Text>
        <InputColor
          value={data.borderColor}
          onChange={onChangeData("borderColor")}
        />
      </div>
    </>
  );
};

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

export const DesignBoxBorderStyle = ({
  textBorderStyle = "Border Style",
  textBorderStyleTop = "Top",
  textBorderStyleLeft = "Left",
  textBorderStyleRight = "Right",
  textBorderStyleBottom = "Bottom",

  data,
  setDataFunction,
  ...props
}: DesignBoxBorderStyleProps) => {
  const { _t } = use_T({ ...props });
  const _p = (e) => ({ id: `${e}`, text: `${e}`, data: e });

  const onChangeBorderStyle =
    (
      borderStyle:
        | "borderTopStyle"
        | "borderLeftStyle"
        | "borderRightStyle"
        | "borderBottomStyle",
    ) =>
    (e?: DesignBoxBorderStylesUnit) => {
      setDataFunction((old) => {
        const n = { ...old };
        const v = e;
        n[borderStyle] = v;
        if (n.borderStyleTogether) {
          n.borderTopStyle = v;
          n.borderLeftStyle = v;
          n.borderRightStyle = v;
          n.borderBottomStyle = v;
        }
        return n;
      });
    };
  const onChangeBorderStyleTogether = (e: boolean) => {
    setDataFunction((old) => {
      const n = { ...old };
      n.borderStyleTogether = e;
      if (e) {
        n.borderTopStyle = "hidden";
        n.borderLeftStyle = "hidden";
        n.borderRightStyle = "hidden";
        n.borderBottomStyle = "hidden";
      }
      return n;
    });
  };

  return (
    <>
      <div className={`fenext-design-box-item`}>
        <Text>{_t(textBorderStyle)}</Text>
        <div></div>
        <InputCheckbox
          defaultValue={data.borderStyleTogether}
          onChange={onChangeBorderStyleTogether}
          label={
            <>
              <SvgLink />
            </>
          }
          classNameLabel="fenext-design-box-item-together"
        />
        <div className={`fenext-design-box-item fenext-design-box-item-4`}>
          <InputSelectT<DesignBoxValue["borderTopStyle"]>
            onParse={_p}
            options={[...ConstDesignBoxBorderStylesUnit]}
            placeholder={textBorderStyleTop}
            onChange={onChangeBorderStyle("borderTopStyle")}
            value={data.borderTopStyle}
          />

          <InputSelectT<DesignBoxValue["borderLeftStyle"]>
            onParse={_p}
            options={[...ConstDesignBoxBorderStylesUnit]}
            placeholder={textBorderStyleLeft}
            onChange={onChangeBorderStyle("borderLeftStyle")}
            value={data.borderLeftStyle}
          />

          <InputSelectT<DesignBoxValue["borderRightStyle"]>
            onParse={_p}
            options={[...ConstDesignBoxBorderStylesUnit]}
            placeholder={textBorderStyleRight}
            onChange={onChangeBorderStyle("borderRightStyle")}
            value={data.borderRightStyle}
          />

          <InputSelectT<DesignBoxValue["borderBottomStyle"]>
            onParse={_p}
            options={[...ConstDesignBoxBorderStylesUnit]}
            placeholder={textBorderStyleBottom}
            onChange={onChangeBorderStyle("borderBottomStyle")}
            value={data.borderBottomStyle}
          />
        </div>
      </div>
    </>
  );
};

export const ConstDesignBoxMarginUnit = ["px", "em", "rem"] as const;
export type DesignBoxMarginUnit = (typeof ConstDesignBoxMarginUnit)[number];

export const ConstDesignBoxPaddingUnit = ["px", "em", "rem"] as const;
export type DesignBoxPaddingUnit = (typeof ConstDesignBoxPaddingUnit)[number];

export const ConstDesignBoxBorderUnit = ["px", "em", "rem"] as const;
export type DesignBoxBorderUnit = (typeof ConstDesignBoxBorderUnit)[number];

export const ConstDesignBoxBorderRadiusUnit = ["px", "em", "rem"] as const;
export type DesignBoxBorderRadiusUnit =
  (typeof ConstDesignBoxBorderRadiusUnit)[number];

export const ConstDesignBoxBorderStylesUnit = [
  "dashed",
  "dotted",
  "double",
  "groove",
  "hidden",
  "inset",
  "none",
  "outset",
  "ridge",
  "solid",
] as const;
export type DesignBoxBorderStylesUnit =
  (typeof ConstDesignBoxBorderStylesUnit)[number];

export const ConstDesignBoxWidthUnit = [
  "px",
  "em",
  "rem",
  "%",
  "vw",
  "dvw",
  "auto",
] as const;
export type DesignBoxWidthUnit = (typeof ConstDesignBoxWidthUnit)[number];

export const ConstDesignBoxHeightUnit = [
  "px",
  "em",
  "rem",
  "%",
  "vw",
  "dvw",
  "auto",
] as const;
export type DesignBoxHeightUnit = (typeof ConstDesignBoxHeightUnit)[number];

export const ConstDesignBoxJustifyContentUnit = [
  "center",
  "end",
  "start",
  "space-around",
  "space-between",
  "space-evenly",
  "stretch",
] as const;
export type DesignBoxJustifyContentUnit =
  (typeof ConstDesignBoxJustifyContentUnit)[number];

export const ConstDesignBoxAlignItemsUnit = [
  "baseline",
  "normal",
  "stretch",
  "center",
  "end",
  "start",
] as const;
export type DesignBoxAlignItemsUnit =
  (typeof ConstDesignBoxAlignItemsUnit)[number];

export const ConstDesignBoxGapsUnit = ["px", "em", "rem"] as const;
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

export type useDataDesignBoxUseDataProps = Pick<
  ReturnType<typeof useData<DesignBoxValueProps>>,
  "setDataFunction" | "data" | "onChangeData"
>;

export interface DesignBoxUseDataProps
  extends _TProps,
    useDataDesignBoxUseDataProps {}

/**
 * Properties for the base DesignBoxAlign component.
 */
export interface DesignBoxAlignProps extends DesignBoxUseDataProps {
  textAlignItems?: string;
  textJustifyContent?: string;
}

export const DesignBoxAlign = ({
  textAlignItems = "Align Vertical",
  textJustifyContent = "Align Horizontal",

  data,
  onChangeData,
  ...props
}: DesignBoxAlignProps) => {
  const { _t } = use_T({ ...props });
  const _p = (e) => ({ id: `${e}`, text: `${e}`, data: e });

  return (
    <>
      <div className={` fenext-design-box-item fenext-design-box-item-1-2`}>
        <Text>{_t(textAlignItems)}</Text>
        <InputSelectT<DesignBoxValue["alignItems"]>
          onParse={_p}
          options={[...ConstDesignBoxAlignItemsUnit]}
          defaultValue={data.alignItems}
          onChange={onChangeData("alignItems")}
          placeholder={textAlignItems}
        />
      </div>
      <div className={` fenext-design-box-item fenext-design-box-item-1-2`}>
        <Text>{_t(textJustifyContent)}</Text>
        <InputSelectT<DesignBoxValue["justifyContent"]>
          onParse={_p}
          options={[...ConstDesignBoxJustifyContentUnit]}
          defaultValue={data.justifyContent}
          onChange={onChangeData("justifyContent")}
          placeholder={textJustifyContent}
        />
      </div>
    </>
  );
};

/**
 * Properties for the base DesignBoxHeight component.
 */
export interface DesignBoxHeightProps extends DesignBoxUseDataProps {
  textHeight?: string;
  textMinHeight?: string;
  textMaxHeight?: string;
}

export const DesignBoxHeight = ({
  textHeight = "Height",
  textMinHeight = "Min Height",
  textMaxHeight = "Max Height",

  data,
  onChangeData,
  ...props
}: DesignBoxHeightProps) => {
  const { _t } = use_T({ ...props });
  const _p = (e) => ({ id: `${e}`, text: `${e}`, data: e });

  return (
    <>
      <div className={`fenext-design-box-item fenext-design-box-item-2-2`}>
        <Text>{_t(textHeight)}</Text>
        <InputNumberCount
          defaultValue={data.height}
          onChange={onChangeData("height")}
          symbolInit=""
          symbolFinal={data.heightUnit}
          placeholder="Height"
        />
        <InputSelectT<DesignBoxValue["heightUnit"]>
          onParse={_p}
          options={[...ConstDesignBoxHeightUnit]}
          defaultValue={data.heightUnit}
          onChange={onChangeData("heightUnit")}
          placeholder="Height"
        />
      </div>
      <div className={`fenext-design-box-item fenext-design-box-item-2-2`}>
        <Text>{_t(textMaxHeight)}</Text>
        <InputNumberCount
          defaultValue={data.maxHeight}
          onChange={onChangeData("maxHeight")}
          symbolInit=""
          symbolFinal={data.maxHeightUnit}
          placeholder="Max Height"
        />
        <InputSelectT<DesignBoxValue["maxHeightUnit"]>
          onParse={_p}
          options={[...ConstDesignBoxHeightUnit]}
          defaultValue={data.maxHeightUnit}
          onChange={onChangeData("maxHeightUnit")}
          placeholder="Max Height"
        />
      </div>
      <div className={`fenext-design-box-item fenext-design-box-item-2-2`}>
        <Text>{_t(textMinHeight)}</Text>
        <InputNumberCount
          defaultValue={data.minHeight}
          onChange={onChangeData("minHeight")}
          symbolInit=""
          symbolFinal={data.minHeightUnit}
          placeholder="Min Height"
        />
        <InputSelectT<DesignBoxValue["minHeightUnit"]>
          onParse={_p}
          options={[...ConstDesignBoxHeightUnit]}
          defaultValue={data.minHeightUnit}
          onChange={onChangeData("minHeightUnit")}
          placeholder="Min Height"
        />
      </div>
    </>
  );
};

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

export const DesignBoxBorderRadius = ({
  textBorderRadius = "Border Radius",
  textBorderRadiusTopLeft = "Top Left",
  textBorderRadiusTopRight = "Top Right",
  textBorderRadiusBottomLeft = "Bottom Left",
  textBorderRadiusBottomRight = "Bottom Right",

  data,
  onChangeData,
  setDataFunction,
  ...props
}: DesignBoxBorderRadiusProps) => {
  const { _t } = use_T({ ...props });
  const _p = (e) => ({ id: `${e}`, text: `${e}`, data: e });

  const onChangeBorderRadius =
    (
      borderRadius:
        | "borderTopLeftRadius"
        | "borderTopRightRadius"
        | "borderBottomLeftRadius"
        | "borderBottomRightRadius",
    ) =>
    (e: number | "") => {
      setDataFunction((old) => {
        const n = { ...old };
        const v = e == "" ? undefined : e;
        n[borderRadius] = v;
        if (n.borderRadiusTogether) {
          n.borderTopLeftRadius = v;
          n.borderTopRightRadius = v;
          n.borderBottomLeftRadius = v;
          n.borderBottomRightRadius = v;
        }
        return n;
      });
    };
  const onChangeBorderRadiusTogether = (e: boolean) => {
    setDataFunction((old) => {
      const n = { ...old };
      n.borderRadiusTogether = e;
      if (e) {
        n.borderTopLeftRadius = 0;
        n.borderTopRightRadius = 0;
        n.borderBottomLeftRadius = 0;
        n.borderBottomRightRadius = 0;
      }
      return n;
    });
  };

  return (
    <>
      <div className={`fenext-design-box-item`}>
        <Text>{_t(textBorderRadius)}</Text>
        <InputSelectT<DesignBoxValue["borderUnitRadius"]>
          onParse={_p}
          options={[...ConstDesignBoxBorderRadiusUnit]}
          defaultValue={data.borderUnitRadius}
          onChange={onChangeData("borderUnitRadius")}
          placeholder="Unit"
        />
        <InputCheckbox
          defaultValue={data.borderRadiusTogether}
          onChange={onChangeBorderRadiusTogether}
          label={
            <>
              <SvgLink />
            </>
          }
          classNameLabel="fenext-design-box-item-together"
        />
        <div className={`fenext-design-box-item fenext-design-box-item-4`}>
          <InputNumberCount
            placeholder={textBorderRadiusTopLeft}
            onChange={onChangeBorderRadius("borderTopLeftRadius")}
            value={data.borderTopLeftRadius}
            symbolInit=""
            symbolFinal={data.borderUnitRadius}
          />
          <InputNumberCount
            placeholder={textBorderRadiusTopRight}
            onChange={onChangeBorderRadius("borderTopRightRadius")}
            value={data.borderTopRightRadius}
            symbolInit=""
            symbolFinal={data.borderUnitRadius}
          />
          <InputNumberCount
            placeholder={textBorderRadiusBottomLeft}
            onChange={onChangeBorderRadius("borderBottomLeftRadius")}
            value={data.borderBottomLeftRadius}
            symbolInit=""
            symbolFinal={data.borderUnitRadius}
          />
          <InputNumberCount
            placeholder={textBorderRadiusBottomRight}
            onChange={onChangeBorderRadius("borderBottomRightRadius")}
            value={data.borderBottomRightRadius}
            symbolInit=""
            symbolFinal={data.borderUnitRadius}
          />
        </div>
      </div>
    </>
  );
};

/**
 * Properties for the base DesignBoxGap component.
 */
export interface DesignBoxGapProps extends DesignBoxUseDataProps {
  textGap?: string;
  textGapRow?: string;
  textGapColumn?: string;
}

export const DesignBoxGap = ({
  textGap = "Gap",
  textGapRow = "Gap Row",
  textGapColumn = "Gap Column",

  data,
  onChangeData,
  setDataFunction,
  ...props
}: DesignBoxGapProps) => {
  const { _t } = use_T({ ...props });
  const _p = (e) => ({ id: `${e}`, text: `${e}`, data: e });

  const onChangeGap = (gap: "gapColumn" | "gapRow") => (e: number | "") => {
    setDataFunction((old) => {
      const n = { ...old };
      const v = e == "" ? undefined : e;
      n[gap] = v;
      if (n.gapTogether) {
        n.gapColumn = v;
        n.gapRow = v;
      }
      return n;
    });
  };
  const onChangeGapTogether = (e: boolean) => {
    setDataFunction((old) => {
      const n = { ...old };
      n.gapTogether = e;
      if (n.gapTogether) {
        n.gapColumn = 0;
        n.gapRow = 0;
      }
      return n;
    });
  };

  return (
    <>
      <div className={`fenext-design-box-item`}>
        <Text>{_t(textGap)}</Text>
        <InputSelectT<DesignBoxValue["gapUnit"]>
          onParse={_p}
          options={[...ConstDesignBoxGapsUnit]}
          defaultValue={data.gapUnit}
          onChange={onChangeData("gapUnit")}
          placeholder="Unit"
        />
        <InputCheckbox
          defaultValue={data.gapTogether}
          onChange={onChangeGapTogether}
          label={
            <>
              <SvgLink />
            </>
          }
          classNameLabel="fenext-design-box-item-together"
        />
        <div className={`fenext-design-box-item fenext-design-box-item-2`}>
          <InputNumberCount
            placeholder={textGapRow}
            onChange={onChangeGap("gapRow")}
            value={data.gapRow}
            symbolInit=""
            symbolFinal={data.gapUnit}
          />
          <InputNumberCount
            placeholder={textGapColumn}
            onChange={onChangeGap("gapColumn")}
            value={data.gapColumn}
            symbolInit=""
            symbolFinal={data.gapUnit}
          />
        </div>
      </div>
    </>
  );
};

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

export const DesignBoxBorder = ({
  textBorder = "Border",
  textBorderBottom = "Bottom",
  textBorderLeft = "Left",
  textBorderRight = "Right",
  textBorderTop = "Top",

  data,
  setDataFunction,
  onChangeData,
  ...props
}: DesignBoxBorderProps) => {
  const { _t } = use_T({ ...props });
  const _p = (e) => ({ id: `${e}`, text: `${e}`, data: e });

  const onChangeBorder = useCallback(
    (border: "borderTop" | "borderRight" | "borderBottom" | "borderLeft") =>
      (e: number | "") => {
        setDataFunction((old) => {
          const n = { ...old };
          const v = e == "" ? undefined : e;
          n[border] = v;
          if (n.borderTogether) {
            n.borderTop = v;
            n.borderRight = v;
            n.borderBottom = v;
            n.borderLeft = v;
          }
          return n;
        });
      },
    [data],
  );

  const onChangeBorderTogether = (e: boolean) => {
    setDataFunction((old) => {
      const n = { ...old };
      n.borderTogether = e;
      if (e) {
        n.borderBottom = 0;
        n.borderLeft = 0;
        n.borderRight = 0;
        n.borderTop = 0;
      }
      return n;
    });
  };

  return (
    <>
      <div className={`fenext-design-box-item`}>
        <Text>{_t(textBorder)}</Text>
        <InputSelectT<DesignBoxValue["borderUnit"]>
          onParse={_p}
          options={[...ConstDesignBoxBorderUnit]}
          defaultValue={data.borderUnit}
          onChange={onChangeData("borderUnit")}
          placeholder="Unit"
        />
        <InputCheckbox
          defaultValue={data.borderTogether}
          onChange={onChangeBorderTogether}
          label={
            <>
              <SvgLink />
            </>
          }
          classNameLabel="fenext-design-box-item-together"
        />
        <div className={`fenext-design-box-item fenext-design-box-item-4`}>
          <InputNumberCount
            placeholder={textBorderTop}
            onChange={onChangeBorder("borderTop")}
            value={data.borderTop}
            symbolInit=""
            symbolFinal={data.borderUnit}
          />
          <InputNumberCount
            placeholder={textBorderRight}
            onChange={onChangeBorder("borderRight")}
            value={data.borderRight}
            symbolInit=""
            symbolFinal={data.borderUnit}
          />
          <InputNumberCount
            placeholder={textBorderBottom}
            onChange={onChangeBorder("borderBottom")}
            value={data.borderBottom}
            symbolInit=""
            symbolFinal={data.borderUnit}
          />
          <InputNumberCount
            placeholder={textBorderLeft}
            onChange={onChangeBorder("borderLeft")}
            value={data.borderLeft}
            symbolInit=""
            symbolFinal={data.borderUnit}
          />
        </div>
      </div>
    </>
  );
};

/**
 * Properties for the base DesignBoxBackground component.
 */
export interface DesignBoxBackgroundProps extends DesignBoxUseDataProps {
  textBackground?: string;
}

export const DesignBoxBackground = ({
  textBackground = "Background",
  data,
  onChangeData,
  ...props
}: DesignBoxBackgroundProps) => {
  const { _t } = use_T({ ...props });
  return (
    <>
      <div className={`fenext-design-box-item fenext-design-box-item-1-2`}>
        <Text>{_t(textBackground)}</Text>
        <InputColor
          value={data.background}
          onChange={onChangeData("background")}
        />
      </div>
    </>
  );
};

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

export const DesignBoxMargin = ({
  textMargin = "Margin",
  textMarginBottom = "Bottom",
  textMarginLeft = "Left",
  textMarginRight = "Right",
  textMarginTop = "Top",

  data,
  onChangeData,
  setDataFunction,
  ...props
}: DesignBoxMarginProps) => {
  const { _t } = use_T({ ...props });
  const _p = (e) => ({ id: `${e}`, text: `${e}`, data: e });

  const onChangeMargin =
    (margin: "marginTop" | "marginRight" | "marginBottom" | "marginLeft") =>
    (e: number | "") => {
      setDataFunction((old) => {
        const n = { ...old };
        const v = e == "" ? undefined : e;
        n[margin] = v;
        if (n.marginTogether) {
          n.marginTop = v;
          n.marginRight = v;
          n.marginBottom = v;
          n.marginLeft = v;
        }
        return n;
      });
    };
  const onChangeMarginTogether = (e: boolean) => {
    setDataFunction((old) => {
      const n = { ...old };
      n.marginTogether = e;
      if (n.marginTogether) {
        n.marginTop = 0;
        n.marginRight = 0;
        n.marginBottom = 0;
        n.marginLeft = 0;
      }
      return n;
    });
  };

  return (
    <>
      <div className={`fenext-design-box-item`}>
        <Text>{_t(textMargin)}</Text>
        <InputSelectT<DesignBoxValue["marginUnit"]>
          onParse={_p}
          options={[...ConstDesignBoxMarginUnit]}
          defaultValue={data.marginUnit}
          onChange={onChangeData("marginUnit")}
          placeholder="Unit"
        />
        <InputCheckbox
          defaultValue={data.marginTogether}
          onChange={onChangeMarginTogether}
          label={
            <>
              <SvgLink />
            </>
          }
          classNameLabel="fenext-design-box-item-together"
        />
        <div className={`fenext-design-box-item fenext-design-box-item-4`}>
          <InputNumberCount
            placeholder={textMarginTop}
            onChange={onChangeMargin("marginTop")}
            value={data.marginTop}
            symbolInit=""
            symbolFinal={data.marginUnit}
          />
          <InputNumberCount
            placeholder={textMarginRight}
            onChange={onChangeMargin("marginRight")}
            value={data.marginRight}
            symbolInit=""
            symbolFinal={data.marginUnit}
          />
          <InputNumberCount
            placeholder={textMarginBottom}
            onChange={onChangeMargin("marginBottom")}
            value={data.marginBottom}
            symbolInit=""
            symbolFinal={data.marginUnit}
          />
          <InputNumberCount
            placeholder={textMarginLeft}
            onChange={onChangeMargin("marginLeft")}
            value={data.marginLeft}
            symbolInit=""
            symbolFinal={data.marginUnit}
          />
        </div>
      </div>
    </>
  );
};

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

export const DesignBoxPadding = ({
  textPadding = "Padding",
  textPaddingBottom = "Bottom",
  textPaddingLeft = "Left",
  textPaddingRight = "Right",
  textPaddingTop = "Top",

  data,
  onChangeData,
  setDataFunction,
  ...props
}: DesignBoxPaddingProps) => {
  const { _t } = use_T({ ...props });
  const _p = (e) => ({ id: `${e}`, text: `${e}`, data: e });

  const onChangePadding =
    (
      padding: "paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft",
    ) =>
    (e: number | "") => {
      setDataFunction((old) => {
        const n = { ...old };
        const v = e == "" ? undefined : e;
        n[padding] = v;
        if (n.paddingTogether) {
          n.paddingTop = v;
          n.paddingRight = v;
          n.paddingBottom = v;
          n.paddingLeft = v;
        }
        return n;
      });
    };
  const onChangePaddingTogether = (e: boolean) => {
    setDataFunction((old) => {
      const n = { ...old };
      n.paddingTogether = e;
      if (n.paddingTogether) {
        n.paddingTop = 0;
        n.paddingRight = 0;
        n.paddingBottom = 0;
        n.paddingLeft = 0;
      }
      return n;
    });
  };

  return (
    <>
      <div className={`fenext-design-box-item`}>
        <Text>{_t(textPadding)}</Text>
        <InputSelectT<DesignBoxValue["paddingUnit"]>
          onParse={_p}
          options={[...ConstDesignBoxPaddingUnit]}
          defaultValue={data.paddingUnit}
          onChange={onChangeData("paddingUnit")}
          placeholder="Unit"
        />
        <InputCheckbox
          defaultValue={data.paddingTogether}
          onChange={onChangePaddingTogether}
          label={
            <>
              <SvgLink />
            </>
          }
          classNameLabel="fenext-design-box-item-together"
        />
        <div className={`fenext-design-box-item fenext-design-box-item-4`}>
          <InputNumberCount
            placeholder={textPaddingTop}
            onChange={onChangePadding("paddingTop")}
            value={data.paddingTop}
            symbolInit=""
            symbolFinal={data.paddingUnit}
          />
          <InputNumberCount
            placeholder={textPaddingRight}
            onChange={onChangePadding("paddingRight")}
            value={data.paddingRight}
            symbolInit=""
            symbolFinal={data.paddingUnit}
          />
          <InputNumberCount
            placeholder={textPaddingBottom}
            onChange={onChangePadding("paddingBottom")}
            value={data.paddingBottom}
            symbolInit=""
            symbolFinal={data.paddingUnit}
          />
          <InputNumberCount
            placeholder={textPaddingLeft}
            onChange={onChangePadding("paddingLeft")}
            value={data.paddingLeft}
            symbolInit=""
            symbolFinal={data.paddingUnit}
          />
        </div>
      </div>
    </>
  );
};

export interface PortalProps {
  container?: Element | DocumentFragment;
  children: ReactNode;
}
export const Portal = ({ children, container }: PortalProps) => {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
  }, []);

  if (!load) {
    return <></>;
  }
  return createPortal(<>{children}</>, container ?? document?.body);
};

/**
 * Properties for the GridCols component.
 */
export interface GridColsProps {
  /**
   * The children for the component.
   */
  children?: ReactNode;
  /**
   * The class name for the component.
   */
  className?: string;
  /**
   * The class name for the component.
   */
  cols?: string;
  colsMin1920?: string;
  colsMin1680?: string;
  colsMin1440?: string;
  colsMin1024?: string;
  colsMin992?: string;
  colsMin768?: string;
  colsMin575?: string;
}

export const GridCols = ({
  className = "",
  children,
  colsMin1920,
  colsMin1680,
  colsMin1440,
  colsMin1024,
  colsMin992,
  colsMin768,
  colsMin575,
  cols = "1fr",
}: GridColsProps) => {
  return (
    <>
      <div
        className={`fenext-grid-cols ${className} `}
        style={
          {
            ["--grid-cols-1920"]: colsMin1920,
            ["--grid-cols-1680"]: colsMin1680,
            ["--grid-cols-1440"]: colsMin1440,
            ["--grid-cols-1024"]: colsMin1024,
            ["--grid-cols-992"]: colsMin992,
            ["--grid-cols-768"]: colsMin768,
            ["--grid-cols-575"]: colsMin575,
            ["--grid-cols"]: cols,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </>
  );
};

/**
 * Properties for the base PageProgress component.
 */
export interface PageProgressBaseProps {}

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
export interface PageProgressProps
  extends PageProgressBaseProps,
    PageProgressClassProps {}

export const PageProgress = ({ className = "" }: PageProgressProps) => {
  const [statusBar, setStatusBar] = useState<"none" | "start" | "done">("none");

  const onNone = () => {
    setStatusBar("none");
  };
  const onDone = () => {
    setStatusBar("done");
    setTimeout(onNone, 250);
  };
  const onStart = () => {
    setStatusBar("start");
  };

  useEffect(() => {
    const handleStart = () => onStart();
    const handleDone = () => onDone();

    // Interceptar cambios en la URL
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      handleStart();
      originalPushState.apply(this, args);
      handleDone();
    };

    history.replaceState = function (...args) {
      handleStart();
      originalReplaceState.apply(this, args);
      handleDone();
    };

    window.addEventListener("popstate", handleDone);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", handleDone);
    };
  }, []);

  return (
    <div
      className={`fenext-page-progress fenext-page-progress-${statusBar} ${className}`}
    ></div>
  );
};

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
  defaultValue?: DateDataProps;
  onChange?: (data: DateDataProps) => void;
  formatDateOption?: FenextjsDateFormatOptions;

  textValue?: string;
  textFilterByDate?: string;
  textFilterByRange?: string;
  textBtnToday?: string;
  textBtnWeek?: string;

  iconTrash?: ReactNode;

  extraListBtn?: ((
    data: ReturnType<typeof useData<DateDataProps>>,
  ) => ReactNode)[];

  nMonthShow?: number;

  nameFilter?: string;
}

export const FilterDate = ({
  onChange,
  defaultValue = {},

  formatDateOption = {},

  className = "",
  classNameDropDown = {},
  classNameCollapse = {},
  classNameBtnToday = {},
  classNameBtnWeek = {},
  classNameTextValue = {},
  classNameTextSwich = {},
  classNameInputSwich = {},
  classNameContentTop = "",
  classNameLabelSwich = "",
  classNameClear = "",

  textValue = "Filtrar por fecha:",
  textFilterByDate = "Filtar por fecha",
  textFilterByRange = "Filtar por rango",
  textBtnToday = "Hoy",
  textBtnWeek = "Esta Semana",

  iconTrash = <SvgTrash />,

  extraListBtn = [],

  nMonthShow = 2,

  nameFilter,
  ...p
}: FilterDateProps) => {
  const { _t } = use_T({ ...p });
  const { onChangeData: onChangeDataPagination } = usePagination({
    name: nameFilter,
  });
  const { onChangeData: onChangeDataFilter } = useFilter({
    name: nameFilter,
  });
  const date = useDate({});
  const { data, onChangeData, onConcatData, setData, ...HOOK } =
    useData<DateDataProps>(
      {
        type: "normal",
        ...defaultValue,
      },
      {
        onChangeDataAfter: (e) => {
          const date = { ...e };
          if (date.date) {
            date.date.setHours(0);
            date.date.setMinutes(0);
            date.date.setSeconds(0);
            date.date.setMilliseconds(0);
          }
          if (date.dateRange?.[0]) {
            date.dateRange?.[0].setHours(0);
            date.dateRange?.[0].setMinutes(0);
            date.dateRange?.[0].setSeconds(0);
            date.dateRange?.[0].setMilliseconds(0);
          }
          if (date.dateRange?.[1]) {
            date.dateRange?.[1].setHours(0);
            date.dateRange?.[1].setMinutes(0);
            date.dateRange?.[1].setSeconds(0);
            date.dateRange?.[1].setMilliseconds(0);
            date.dateRange?.[1].setDate(date.dateRange?.[1]?.getDate() + 1);
            date.dateRange?.[1].setSeconds(
              date.dateRange?.[1]?.getSeconds() - 10,
            );
          }

          if (
            (date.type == "range" &&
              date.dateRange?.[0] &&
              date.dateRange?.[1]) ||
            (date.type == "normal" && date.date)
          ) {
            onChangeDataPagination("page")(0);
            onChangeDataFilter("date")(date);
          }

          onChange?.(date);
        },
      },
    );

  return (
    <>
      <div
        className={`
                    fenext-filter-date  
                    ${className}
                `}
      >
        <DropDown
          header={
            <>
              <Text
                {...classNameTextValue}
                className={`fenext-filter-date-text-value ${classNameTextValue?.className ?? ""}`}
              >
                {_t(textValue)}{" "}
                {data.type == "normal" && data.date != undefined && (
                  <>{date.onFormat(formatDateOption, data.date)}</>
                )}
                {data.type == "range" && data.dateRange != undefined && (
                  <>
                    {date.onFormat(formatDateOption, data.dateRange?.[0])} -
                    {data.dateRange?.[1] != undefined
                      ? date.onFormat(formatDateOption, data.dateRange?.[1])
                      : ""}
                  </>
                )}
              </Text>
            </>
          }
          {...classNameDropDown}
          rotateIcon={false}
          classNameBody={`
                        fenext-filter-date-dropdown-body
                        ${[classNameDropDown.classNameBody]}
                    `}
        >
          <div
            className={`fenext-filter-date-content-top  ${classNameContentTop}`}
          >
            <label
              className={`
                                fenext-filter-date-label-swich    
                                ${classNameLabelSwich}
                            `}
            >
              <Text {...classNameTextSwich}>{_t(textFilterByDate)}</Text>
              <InputSwich
                value={data.type == "normal"}
                onChange={(e) => {
                  onChangeData("type")(e ? "normal" : "range");
                }}
                {...classNameInputSwich}
              />
            </label>
            <label
              className={`
                                fenext-filter-date-label-swich    
                                ${classNameLabelSwich}
                            `}
            >
              <Text {...classNameTextSwich}>{_t(textFilterByRange)}</Text>
              <InputSwich
                value={data.type == "range"}
                onChange={(e) => {
                  onChangeData("type")(!e ? "normal" : "range");
                }}
                {...classNameInputSwich}
              />
            </label>
            <div
              className={`
                                fenext-filter-date-content-btn    
                            `}
            >
              <Button
                {...classNameBtnToday}
                onClick={() => {
                  onConcatData({
                    type: "normal",
                    date: new Date(),
                  });
                }}
                size="extra-small"
              >
                {_t(textBtnToday)}
              </Button>
              <Button
                {...classNameBtnWeek}
                onClick={() => {
                  const start = new Date();
                  start.setDate(start.getDate() - start.getDay());
                  const end = new Date();
                  end.setDate(end.getDate() + (6 - end.getDay()));
                  onConcatData({
                    type: "range",
                    dateRange: [start, end],
                  });
                }}
                size="extra-small"
              >
                {_t(textBtnWeek)}
              </Button>
              {extraListBtn.map((f) =>
                f({
                  data,
                  onChangeData,
                  onConcatData,
                  setData,
                  ...HOOK,
                }),
              )}
            </div>
          </div>

          <InputCalendar
            onChange={onChangeData("date")}
            onChangeRange={onChangeData("dateRange")}
            type={data.type}
            nMonthShow={nMonthShow}
            collapseProps={{
              active: true,
            }}
            value={data.date}
            valueRange={data.dateRange}
            {...classNameCollapse}
          />
        </DropDown>
        {((data?.type == "normal" && data?.date != undefined) ||
          (data?.type == "range" &&
            data?.dateRange?.[0] != undefined &&
            data?.dateRange?.[1] != undefined)) && (
          <div
            className={`
                            fenext-filter-date-clear
                            ${classNameClear}
                        `}
            onClick={() => {
              setData({
                type: "normal",
              });
              onChangeDataFilter("date")({
                type: "normal",
              });
              onChangeDataPagination("page")(0);
            }}
          >
            {iconTrash}
          </div>
        )}
      </div>
    </>
  );
};

export interface FilterSearchClassProps {
  className?: string;
  classNameSearch?: InputSearchClassProps;
}
export interface FilterSearchProps
  extends Omit<InputSearchBaseProps, "defaultValue" | "onChange">,
    FilterSearchClassProps,
    _TProps {
  defaultValue?: SearchDataProps;
  onChange?: (data: SearchDataProps) => void;
  nameFilter?: string;
}

export const FilterSearch = ({
  className = "",
  classNameSearch = {},

  onChange,
  defaultValue = {},
  nameFilter,

  ...p
}: FilterSearchProps) => {
  const { onChangeData: onChangeDataPagination } = usePagination({
    name: nameFilter,
  });
  const { onChangeData } = useFilter({ name: nameFilter });

  return (
    <>
      <div
        className={`
                    fenext-filter-search  
                    ${className}
                `}
      >
        <InputSearch
          {...classNameSearch}
          {...p}
          defaultValue={defaultValue?.search}
          onEnterSearch={(search) => {
            onChangeDataPagination("page")(0);
            onChangeData("search")(search);
            onChange?.({ search });
          }}
          onClearSearch={() => {
            onChangeDataPagination("page")(0);
            onChangeData("search")("");
            onChange?.({ search: "" });
          }}
        />
      </div>
    </>
  );
};

export type ScheduleDayValueType = InputDateRangeValueType[];
/**
 * Properties for the base ScheduleDay component.
 */
export interface ScheduleDayBaseProps
  extends Omit<InputDateRangeBaseProps, "value" | "onChange" | "defaultValue">,
    _TProps {
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
export interface ScheduleDayProps
  extends ScheduleDayBaseProps,
    ScheduleDayClassProps {}

export const ScheduleDay = ({
  className = "",

  defaultValue = [[undefined, undefined]],
  value = undefined,
  onChange,

  propsStart = {
    label: "Start time",
    placeholder: "Start time",
  },
  propsEnd = {
    label: "Final hour",
    placeholder: "Final hour",
  },
  ButtonProps = {
    children: "Add Time Range",
  },

  ...props
}: ScheduleDayProps) => {
  const { _t } = use_T({ ...props });
  const { data, onChangeData, setData, onDeleteData } =
    useData<ScheduleDayValueType>(defaultValue, {
      onChangeDataAfter: onChange,
      onDeleteDataAfter: onChange,
      data: value,
    });

  const onAddTimeRange = () => {
    setData([...data, [undefined, undefined]]);
  };
  return (
    <>
      <div className={`fenext-schedule-day ${className} `}>
        <div className="fenext-schedule-day-content-date-range">
          {data.map((e, i) => {
            return (
              <>
                <div
                  key={`${i}-${JSON.stringify(e)}`}
                  className="fenext-schedule-day-date-range"
                >
                  <InputDateRange
                    type="time"
                    defaultValue={e}
                    onChange={onChangeData(i)}
                    propsStart={propsStart}
                    propsEnd={propsEnd}
                    {...props}
                    _t={_t}
                  />
                  <div
                    className="fenext-schedule-day-date-range-close"
                    onClick={() => {
                      onDeleteData(i);
                    }}
                  >
                    <SvgClose />
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="fenext-schedule-day-content-btn">
          <Button {...ButtonProps} onClick={onAddTimeRange} _t={_t} />
        </div>
      </div>
    </>
  );
};

export type ScheduleWeeklyValueType = {
  [id in DaysEnum]?: ScheduleDayValueType;
};
/**
 * Properties for the base ScheduleWeekly component.
 */
export interface ScheduleWeeklyBaseProps
  extends Omit<ScheduleDayBaseProps, "value" | "onChange" | "defaultValue">,
    _TProps {
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
export interface ScheduleWeeklyProps
  extends ScheduleWeeklyBaseProps,
    ScheduleWeeklyClassProps {}

export const ScheduleWeekly = ({
  title = "Schedule Weekly",
  className = "",
  defaultValue = {},
  value = undefined,
  onChange,
  CollapseMultipleProps = {
    name: "schedule",
    type: "radio",
    defaultActive: 0,
  },
  onParseHeaderDay,

  ...props
}: ScheduleWeeklyProps) => {
  const { _t } = use_T({ ...props });
  const { data, onChangeData } = useData<ScheduleWeeklyValueType>(
    defaultValue,
    {
      onChangeDataAfter: onChange,
      data: value,
    },
  );

  return (
    <>
      <div className={`fenext-schedule-weekly ${className} `}>
        <Title tag="h4">{_t(title)}</Title>

        <CollapseMultiple
          {...CollapseMultipleProps}
          items={Object.keys(DaysEnum).map((e) => {
            const day = e as DaysEnum;
            return {
              children: (
                <>
                  <ScheduleDay
                    {...props}
                    defaultValue={defaultValue?.[day]}
                    value={data?.[day]}
                    onChange={onChangeData(day)}
                    _t={_t}
                  />
                </>
              ),
              header: (
                <>
                  {_t((onParseHeaderDay ? onParseHeaderDay(day) : day) ?? day)}
                </>
              ),
            };
          })}
        />
      </div>
    </>
  );
};

/**
 * Properties for the Template component.
 */
export interface TemplateProps extends _TProps {
  /**
   * The class name for the component.
   */
  className?: string;
}

export const Template = ({ className = "" }: TemplateProps) => {
  return (
    <>
      <div className={`fenext-template ${className} `}></div>
    </>
  );
};

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
  type?:
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "center"
    | "full"
    | "layout-grid"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
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
export interface ModalBaseProps
  extends ModalBaseBaseProps,
    ModalBaseClassProps {}
export const ModalBase = ({
  className = "",
  classNameBg = "",
  classNameContent = "",
  classNameClose = "",

  active = false,
  activeName,
  activeNameLast,

  childrenUseActiveForShowHidden = false,
  disabledClose = false,
  type = "center",
  typeClose = "out",
  onClose,
  children,
  useRender = true,
  name,
  closeComponent = <SvgClose />,
}: ModalBaseProps) => {
  const uuid = useMemo(() => new Date().getTime(), [active]);

  const CLOSECOMPONENTE = useMemo(() => {
    return (
      <>
        <div
          onClick={disabledClose ? () => {} : onClose}
          className={`fenext-modal-base-close fenext-modal-base-close-${type}  fenext-modal-base-close-${
            active ? "active" : "inactive"
          } ${classNameClose}`}
        >
          {closeComponent}
        </div>
      </>
    );
  }, [onClose, type, active, classNameClose, disabledClose, closeComponent]);

  const CONTENT = useMemo(() => {
    return (
      <>
        <dialog
          open={active}
          className={`
                        fenext-modal-base-dialog
                        fenext-modal-base-dialog-close-${typeClose}
                        fenext-modal-base-dialog-${active ? "active" : "inactive"}
                        fenext-modal-base-dialog-name-${activeName ? "active" : "inactive"}
                        fenext-modal-base-dialog-name-last-${activeNameLast ? "active" : "inactive"}
                        fenext-modal-base-dialog-disabled-close-${disabledClose ? "active" : "inactive"}
                    `}
          data-name={name}
        >
          <div
            className={`fenext-modal-base-bg fenext-modal-base-bg-${
              active ? "active" : "inactive"
            } ${classNameBg} `}
          ></div>
          <div
            className={`
                            fenext-modal-base
                            fenext-modal-base-bg-close 
                            fenext-modal-base-bg-close-${uuid} 
                            fenext-modal-base-${active ? "active" : "inactive"}
                            fenext-modal-base-${useRender ? "use-render" : "no-use-render"}
                            fenext-modal-base-${type}
                            ${className}
                        `}
            onClick={(e) => {
              const ele = e.target as HTMLDivElement;
              if (
                ele.classList.value.includes(
                  `fenext-modal-base-bg-close-${uuid}`,
                ) &&
                !disabledClose
              ) {
                onClose?.();
              }
            }}
          >
            <div className={`fenext-modal-base-content ${classNameContent} `}>
              {CLOSECOMPONENTE}
              {((childrenUseActiveForShowHidden && active) ||
                !childrenUseActiveForShowHidden) &&
                children}
            </div>
          </div>
          {CLOSECOMPONENTE}
        </dialog>
      </>
    );
  }, [
    CLOSECOMPONENTE,
    childrenUseActiveForShowHidden,
    active,
    activeName,
    activeNameLast,
    children,
    uuid,
    classNameContent,
    className,
    type,
    classNameBg,
    disabledClose,
    typeClose,
    useRender,
  ]);
  if (useRender) {
    return (
      <>
        <Portal>{CONTENT}</Portal>
      </>
    );
  }

  return <>{CONTENT}</>;
};

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
export interface ModalProps
  extends Pick<
      ModalBaseBaseProps,
      | "children"
      | "type"
      | "active"
      | "onClose"
      | "typeClose"
      | "disabledClose"
      | "useRender"
      | "name"
      | "closeComponent"
      | "nameLocalStorage"
    >,
    ModalClassProps {
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

export const Modal = ({
  classNameElementActionModalActive = "",
  classNameModal = {},

  ElementActionModalActive,
  disabledElementActionModalActive = false,
  children,

  active: activeProps = undefined,
  disabledClose = false,

  onClose: onCloseProps,
  onActive: onActiveProps,
  type = "center",
  typeClose = "out",
  useRender = true,
  name,
  nameLocalStorage,
  activeByNameLocalStorage = false,
  activeByNameContentLocalStorage = false,
  closeComponent,
}: ModalProps) => {
  const { active, onActive, onClose, activeName, activeNameLast } = useModal({
    active: activeProps,
    disabled: disabledElementActionModalActive,
    onActive: onActiveProps,
    onClose: onCloseProps,
    name,
    activeByNameLocalStorage,
    activeByNameContentLocalStorage,
    nameLocalStorage,
  });
  return (
    <>
      <div
        onClick={onActive}
        className={`fenext-modal-element-active ${classNameElementActionModalActive}`}
      >
        {ElementActionModalActive}
      </div>
      <ModalBase
        {...classNameModal}
        closeComponent={closeComponent}
        onClose={onClose}
        active={active}
        activeName={activeName}
        activeNameLast={activeNameLast}
        type={type}
        typeClose={typeClose}
        disabledClose={disabledClose}
        useRender={useRender}
        name={name}
        nameLocalStorage={nameLocalStorage}
      >
        {children}
      </ModalBase>
    </>
  );
};

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
export interface ProgressCircleProps
  extends ProgressCircleBaseProps,
    ProgressCircleClassProps {}

export const ProgressCircle = ({
  className = "",
  p,
  showP = true,
}: ProgressCircleProps) => {
  return (
    <>
      <div
        className={`fenext-progess-circle fenext-progess-circle-${
          showP ? "show-p" : ""
        } ${className} `}
        style={
          {
            ["--p"]: Math.max(0, Math.min(p, 100)),
          } as React.CSSProperties
        }
      ></div>
    </>
  );
};

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
  /**
   * The class name for the component.
   */
  classNameBar?: string;
}

/**
 * Properties for the ProgressLine component.
 */
export interface ProgressLineProps
  extends ProgressLineBaseProps,
    ProgressLineClassProps {}

export const ProgressLine = ({
  className = "",
  classNameBar = "",
  p,
  showP = true,
}: ProgressLineProps) => {
  return (
    <>
      <div
        className={`fenext-progess-line fenext-progess-line-${
          showP ? "show-p" : ""
        } ${className} `}
        style={
          {
            ["--p"]: Math.max(0, Math.min(p, 100)),
          } as React.CSSProperties
        }
      >
        <div
          className={`
                    fenext-progess-line-bar ${classNameBar}
                    `}
        ></div>
      </div>
    </>
  );
};

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
export interface ChronometerProps
  extends ChronometerBaseProps,
    ChronometerClassProps {}

export const Chronometer = ({
  className = "",
  time = 100,
  min = 0,
  onChange,
  optionsTimeToText = {
    days: false,
    hours: true,
    minutes: true,
    seconds: true,
  },
}: ChronometerProps) => {
  const { data, setData } = useData<number>(time, {
    onChangeDataAfter: onChange,
  });

  const onReduce = useCallback(() => {
    setData(Math.max(data - 1, min));
  }, [data]);

  useEffect(() => {
    const intervalId = setInterval(onReduce, 1000);
    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <>
      <div className={`fenext-chronometer ${className} `}>
        {getTimeToText(new Date(0, 0, 0, 0, 0, data, 0), optionsTimeToText)}
      </div>
    </>
  );
};

/**
 * Properties for the base Loader component.
 */
export interface LoaderBaseProps {}

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
export interface LoaderProps extends LoaderBaseProps, LoaderClassProps {}

export const Loader = ({ classNameLoader = "" }: LoaderProps) => {
  return (
    <>
      <div className={`fenext-loader ${classNameLoader}`} />
    </>
  );
};

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
export interface LoaderLineProps
  extends LoaderLineBaseProps,
    LoaderLineClassProps {}

export const LoaderLine = ({
  classNameLoaderLine = "",
  height = 20,
}: LoaderLineProps) => {
  return (
    <>
      <div
        className={`fenext-loader-line ${classNameLoaderLine}`}
        style={
          {
            ["--height"]: `${height / 16}rem`,
          } as React.CSSProperties
        }
      />
    </>
  );
};

/**
 * Properties for the base LoaderUser component.
 */
export interface LoaderUserBaseProps {}

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
export interface LoaderUserProps
  extends LoaderUserBaseProps,
    LoaderUserClassProps {}

export const LoaderUser = ({
  classNameLoaderUser = "",
  classNameLoaderUserImg = "",
  classNameLoaderUserName = "",
  classNameLoaderUserEmail = "",
}: LoaderUserProps) => {
  return (
    <>
      <div className={`fenext-loader-user ${classNameLoaderUser}`}>
        <LoaderLine
          classNameLoaderLine={`fenext-loader-user-img ${classNameLoaderUserImg}`}
        />
        <LoaderLine
          classNameLoaderLine={`fenext-loader-user-name ${classNameLoaderUserName}`}
        />
        <LoaderLine
          classNameLoaderLine={`fenext-loader-user-email ${classNameLoaderUserEmail}`}
        />
      </div>
    </>
  );
};

/**
 * Properties for the base LoaderSpinner component.
 */
export interface LoaderSpinnerBaseProps {}

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
export interface LoaderSpinnerProps
  extends LoaderSpinnerBaseProps,
    LoaderSpinnerClassProps {}

export const LoaderSpinner = ({
  classNameLoaderSpinner = "",
}: LoaderSpinnerProps) => {
  return (
    <>
      <div className={`fenext-loader-spinner ${classNameLoaderSpinner}`} />
    </>
  );
};
