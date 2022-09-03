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
import { selectAllItemCategory } from 'src/redux/item-category/itemCategorySlice';
import { IItemCategory } from 'src/models/item-category.model';

interface ItemsCategoryListTableProps {
  edit: (data) => {};
  handleDelete?: (data) => {};
}

const ItemsCategoryListTable: FC<any> = ({
  edit,
  handleDelete
}: ItemsCategoryListTableProps) => {
  const itemCategory = useSelector(selectAllItemCategory);
  const theme = useTheme();

  return (
    <>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cover</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemCategory.map((category: IItemCategory, index) => {
                return (
                  <TableRow hover key={category.id}>
                    <TableCell width={110}>
                      <img
                        loading="lazy"
                        width={100}
                        alt="category img"
                        src={category?.cover?.url}
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
                        {category.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          onClick={() => edit(category)}
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
                      {handleDelete && (
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            onClick={() => handleDelete(category.id)}
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

export default React.memo(ItemsCategoryListTable);
