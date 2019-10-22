import publicIp from 'public-ip';
import ResponseUtil from '../utilities/ResponseUtils';

const util = new ResponseUtil();

const getPublicIpAddress = async (req, res, next) => {
    let publicIpAddress = '';

    try {
        publicIpAddress = await publicIp.v4({ timeout: 3000 });
        req.publicIpAddress = publicIpAddress;
        return next();
    } catch (error) {
        util.setError(408, 'Please, check your internet connection and try again');
        return util.send(res);
    }
};

export default getPublicIpAddress;
