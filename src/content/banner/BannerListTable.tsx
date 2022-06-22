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

import { useSelector } from 'react-redux';
import { selectAllBanner } from 'src/redux/banner/bannerSlice';
import { IBanner } from 'src/models/banner.model';
import { format } from 'date-fns';
import { IBannerForm } from './BannerForm';

interface BannerListTableProps {
  className?: string;
  handleDelete: (id: string) => void;
  hasDelete?: boolean;
  handleOpenEdit: (id: IBannerForm) => void;
}

const BannerListTable: FC<BannerListTableProps> = (props) => {
  const banners = useSelector(selectAllBanner);
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
              {banners.map((banner: IBanner) => {
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
                        {banner.expired_at &&
                          format(
                            new Date(banner.expired_at).getTime(),
                            'dd-MMMM-yyyy'
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
                            onClick={() => props.handleDelete(banner.id)}
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
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default React.memo(BannerListTable);
