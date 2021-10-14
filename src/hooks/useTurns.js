import moment from 'moment';
import { useRef, useState } from 'react';
import { actions } from '../store';
import { useStore } from 'react-redux';

export const useTurns = ({date, type}) => {

    const dateRef = useRef(date);
    const typeRef = useRef(type);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ turns, setTurns ] = useState(null);
    const { dispatch }  = useStore();
    
    const gettimePlanningCalendarFetch = async () => {
        let dateIn = moment(dateRef.current);
        let newDateIn;
        if(typeRef.current == 'T') newDateIn = dateIn;
        else newDateIn = dateIn;

        let dateOut;
        switch (typeRef.current) {
            case 'T': // TODAY (YESTERDAY-TODAY-TOMORROW)
                dateOut = dateIn.clone().add(2, "d");
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
        const resp = await dispatch(actions.myintelliapi.timePlanningCalendarFetch((
            {
                date_in: newDateIn.format("YYYY-MM-DD"),
                date_out: dateOut.format("YYYY-MM-DD"),
            }
        )));
        setTurns(resp);
        setIsLoading(false);
    }

    const usetSetParams = (d, t) => {
        typeRef.current = t;
        dateRef.current = d;
        gettimePlanningCalendarFetch();
    }

    return [
        isLoading,
        turns,
        usetSetParams
    ]
}