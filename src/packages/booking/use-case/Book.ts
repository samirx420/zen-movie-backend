import BaseService from '../../../core/services/Base.service';

import Booking from '../domain/Booking';

export const create_booking = async (payload: Booking) => {
    return BaseService._create(Booking, payload);
}