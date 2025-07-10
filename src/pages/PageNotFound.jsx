import { useGoBack } from "@/hooks/useGoBack";

import Heading from "@/ui/Heading";
import Button from "@/ui/Button";

import styled from "styled-components";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function PageNotFound() {
  const goBack = useGoBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">
          La page que vous recherchez n'a pas pu être trouvée 😢
        </Heading>
        <Button onClick={goBack} $size="large">
          &larr; Retour
        </Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
