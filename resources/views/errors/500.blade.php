@extends('errors::minimal')

@section('title', __('Server Error'))
@section('code', '500')
@section('message', __('Server Error'))
@section('action_onclick', 'window.location.href = window.location.href; return false;')
@section('action_text', 'Refresh Website')
