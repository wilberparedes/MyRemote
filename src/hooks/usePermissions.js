import moment from 'moment';
import { useRef, useState } from 'react';
import { actions } from '../store';
import { useStore } from 'react-redux';

export const usePermissions = ({ date, type }) => {

    const dateRef = useRef(date);
    const typeRef = useRef(type);
    const pageRef = useRef(0);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ loadingMore, setLoadingMore ] = useState(false);
    const [ permissions, setPermissions ] = useState(null);
    const [ isFetching, setIsFetching ] = useState(false);
    
    const { dispatch }  = useStore();

    const getpermissionsFetch = async (page) => {
        try {
            let dateIn = moment(dateRef.current);
            let newDateIn;
            if(typeRef.current == 'T') newDateIn = dateIn.clone().add(-1, "d");
            else newDateIn = dateIn;
    
            let dateOut;
            switch (typeRef.current) {
                case 'T': // TODAY (YESTERDAY-TODAY-TOMORROW)
                    dateOut = dateIn.clone().add(1, "d");
                    break;
                case 'W': // WEEK 
                    dateOut = dateIn.clone().add(6, "d");
                    break;
                case 'B': // BIWEEKLY  
                    dateOut = dateIn.clone().add(14, "d");
                    break;
                case 'M': // MONTHLY
                    dateOut = dateIn.clone().add(29, "d");
                    break;
                default:
                    dateOut = dateIn.clone().add(1, "d");
                    break;
            }
            const resp = await dispatch(actions.myintelliapi.permissionsFetch((
                {
                    date_in: newDateIn.format("YYYY-MM-DD"),
                    date_out: dateOut.format("YYYY-MM-DD"),
                    offSet: page,
                }
            )));
            const oldData = permissions ? permissions.data.results : [];
            let newData;
            if(permissions && resp.data.offset > permissions.data.offset){
                const newResult = oldData.concat(resp.data.results);
                newData = { ...resp, data: {...resp.data, results: [...newResult]}};
            }
            else{ 
                newData = resp;
            }
            setPermissions(newData);
            setIsLoading(false);
        } catch (error) {
            console.log("error", error)
        }
    }

    const loadMoreData = async () => {
        if( permissions.data.count == 20){
            setLoadingMore(true);
            pageRef.current += 20;
            await getpermissionsFetch(pageRef.current)
            setLoadingMore(false);
        }
    }

    const usetSetParams = async (d, t) => {
        typeRef.current = t;
        dateRef.current = d;
        pageRef.current = 0;
        setIsFetching(true);
        await getpermissionsFetch(pageRef.current);
        setIsFetching(false);
    }

    return [
        isLoading,
        permissions,
        usetSetParams,
        loadingMore,
        loadMoreData,
        isFetching
    ]
}