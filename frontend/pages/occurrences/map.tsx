import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { api } from '../../src/services/api';


const OccorrencesIndex: NextPage = () => {
    const [occurrences, setOccurrences] = useState<[]>([]);

    useEffect(() => {
        api
            .get('/occurrences-all-list/NOT_COMPLETED/')
            .then(({ data }) => {
                setOccurrences(data);
                console.log(data);
            })
            .catch((error) => { });
    }, []);

    return <div className=''>
         mapa
    </div>;
};

export default OccorrencesIndex;
