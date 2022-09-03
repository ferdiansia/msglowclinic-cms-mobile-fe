import React, { FC } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  Tooltip,
  IconButton,
  useTheme
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { parseISO } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';

import { IBanner, IBannerType } from 'src/models/banner.model';
import { IBannerForm } from './BannerForm';
import { useAppSelector } from 'src/redux/store';

interface BannerListTableProps {
  className?: string;
  handleDelete: (index: number) => void;
  hasDelete?: boolean;
  handleOpenEdit: (id: IBannerForm) => void;
  type: IBannerType;
}

const BannerListTable: FC<BannerListTableProps> = (props) => {
  // const banners = useSelector(selectAllBanner);
  const { mainBannerData } = useAppSelector((state) => state.banners);

  const theme = useTheme();

  return (
    <>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={110}>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Expired Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mainBannerData?.[`${props.type}-banner`]?.map(
                (banner: IBanner, index: number) => {
                  return (
                    <TableRow hover key={banner.id}>
                      <TableCell width={110}>
                        <img
                          loading="lazy"
                          width={100}
                          alt="banner img"
                          src={banner.file.url}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {banner.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {banner.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {banner?.expired_at &&
                            format(
                              utcToZonedTime(
                                parseISO(banner.expired_at),
                                'UTC'
                              ),
                              'dd-MM-yyyy HH:mm',
                              { timeZone: 'UTC' }
                            )}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            onClick={() => props.handleOpenEdit(banner)}
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
                        {props.hasDelete && (
                          <Tooltip title="Delete" arrow>
                            <IconButton
                              onClick={() => props.handleDelete(index)}
                              sx={{
                                '&:hover': {
                                  background: theme.colors.error.lighter
                                },
                                color: theme.palette.error.main
                              }}
                              color="inherit"
                              size="small"
                            >
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default React.memo(BannerListTable);
