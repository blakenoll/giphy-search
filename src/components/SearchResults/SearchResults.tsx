import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Row, Col, Pagination, Spin, Typography } from "antd";
import { Gif } from "../Gif";
import { queryGifs } from "../../utils/queryGifs";

const { Text } = Typography

interface SearchResultsProps {
  queryString: string;
}

export function SearchResults({ queryString }: SearchResultsProps) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [queryString]);

  const {
    isLoading,
    isError,
    data: result,
    // using react-query to handle caching https://react-query.tanstack.com/guides/query-keys#query-keys-are-hashed-deterministically
    // react-query will cache the query based on data passed on the queryKey
    // in this case if will cache based on the query name: 'gifs', queryString value and offset
  } = useQuery(
    ["gifs", { queryString, page }],
    () => queryGifs(queryString, page),
    { keepPreviousData: true, staleTime: Infinity }
  );

  // Prefetch the next page
  useEffect(() => {
    if (result) {
      const {
        pagination: { total_count },
      } = result;
      if (page * 10 < total_count - 10) {
        queryClient.prefetchQuery(
          ["gifs", { queryString, page: page + 1 }],
          () => queryGifs(queryString, page + 1)
        );
      }
    }
  }, [result, page, queryClient]);

  // reset page back to zero for new search
  useEffect(() => {
    setPage(0)
  }, [queryString])

  function handlePageChange(page: number) {
    // set to page - 1 to zero index the page numbers for calculating offset
    setPage(page - 1);
  }

  if (isLoading) {
    return (
      <Row justify="center" data-testid="spinner">
        <Spin />
      </Row>
    );
  }

  if (isError) {
    // normally would map errors to specific error messages to display
    // more informative user friendly error messages
    return <Text>Oops something went wrong! Please try again.</Text>;
  }

  return (
    <>
      <Row align="middle" justify="center" gutter={5} wrap>
        {result?.data?.map((gif) => (
          <Col key={gif.id}>
            <Gif
              src={gif.images.fixed_width.webp}
              preview={gif.images.original.webp}
            />
          </Col>
        ))}
      </Row>
      <br />
      <Row justify="center">
        {result?.pagination.total_count ?
          <Pagination
            pageSize={10}
            total={result?.pagination.total_count - 10}
            showSizeChanger={false}
            onChange={handlePageChange}
            defaultCurrent={1}
            current={page + 1}
          />
          // bug where Giphy is returning no results if offset gets really large.
          // I checked the network tab and the offset being sent is less then the total 
          // so am not sure what is going on
          : <Text>Oops something went wrong! Please try again.</Text>}
      </Row>
    </>
  );
}
