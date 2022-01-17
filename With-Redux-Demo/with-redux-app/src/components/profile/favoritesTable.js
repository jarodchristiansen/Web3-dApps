import { Table } from "react-bootstrap";
import Link from "next/link";

function FavoritesTable(props) {
  const { data, isEditing, setIsEditing } = props;

  return (
    <div style={{ maxWidth: "100%", overflow: "auto" }}>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Your Rank</th>
            <th>Asset Name</th>
            <th>Symbol</th>
            <th>Logo</th>
          </tr>
        </thead>
        <tbody>
          {data.length >= 1 &&
            data?.map((y, idx) => {
              const exploreLink = `/assets/${y.symbol}`;

              return (
                <tr key={y.title}>
                  <td>{idx + 1}</td>
                  <Link href={exploreLink}>
                    <td style={{ cursor: "pointer" }}>{y.title}</td>
                  </Link>
                  <td>{y.symbol}</td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <img src={y.image} />
                  </td>
                  {isEditing && (
                    <td>
                      <div style={{ position: "relative" }}>Edit active</div>
                    </td>
                  )}
                </tr>
              );
            })}

          {/*<tr>*/}
          {/*  <td>1</td>*/}
          {/*  <td>Mark</td>*/}
          {/*  <td>Otto</td>*/}
          {/*  <td>@mdo</td>*/}
          {/*</tr>*/}
          {/*<tr>*/}
          {/*  <td>2</td>*/}
          {/*  <td>Jacob</td>*/}
          {/*  <td>Thornton</td>*/}
          {/*  <td>@fat</td>*/}
          {/*</tr>*/}
          {/*<tr>*/}
          {/*  <td>3</td>*/}
          {/*  <td colSpan="2">Larry the Bird</td>*/}
          {/*  <td>@twitter</td>*/}
          {/*</tr>*/}
        </tbody>
      </Table>
    </div>
  );
}

export default FavoritesTable;
