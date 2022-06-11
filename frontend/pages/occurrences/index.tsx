import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { api } from '../../src/services/api';

const Index: NextPage = () => {

    const [occurrences, setOccurrences] = useState<[]>([]);

    useEffect(() => {
        api
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
