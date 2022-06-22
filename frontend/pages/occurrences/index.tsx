import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { getAPIClient } from '../../src/services/axios';

const Index: NextPage = () => {

    const [occurrences, setOccurrences] = useState<[]>([]);

    useEffect(() => {
        getAPIClient()
            .get('/occurrences/')
            .then(({ data }) => {
                setOccurrences(data);
                console.log(data);
            })
            .catch((error) => { });
    }, []);

    return <div className=''>
        {occurrences.length ? (<div></div>) : null}
    </div>;
};


export default Index;
