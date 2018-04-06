import { TRIP_SUMMARY } from '../constants/action-types';

const tripInfo = ( state = [
    {pictureURL: "https://hips.hearstapps.com/pop.h-cdn.co/assets/15/06/1600x800/landscape_nrm_1423001491-fastcars-02-chevycorvette.jpg?resize=768:*"},
    {pictureURL: "https://2.bp.blogspot.com/-DnxqUi6k3Vk/VuEWJzKJ0NI/AAAAAAAAABs/djK8QAVOPDg/s1600/maxresdefault.jpg"},
    {pictureURL: "http://1.bp.blogspot.com/-zSeyLA4AenY/VP3c8jbdmqI/AAAAAAAAY4g/3Ymsi9jlvYw/s1600/Audi_R8_E_tron.jpg"}
], action) => {
    switch(action.type) {
        case TRIP_SUMMARY:
            return state.concat(action.tripInfo);
        default:
            return state;
    }
};

export default tripInfo;