import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

export default function Indicators({ data }) {

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2, color: 'text.secondary' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                    Rang Market cap.:</Typography>
                <Typography sx={{ fontWeight: 'normal', mx: 1, fontSize: 12, color: "secondary.main", fontWeight: 'bold' }}>
                    {data.market_data.market_cap_rank}</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                    Prix actuel:</Typography>
                <Typography sx={{ fontWeight: 'normal', mx: 1, fontSize: 12, color: "secondary.main", fontWeight: 'bold', color: 'text.secondary' }}>
                    {/* {data.market_data.current_price.`${slug}`} */}</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                    Market cap.:</Typography>
                <Typography sx={{ fontWeight: 'normal', mx: 1, fontSize: 12, color: "secondary.main", fontWeight: 'bold' }}>
                    {/* {data.market_data.market_cap.`${slug}` } */}</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                    Total volume:</Typography>
                <Typography sx={{ fontWeight: 'normal', mx: 1, fontSize: 12, color: "secondary.main", fontWeight: 'bold' }}>
                    {/* {data.market_data.total_volume.`${slug}` } */}</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                    Total volume:</Typography>
                <Typography sx={{ fontWeight: 'normal', mx: 1, fontSize: 12, color: "secondary.main", fontWeight: 'bold' }}>
                    {/* {data.market_data.total_volume.`${slug}` } */}</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                    % market cap. 24h:</Typography>
                <Typography sx={{ fontWeight: 'normal', mx: 1, fontSize: 12, color: "secondary.main", fontWeight: 'bold' }}>
                    {data.market_data.market_cap_change_percentage_24h}</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                    Total supply:</Typography>
                <Typography sx={{ fontWeight: 'normal', mx: 1, fontSize: 12, color: "secondary.main", fontWeight: 'bold' }}>
                    {data.market_data.total_supply}</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                    Max supply:</Typography>
                <Typography sx={{ fontWeight: 'normal', mx: 1, fontSize: 12, color: "secondary.main", fontWeight: 'bold' }}>
                    {data.market_data.max_supply}</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                    Circulating supply:</Typography>
                <Typography sx={{ fontWeight: 'normal', mx: 1, fontSize: 12, color: "secondary.main", fontWeight: 'bold' }}>
                    {data.market_data.circulating_supply}</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                    Dernière mise à jour:</Typography>
                <Typography sx={{ fontWeight: 'normal', mx: 1, fontSize: 12, color: "secondary.main", fontWeight: 'bold' }}>
                    {data.market_data.last_updated}</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                    Lien:</Typography>
                <Typography sx={{ fontWeight: 'normal', mx: 1, fontSize: 12, color: "secondary.main", fontWeight: 'bold' }}>
                    {data.links.homepage}</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'text.secondary' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                    Repos:</Typography>
                <Typography sx={{ fontWeight: 'normal', mx: 1, fontSize: 12, color: "secondary.main", fontWeight: 'bold' }}>
                    {/* {data.repos_url.github.map((item) => (
                        <>
                            {item.repos_url.github} */}
                    {/* key = {repo.id} */}
                    {/* </>
                    ))} */}
                </Typography>
            </Box>
        </>
    );
}

Indicators.propTypes = {
    data: PropTypes.object.isRequired,
};