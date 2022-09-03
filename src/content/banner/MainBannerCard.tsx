import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { IBannerType } from 'src/models/banner.model';
import React, { useEffect } from 'react';
import { toCapitalize } from 'src/utils/string-function';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { getBannerByType } from 'src/redux/banner/bannerSlice';
import { IBannerForm } from './BannerForm';

export interface IMainBannerCardProps {
  type: IBannerType;
  handleEditData: (id: IBannerForm) => void;
}

function MainBannerCard(props: IMainBannerCardProps) {
  const theme = useTheme();
  const { mainBannerData } = useAppSelector((state) => state.banners);

  const dispatch = useAppDispatch();

  const getDataBanner = async () => {
    await dispatch(
      getBannerByType({
        slug: `${props.type}-banner`,
        type: 'collection',
        relations: 'file'
      })
    );
  };

  useEffect(() => {
    getDataBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type]);

  return (
    <>
      <Card>
        <CardHeader
          action={
            <Tooltip title="Edit" arrow>
              <IconButton
                onClick={() =>
                  props.handleEditData(
                    mainBannerData?.[`${props.type}-banner`]?.[0]
                  )
                }
                sx={{
                  '&:hover': {
                    background: theme.colors.primary.lighter
                  },
                  color: theme.palette.primary.main
                }}
                color="inherit"
                size="small"
              >
                <EditTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          }
          title={`${toCapitalize(props.type)} banner`}
        />
        <CardMedia
          component="img"
          height="140"
          image={`${mainBannerData?.[`${props.type}-banner`]?.[0]?.file?.url}`}
          alt={`${toCapitalize(props.type)} banner image`}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${mainBannerData?.[`${props.type}-banner`]?.[0]?.title || '-'}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${
              mainBannerData?.[`${props.type}-banner`]?.[0]?.description || '-'
            }`}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default React.memo(MainBannerCard);
