import { Box, Button, Flex, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{ data, fetching }] = useMeQuery();
    let body = null;

    // data is loading
    if (fetching) {
        body = null;
    }
    // user is NOT logged in
    else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link color={"#E6FFFA"} mr={2}>
                        login
                    </Link>
                </NextLink>
                <NextLink href="/register">
                    <Link color={"#E6FFFA"} mr={2}>
                        register
                    </Link>
                </NextLink>
            </>
        );
    }
    // user is logged in
    else {
        body = (
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
                <Button variant="link">logout</Button>
            </Flex>
        );
    }

    return (
        <Flex bg="#38B2AC" p={4}>
            <Box ml={"auto"}>{body}</Box>
        </Flex>
    );
};
