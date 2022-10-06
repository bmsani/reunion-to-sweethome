
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react'
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property';
import noResult from '../assets/image/noresult.svg'
import { baseUrl, fetchApi } from '../utils/fetchApi';



export default function Home({properties}) {

  const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter();

    return (
      <Box>
          <SearchFilters />
          <Text fontStyle='2xl' p='4' fontWeight='bold' >
              Properties{router.query.purpose}
          </Text>
          <Flex flexWrap='wrap'>
              {properties.map((property) => <Property property={property} key={property.id} />)}
          </Flex>
          {properties.length === 0 && (
              <Flex justifyContent="center" alignItems='center' flexDirection='column' marginTop='5' marginBottom='5'>
                  <Image src={noResult} alt='no result' />
                  <Text fontSize='2xl' marginTop='3'> No result found</Text>
              </Flex>
          )}
      </Box>
  )
}


export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}`);

  return {
      props: {
          properties: data?.hits
      }
  }
}