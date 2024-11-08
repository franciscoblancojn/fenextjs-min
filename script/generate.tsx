
const Bun_ = eval("Bun");
interface onCopyLibProps {
    lib:string
}

const onCopyLib = async ({lib}:onCopyLibProps) => {
    console.log("---------------------------");
    console.log(`Init generate ${lib}`);
    console.log("---------------------------");
  
    const glob = new Bun_.Glob("**/index.tsx");

    const URL_BASE = `../fenext-${lib}/src`

    const PATH_LIST :string[] = []
  
    for await (const path of glob.scan(URL_BASE)) {
      
        PATH_LIST.push(path)
    }
  
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
        })
    ])
    const CODE = ALL_LIB.join("")

    await Bun_.write("./text.tsx", CODE);
}


main()