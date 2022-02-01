import React, { useState } from "react";
import { Input, Row, Col } from "antd";
import { SearchResults } from '../SearchResults'

const { Search } = Input;

export function SearchBar() {
  const [queryString, setQueryString] = useState("");

  function handleSearch(value: string) {
    setQueryString(value)
  }

  return (
    <>
      {/* used inline styling to keep it simple. normally would use library like styled-component or emotion to handle styles */}
      <Row justify="center" style={{ padding: "10px" }}>
        <Col xs={24} sm={24} md={12}>
          <Search
            placeholder="search"
            size="large"
            maxLength={50}
            onSearch={handleSearch}
            enterButton
          />
        </Col>
      </Row>
      {queryString && <div data-testid="search-results">
        <SearchResults queryString={queryString} />
      </div>}
    </>
  );
}
