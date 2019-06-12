<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 11 Jun 2019 23:16:12 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class HibernateSequence
 * 
 * @property int $next_val
 *
 * @package App\Models
 */
class HibernateSequence extends Eloquent
{
	protected $table = 'hibernate_sequence';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'next_val' => 'int'
	];

	protected $fillable = [
		'next_val'
	];
}
