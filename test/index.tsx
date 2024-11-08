import React from 'react';

import {InputText,useData} from '../min';

<InputText
    placeholder='asdasd'

/>


const {data} = useData<{d:string}>({
    d:"asdsa"
},{

})

data.d