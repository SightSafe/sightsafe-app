package com.example.sightsafe.adapter

data class Result(
    val id: String = "",
    val imageUri: String = "",
    val resultText: String? = null,
    var score: String? = null,
    var recommendation: String? = null
)