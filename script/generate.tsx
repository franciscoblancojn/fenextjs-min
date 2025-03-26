
const Bun_ = eval("Bun");
interface onCopyLibProps {
    lib: string
}

const onCopyLib =  async ({ lib }: onCopyLibProps) => {
    console.log("---------------------------");
    console.log(`Init generate ${lib}`);
    console.log("---------------------------");

    const glob = new Bun_.Glob("**/index.tsx");

    const URL_BASE = `../fenextjs-${lib}/src`

    let PATH_LIST: string[] = []

    for await (const path of glob.scan(URL_BASE)) {

        PATH_LIST.push(path)
    }

    PATH_LIST = PATH_LIST.sort(e => {
        if (e == "Fenextjs/index.tsx" && lib == "error") {
            return -1
        }
        if (e == "_urlBase/index.tsx" && lib == "img-placeholder") {
            return -1
        }
        return 1
    })

    let CODE = ""

    for (let i = 0; i < PATH_LIST.length; i++) {
        const path = PATH_LIST[i];
        console.log(`${lib} ---- ` + path);

        const file = Bun_.file(URL_BASE + "/" + path)

        const code = await file.text()
        CODE += `\n\n${code}`
    }

    console.log("---------------------------");
    console.log(`Finish generate ${lib}`);
    console.log("---------------------------");

    return CODE
}


const main = async () => {
    const listPromises = [
        onCopyLib({
            lib: "export"
        }),
        onCopyLib({
            lib: "interface"
        }),
        onCopyLib({
            lib: "error"
        }),
        onCopyLib({
            lib: "validator"
        }),
        onCopyLib({
            lib: "functions"
        }),
        onCopyLib({
            lib: "firebase"
        }),
        onCopyLib({
            lib: "date"
        }),
        onCopyLib({
            lib: "hook"
        }),
        onCopyLib({
            lib: "svg"
        }),
        onCopyLib({
            lib: "img-placeholder"
        }),
        onCopyLib({
            lib: "component"
        }),
    ]
    // const ALL_LIB = []
    // for (let i = 0; i < listPromises.length; i++) {
    //     const element = await listPromises[i]();
    //     ALL_LIB.push(element)
    // }

    const ALL_LIB = await Promise.all(listPromises)
    let CODE = ALL_LIB.join("")

    const REPLACE = [
        /import\s+{[^}]*}\s+from\s+['"][^'"]*['"];[\r\n]*/g,
        /import\s+.*\s+from\s+['"][^'"]*['"];\s*/g,
        /^import\s+['"][^'"]*['"];\s*/gm,
        /^import\s+[\w{}\s,]*\s+from\s+['"][^'"]*['"];\s*/gm,
        /^export \* from\s+['"][^'"]*['"];\s*$/gm
    ]

    for (let i = 0; i < REPLACE.length; i++) {
        const replace = REPLACE[i];
        CODE = CODE.replace(replace, "")
    }

    const CODE_TOP = `
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
    `

    CODE = CODE_TOP + CODE

    await Bun_.write("./src/index.tsx", CODE);
}


main()