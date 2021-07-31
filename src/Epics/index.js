import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { map, tap, retry, switchMap, catchError } from 'rxjs/operators';
import { fetchServicesError, fetchServiceSuccess, fetchServiceRequest} from '../Reducers/Reducers';
import { of } from 'rxjs';

export const fetchService = action$ => action$.pipe(
    ofType(fetchServiceRequest.type),
    map(o => o.payload),
    tap(o => console.log(o)),
    switchMap(o => ajax.getJSON(`http://localhost:7070/api/services/${o}`).pipe(
        // retry(3),
        map(o => fetchServiceSuccess(o)),
        catchError(e => of(fetchServicesError(e))),
    )),
);