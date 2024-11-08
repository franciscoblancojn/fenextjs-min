
const Bun_ = eval("Bun");
interface onCopyLibProps {
    lib:string
}

const onCopyLib = async ({lib}:onCopyLibProps) => {
    console.log("---------------------------");
    console.log(`Init generate ${lib}`);
    console.log("---------------------------");
  
    const glob = new Bun_.Glob("**/index.tsx");

    const URL_BASE = `../fenextjs-${lib}/src`

    let PATH_LIST :string[] = []
  
    for await (const path of glob.scan(URL_BASE)) {
      
        PATH_LIST.push(path)
    }
  
    PATH_LIST = PATH_LIST.sort(e=>{
        if(e == "Fenextjs/index.tsx" && lib == "error"){
            return -1
        }
        return 1
    })

    let CODE = ""

    for (let i = 0; i < PATH_LIST.length; i++) {
        const path = PATH_LIST[i];
        console.log(`${lib} ---- ` + path);

        const file = Bun_.file(URL_BASE+"/"+path)

        const code = await file.text()
        CODE+=`\n\n${code}`
    }
  
    console.log("---------------------------");
    console.log(`Finish generate ${lib}`);
    console.log("---------------------------");

    return CODE
}


const main = async () => {

    const ALL_LIB = await Promise.all([
        onCopyLib({
            lib:"interface"
        }),
        onCopyLib({
            lib:"error"
        }),
        onCopyLib({
            lib:"validator"
        }),
    ])
    let CODE = ALL_LIB.join("")

    const REPLACE = [
        /import\s+{[^}]*}\s+from\s+['"][^'"]*['"];[\r\n]*/g,
        /^export \* from\s+['"][^'"]*['"];\s*$/gm
    ]

    for (let i = 0; i < REPLACE.length; i++) {
        const replace = REPLACE[i];
        CODE = CODE.replace(replace,"")
    }

    await Bun_.write("./text.tsx", CODE);
}


main()