<?php

function create($class, $overiddes = [], $times = null)
{
    return factory($class, $times)->create($overiddes);
}

function make($class, $overiddes = [], $times = null)
{
    return factory($class, $times)->make($overiddes);
}
